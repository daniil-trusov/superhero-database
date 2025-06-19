import { useState } from 'react';
import type { Hero } from '../../types';

export function useHeroFormState() {
  const [formData, setFormData] = useState<Omit<Hero, 'id'>>({
    nickname: '',
    real_name: '',
    origin_description: '',
    superpowers: '',
    catch_phrase: '',
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      nickname: '',
      real_name: '',
      origin_description: '',
      superpowers: '',
      catch_phrase: '',
      images: [],
    });
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
}
