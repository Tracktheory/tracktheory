import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'TrackTheory | Built for Speed',
  description: 'High-performance parts, AI build advisor, and the ultimate shopping experience for street and track builds.',
  openGraph: {
    title: 'TrackTheory | Built for Speed',
    description: 'High-performance parts, AI build advisor, and the ultimate shopping experience for street and track builds.',
    url: 'https://tracktheory.com.au',
    siteName: 'TrackTheory',
    images: [
      {
        url: 'https://tracktheory.com.au/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'TrackTheory performance cars',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrackTheory | Built for Speed',
    description: 'High-performance parts, AI build advisor, and the ultimate shopping experience for street and track builds.',
    images: ['https://tracktheory.com.au/og-image.png'], 
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
