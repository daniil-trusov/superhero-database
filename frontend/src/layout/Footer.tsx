import { Link } from 'react-router-dom';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer>
      <div className="flex h-16 items-center justify-center gap-6 bg-gray-300 px-4 py-0 text-gray-800">
        <span>Daniil Trusov | 2025</span>

        <button
          onClick={scrollToTop}
          className="px-4  py-2 hover:text-blue-500"
        >
          ↑
        </button>

        <Link
          target="_blank"
          to="https://github.com/daniil-trusov/superhero-database"
          rel="noopener noreferrer"
          className="hover:text-blue-500"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}
