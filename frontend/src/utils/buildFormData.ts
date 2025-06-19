import type { Hero } from '../types';

export function buildFormData(
  formData: Omit<Hero, 'id'>,
  existingImages: string[],
  newImages: File[],
): FormData {
  const data = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key !== 'images') {
      data.append(key, value as string);
    }
  });

  existingImages.forEach((img) => data.append('images[]', img));
  newImages.forEach((file) => data.append('images', file));

  return data;
}
