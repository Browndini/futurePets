import type { Metadata } from 'next';
import StoreProvider from '@/lib/redux/StoreProvider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'FuturePets - Virtual Pet Game',
  description: 'A virtual pet game with mini-games built with Babylon.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
