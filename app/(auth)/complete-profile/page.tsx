"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function CompleteProfilePage() {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    if (!user) {
      router.push("/sign-in");
      return;
    }

    const storedDateOfBirth = localStorage.getItem(`${user.id}_dateOfBirth`);
    const storedPhoneNumber = localStorage.getItem(`${user.id}_phoneNumber`);
    const storedCpf = localStorage.getItem(`${user.id}_cpf`);

    if (storedDateOfBirth) setDateOfBirth(storedDateOfBirth);
    if (storedPhoneNumber) setPhoneNumber(storedPhoneNumber);
    if (storedCpf) setCpf(storedCpf);

    setLoading(false);
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

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setPhoneNumber(value);
    localStorage.setItem(`${user?.id}_phoneNumber`, value);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setCpf(value);
    localStorage.setItem(`${user?.id}_cpf`, value);
  };

  const validateCpf = (cpf: string): boolean => {
    return cpf.length === 11;
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

    if (!phoneNumber) {
      setError("Phone number is required.");
      return;
    }

    if (!validateCpf(cpf)) {
      setError("Invalid CPF.");
      return;
    }

    setError("");
    router.push("/user");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
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
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
              maxLength={11}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              placeholder="Ex: +55 11 99999-9999"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium">
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={handleCpfChange}
              required
              maxLength={11}
              className="mt-1 block w-full px-3 py-2 border border-black rounded-md"
              placeholder="Ex: 12345678901"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
