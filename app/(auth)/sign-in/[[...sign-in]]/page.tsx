import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <SignIn
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL}
    />
  );
}
