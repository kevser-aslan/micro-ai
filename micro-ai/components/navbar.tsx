'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations('navbar');

  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center bg-[#11111b] text-white transition-transform duration-500 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ willChange: "transform" }}
    >
      <Link href="/" className="flex items-center space-x-2">
  <div className="w-6 h-6 bg-gradient-to-br from-[#1b4db1] to-[#3a267e] rounded-md" />
  <span className="text-lg font-semibold">Micro-AI</span>
</Link>


      <div className="hidden md:flex space-x-6 text-sm font-medium">
        <Link href="/product" className="hover:text-gray-300">
          {t('product')}
        </Link>
        <Link href="/pricing" className="hover:text-gray-300">
          {t('pricing')}
        </Link>
        <Link href="/about" className="hover:text-gray-300">
          {t('about')}
        </Link>
        <Link href="/contact" className="hover:text-gray-300">
          {t('contact')}
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/signin" className="hover:text-gray-300">
          {t('signIn')}
        </Link>
        <Link href="/signup">
          <button className="px-4 py-1.5 bg-gradient-to-r from-[#1b4db1] to-[#3a267e] rounded-full text-white font-medium hover:opacity-90 transition">
            {t('signUp')}
          </button>
        </Link>
      </div>
    </nav>
  );
}
