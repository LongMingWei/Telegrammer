'use client'

import Image from 'next/image';
import { roboto } from '@/app/layout';
import LoginForm from '@/components/login';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-white">
      <div className="relative flex mb-2">
        <Image
          className="relative drop-shadow-[0_0_0.3rem_#ffffff70] rounded-full w-40 h-40 mr-6"
          src="/download.jfif"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-green-600 mb-2">Telegrammer</h1>
        </div>
      </div>
      <LoginForm />
    </main>
  )
}
