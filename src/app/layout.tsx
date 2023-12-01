import type { Metadata } from 'next'
import { roboto } from '@/components/fonts'
import './globals.css'

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
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  )
}
