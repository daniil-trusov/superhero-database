import { useState } from 'react';

export function useImageUploads(initialImages: string[] = []) {
  const [existingImages, setExistingImages] = useState<string[]>(initialImages);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => URL.createObjectURL(file));

    setNewImages((prev) => [...prev, ...fileArray]);
    setPreviewUrls((prev) => [...prev, ...previews]);
  };

  const handleImageRemove = (url: string) => {
    if (existingImages.includes(url)) {
      setExistingImages((prev) => prev.filter((img) => img !== url));
    } else {
      const index = previewUrls.indexOf(url);
      if (index !== -1) {
        setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
        setNewImages((prev) => prev.filter((_, i) => i !== index));
      }
    }
  };

  const allImages = [...existingImages, ...previewUrls];

  return {
    newImages,
    existingImages,
    previewUrls,
    allImages,
    handleImageUpload,
    handleImageRemove,
    setExistingImages,
    resetImages: () => {
      setNewImages([]);
      setPreviewUrls([]);
      setExistingImages([]);
    },
  };
}
