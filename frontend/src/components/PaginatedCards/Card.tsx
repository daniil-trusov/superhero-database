import { Link } from 'react-router-dom';
import type { HeroCard } from '../../types';
import { getAvatarUrl } from '../../utils';

import { EditButton, DeleteButton } from '../Buttons';

type Props = {
  hero: HeroCard;
  onDelete: () => void;
};

export function Card({ hero, onDelete }: Props) {
  const { id, nickname, preview_image: image } = hero;
  return (
    <article className="flex w-48 flex-col overflow-hidden rounded-lg bg-gray-300 shadow-md">
      <Link to={`/heroes/${id}`}>
        <img
          src={getAvatarUrl(image)}
          alt={`${nickname} card image`}
          className="aspect-square h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </Link>

      <div className="flex flex-col gap-2 p-4">
        <Link
          to={`/heroes/${id}`}
          className="text-lg font-semibold text-blue-600 hover:text-white"
        >
          {nickname}
        </Link>

        <div className="mt-2 flex justify-between">
          <EditButton id={id} />

          <DeleteButton onDelete={onDelete} />
        </div>
      </div>
    </article>
  );
}
