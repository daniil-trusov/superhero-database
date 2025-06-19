const API_URL = 'http://localhost:3000';
const avatarFallbackUrl = '/images/avatar-placeholder.svg';
const imageFallbackUrl =
  'https://placehold.co/200/lightgray/red?text=Cannot+load+image';

export function getAvatarUrl(path: string) {
  return getUrl(path, avatarFallbackUrl);
}

export function getImageUrl(path: string) {
  return getUrl(path, imageFallbackUrl);
}

function getUrl(path: string, fallbackUrl: string) {
  if (!path) {
    return fallbackUrl;
  }

  if (path.startsWith('blob:') || path.startsWith('data:')) {
    return path;
  }

  return path.startsWith('http') ? path : `${API_URL}${path}`;
}
