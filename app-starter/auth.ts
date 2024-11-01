// auth.ts
import client from "@/lib/db/mongoClient"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth from "next-auth"
import { Provider } from "next-auth/providers"
import Discord from "next-auth/providers/discord"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"

export const providers: Provider[] = [Google({
  profile(profile) {
    return { role: profile.role ?? "user", ...profile };
  },
  allowDangerousEmailAccountLinking: true
}), GitHub({
  profile(profile) {
    return { role: profile.role ?? "user", ...profile };
  }
}), Discord({
  profile(profile) {
    return { role: profile.role ?? "user", ...profile };
  }
}),]

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client), providers: providers,
  pages: {
    signIn: "/auth/signin/",
  },
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
  },
}})

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")