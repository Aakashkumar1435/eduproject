import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../../server/models/User.js";
import connectDB from "../../../../server/db.js";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB(); // Connect to DB
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error in authorize:", error);
          return null;
        }
      }
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await connectDB(); // Connect to DB

          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              password: null,
              phone: null,
            });
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/User-Sign-In",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
