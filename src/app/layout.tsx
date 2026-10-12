import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Le Bordeaux | Fine Dining & Artisanal Menu',
  description: 'Explore our masterfully crafted seasonal culinary creations, wood-fired artisan pizzas, prime steaks, and signature mocktails at Le Bordeaux.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Le Bordeaux | Fine Dining & Artisanal Menu',
    description: 'Explore our masterfully crafted seasonal culinary creations, wood-fired artisan pizzas, prime steaks, and signature mocktails at Le Bordeaux.',
    url: '/',
    siteName: 'Le Bordeaux Restaurant',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Le Bordeaux | Fine Dining & Artisanal Menu',
    description: 'Explore our masterfully crafted seasonal culinary creations, wood-fired artisan pizzas, prime steaks, and signature mocktails at Le Bordeaux.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#7A1F2B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
