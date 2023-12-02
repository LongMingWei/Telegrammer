'use client'

import Image from 'next/image';
import { signOut } from '../../../../auth';
import { useRouter } from 'next/navigation';

export default function Chat({ params }: { params: { username: string } }) {
  const router = useRouter();
  const username = params.username;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-white">
      <div className="relative flex mb-2">
        <div className="flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-green-600 mb-2">Hello, {username}</h1>
            <form
          action={async () => {
            await signOut();
          }}
        >
        <div className="flex flex-col justify-center mb-4">
          <button className="bg-green-500 text-white justify-center p-3 rounded-md hover:bg-green-600">
            Sign Out
          </button>
        </div>
        </form> 
        </div>
      </div>
    </main>
  )
}
