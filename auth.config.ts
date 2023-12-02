import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log(auth?.user)
      const isOnChat = nextUrl.pathname.startsWith('/chat');
      if (isOnChat) {
        if (isLoggedIn) return true;
        return false; 
      } else if (isLoggedIn) {
        return Response.redirect(new URL(`/chat/${auth?.user?.name}`, nextUrl));
      }
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;