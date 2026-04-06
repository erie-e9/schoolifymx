import { useState, useMemo, useEffect } from 'react';
import type { ScannedItem, SelectedItem, ScannedSectionItem } from '@types';

const EMPTY_SCANNED_ITEMS: ScannedItem[] = [];

export const useBackpack = (isOpen: boolean, scannedItems: ScannedItem[] = EMPTY_SCANNED_ITEMS) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, SelectedItem>>({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [noteOpenId, setNoteOpenId] = useState<string | null>(null);
  const [scannedSection, setScannedSection] = useState<ScannedSectionItem[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (scannedItems.length > 0) {
        setScannedSection(scannedItems);
      }
    } else {
      setSelectedItems({});
      setIsCompleted(false);
      setSearchQuery('');
      setActiveCategory('all');
      setNoteOpenId(null);
      setScannedSection([]);
    }
  }, [isOpen, scannedItems]);

  const updateQuantity = (id: string, delta: number) => {
    if (delta > 0) {
      window.dispatchEvent(new CustomEvent('schoolify-mission-progress', {
        detail: { missionId: 'backpack_items', increment: delta }
      }));
    }
    setSelectedItems(prev => {
      const current = prev[id]?.qty || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [id]: { ...prev[id], qty: next }
      };
    });
  };

  const updateNote = (id: string, note: string) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: { 
        qty: prev[id]?.qty || 1,
        note,
        name: prev[id]?.name || 'Artículo'
      }
    }));
  };

  const importScanned = () => {
    setSelectedItems(prev => {
      const next = { ...prev };
      scannedSection.filter(i => i.selected).forEach(item => {
        const key = `scanned-${item.id}`;
        if (!next[key]) next[key] = { qty: 1, note: item.note, name: item.name };
      });
      return next;
    });
    setScannedSection([]);
  };

  const totalItemCount = useMemo(() => {
    return Object.values(selectedItems).reduce((acc, item) => acc + item.qty, 0);
  }, [selectedItems]);

  const selectedCount = Object.keys(selectedItems).length;

  return {
    selectedItems,
    setSelectedItems,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    isCompleted,
    setIsCompleted,
    noteOpenId,
    setNoteOpenId,
    scannedSection,
    setScannedSection,
    updateQuantity,
    updateNote,
    importScanned,
    totalItemCount,
    selectedCount
  };
};
