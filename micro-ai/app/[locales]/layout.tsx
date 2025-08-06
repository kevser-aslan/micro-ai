import '../globals.css';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import Navbar from '@/components/navbar';
import { notFound } from 'next/navigation';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  let messages;

  try {
    messages = (await import(`../../locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Dil dosyası yüklenemedi: ${locale}`, error);
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="flex-grow">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
