"use client";

import { useEffect, useState } from "react";
import OrdersHistory from "./components/OrdersHistory";
import { UserButton, useUser } from "@clerk/nextjs";
import AddressForm from "./components/AddressForm";
import { Wrapper } from "@/components/Custom/wrapper";
import createUser from "@/app/api/user";

const UserProfile = () => {
  const [address, setAddress] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const { user } = useUser();

  console.log(address);

  useEffect(() => {
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      try {
        setAddress(JSON.parse(savedAddress));
      } catch (error) {
        console.error("Error parsing address from localStorage:", error);
      }
    }

    const userInfo = {
      id: user?.id || "",
      name: user?.firstName || "N/A",
      email: user?.emailAddresses[0]?.emailAddress || "N/A",
      role: "Cliente",
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [user]);

  const handleAddressChange = () => {
    if (user && address.fullName) {
      const fullAddress = `${address.fullName}, ${address.streetAddress}, ${address.city}, ${address.state} ${address.zipCode}`;

      const userInfo = {
        id: user.id,
        name: user.firstName || "N/A",
        email: user.emailAddresses[0]?.emailAddress || "N/A",
        role: "CLIENT",
        address: fullAddress,
      };

      createUser(userInfo)
        .then((savedUser) => {
          console.log("Usuário salvo:", savedUser);
        })
        .catch((error) => {
          console.error("Erro ao salvar usuário:", error);
        });
    }
  };

  useEffect(() => {
    handleAddressChange();
  }, [address]);

  return (
    <div className="w-full h-auto md:h-screen mt-24 flex flex-col items-center justify-start">
      <Wrapper>
        <div className="w-full max-w-[76.875rem] mx-auto xs:px-6 px-8 flex flex-col space-y-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My account</h2>
              <UserButton afterSignOutUrl="/" />
            </div>
            <div className="mt-4">
              <p>
                <strong>Name:</strong> {user?.firstName || "N/A"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {user?.emailAddresses[0]?.emailAddress || "N/A"}
              </p>
              {address.fullName && (
                <p>
                  <strong>Address Info:</strong>
                  <br />
                  {address.fullName}
                  <br />
                  {address.streetAddress}
                  <br />
                  {address.city}, {address.state} {address.zipCode}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <AddressForm address={address} setAddress={setAddress} />
            <OrdersHistory />
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default UserProfile;
