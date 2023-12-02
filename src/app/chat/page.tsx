'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Chat() {
  const router = useRouter();
  const username = "Egoist";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-white">
      <div className="relative flex mb-2">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-green-600 mb-2">Hello, {username}</h1>
        </div>
      </div>
    </main>
  )
}
