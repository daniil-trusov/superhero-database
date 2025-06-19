import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { heroesApi } from '../../services/api';
import { getAvatarUrl, buildFormData } from '../../utils';
import { useHeroFormState } from './useHeroFormState';
import { useImageUploads } from '../useImageUploads';

export function useEditHeroForm(heroId: number) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { formData, setFormData, handleChange, resetForm } = useHeroFormState();

  const {
    newImages,
    existingImages,
    allImages,
    handleImageUpload,
    handleImageRemove,
    setExistingImages,
    resetImages,
  } = useImageUploads();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    heroesApi
      .getHeroById(heroId)
      .then((hero) => {
        if (!isMounted) return;
        const { id: _, ...rest } = hero;
        setFormData(rest);
        setExistingImages(hero.images);
        setError(null);
      })
      .catch(() => {
        if (isMounted) setError('Failed to load hero');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [heroId, setExistingImages, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = buildFormData(formData, existingImages, newImages);

    try {
      await heroesApi.updateHero(heroId, data);
      resetForm();
      resetImages();
      await heroesApi.updateHero(heroId, data);
      navigate(`/heroes/${heroId}`, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Failed to update hero');
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleImageRemove,
    error,
    loading,
    avatarUrl: getAvatarUrl(allImages[0]),
    images: allImages,
  };
}
