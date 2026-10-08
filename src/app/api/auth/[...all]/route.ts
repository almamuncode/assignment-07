import { toNextJsHandler } from "better-auth/next-js";
import { getAuth, isAuthConfigured } from "@/lib/auth";
export const runtime = "nodejs";
async function handle(request: Request) {
  if (!isAuthConfigured()) {
    if (request.method === "GET" && new URL(request.url).pathname.endsWith("/get-session")) return Response.json(null);
    return Response.json({ message: "অ্যাকাউন্ট সেবা এখন চালু নেই। পরে আবার চেষ্টা করুন।", code: "AUTH_NOT_CONFIGURED" }, { status: 503 });
  }
  const handlers = toNextJsHandler(getAuth());
  return request.method === "GET" ? handlers.GET(request) : handlers.POST(request);
}
export const GET = handle;
export const POST = handle;
