'use client';

import { useState } from 'react';
import { IntlProvider, useTranslations } from 'next-intl';

import trMessages from '../../locales/tr/common.json';
import enMessages from '../../locales/en/common.json';

import Navbar from '../../components/navbar';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { caveat } from "../fonts/fonts";

function PricingContent({ messages }: { messages: any }) {
  const t = useTranslations('pricing');

  const featuresStarter = messages.pricing.starter.features;
  const featuresPro = messages.pricing.pro.features;

  return (
    <div className="relative min-h-screen bg-[#0f0f1b] flex flex-col items-center justify-start pt-32 px-6 font-sans">
      <div className={`relative inline-block text-center mb-16 ${caveat.className}`}>
        <h1 className="text-[90px] font-black text-[#8C82FC] leading-none tracking-wider">
          {t('title')}
        </h1>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 150 160"
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px] -translate-x-1/2 -translate-y-1/2 animate-draw-dollar pointer-events-none"
          fill="none"
          stroke="#FF4C39"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M130 40 C70 30, 50 90, 130 90 C170 90, 130 145, 80 140" />
          <line x1="95" y1="30" x2="95" y2="150" />
          <line x1="115" y1="30" x2="115" y2="150" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl font-sans">
        <div className="bg-[#1a1a2e] rounded-2xl p-8 shadow-xl text-white border border-[#8C82FC] hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-[#8C82FC] mb-4">{t('starter.title')}</h2>
          <p className="text-lg font-semibold mb-4">{t('starter.price')}</p>
          <ul className="space-y-2 text-sm text-gray-300 list-inside">
            {featuresStarter.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="bg-[#1a1a2e] rounded-2xl p-8 shadow-xl text-white border border-[#FF4C39] hover:scale-105 transition-transform duration-300">
          <h2 className="text-3xl font-bold text-[#FF4C39] mb-4">{t('pro.title')}</h2>
          <p className="text-lg font-semibold mb-4">{t('pro.price')}</p>
          <ul className="space-y-2 text-sm text-gray-300 list-inside">
            {featuresPro.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="mt-12 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition"
        onClick={() => alert(t('button'))}
      >
        {t('button')}
      </button>

      <p className="mt-8 text-gray-400 text-center text-sm max-w-xl">
        {t('contact')}{' '}
        <span className="underline cursor-pointer hover:text-[#8C82FC]">{t('contactLink')}</span>
      </p>

      <style jsx>{`
        .animate-draw-dollar path,
        .animate-draw-dollar line {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: draw 3.5s ease forwards;
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function PricingPage() {
  const [locale, setLocale] = useState<'tr' | 'en'>('tr');
  const messages = locale === 'tr' ? trMessages : enMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
      <Navbar />
      <PricingContent messages={messages} />
    </IntlProvider>
  );
}
