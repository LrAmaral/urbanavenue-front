import { Metadata } from "next";
import OrdersHistory from "./components/OrdersHistory";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UserButton, auth } from "@clerk/nextjs";
import AddressForm from "./components/AdressForm";

export const metadata: Metadata = {
  title: "user | UrbanAvenue®",
  description: "User Profile Page",
};

const UserProfile = () => {
  const { user } = auth();

  return (
    <div className="w-full h-auto md:h-screen mt-24 flex flex-col items-center justify-start">
      <div className="w-full max-w-[76.875rem] mx-auto xs:px-6 px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/user">Profile</BreadcrumbLink>
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
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <AddressForm />
          <OrdersHistory />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
