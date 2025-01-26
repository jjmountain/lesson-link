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
  const headerHeight = 56; // h-14 = 56px

  useEffect(() => {
    heroRef.current = document.getElementById('hero-section');
  }, []);

  const textColor = useTransform(scrollY, (val) => {
    if (!heroRef.current) return '#1a1a1a'; // Default to black
    const heroTop = heroRef.current.offsetTop;
    const heroBottom = heroTop + heroRef.current.offsetHeight;

    // Black when:
    // - Above hero (val < heroTop)
    // - Below hero (val > heroBottom)
    // White when inside hero (heroTop <= val <= heroBottom)
    return val >= heroTop && val <= heroBottom ? '#ffffff' : '#1a1a1a';
  });

  const headerBg = useTransform(scrollY, (val) => {
    if (!heroRef.current) return 'transparent';
    const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
    return val > heroBottom ? 'rgba(255, 255, 255, 0.8)' : 'transparent';
  });

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: headerBg,
        backdropFilter: useTransform(scrollY, (val) => {
          if (!heroRef.current) return 'none';
          return val > heroRef.current.offsetHeight ? 'blur(12px)' : 'none';
        }),
        transition: 'all 0.3s ease',
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex h-14 items-center justify-between w-full">
          <Link className="flex items-center space-x-2" href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <motion.span className="font-bold text-lg" style={{ color: textColor }}>
              LessonLink
            </motion.span>
          </Link>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="bg-transparent hover:bg-black/5 border-gray-300"
              asChild
            >
              <Link href="/login" className="text-current">
                Login
              </Link>
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700" asChild>
              <Link href="/signup" className="text-white">
                Start Free
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
