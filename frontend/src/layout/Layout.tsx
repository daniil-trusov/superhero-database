import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 px-6 py-8">{children}</main>

      <Footer />
    </div>
  );
}
