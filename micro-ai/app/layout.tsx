import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
