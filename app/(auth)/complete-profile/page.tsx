"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getUser, createUser } from "@/app/api/user";
import Image from "next/image";
import logo from "../../../public/favicon.ico";
import { Loader } from "@/components/ui/loader";

export default function CompleteProfilePage() {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user === undefined) {
        return;
      }

      if (!user) {
        router.push("/sign-in");
        return;
      }

      try {
        const userData = await getUser(user.id);

        if (userData) {
          setDateOfBirth(
            userData.dateOfBirth?.toISOString().split("T")[0] || ""
          );
          setPhoneNumber(userData.phoneNumber || "");
          setCpf(userData.cpf || "");
        } else {
          console.log(
            "User not found in backend. Proceeding with empty fields."
          );
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, router]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setPhoneNumber(value);
  };

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    setCpf(value);
  };

  const validateCpf = (cpf: string): boolean => {
    return cpf.length === 11;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    try {
      const userData = {
        name: user?.fullName || "Unknown User",
        email: user?.emailAddresses[0]?.emailAddress || "",
        dateOfBirth: new Date(dateOfBirth),
        phoneNumber,
        cpf,
        role: "CLIENT" as "CLIENT",
        addresses: [],
      };

      const createdUser = await createUser(userData);

      localStorage.setItem("client_id", createdUser?.id || "");

      router.push("/user");
    } catch (err) {
      console.error("Error saving user data:", err);
      setError("Failed to save user data.");
    }
  };

  if (loading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 w-full px-4 py-8">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image src={logo} width={60} height={60} alt="logo" />
          <h1 className="text-2xl font-semibold text-zinc-800">
            Complete Your Profile
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-zinc-600"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={handleDateChange}
              required
              className="mt-1 block w-full px-4 py-3 border border-zinc-300 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-zinc-600"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              required
              maxLength={11}
              className="mt-1 block w-full px-4 py-3 border border-zinc-300 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition duration-200"
              placeholder="Ex: +55 11 99999-9999"
            />
          </div>
          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-zinc-600"
            >
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={handleCpfChange}
              required
              maxLength={11}
              className="mt-1 block w-full px-4 py-3 border border-zinc-300 rounded-md shadow-sm focus:ring-zinc-500 focus:border-zinc-500 transition duration-200"
              placeholder="Ex: 12345678901"
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 px-6 border border-zinc-600 rounded-md font-medium bg-zinc-600 hover:bg-zinc-700 text-white transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-opacity-50"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
