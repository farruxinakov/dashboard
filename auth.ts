import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { signInSchema } from "@/schemas/sign-in-schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        try {
          const { name, password } = await signInSchema.parseAsync(credentials);

          if (
            name === process.env.AUTH_NAME &&
            password === process.env.AUTH_PASSWORD
          ) {
            return { id: "f47ac10b-58cc-4372-a567-0e02b2c3d479", name: name };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = token.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.AUTH_SECRET,
});
