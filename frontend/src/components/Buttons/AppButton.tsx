import { Link } from 'react-router-dom';
import type { ReactNode, MouseEventHandler } from 'react';

type CommonProps = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'link' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
};

type LinkProps = CommonProps & {
  type: 'link';
  to: string;
  onClick?: never;
};

type ButtonProps = CommonProps & {
  type: 'button' | 'submit';
  onClick?: MouseEventHandler;
  to?: never;
};

type Props = LinkProps | ButtonProps;

export function AppButton({
  children,
  variant = 'neutral',
  size = 'md',
  className = '',
  ...rest
}: Props) {
  const base = `rounded px-4 py-2 text-sm text-white hover:bg-white transition-colors border border-transparent`;
  const sizeStyle = size === 'sm' ? 'text-sm' : 'text-base';

  const variants: Record<string, string> = {
    primary: 'bg-blue-500 hover:text-blue-500 hover:border-blue-300',
    secondary: 'bg-yellow-400 hover:text-yellow-400 hover:border-yellow-300',
    danger: 'bg-red-500 hover:text-red-500 hover:border-red-300',
    neutral: 'bg-gray-300 hover:text-gray-500 hover:border-gray-300',
    success: 'bg-green-500 hover:text-green-500 hover:border-green-300',
  };

  const style = `${base} ${variants[variant]} ${sizeStyle} ${className}`;

  if (rest.type === 'link') {
    return (
      <Link to={rest.to} className={style}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={rest.type ?? 'button'}
      onClick={rest.onClick}
      className={style}
    >
      {children}
    </button>
  );
}
