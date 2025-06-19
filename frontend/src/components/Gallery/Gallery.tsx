import { GalleryBase } from './GalleryBase';

export function Gallery({ images }: { images: string[] }) {
  return <GalleryBase images={images} />;
}
