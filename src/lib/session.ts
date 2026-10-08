import "server-only";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth, isAuthConfigured } from "./auth";
export async function requireSession(returnTo: string) {
  const requestHeaders = await headers();
  const session = isAuthConfigured() && requestHeaders.get("cookie")
    ? await getAuth().api.getSession({ headers: requestHeaders })
    : null;
  if (!session) redirect(`/signin?notice=protected&next=${encodeURIComponent(returnTo)}`);
  return session;
}
