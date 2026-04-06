import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBackpack } from '@hooks/useBackpack';

describe('useBackpack', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Initialization ─────────────────────────────────────────────────────────

  it('initializes with default values when closed', () => {
    const { result } = renderHook(() => useBackpack(false));
    expect(result.current.selectedItems).toEqual({});
    expect(result.current.activeCategory).toBe('all');
    expect(result.current.searchQuery).toBe('');
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.noteOpenId).toBeNull();
    expect(result.current.scannedSection).toEqual([]);
    expect(result.current.totalItemCount).toBe(0);
    expect(result.current.selectedCount).toBe(0);
  });

  it('populates scannedSection when isOpen=true and scannedItems are provided', () => {
    const scannedItems = [{ id: '1', name: 'Item 1', note: '', selected: true }];
    const { result } = renderHook(() => useBackpack(true, scannedItems));
    expect(result.current.scannedSection).toEqual(scannedItems);
  });

  it('does not populate scannedSection when isOpen=true but scannedItems is empty', () => {
    const { result } = renderHook(() => useBackpack(true, []));
    expect(result.current.scannedSection).toEqual([]);
  });

  // ── Reset on close ─────────────────────────────────────────────────────────

  it('resets all state when isOpen becomes false', () => {
    const { result, rerender } = renderHook(({ isOpen }) => useBackpack(isOpen), {
      initialProps: { isOpen: true }
    });

    act(() => {
      result.current.setActiveCategory('escritura');
      result.current.setSearchQuery('test');
      result.current.setIsCompleted(true);
      result.current.setNoteOpenId('abc');
    });

    rerender({ isOpen: false });

    expect(result.current.activeCategory).toBe('all');
    expect(result.current.searchQuery).toBe('');
    expect(result.current.selectedItems).toEqual({});
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.noteOpenId).toBeNull();
    expect(result.current.scannedSection).toEqual([]);
  });

  // ── updateQuantity ─────────────────────────────────────────────────────────

  it('adds item and fires mission-progress event for positive delta', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    const { result } = renderHook(() => useBackpack(true));

    act(() => {
      result.current.updateQuantity('item1', 2);
    });

    expect(result.current.selectedItems['item1'].qty).toBe(2);
    expect(result.current.totalItemCount).toBe(2);
    expect(result.current.selectedCount).toBe(1);
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
  });

  it('decrements quantity and does NOT fire event for negative delta', () => {
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    const { result } = renderHook(() => useBackpack(true));

    act(() => {
      result.current.updateQuantity('item1', 1); // add first
    });
    dispatchSpy.mockClear();

    act(() => {
      result.current.updateQuantity('item1', -1);
    });

    expect(result.current.selectedCount).toBe(0);        // item removed (qty hits 0)
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('accumulates quantity across separate calls', () => {
    const { result } = renderHook(() => useBackpack(true));

    act(() => {
      result.current.updateQuantity('item1', 3);
    });
    act(() => {
      result.current.updateQuantity('item1', 2);
    });

    expect(result.current.selectedItems['item1'].qty).toBe(5);
    expect(result.current.totalItemCount).toBe(5);
  });

  it('removes item from selectedItems when quantity reaches 0', () => {
    const { result } = renderHook(() => useBackpack(true));

    act(() => {
      result.current.updateQuantity('item1', 1);
    });
    expect(result.current.selectedCount).toBe(1);

    act(() => {
      result.current.updateQuantity('item1', -1);
    });

    expect(result.current.selectedCount).toBe(0);
    expect(result.current.selectedItems['item1']).toBeUndefined();
  });

  // ── updateNote ─────────────────────────────────────────────────────────────

  it('updates the note for an existing item', () => {
    const { result } = renderHook(() => useBackpack(true));

    act(() => {
      result.current.updateQuantity('item1', 1);
    });
    act(() => {
      result.current.updateNote('item1', 'azul, talla M');
    });

    expect(result.current.selectedItems['item1'].note).toBe('azul, talla M');
  });

  it('correctly initializes item when updateNote is called for a non-existent item', () => {
    const { result } = renderHook(() => useBackpack(true));

    act(() => {
      result.current.updateNote('newItem', 'Nueva nota');
    });

    expect(result.current.selectedItems['newItem']).toBeDefined();
    expect(result.current.selectedItems['newItem'].qty).toBe(1);
    expect(result.current.selectedItems['newItem'].note).toBe('Nueva nota');
    expect(result.current.totalItemCount).toBe(1);
    expect(Number.isNaN(result.current.totalItemCount)).toBe(false);
  });

  // ── importScanned ──────────────────────────────────────────────────────────

  it('imports only selected scanned items and clears scannedSection', () => {
    const scannedItems = [
      { id: '1', name: 'Item 1', note: 'Note 1', selected: true },
      { id: '2', name: 'Item 2', note: 'Note 2', selected: false }
    ];
    const { result } = renderHook(() => useBackpack(true, scannedItems));

    expect(result.current.scannedSection.length).toBe(2);

    act(() => {
      result.current.importScanned();
    });

    expect(result.current.selectedItems['scanned-1']).toEqual({ qty: 1, name: 'Item 1', note: 'Note 1' });
    expect(result.current.selectedItems['scanned-2']).toBeUndefined();
    expect(result.current.scannedSection).toEqual([]);
    expect(result.current.totalItemCount).toBe(1);
  });

  it('does not duplicate an already-imported scanned item', () => {
    const scannedItems = [
      { id: '1', name: 'Item 1', note: 'Note 1', selected: true },
    ];
    const { result } = renderHook(() => useBackpack(true, scannedItems));

    act(() => {
      result.current.importScanned();  // first import
    });
    expect(result.current.selectedItems['scanned-1'].qty).toBe(1);

    // Manually add more qty to prove it won't be reset on second import
    act(() => {
      result.current.updateQuantity('scanned-1', 4); // now qty = 5
    });

    // Simulate a second import attempt by calling importScanned with
    // an item already present — the hook uses `if (!next[key])`, so it skips
    // We test this by using setSelectedItems to pre-populate and do a fresh render
    const { result: result2 } = renderHook(() => useBackpack(true, scannedItems));
    act(() => {
      result2.current.updateQuantity('scanned-1', 2); // pre-populate with qty=2
    });
    act(() => {
      result2.current.importScanned();
    });
    // Should NOT overwrite the pre-existing entry
    expect(result2.current.selectedItems['scanned-1'].qty).toBe(2);
  });
});
