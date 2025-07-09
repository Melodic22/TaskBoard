import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { Header } from '@/components/shared/header';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TaskBoard',
  description: 'A simple task board application',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark force-theme">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <Providers>
          <Header />
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
