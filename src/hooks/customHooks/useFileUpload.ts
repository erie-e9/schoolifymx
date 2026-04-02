import { useState } from 'react';

interface UploadResponse {
  success?: boolean;
  items?: Array<{ id: string; name: string; quantity?: number }>;
  error?: string;
  [key: string]: unknown;
}

const useFileUpload = (url: RequestInfo | URL) => {
  const [data, setData] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('data', file);
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const json: UploadResponse = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return { uploadFile, data, error, loading };
};

export default useFileUpload;
