'use server'

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from './definitions';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/components/mongo';
 
async function getUser(name: string) {
  try {
    const db = await connectToDatabase();
    const users = db.collection('users');
    const user = await users.findOne({ name }, { projection: { name: 1, password: 1, _id: 0 } });
    if (user) return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
  return undefined;
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ name: z.string(), password: z.string() })
          .safeParse(credentials);
        
        if (!parsedCredentials.success) {
          console.error(parsedCredentials.error.errors);
        }
        if (parsedCredentials.success) {
          const { name, password } = parsedCredentials.data;
          const user = await getUser(name);
          if (!user) return null;
          const passwordsMatch = password.trim() === user.password.trim()
          if (passwordsMatch) return { _id: "", email: "", name: user.name };
        }
 
        console.log('Invalid');
        return null;
      },
    }),
  ],
});