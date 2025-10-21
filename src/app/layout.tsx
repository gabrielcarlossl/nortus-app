import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nortus - Plataforma de Inteligência para Vendas',
  description: 'Sistema de inteligência artificial para times de vendas e atendimento',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <ReduxProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </ReduxProvider>
      </body>
    </html>
  );
}
