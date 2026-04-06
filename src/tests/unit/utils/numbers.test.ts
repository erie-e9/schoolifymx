import { describe, it, expect } from 'vitest';
import { formatNumbers } from '@utils/numbers';

describe('formatNumbers', () => {
  it('formats number with comma as default separator', () => {
    expect(formatNumbers(1000)).toBe('1,000');
  });

  it('formats number with comma separator explicitly', () => {
    expect(formatNumbers(1000000, { separator: ',' })).toBe('1,000,000');
  });

  it('formats number with dot separator', () => {
    expect(formatNumbers(1000000, { separator: '.' })).toBe('1.000.000');
  });

  it('formats number with zero decimals by default', () => {
    expect(formatNumbers(1000.5)).toBe('1,001');
  });

  it('formats number with specified decimals', () => {
    expect(formatNumbers(1000.567, { separator: ',', decimals: 2 })).toBe('1,000.57');
  });

  it('formats number with decimals and dot separator', () => {
    expect(formatNumbers(1000.5, { separator: '.', decimals: 1 })).toBe('1.000.5');
  });

  it('handles zero correctly', () => {
    expect(formatNumbers(0)).toBe('0');
  });

  it('handles negative numbers', () => {
    expect(formatNumbers(-1000)).toBe('-1,000');
  });

  it('handles small numbers without separator', () => {
    expect(formatNumbers(100)).toBe('100');
  });

  it('handles decimal numbers without integer part', () => {
    expect(formatNumbers(0.5, { separator: ',', decimals: 1 })).toBe('0.5');
  });

  it('formats very large numbers correctly', () => {
    expect(formatNumbers(1000000000)).toBe('1,000,000,000');
  });

  it('preserves trailing zeros when decimals specified', () => {
    expect(formatNumbers(1000, { separator: ',', decimals: 2 })).toBe('1,000.00');
  });

  it('rounds decimals correctly', () => {
    expect(formatNumbers(1000.999, { separator: ',', decimals: 2 })).toBe('1,001.00');
  });
});