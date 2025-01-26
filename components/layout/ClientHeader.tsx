// app/ClientHeader.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ClientHeader() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    heroRef.current = document.getElementById('hero-section');
  }, []);

  const textColor = useTransform(scrollY, (val) => {
    if (!heroRef.current) return '#1a1a1a';
    return val > heroRef.current.offsetHeight ? '#ea580c' : '#ffffff';
  });

  const logoFilter = useTransform(scrollY, (val) => {
    if (!heroRef.current) return 'brightness(0) invert(1)';
    return val > heroRef.current.offsetHeight ? 'none' : 'brightness(0) invert(1)';
  });

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      style={{
        backgroundColor: useTransform(scrollY, (val) => {
          if (!heroRef.current) return 'transparent';
          return val > heroRef.current.offsetHeight
            ? 'rgba(255, 255, 255, 0.9)'
            : 'transparent';
        }),
        backdropFilter: useTransform(scrollY, (val) => {
          if (!heroRef.current) return 'none';
          return val > heroRef.current.offsetHeight ? 'blur(12px)' : 'none';
        }),
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex h-14 items-center justify-between w-full">
          <Link className="flex items-center space-x-2" href="/">
            <motion.div style={{ filter: logoFilter }}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
            </motion.div>
            <motion.span className="font-bold text-lg" style={{ color: textColor }}>
              LessonLink
            </motion.span>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hover:bg-white/10"
              style={{ color: textColor } as any}
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button className="bg-white/20 hover:bg-white/30 text-slate-800" asChild>
              <Link href="/signup">Start Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
