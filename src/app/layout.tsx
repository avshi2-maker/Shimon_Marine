import type { Metadata } from 'next';
import { Heebo, Saira_Condensed, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '600', '800'],
  variable: '--font-heebo',
  display: 'swap',
});

const saira = Saira_Condensed({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-saira',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'מתכנן ערכת הרמה ימית · Marine Lifting Set Designer',
  description: 'GL Noble Denton 0027/ND · SpanSet + Crosby parametric designer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${heebo.variable} ${saira.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
