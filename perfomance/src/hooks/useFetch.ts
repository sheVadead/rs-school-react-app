import { useState, useEffect } from 'react';

export const useFetch = <T>(callback: () => Promise<T>) => {
  const [data, setData] = useState<T>([] as T);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await callback();
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [callback]);

  return { data, isLoading, error };
};
