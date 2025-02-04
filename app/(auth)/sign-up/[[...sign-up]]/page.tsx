"use client";

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/user");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col h-screen justify-center items-center space-y-6">
      <SignUp
        signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
        afterSignUpUrl={
          process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "/complete-profile"
        }
      />
    </div>
  );
}
