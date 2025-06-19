import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { heroesApi } from '../../services/api';
import { getAvatarUrl, buildFormData } from '../../utils';
import { useHeroFormState } from './useHeroFormState';
import { useImageUploads } from '../useImageUploads';

export function useCreateHeroForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { formData, handleChange, resetForm } = useHeroFormState();

  const {
    newImages,
    existingImages,
    allImages,
    handleImageUpload,
    handleImageRemove,
    resetImages,
  } = useImageUploads();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = buildFormData(formData, existingImages, newImages);

    try {
      const newHero = await heroesApi.createHero(data);
      resetForm();
      resetImages();
      navigate(`/heroes/${newHero.id}`, { replace: true });
    } catch (err) {
      console.error(err);
      setError('Failed to create hero');
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    handleImageUpload,
    handleImageRemove,
    error,
    avatarUrl: getAvatarUrl(allImages[0]),
    images: allImages,
  };
}
