"use client";

import { SignUp } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center space-y-6">
      <SignUp
        signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL}
        afterSignUpUrl="/complete-profile"
      />
    </div>
  );
}
