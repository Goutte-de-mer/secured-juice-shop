import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import { signInSchema } from "../lib/zod";
import { CredentialsSignin } from "next-auth";
import { ZodError } from "zod";

class InvalidLoginError extends CredentialsSignin {
  code = "invalid_credentials";
  message = "Email ou mot de passe non valide";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            throw new InvalidLoginError();
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new InvalidLoginError();
          }
          return {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.lastName = user.lastName;
        token.email = user.email;
        token.role = user.role;
      }

      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name;
        token.lastName = session.user.lastName ?? token.lastName;
        token.email = session.user.email ?? token.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.role = token.role;
      return session;
    },
  },
});
