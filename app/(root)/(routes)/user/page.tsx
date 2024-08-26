"use client";

import { useEffect, useState } from "react";
import OrdersHistory from "./components/OrdersHistory";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserButton, useUser } from "@clerk/nextjs";
import AddressForm from "./components/AddressForm";

const UserProfile = () => {
  const [address, setAddress] = useState({
    fullName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const { user } = useUser();

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
      firstName: user?.firstName || "N/A",
      email: user?.emailAddresses[0]?.emailAddress || "N/A",
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [user]);

  useEffect(() => {}, [address]);

  return (
    <div className="w-full h-auto md:h-screen mt-24 flex flex-col items-center justify-start">
      <div className="w-full max-w-[76.875rem] mx-auto xs:px-6 px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-lg">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/user" className="text-lg">
                Profile
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

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
    </div>
  );
};

export default UserProfile;
