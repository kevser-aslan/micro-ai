'use client';

import { useState } from 'react';
import { IntlProvider } from 'next-intl';

import trMessages from '../locales/tr/common.json';
import enMessages from '../locales/en/common.json';

import Navbar from '@/components/navbar';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Hero from "@/components/hero";
import ScrollVideo from "@/components/scrollVideos";

import DemoChat from "@/components/demoChat";
import VideoCarousel from "@/components/kullanimAlan";
import Footer from "@/components/footer";

export default function HomePage() {
  const [locale, setLocale] = useState<'tr' | 'en'>('tr');
  const messages = locale === 'tr' ? trMessages : enMessages;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <LanguageSwitcher locale={locale} onLocaleChange={setLocale} />
      <Navbar />
      <main>
        <Hero />
        <ScrollVideo />
     
        <DemoChat />
        <VideoCarousel />
        <Footer />
      </main>
    </IntlProvider>
  );
}
