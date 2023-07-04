import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github"
import prisma from "../../../../lib/prisma"
import type { NextAuthOptions, Session } from "next-auth"
import { AdapterUser } from "next-auth/adapters"

export interface SessionWithCallbacks extends Session {
  userId?: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    async session({
      session, 
      user
    }: {
      session: SessionWithCallbacks, 
      user: AdapterUser
    }) {
      session.userId = user.id
      return session
    }
  }
}

export default NextAuth(authOptions);