import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  active?: boolean;
  onClick: () => void;
};

export function PageButton({
  onClick,
  disabled,
  active,
  ariaLabel,
  children,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      className={clsx('cursor-pointer rounded border px-3 py-1', {
        'border-blue-600 bg-blue-600 text-white': active,
        'border-gray-300 hover:bg-gray-200': !active && !disabled,
        'cursor-not-allowed opacity-50': disabled,
      })}
    >
      {children}
    </button>
  );
}
