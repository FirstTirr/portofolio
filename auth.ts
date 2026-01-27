import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          console.log("Authorize start");
          const schema = z.object({
            username: z.string(),
            password: z.string(),
          });

          const parsed = schema.safeParse(credentials);

          if (!parsed.success) {
            console.log("Invalid credentials structure");
            return null;
          }

          const { username, password } = parsed.data;

          const admin = await prisma.admin.findUnique({
            where: { username },
          });

          if (!admin) {
            console.log("Admin not found");
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, admin.password);

          if (!passwordsMatch) {
            console.log("Password mismatch");
            return null;
          }

          console.log("Login successful");
          return {
            id: admin.id,
            name: admin.username,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
      }
      return session;
    },
  },
});
