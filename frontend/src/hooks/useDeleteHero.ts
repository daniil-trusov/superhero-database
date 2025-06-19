import { useCallback } from 'react';
import { heroesApi } from '../services/api';

export function useDeleteHero(onSuccess?: () => void) {
  return useCallback(
    async (id: number) => {
      const confirmed = confirm('Are you sure you want to delete this hero?');
      if (!confirmed) {
        return;
      }

      try {
        const res = await heroesApi.deleteHero(id);

        if (!res.message) {
          throw new Error(`Failed to delete hero with id ${id}`);
        }

        if (onSuccess) {
          onSuccess();
        }
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete hero');
      }
    },
    [onSuccess],
  );
}
