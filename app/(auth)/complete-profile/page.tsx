"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function CompleteProfilePage() {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    const storedDateOfBirth = localStorage.getItem(`${user.id}_dateOfBirth`);
    if (storedDateOfBirth) {
      setDateOfBirth(storedDateOfBirth);
    }
  }, [user, router]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDateOfBirth(value);
    setError("");

    const today = new Date();
    const selectedDate = new Date(value);

    if (selectedDate > today) {
      setError("Invalid date.");
    }

    if (user) {
      localStorage.setItem(`${user.id}_dateOfBirth`, value);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    if (birthDate > today) {
      setError("Invalid date.");
      return;
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      setError("You must be at least 18 years old.");
      return;
    }

    if (user) {
      console.log("Usuário ID:", user.id);
      console.log("Data de nascimento:", dateOfBirth);
    }

    router.push("/user");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-1/2 px-4">
      <div className="max-w-md w-full border border-black rounded-md p-6">
        <h1 className="text-xl md:text-2xl font-bold text-center mb-6">
          Complete Your Profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={handleDateChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-black rounded-md font-medium bg-black hover:bg-zinc-800 text-white transition"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
