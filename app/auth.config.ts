import type { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { Provider } from 'prisma/prisma-client';
import { createUser } from './lib/auth/auth-actions';
import { CredentialsAuthSchema } from './lib/auth/zod-schema';
import prismaClient from './lib/prisma';

export const authConfig = {
  pages: {
    signIn: '/sign-in'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      // if (pathname.startsWith('/_next') || pathname === '/favicon.ico') {
      //   return true;
      // }

      const pathname = nextUrl.pathname;

      const isStaticFile =
        pathname.startsWith('/_next') ||
        pathname === '/favicon.ico' ||
        pathname.startsWith('/public-access');

      const isPublicRoute = /(^\/$|^\/onboarding$)/.test(pathname);
      const isAuthRoute = /(^\/sign-(in|up)$)/.test(pathname);
      const isLoggedIn = !!auth?.user;

      if (isStaticFile) return true;

      if (isPublicRoute) return true;

      if (isLoggedIn) {
        if (isAuthRoute) {
          const callbackUrl = nextUrl.searchParams.get('callbackUrl');
          return Response.redirect(new URL(callbackUrl ?? '/', nextUrl));
        }

        return true;
      }

      return isAuthRoute;
    },
    async session({ session, token, user }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user, trigger, session, account }) {
      // It will be executed only on signing in
      if (account && user) {
        console.log('Fetching user from DB...', { account, user });

        const dbUser = await prismaClient.user.findUnique({
          where: { email: user.email! },
          include: { settings: { include: { default_product: true } } }
        });

        if (dbUser) {
          const { id, username, email, settings } = dbUser;

          const tokenUser: User = {
            id,
            username,
            email,
            defaultProduct: settings?.default_product?.name
          }; 

          token = {
            user: tokenUser
          };
        }
      }

      if (trigger === 'update' && session) {
        console.log('update', { token, session });

        token = { ...token, user: session };
        return token;
      }

      return token;
    },
    async signIn({ user, account, profile }) {
      const existingUser = await prismaClient.user.findUnique({
        where: {
          email: user.email!
        }
      });

      if (!existingUser) {
        await createUser({
          email: user.email!,
          username: user.name!,
          provider: account?.provider as Provider
        });
      }

      return true;
    }
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = CredentialsAuthSchema.safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await prismaClient.user.findUnique({
            where: {
              email
            }
          });

          if (!user) {
            return null;
          }

          // use passwords match
          const { id, username } = user;
          return { id, email, username };
        }

        console.log('Invalid credentials');
        return null;
      }
    })
  ]
} satisfies NextAuthConfig;
