import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useHeroDetails, useDeleteHero } from '../hooks';
import { getAvatarUrl } from '../utils';
import { BackButton, EditButton, DeleteButton } from '../components/Buttons';
import { Gallery } from '../components/Gallery';

export function HeroDetailsPage() {
  const { id } = useParams();
  const heroId = Number(id);
  const navigate = useNavigate();

  const { hero, loading, errorMessage } = useHeroDetails(heroId);
  const handleDeleteHero = useDeleteHero(() => {
    navigate('/');
  });

  if (loading) {
    return <p>Loading hero...</p>;
  }

  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

  if (!hero) {
    return <Navigate to="/not-found" replace />;
  }

  const images = hero.images;
  const avatarUrl = getAvatarUrl(images[0]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4 flex flex-row items-center justify-between">
        <BackButton />

        <div className="flex gap-4">
          <EditButton id={hero.id} />

          <DeleteButton onDelete={() => handleDeleteHero(hero.id)} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-12">
        <img
          src={avatarUrl}
          alt={`${hero.nickname} avatar`}
          className="h-48 w-48 rounded-full bg-gray-300 object-cover"
        />

        <section className="flex-1">
          <h1 className="mb-1 text-4xl font-bold text-blue-700">
            {hero.nickname}
          </h1>
          <p className="text mb-3 italic text-gray-600">
            "{hero.catch_phrase}"
          </p>
          <p className="mb-4">{hero.origin_description}</p>

          <h2 className="mb-2 text-xl font-semibold">Real Name</h2>
          <p className="mb-4">{hero.real_name}</p>

          <h2 className="mb-2 text-xl font-semibold">Superpowers</h2>
          <ul className="list-inside list-disc space-y-1">
            {hero.superpowers.split(',').map((power: string, index: number) => (
              <li key={index}>{power.trim()}</li>
            ))}
          </ul>
        </section>
      </div>

      {images.length > 0 && <Gallery images={images} />}
    </div>
  );
}
