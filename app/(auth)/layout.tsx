import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 w-full max-w-lg flex flex-col">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          UrbanAvenue
        </h1>
        <div className="flex flex-col mb-4">{children}</div>
      </div>
    </div>
  );
}
