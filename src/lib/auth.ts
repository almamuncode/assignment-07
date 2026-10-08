import "server-only";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getMongoClient } from "./mongodb";

export function isAuthConfigured() {
  return Boolean(process.env.MONGODB_URI && process.env.BETTER_AUTH_URL && process.env.BETTER_AUTH_SECRET);
}

function createAuth() {
  if (!isAuthConfigured()) throw new Error("Configure MONGODB_URI, BETTER_AUTH_URL, and BETTER_AUTH_SECRET to enable authentication.");
  const client = getMongoClient();
  return betterAuth({
    appName: "BazarDor",
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: mongodbAdapter(client.db(process.env.MONGODB_DB || "bazardor"), {
      client,
      transaction: process.env.MONGODB_TRANSACTIONS !== "false",
    }),
    emailAndPassword: { enabled: true, requireEmailVerification: false, autoSignIn: false, minPasswordLength: 8, maxPasswordLength: 128 },
    socialProviders: {
      ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
        google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET },
      } : {}),
      ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
        github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET },
      } : {}),
    },
  });
}

let instance: ReturnType<typeof createAuth> | undefined;
export function getAuth() { return instance ??= createAuth(); }
