import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { HeroCard } from '../types';
import { heroesApi } from '../services/api';

export function usePaginatedHeroes(limit = 5) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [heroes, setHeroes] = useState<HeroCard[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const fetchData = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const data = await heroesApi.getHeroes(page, limit);
      setHeroes(data.heroes);
      setTotalCount(data.totalCount);
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const setPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  return {
    heroes,
    totalPages,
    page,
    setPage,
    loading,
    errorMessage,
    refetch: fetchData,
  };
}
