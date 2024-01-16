/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env";
import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      kakaoID: string;
      name?: string;
      nickname: string;

      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    kakaoID: string;
    name?: string;
    nickname: string;

    // ...other properties
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn({}) {
      return true;
    },
    jwt(params) {
      if (params.trigger === "update" && params.session.nickname) {
        console.log("params:", params);
        params.token.nickname = params.session.nickname;
      }
      if (params.user?.id) {
        params.token.id = params.user.id;
        params.token.kakaoID = params.user.kakaoID;
        params.token.name = params.user.kakaoID;
        if (params.user.nickname) params.token.nickname = params.user.nickname;
        else params.token.nickname = "";
      }

      return params.token;
    },

    session({ session, token }) {
      session.user.id = token.id as string;
      if (token.name) session.user.name = token.name;
      session.user.nickname = token.nickname as string;

      console.log("session:", session);
      // if (token.kakaoID) session.user.kakaoID = token.kakaoID;

      return session;
    },
  },
  adapter: PrismaAdapter(db),

  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email } = credentials as {
          email: string;
        };
        console.log(credentials);
        const user = await db.user.findUnique({
          where: {
            kakaoID: email,
          },
        });

        return user;
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  pages: {
    signIn: "/",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
