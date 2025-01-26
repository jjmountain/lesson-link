// app/home/layout.tsx
'use client'; // Only needed if using context/state

import ClientHeader from '@/components/layout/ClientHeader';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientHeader />
      {children}
    </>
  );
}
