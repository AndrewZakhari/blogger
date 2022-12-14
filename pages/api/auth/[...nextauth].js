import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from "next-auth/providers/discord"
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client'
import { NextAuthOptions } from "next-auth";


const prisma = new PrismaClient();

export const authOptions = {
     adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            httpOptions: {
                timeout: 4000
            }
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET
        })
    ]
}

export default NextAuth(authOptions)