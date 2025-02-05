"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      const redirectUrl =
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/user";

      router.push(redirectUrl);
    }
  }, [isSignedIn, router]);

  return (
    <SignIn
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL}
      afterSignInUrl={
        process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/user"
      }
    />
  );
}
