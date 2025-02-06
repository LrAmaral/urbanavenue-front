import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const UserSignOut = () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return <UserButton afterSignOutUrl="/" />;
};

export default UserSignOut;
