import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useScanner } from '@hooks/useScanner';
import useFileUpload from '@customHooks/useFileUpload';

vi.mock('@customHooks/useFileUpload');

describe('useScanner', () => {
  const uploadFileMock = vi.fn().mockResolvedValue({ success: true });

  class MockFileReader {
    onload: any;
    readAsDataURL(_file: any) {
      setTimeout(() => {
        if (this.onload) {
          this.onload({ target: { result: 'data:image/png;base64,test' } });
        }
      }, 0);
    }
  }

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.stubGlobal('FileReader', MockFileReader);
    vi.mocked(useFileUpload).mockReturnValue({
      uploadFile: uploadFileMock,
      data: null,
      error: null,
      loading: false
    });
  });

  it('initializes with default state', () => {
    const { result } = renderHook(() => useScanner(false));
    expect(result.current.status).toBe('idle');
    expect(result.current.progress).toBe(0);
    expect(result.current.items).toEqual([]);
  });

  it('resets state when isOpen becomes false', () => {
    const { result, rerender } = renderHook(({ isOpen }) => useScanner(isOpen), {
      initialProps: { isOpen: true }
    });

    act(() => {
      result.current.setStatus('completed');
      result.current.setTier('Esencial');
    });

    rerender({ isOpen: false });

    expect(result.current.status).toBe('idle');
    expect(result.current.tier).toBe('Selecto');
  });

  it('processes an image file', async () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const { result } = renderHook(() => useScanner(true));

    await act(async () => {
      await result.current.processFile(mockFile);
    });

    // Advance for FileReader
    act(() => {
      vi.advanceTimersByTime(10);
    });

    expect(result.current.fileName).toBe('test.png');
    expect(result.current.fileType).toBe('image');
    expect(result.current.selectedFile).toBe('data:image/png;base64,test');
    expect(result.current.status).toBe('uploading');

    // Trigger startSimulation
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.status).toBe('scanning');
  });

  it('completes the scanning simulation', async () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const { result } = renderHook(() => useScanner(true));

    await act(async () => {
      await result.current.processFile(mockFile);
    });

    act(() => {
      vi.advanceTimersByTime(10); // FileReader
      vi.advanceTimersByTime(1000); // startSimulation
    });

    expect(result.current.status).toBe('scanning');

    act(() => {
      vi.advanceTimersByTime(4500); // simulation interval
    });

    expect(result.current.progress).toBe(100);
    expect(result.current.status).toBe('completed');
  });

  it('processes a PDF file', async () => {
    const mockFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const { result } = renderHook(() => useScanner(true));

    await act(async () => {
      await result.current.processFile(mockFile);
    });

    expect(result.current.fileName).toBe('test.pdf');
    expect(result.current.fileType).toBe('pdf');
    expect(result.current.selectedFile).toBeNull();
    expect(result.current.status).toBe('uploading');
  });

  it('handles upload errors', async () => {
    const uploadFileMockLocal = vi.fn().mockRejectedValue(new Error('Upload failed'));
    vi.mocked(useFileUpload).mockReturnValue({
      uploadFile: uploadFileMockLocal,
      data: null,
      error: new Error('Upload failed'),
      loading: false
    });

    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    const { result } = renderHook(() => useScanner(true));

    await act(async () => {
      await result.current.processFile(mockFile);
    });

    expect(result.current.status).toBe('error');
  });
});
