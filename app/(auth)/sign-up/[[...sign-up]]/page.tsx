import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  console.log(process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL);
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
