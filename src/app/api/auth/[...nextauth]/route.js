import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          await connectToDatabase();

          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found");
          }

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!passwordMatch) {
            throw new Error("Incorrect password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.picture = user.image;
    }
    return token;
  },

  async session({ session, token }) {
    if (token) {
      session.user = {
        ...session.user,
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.picture,
      };
    }
    return session;
  },
}
});

export { handler as GET, handler as POST };