import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSuppliesEstimation } from '@hooks/useSuppliesEstimation';

vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn((target, props) => {
      // Simulate tween completion immediately
      if (props.onUpdate) {
        target.min = props.min;
        target.max = props.max;
        props.onUpdate();
      }
    }),
  }
}));

describe('useSuppliesEstimation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useSuppliesEstimation());
    expect(result.current.grade).toBe('Primaria');
    expect(result.current.bundle).toBe('Selecto');
    expect(result.current.timeSaved).toBe(6); // Primaria + Selecto = 6
  });

  it('updates range when grade changes to Preescolar', () => {
    const { result } = renderHook(() => useSuppliesEstimation());
    
    act(() => {
      result.current.setGrade('Preescolar');
    });

    expect(result.current.grade).toBe('Preescolar');
    expect(result.current.range.min).toBe(1200); // Preescolar + Selecto = 1200
    expect(result.current.range.max).toBe(1800);
    expect(result.current.timeSaved).toBe(5);
  });

  it('updates range when bundle changes to Esencial', () => {
    const { result } = renderHook(() => useSuppliesEstimation());
    
    act(() => {
      result.current.setGrade('Primaria');
      result.current.setBundle('Esencial');
    });

    expect(result.current.bundle).toBe('Esencial');
    expect(result.current.range.min).toBe(1080); // Primaria + Esencial = 1080
    expect(result.current.range.max).toBe(1300);
    expect(result.current.timeSaved).toBe(5);
  });

  it('updates range when grade changes to Secundaria', () => {
    const { result } = renderHook(() => useSuppliesEstimation());
    
    act(() => {
      result.current.setGrade('Secundaria');
    });

    expect(result.current.grade).toBe('Secundaria');
    expect(result.current.range.min).toBe(1500); // Secundaria + Selecto = 1500
    expect(result.current.range.max).toBe(2000);
    expect(result.current.timeSaved).toBe(7);
  });
});
