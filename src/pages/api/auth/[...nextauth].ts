import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import prisma from "../../../../lib/prisma"
import type { NextAuthOptions, Session } from "next-auth"
import { AdapterUser } from "next-auth/adapters"

export interface SessionWithCallbacks extends Session {
  userId?: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: (process.env.NODE_ENV === 'production' ? 
        process.env.GITHUB_ID : process.env.GITHUB_ID_DEV) as string,
      clientSecret: (process.env.NODE_ENV === 'production' ? 
        process.env.GITHUB_SECRET : process.env.GITHUB_SECRET_DEV) as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    })
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({session, user} : {session: SessionWithCallbacks, user: AdapterUser}) {
      session.userId = user.id
      return session
    }
  },
  theme: {
    colorScheme: 'dark',
  }
}

export default NextAuth(authOptions);