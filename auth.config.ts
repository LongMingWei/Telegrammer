import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnChat = nextUrl.pathname.startsWith('/chat');

      if (isOnChat) {
        if (isLoggedIn) {
          const currentUsername = auth?.user?.name;
          const requestedUsername = nextUrl.pathname.split('/').pop();

          if (currentUsername === requestedUsername) {
            return true;
          } else {
            return Response.redirect(new URL(`/chat/${currentUsername}`, nextUrl));
          }
        }

        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL(`/chat/${auth?.user?.name}`, nextUrl));
      }

      return true;
    },
  },
  providers: [], 
};
