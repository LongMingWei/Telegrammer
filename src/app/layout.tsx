import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'

export const inter = Inter({ subsets: ['latin'] });
 
export const roboto = Roboto({
  weight: ['300', '400'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Telegrammer',
  description: 'Messaging app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
