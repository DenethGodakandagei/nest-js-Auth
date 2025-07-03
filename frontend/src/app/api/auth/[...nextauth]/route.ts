import { Backend_Url } from "@/app/lib/Constants";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";

// Define Zod schema for validation
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate credentials using Zod
          const validated = loginSchema.parse({
            username: credentials?.username,
            password: credentials?.password,
          });

          // Proceed with login API call if valid
          const res = await fetch(`${Backend_Url}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              username: validated.username,
              password: validated.password,
            }),
            headers: { "Content-Type": "application/json" },
          });

          if (!res.ok) {
            // Could also parse error response here for more info
            return null;
          }

          const user = await res.json();

          return {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
            accessToken: user.backendTokens.accessToken,
            refreshToken: user.backendTokens.refreshToken,
          };
        } catch (error) {
          // Validation failed or some other error
          console.error("Validation error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin", 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
