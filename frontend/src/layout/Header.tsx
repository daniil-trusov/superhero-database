import { Link } from 'react-router-dom';
import { AppButton } from '../components/Buttons/AppButton';

export function Header() {
  return (
    <header>
      <div className=" flex h-16 items-center justify-between bg-gray-300 px-4 py-0">
        <Link
          to="/"
          className="transition-transform duration-200 hover:scale-110"
        >
          <img src="/favicon.ico" alt="Superhero DB logo" />
        </Link>

        <AppButton type="link" to="/heroes/create" variant="primary" size="md">
          Add hero
        </AppButton>
      </div>
    </header>
  );
}
