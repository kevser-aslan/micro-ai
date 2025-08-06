'use client';

import { useState } from 'react';
import { IntlProvider, useTranslations } from 'next-intl';

import trMessages from '../../locales/tr/common.json';
import enMessages from '../../locales/en/common.json';

import Navbar from '../../components/navbar';
import LanguageSwitcher from '../../components/LanguageSwitcher';

export default function AboutPage() {
  const [locale, setLocale] = useState<'tr' | 'en'>('tr');
  const messages = locale === 'tr' ? trMessages : enMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <AboutContent locale={locale} setLocale={setLocale} />
    </IntlProvider>
  );
}

function AboutContent({
  locale,
  setLocale,
}: {
  locale: 'tr' | 'en';
  setLocale: React.Dispatch<React.SetStateAction<'tr' | 'en'>>;
}) {
  const t = useTranslations('about');

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#12111e] via-[#1c1a33] to-[#0f0f1b] flex flex-col items-center pt-24 px-6 font-sans text-white select-none">
      {/* Navbar ve dil değiştirici */}
      <header className="w-full max-w-7xl flex justify-between items-center mb-20 px-4 md:px-0 z-10 relative">
        <Navbar />
        <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
      </header>

      {/* Başlık */}
      <h1 className="text-[100px] font-extrabold leading-none tracking-widest animate-zoom-in uppercase drop-shadow-[0_0_10px_rgba(140,130,252,0.8)] z-10 relative">
        {t('title')}
      </h1>

      {/* SVG Dalga */}
      <div className="w-60 h-20 relative mt-6 mb-12 z-10" role="img" aria-label={t('waveAnimationAlt')}>
        <svg
          width="240"
          height="80"
          viewBox="0 0 240 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0 40 Q30 20 60 40 T120 40 T180 40 T240 40"
            stroke="#8C82FC"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" values="480;0" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="stroke-dasharray" values="30,150;480,0;30,150" dur="2.5s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Kutular */}
      <div className="relative w-full max-w-[1400px] h-[300px] mb-16 z-10">
        <div className="absolute top-6 right-[1000px] w-[300px] min-h-[90px] p-5 bg-[#222244] rounded-xl shadow-lg animate-glow hover:shadow-[0_0_30px_#8C82FC,0_0_45px_#8C82FCcc,0_0_60px_#8C82FCff] hover:z-20 cursor-pointer">
          <p className="text-xl font-semibold leading-relaxed">{t('box1')}</p>
        </div>

        <div className="absolute top-28 right-[430px] w-[520px] min-h-[90px] p-6 bg-[#222244] rounded-xl shadow-lg animate-glow hover:shadow-[0_0_30px_#8C82FC,0_0_45px_#8C82FCcc,0_0_60px_#8C82FCff] hover:z-20 cursor-pointer">
          <p className="text-xl font-semibold leading-relaxed">{t('box2')}</p>
        </div>

        <div className="absolute top-5 right-2 w-[400px] min-h-[100px] p-6 bg-[#222244] rounded-xl shadow-lg animate-glow hover:shadow-[0_0_30px_#8C82FC,0_0_45px_#8C82FCcc,0_0_60px_#8C82FCff] hover:z-20 cursor-pointer">
          <p className="text-xl font-semibold leading-relaxed">{t('box3')}</p>
        </div>
      </div>

      {/* CSS Animasyonlar */}
      <style jsx>{`
        .animate-zoom-in {
          animation: zoomIn 1.3s ease-out forwards;
          opacity: 0;
          transform: scale(0.7);
        }

        @keyframes zoomIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-glow {
          animation: glowPulse 3s ease-in-out infinite alternate;
        }

        @keyframes glowPulse {
          0% {
            box-shadow: 0 0 10px #8C82FC, 0 0 25px #8C82FC88, 0 0 50px #8C82FC55;
          }
          100% {
            box-shadow: 0 0 20px #a392fc, 0 0 40px #a392fccc, 0 0 80px #a392fc99;
          }
        }
      `}</style>
    </div>
  );
}
