import authOptions from "@/app/auth/authOptions";
import NextAuth, { NextAuthOptions } from "next-auth";

const handler: NextAuthOptions = NextAuth(authOptions);

export { handler as GET, handler as POST };
