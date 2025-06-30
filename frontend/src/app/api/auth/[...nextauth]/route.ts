import { Backend_Url } from "@/app/lib/Constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        const res = await fetch(`${Backend_Url}/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) return null;

        const user = await res.json();
        return {
          id: user.user.id,
          name: user.user.name,
          email: user.user.email,
          accessToken: user.backendTokens.accessToken,
          refreshToken: user.backendTokens.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
      }
      return token;
    },
    async session({ session, token }) {
     
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
