import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Login | Platforms Starter Kit',
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50 via-orange-200 to-orange-400 flex min-h-screen items-center justify-center">
      {children}
    </div>
  );
}
