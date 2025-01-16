import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-gray-700 text-center text-xl">Access your account:</p>
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}
