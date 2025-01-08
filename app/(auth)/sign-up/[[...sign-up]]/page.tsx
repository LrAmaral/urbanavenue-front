import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <p className="text-gray-700 text-center text-xl">Create your account:</p>
      <SignUp signInUrl="/sign-in" />
    </div>
  );
}
