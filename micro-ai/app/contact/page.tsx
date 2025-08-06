'use client';

import { useState } from 'react';
import { IntlProvider, useTranslations } from 'next-intl';

import trMessages from '../../locales/tr/common.json';
import enMessages from '../../locales/en/common.json';

import Navbar from '../../components/navbar';
import LanguageSwitcher from '../../components/LanguageSwitcher';

import { caveat } from '../fonts/fonts';

export default function ContactPage() {
  const [locale, setLocale] = useState<'tr' | 'en'>('tr');
  const messages = locale === 'tr' ? trMessages : enMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <ContactContent locale={locale} setLocale={setLocale} />
    </IntlProvider>
  );
}

function ContactContent({
  locale,
  setLocale,
}: {
  locale: 'tr' | 'en';
  setLocale: React.Dispatch<React.SetStateAction<'tr' | 'en'>>;
}) {
  const t = useTranslations('contact');

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Arka plan video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        {t('videoNotSupported')}
      </video>

      {/* Video üzerine koyu yarı saydam katman */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#0f0f1b]/70"></div>

      {/* Navbar ve Dil Seçici üstte sabit */}
      <header className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 py-4">
        <Navbar />
        <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
      </header>

      {/* İçerik */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-6 text-white pt-20 gap-32 max-w-7xl mx-auto">
        {/* Sol taraf - Başlık ve kısa metin */}
        <section className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <h1
            className={`${caveat.className} font-bold`}
            style={{ fontSize: '90px', color: '#FFFFFF' }}
          >
            {t('title')}
          </h1>
          <p className="max-w-md text-lg text-[#CCCCCC]">{t('description')}</p>
        </section>

        {/* Sağ taraf - İletişim Bilgileri Kutusu */}
        <section className="flex-1 bg-[#1a1a2e]/80 backdrop-blur-md rounded-2xl p-5 shadow-lg max-w-md w-full ml-auto mr-1 space-y-6">
          {/* E-posta */}
          <div className="flex items-center gap-4">
            <EmailIcon />
            <a
              href="mailto:destek@microai.com"
              className="text-lg text-white hover:text-[#8C82FC] transition-colors duration-300"
            >
              destek@microai.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-4">
            <WhatsappIcon />
            <a
              href="https://wa.me/905XXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-white hover:text-[#8C82FC] transition-colors duration-300"
            >
              +90 5XX XXX XX XX
            </a>
          </div>

          {/* Telefon */}
          <div className="flex items-center gap-4">
            <PhoneIcon />
            <span className="text-lg text-white">+90 XXX XXX XX XX</span>
          </div>

          {/* Konum */}
          <div className="flex items-center gap-4">
            <LocationIcon />
            <span className="text-lg text-white">{t('location')}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

// SVG ikonlar bileşenleri
function EmailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-[#8C82FC]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 12H8m8-4H8m12 8v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2z"
      />
    </svg>
  );
}
function WhatsappIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-[#8C82FC]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h1.28a2 2 0 011.837 1.175L8.82 6.18a2 2 0 01-.43 2.044L7.2 8.97a11.042 11.042 0 005.105 5.105l.745-1.192a2 2 0 012.043-.43l1.005.297A2 2 0 0119 15.72V17a2 2 0 01-2 2H6a3 3 0 01-3-3V5z"
      />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-[#8C82FC]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10a1 1 0 011-1h2a1 1 0 011 1v3a3 3 0 003 3h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a5 5 0 01-5-5v-3z"
      />
    </svg>
  );
}
function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-[#8C82FC]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z"
      />
    </svg>
  );
}
