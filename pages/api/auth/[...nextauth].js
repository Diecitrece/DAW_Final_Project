import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default (req, res) =>
  NextAuth(req, res, {
    session: {
      jwt: true,
    },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    adapter: MongoDBAdapter(clientPromise),
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        if (!user?.role) {
          user.role = "Client";
          user.banned = false;
        }
        return true;
      },
      async jwt(token, user, account, profile, isNewUser) {
        if (account?.accessToken) {
          token.accessToken = account.accessToken;
        }
        if (user?.role) {
          token.role = user.role;
        }
        if (user?.banned) {
          token.banned = user.banned;
        }
        return token;
      },
      async session(session, token) {
        if (token?.accessToken) {
          session.accessToken = token.accessToken;
        }
        if (token?.role) {
          session.user.role = token.role;
        }
        if (token?.banned) {
          token.banned = user.banned;
        }
        return session;
      },
    },
  });
