'use client'

import React, { useState } from "react";
import Link from "next/link";
import { verifyUser } from '@/components/data';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/components/data';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className="p-8"> 
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Log in to Telegrammer</h2> 
      <form action={dispatch} className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 p-3 border border-black rounded-md w-full bg-gray-100 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password 
            <Link className="float-right text-green-600 hover:text-green-700 text-decoration-line: underline" href="/change">Forgot password</Link>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 p-3 border border-black rounded-md w-full bg-gray-100 text-gray-700"
          />
        </div>
        <div className="flex flex-col justify-center mb-4">
            <LoginButton/>
        </div> 
        {errorMessage && (   
          <p className="text-red-500 text-center">{errorMessage}</p>  
        )}
      </form>
      <p className="text-gray-700 text-center">No account? <Link className="text-green-600 hover:text-green-700 text-decoration-line: underline" href="/signup">Create one</Link></p>
    </div>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();
 
  return (
    <button className="bg-green-500 text-white justify-center p-3 rounded-md hover:bg-green-600" aria-disabled={pending}>
      Login 
    </button>
  );
}