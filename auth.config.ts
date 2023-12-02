import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(isLoggedIn)
      const isOnDashboard = nextUrl.pathname.startsWith('/chat');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/chat/Hi', nextUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;