import type { HeroCard } from '../../types';
import { CardList } from './CardList';
import { Pagination } from './Pagination';

type Props = {
  heroes: HeroCard[];
  totalPages: number;
  currentPage: number;
  onDelete: (id: number) => void;
  onPageChange: (page: number) => void;
};

export function PaginatedCards({
  heroes,
  totalPages,
  currentPage,
  onDelete,
  onPageChange,
}: Props) {
  return (
    <section aria-label="Heroes list" className="mx-auto max-w-6xl px-4">
      <h2 className="sr-only">Heroes list</h2>

      <CardList heroes={heroes} onDelete={onDelete} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </section>
  );
}
