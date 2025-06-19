import { useMemo } from 'react';
import { PageButton } from './PageButton';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};
export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, index) => index + 1),
    [totalPages],
  );

  return (
    <nav className="mt-6 flex justify-center">
      <ul className="inline-flex items-center space-x-1">
        <li>
          <PageButton
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            ariaLabel="Previous page"
          >
            ←
          </PageButton>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <PageButton
              onClick={() => onPageChange(page)}
              active={page === currentPage}
            >
              {page}
            </PageButton>
          </li>
        ))}

        <li>
          <PageButton
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            ariaLabel="Next page"
          >
            →
          </PageButton>
        </li>
      </ul>
    </nav>
  );
}
