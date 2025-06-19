import { useRef, useState, useMemo, type ChangeEvent } from 'react';
import { getImageUrl } from '../../utils/imageUrlUtils';

type Props = {
  images: string[];
  visibleCount?: number;
  title?: string;
  showDelete?: boolean;
  onDeleteImage?: (url: string) => void;
  showUpload?: boolean;
  onAddImages?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function GalleryBase({
  images,
  visibleCount = 4,
  title = 'Gallery',
  showDelete = false,
  onDeleteImage,
  showUpload = false,
  onAddImages,
}: Props) {
  const [startIndex, setStartIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const endIndex = startIndex + visibleCount;
  const canGoBack = useMemo(() => startIndex > 0, [startIndex]);
  const canGoNext = useMemo(
    () => endIndex < images.length,
    [endIndex, images.length],
  );

  const visibleImages = images.slice(startIndex, endIndex);

  const handleOpenFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteImage = (url: string) => {
    if (onDeleteImage && confirm('Remove this image?')) {
      onDeleteImage(url);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {title} - {images.length} image{images.length !== 1 && 's'}{' '}
          <span className="text-sm text-gray-500">
            (first image {images.length > 0 ? 'is' : 'will be'} used as hero
            avatar)
          </span>
        </h2>

        {showUpload && (
          <>
            <button
              type="button"
              onClick={handleOpenFileDialog}
              className="flex items-center gap-2 rounded bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
            >
              Add Images
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={onAddImages}
            />
          </>
        )}
      </div>

      {images.length === 0 ? (
        <div className="rounded border border-dashed p-8 text-center text-gray-500">
          No images yet
        </div>
      ) : (
        <div className="relative">
          <div className="flex gap-4 overflow-hidden">
            {visibleImages.map((url, index) => (
              <div key={`${url}-${index}`} className="group relative">
                <img
                  src={getImageUrl(url)}
                  alt={`Gallery image ${startIndex + index + 1} of ${
                    images.length
                  }`}
                  className="h-40 w-40 rounded-lg object-cover shadow"
                />
                {showDelete && onDeleteImage && (
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(url)}
                    className="absolute right-1 top-1 hidden rounded-full bg-white p-1 text-red-600 shadow hover:bg-red-100 group-hover:block"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
          </div>

          {images.length > visibleCount && (
            <>
              <button
                type="button"
                onClick={() =>
                  canGoBack &&
                  setStartIndex((prev) => Math.max(0, prev - visibleCount))
                }
                disabled={!canGoBack}
                className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow disabled:opacity-30"
                aria-label="Previous images"
              >
                〈
              </button>

              <button
                type="button"
                onClick={() =>
                  canGoNext &&
                  setStartIndex((prev) =>
                    Math.min(images.length - visibleCount, prev + visibleCount),
                  )
                }
                disabled={!canGoNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow disabled:opacity-30"
                aria-label="Next images"
              >
                〉
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
