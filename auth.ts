import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
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
          console.log("Attempting login...");
          const schema = z.object({
            username: z.string(),
            password: z.string(),
          });

          const parsed = schema.safeParse(credentials);

          if (!parsed.success) {
            console.log("Validation failed");
            return null;
          }

          const { username, password } = parsed.data;

          const admin = await prisma.admin.findUnique({
            where: { username },
          });

          if (!admin) {
            console.log("User not found in DB");
            // For security, you might want to return null regardless,
            // but checking if any admin exists at all is useful for init.
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, admin.password);

          if (!passwordsMatch) {
            console.log("Password wrong");
            return null;
          }

          console.log("Login success");
          return {
            id: admin.id,
            name: admin.username,
          };
        } catch (error) {
          console.error("Auth Error:", error);
          return null;
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
