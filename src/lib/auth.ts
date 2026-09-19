import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@dawx666.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const fallbackEmail = process.env.ADMIN_EMAIL || "admin@dawx666.com";
        const fallbackPassword = process.env.ADMIN_PASSWORD || "admin123456";

        // Check fallback direct admin credentials
        if (
          credentials.email.toLowerCase() === fallbackEmail.toLowerCase() &&
          credentials.password === fallbackPassword
        ) {
          return {
            id: "admin-dawx666",
            name: "Dawx666 Admin",
            email: fallbackEmail,
            role: "ADMIN",
          };
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });

          if (user && user.role === "ADMIN") {
            const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
            if (isValid) {
              return {
                id: user.id,
                name: user.name ?? "Admin",
                email: user.email,
                role: user.role,
              };
            }
          }
        } catch (error) {
          console.warn("Auth DB check failed, using fallback:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "dawx666-secret-art-studio-jwt-key-2025",
};
