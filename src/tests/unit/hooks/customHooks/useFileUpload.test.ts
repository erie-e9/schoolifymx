import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useFileUpload from '@customHooks/useFileUpload';

describe('useFileUpload', () => {
  const url = 'https://api.example.com/upload';
  const mockFile = new File(['test content'], 'test.txt', { type: 'text/plain' });

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn());
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useFileUpload(url));
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('uploads a file successfully', async () => {
    const mockResponse = { success: true, items: [{ id: '1', name: 'Item 1' }] };
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    }));

    const { result } = renderHook(() => useFileUpload(url));

    await act(async () => {
      await result.current.uploadFile(mockFile);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockResponse);
    expect(result.current.error).toBeNull();
    expect(window.fetch).toHaveBeenCalledWith(url, expect.objectContaining({
      method: 'POST',
      body: expect.any(FormData)
    }));
  });

  it('handles server error (non-ok response)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error'
    }));

    const { result } = renderHook(() => useFileUpload(url));

    await act(async () => {
      await result.current.uploadFile(mockFile);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Error 500: Internal Server Error');
  });

  it('handles network error (rejection)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network Error')));

    const { result } = renderHook(() => useFileUpload(url));

    await act(async () => {
      await result.current.uploadFile(mockFile);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error?.message).toBe('Network Error');
  });

  it('handles unknown error during upload', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue('Something went wrong'));

    const { result } = renderHook(() => useFileUpload(url));

    await act(async () => {
      await result.current.uploadFile(mockFile);
    });

    expect(result.current.error?.message).toBe('Unknown error occurred');
  });
});
