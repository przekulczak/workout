import { useState, useEffect, useCallback } from "react";

interface UseGetRequestOptions<T> {
  url: string;
  headers?: Record<string, string>;
  initialData?: T | null;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface UseGetRequestResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGetRequest<T>({
  url,
  headers = {},
  initialData = null,
  onSuccess,
  onError,
}: UseGetRequestOptions<T>): UseGetRequestResult<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async (): Promise<void> => {
    if (!url) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData);

      if (onSuccess) {
        onSuccess(responseData);
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);

      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, headers, onSuccess, onError]);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error, refetch: fetchData };
}
