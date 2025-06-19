import type { ChangeEvent } from 'react';
import { GalleryBase } from './GalleryBase';

type Props = {
  images: string[];
  onAddImages: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: (url: string) => void;
};

export function GalleryEditor({ images, onAddImages, onDeleteImage }: Props) {
  return (
    <GalleryBase
      images={images}
      showUpload
      showDelete
      onAddImages={onAddImages}
      onDeleteImage={onDeleteImage}
    />
  );
}
