// "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";

// export default function User() {
//   const { user } = useUser();
//   const [userName, setUserName] = useState<string | null>(null);

//   useEffect(() => {
//     const saveUserToDatabase = async () => {
//       if (user?.id) {
//         const response = await fetch("/api/user", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             id: user.id,
//             name: user.fullName,
//             email: user.emailAddresses[0].emailAddress,
//           }),
//         });

//         const data = await response.json();

//         if (data && data.name) {
//           setUserName(data.name);
//         }
//       }
//     };

//     saveUserToDatabase();
//   }, [user]);

//   const hour = new Date();
//   const hourOfDay = hour.getHours();

//   let greeting;

//   if (hourOfDay < 12) {
//     greeting = "Good morning";
//   } else if (hourOfDay < 18) {
//     greeting = "Good afternoon";
//   } else {
//     greeting = "Good evening";
//   }

//   return (
//     <div className="space-y-4 px-8 py-4 text-black text-xl">
//       {userName ? `${greeting}, ${userName}` : "Loading..."}
//     </div>
//   );
// }
