'use client';

import { useState } from 'react';
import { IntlProvider, useTranslations } from 'next-intl';

import trMessages from '../../locales/tr/common.json';
import enMessages from '../../locales/en/common.json';

import Navbar from '../../components/navbar';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import AnimatedLanguageSelector from '../../components/AnimatedLanguageSelector';

function ProductContent({ locale, setLocale }: { locale: string; setLocale: React.Dispatch<React.SetStateAction<string>> }) {
  const t = useTranslations('product');

  
  let features: string[] = [];
  try {
    const f = t('features');
    if (Array.isArray(f)) features = f;
  } catch {
    features = [];
  }

  return (
    <div className="relative min-h-screen bg-[#0f0f1b] flex flex-col items-center justify-start pt-32 px-6 font-sans">

      {/* Başlık */}
      <div className="relative text-center mb-16">
        <h1 className="text-[90px] font-black text-[#8C82FC] leading-none tracking-wider animate-zoom-in">
          {t('title')}
        </h1>
        
       
      </div>

      {/* Açıklama */}
      <div className="text-white text-xl max-w-xl text-center mb-12 animate-fade-in">
        <p>{t('description')}</p>
      </div>

      {/* Özellikler (features varsa) */}
      {features.length > 0 && (
        <ul className="text-white text-lg max-w-xl space-y-3 mb-16 animate-fade-in">
          {features.map((feature: string, idx: number) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="text-[#8C82FC] text-2xl">✔️</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Dosya Yükleme + Video Alanı */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-start justify-between gap-12 animate-fade-in">
        {/* Sol: Dosya Yükleme */}
        <div className="flex-1">
          <h2 className="text-white text-2xl font-bold mb-6">
            📄 {t('uploadTitle')}
          </h2>

          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full h-48 px-4 bg-[#1f1f2e] border-2 border-dashed border-[#8C82FC] rounded-2xl ring-2 ring-[#8C82FC] shadow-glow animate-pulse-box cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-[#8C82FC] animate-bounce-slow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0l-4 4m4-4l4 4M3 16h14" />
              </svg>
              <p className="mb-2 text-sm text-gray-300">
                <span className="font-semibold">{t('uploadClick')}</span> {t('uploadOrDrop')}
              </p>
              <p className="text-xs text-gray-500">{t('uploadAccepted')}</p>
            </div>
            <input id="file-upload" type="file" className="hidden" />
          </label>

          {/* Çok dilli destek */}
          <div className="mt-12">
            <h2 className="text-white text-2xl font-bold mb-6">
              🌍 {t('multiLangTitle')}
            </h2>
            <AnimatedLanguageSelector locale={locale} onLocaleChange={setLocale} />
          </div>

          {/* Ekstra Başlık */}
          <div className="mt-12">
            <h2 className="text-white text-2xl font-bold mb-6">
              ✅ {t('extraTitle')}
            </h2>
          </div>
        </div>

        {/* Sağ: Video */}
        <div className="flex-1">
          <video
            src="/deneme.mp4"
            controls
            className="w-full h-auto rounded-2xl shadow-lg border border-[#8C82FC]"
          >
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </div>
      </div>

      {/* Animasyonlar */}
      <style jsx>{`
        .animate-pulse-box {
          animation: pulseBox 2s infinite;
        }
        @keyframes pulseBox {
          0% {
            box-shadow: 0 0 10px #8C82FC66, 0 0 20px #8C82FC33;
          }
          50% {
            box-shadow: 0 0 20px #8C82FCcc, 0 0 40px #8C82FC88;
          }
          100% {
            box-shadow: 0 0 10px #8C82FC66, 0 0 20px #8C82FC33;
          }
        }
        .animate-bounce-slow {
          animation: bounceSlow 2.5s infinite;
        }
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-zoom-in {
          animation: zoomIn 1.2s ease-out forwards;
          opacity: 0;
          transform: scale(0.7);
        }
        @keyframes zoomIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1.5s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function ProductPage() {
  const [locale, setLocale] = useState<'tr' | 'en'>('tr');
  const messages = locale === 'tr' ? trMessages : enMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
      <Navbar />
      <ProductContent locale={locale} setLocale={setLocale} />
    </IntlProvider>
  );
}
