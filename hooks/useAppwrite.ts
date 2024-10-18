import { useCallback, useEffect, useState } from "react";

type AppwriteHook<T> = () => Promise<{
  success: boolean;
  data?: T;
  message?: string;
}>;

export function useAppwrite<T>(fn: AppwriteHook<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fn();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        setError(response.message || "An error occurred");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
  };
}
