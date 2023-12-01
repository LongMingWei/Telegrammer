import React, { useState } from "react";
import Link from "next/link";
import { verifyUser } from '@/components/data';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = async() => {
    const user = await verifyUser(username, password);

    if (user) {
      router.push('./chat');
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="p-8"> 
      <h2 className="text-3xl font-bold mb-6 text-green-600 text-center">Log in to Telegrammer</h2> 
      <form className="max-w-md mx-auto">
        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
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
            Password
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
            Login
            </button>
        </div> 
      </form>
      {loginError && (
        <p className="text-red-500 text-center">
          Incorrect username or password
        </p>
      )}
      <p className="text-gray-700 text-center">No account? <Link className="text-green-600 hover:text-green-700 text-decoration-line: underline" href="/signup">Create one</Link></p>
    </div>
  );
};

