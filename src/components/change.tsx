'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { changePassword } from '@/components/data';
import { useRouter } from 'next/navigation';

export default function Change(props: { name: string; }) {
  const router = useRouter();

  const [old, setOld] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(0);

  const handleLogin = async() => {
    try {
      const result = await changePassword(props.name, old, password);

      if (result && old != "" && password != "") {
        setLoginError(1);
      } 
      else if (old === "" || password === "") {
        setLoginError(3);
      }
      else {
        setLoginError(2);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      setLoginError(4);
    }
  };

  return (
      <div className="flex flex-col items-center justify-between bg-white">
        <div className="pb-10">
          <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Change Password</h2>
          <form className="max-w-md mx-auto">
            <div className="mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                id="old"
                required
                className="mt-1 p-3 border border-black rounded-md w-full bg-gray-100 text-gray-700"
                value={old}
                onChange={(e) => setOld(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                required
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
                Change Password
              </button>
            </div>
          </form>
          {loginError === 1 && <p className="text-green-500 text-center">Password changed</p>}
          {loginError === 2 && <p className="text-red-500 text-center">Old password is incorrect</p>}
          {loginError === 3 && <p className="text-red-500 text-center">Password field not filled</p>}
          {loginError === 4 && <p className="text-red-500 text-center">Something went wrong</p>}
        </div>
      </div>
    )
};

