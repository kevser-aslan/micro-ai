'use client';

import { useEffect, useState } from 'react';

interface AnimatedLanguageSelectorProps {
  locale: 'tr' | 'en';
  onLocaleChange: (locale: 'tr' | 'en') => void;
}

export default function AnimatedLanguageSelector({ locale, onLocaleChange }: AnimatedLanguageSelectorProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`flex flex-col items-start gap-3 mb-10 transition-all duration-500 ease-in-out
        ${scrolled ? 'opacity-80 translate-y-[-10px]' : 'opacity-100 translate-y-0'}`}
    >
      {/* Başlık - Dosya başlığı ile aynı boyutta ve hizalı */}
      

      {/* Dil butonları */}
      <div className="flex gap-5">
        {(['tr', 'en'] as const).map((lng) => {
          const active = locale === lng;
          return (
            <button
              key={lng}
              onClick={() => onLocaleChange(lng)}
              className={`
                relative px-5 py-2 font-semibold rounded-full cursor-pointer
                transition-all duration-300
                ${active 
                  ? 'bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 text-white shadow-lg scale-110' 
                  : 'bg-[#2b2b40] text-gray-400 hover:bg-[#5a52d1] hover:text-white'}
              `}
              aria-label={`Change language to ${lng === 'tr' ? 'Türkçe' : 'English'}`}
            >
              {lng.toUpperCase()}
              {active && (
                <span className="absolute -bottom-2 left-0 right-0 mx-auto w-10 h-1 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
