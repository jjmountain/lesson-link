'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { ModalProvider } from '@/components/modal/provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <ModalProvider>{children}</ModalProvider>
    </ClerkProvider>



  );
}
