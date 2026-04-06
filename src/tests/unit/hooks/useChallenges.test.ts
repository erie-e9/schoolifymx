import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChallenges } from '@hooks/useChallenges';

describe('useChallenges', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // vi.stubGlobal('localStorage', {
    //   getItem: vi.fn(),
    //   setItem: vi.fn(),
    //   clear: vi.fn(),
    // });
  });

  it('initializes with default challenges when no storage', () => {
    const { result } = renderHook(() => useChallenges());
    expect(result.current.challenges.length).toBe(3);
    expect(result.current.completedCount).toBe(0);
    expect(result.current.hasNewCompletion).toBe(false);
  });

  it('loads challenges from localStorage', () => {
    const saved = [
      { id: 'scan_list', current: 1, completed: true, rewarded: false }
    ];
    localStorage.setItem('schoolify_challenges', JSON.stringify(saved));
    
    const { result } = renderHook(() => useChallenges());
    expect(result.current.challenges[0].id).toBe('scan_list');
    expect(result.current.challenges[0].completed).toBe(true);
    expect(result.current.completedCount).toBe(1);
  });

  it('updates challenge progress via function call', () => {
    const { result } = renderHook(() => useChallenges());
    
    act(() => {
      result.current.updateChallenge('scan_list', 1);
    });

    const scanChallenge = result.current.challenges.find(c => c.id === 'scan_list');
    expect(scanChallenge?.current).toBe(1);
    expect(scanChallenge?.completed).toBe(true);
    expect(result.current.hasNewCompletion).toBe(true);
  });

  it('updates challenge progress via custom event', () => {
    const { result } = renderHook(() => useChallenges());
    
    act(() => {
      window.dispatchEvent(new CustomEvent('schoolify-mission-progress', {
        detail: { missionId: 'backpack_items', increment: 2 }
      }));
    });

    const backpackChallenge = result.current.challenges.find(c => c.id === 'backpack_items');
    expect(backpackChallenge?.current).toBe(2);
    expect(backpackChallenge?.completed).toBe(false);
  });

  it('sets hasNewCompletion when a challenge is completed', () => {
    const { result } = renderHook(() => useChallenges());
    
    act(() => {
      result.current.updateChallenge('add_student', 1);
    });

    expect(result.current.hasNewCompletion).toBe(true);
  });

  it('does not update already completed challenges', () => {
    const { result } = renderHook(() => useChallenges());
    
    act(() => {
      result.current.updateChallenge('scan_list', 1); // Complete it
    });
    
    act(() => {
      result.current.setHasNewCompletion(false);
      result.current.updateChallenge('scan_list', 1); // Try to update again
    });

    expect(result.current.hasNewCompletion).toBe(false);
  });

  it('persists changes to localStorage', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    const { result } = renderHook(() => useChallenges());
    
    act(() => {
      result.current.updateChallenge('scan_list', 1);
    });

    expect(setItemSpy).toHaveBeenCalledWith('schoolify_challenges', expect.any(String));
  });

  it('handles invalid JSON in localStorage', () => {
    localStorage.setItem('schoolify_challenges', 'invalid-json');
    const { result } = renderHook(() => useChallenges());
    expect(result.current.challenges.length).toBe(3);
    expect(result.current.challenges[0].id).toBe('scan_list');
  });
});
