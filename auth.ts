import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const schema = z.object({
            username: z.string(),
            password: z.string(),
          });

          const parsed = schema.safeParse(credentials);

          if (!parsed.success) {
            console.log("Invalid credentials structure:", parsed.error);
            return null;
          }

          const { username, password } = parsed.data;

          const admin = await prisma.admin.findUnique({
            where: { username },
          });

          if (!admin) {
            console.log("Admin not found:", username);
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, admin.password);

          if (!passwordsMatch) {
            console.log("Password mismatch for:", username);
            return null;
          }

          return {
            id: admin.id,
            name: admin.username,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],
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
