import { useDeleteHero, usePaginatedHeroes } from '../hooks';
import { PaginatedCards } from '../components/PaginatedCards';
import { CARDS_PER_PAGE } from '../config/config';

export function HeroesPage() {
  const { heroes, totalPages, page, setPage, loading, errorMessage, refetch } =
    usePaginatedHeroes(CARDS_PER_PAGE);

  const handleDelete = useDeleteHero(refetch);

  if (loading) {
    return <p>Loading heroes...</p>;
  }

  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

  if (heroes.length === 0) {
    return <p>No heroes in database</p>;
  }

  return (
    <div className="mx-auto justify-center">
      <h1 className="mb-4 text-center text-2xl font-bold">Superheroes List</h1>

      <PaginatedCards
        heroes={heroes}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
        onDelete={handleDelete}
      />
    </div>
  );
}
