"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Wrapper } from "@/components/Custom/wrapper";

export default function PaymentPage() {
  const router = useRouter();

  const handleConfirmPayment = () => {
    alert("Pagamento confirmado!");
    router.push("/");
  };

  return (
    <div className="container mx-auto p-4">
      <Wrapper className="mt-24 md:mt-40">
        <h1 className="text-2xl font-bold mb-4 text-center">Payment</h1>

        <div className="flex flex-col items-center space-y-6">
          <p className="text-lg text-gray-600 text-center">
            Insira os dados de pagamento para concluir seu pedido.
          </p>

          <div className="w-full max-w-md space-y-4">
            <input
              type="text"
              placeholder="Nome no cartão"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Número do cartão"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Data de Expiração (MM/AA)"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="CVV"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            className="w-full max-w-md bg-zinc-900 text-white py-3 font-bold rounded-lg hover:bg-zinc-800 transition-colors ease-in-out"
            onClick={handleConfirmPayment}
          >
            Confirm Payment
          </button>
        </div>
      </Wrapper>
    </div>
  );
}
