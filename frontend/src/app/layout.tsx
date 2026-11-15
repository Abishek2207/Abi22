import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Amazon Nova | Ultra-Modern AI-Powered E-Commerce',
  description: 'Next-generation intelligent shopping experience with AI copilot, neural product comparisons, and instant Prime delivery.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
