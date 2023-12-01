'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { addUser } from '@/components/data';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    addUser(username, password)
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-white">
    <div className="p-8"> 
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Create a Telegrammer Account</h2> 
      <form className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Set Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 p-3 border border-black rounded-md w-full bg-gray-100 text-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Set Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-3 border border-black rounded-md w-full bg-gray-100 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center mb-4">
            <button
            type="button"
            className="bg-green-500 text-white justify-center p-3 rounded-md hover:bg-green-600"
            onClick={handleLogin}
            >
            Sign Up
            </button>
        </div>
      </form>
      <div className="text-center">
        <Link className="text-green-600 hover:text-green-700 text-decoration-line: underline" href='/'>Go Back to Main Page</Link>
      </div>
    </div>
    </main>
  );
};
