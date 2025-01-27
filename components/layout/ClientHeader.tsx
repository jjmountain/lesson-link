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

  // Smooth color transitions
  const textColor = useTransform(scrollY, (val) => {
    if (!heroRef.current) return '#1a1a1a';
    const heroHeight = heroRef.current.offsetHeight;
    return val > heroHeight * 0.8 ? '#ea580c' : '#1a1a1a';
  });

  const headerBg = useTransform(scrollY, (val) => {
    if (!heroRef.current) return 'transparent';
    const progress = Math.min(val / heroRef.current.offsetHeight, 1);
    return `rgba(255, 255, 255, ${progress * 0.9})`;
  });

  const headerBlur = useTransform(scrollY, (val) => {
    if (!heroRef.current) return 'none';
    const progress = Math.min(val / heroRef.current.offsetHeight, 1);
    return `blur(${progress * 12}px)`;
  });

  return (
    <motion.header
      className="fixed top-0 z-50 w-full"
      style={{
        backgroundColor: headerBg,
        backdropFilter: headerBlur,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="mx-auto px-4 sm:px-6 w-full">
        <div className="flex h-14 items-center justify-between w-full">
          <Link className="flex items-center space-x-2" href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <motion.span
              className="font-bold text-lg"
              style={{ color: textColor }}
              transition={{ duration: 0.4 }}
            >
              LessonLink
            </motion.span>
          </Link>
          <div className="flex items-center gap-4">
            <motion.div style={{ color: textColor }} transition={{ duration: 0.4 }}>
              <Button variant="ghost" className="hover:bg-black/5" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </motion.div>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white" asChild>
              <Link href="/signup">Start Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
