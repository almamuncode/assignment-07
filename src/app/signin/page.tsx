import AuthForm from "@/components/auth-form";
export const metadata = { title: "সাইন ইন" };
export default async function SignIn({ searchParams }: { searchParams: Promise<{ notice?: string; next?: string; error?: string }> }) {
  const { notice, next, error } = await searchParams;
  return <AuthForm mode="signin" notice={notice} next={next} oauthError={error} />;
}
