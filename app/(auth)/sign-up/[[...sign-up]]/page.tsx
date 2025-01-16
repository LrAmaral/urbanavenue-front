import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-gray-700 text-center text-xl">Create your account:</p>
      <SignUp
        signInUrl="/auth/sign-in"
        redirectUrl="/complete-profile"
      />
    </div>
  );
}
