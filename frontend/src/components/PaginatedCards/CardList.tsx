import type { HeroCard } from '../../types';
import { Card } from './Card';

type Props = {
  heroes: HeroCard[];
  onDelete: (id: number) => void;
};

export function CardList({ heroes, onDelete }: Props) {
  const handleDelete = (id: number) => () => onDelete(id);

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-center">
      {heroes.map((hero) => (
        <Card key={hero.id} hero={hero} onDelete={handleDelete(hero.id)} />
      ))}
    </div>
  );
}
