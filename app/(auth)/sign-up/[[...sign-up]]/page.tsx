import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-gray-600 text-center text-xl">Create your account:</p>
      <SignUp />
    </div>
  );
}
