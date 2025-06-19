import { useEffect, useState } from 'react';
import type { Hero } from '../types';
import { heroesApi } from '../services/api';

export function useHeroDetails(id: number | undefined) {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData(id: number) {
      setLoading(true);
      setErrorMessage(null);
      try {
        const heroData = await heroesApi.getHeroById(id);
        setHero(heroData);
      } catch (e) {
        setErrorMessage((e as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchData(id);
  }, [id]);

  return { hero, loading, errorMessage };
}
