"use client";

import { BudgetWizzard, Toolbox, ClientForm } from "@/components/system";
import useDinamicHeader from "@/components/system/DinamicHeader/context/useDinamicHeader";
import { useCallback, useEffect, useState } from "react";

export default function UserDashboardPage() {
  const { addPath } = useDinamicHeader();

  const addPathCallback = useCallback(() => {
    addPath({ title: "User Dashboard", href: "/dashboard/user" });
  }, [addPath]);

  // useEffect(addPathCallback, []);

  // return (
  //   <div className="grid grid-rows-[20px_1fr_120px] items-center justify-items-center min-h-screen">
  //     <p>OLa</p>
  //     <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-slate-400 w-full h-full">
  //       <div>
  //         <h1 className={`text-5xl text-bolder`}>User Dashboard</h1>
  //         <p>
  //           <span className="text-sm text-gray-400">
  //             Welcome to the User Dashboard
  //           </span>
  //         </p>
  //       </div>
  //       <div className=" bg-gray-300 w-32 h-full">ola</div>
  //     </main>
  //   </div>
  // );

  return (
    <div className="flex items-center justify-items-center h-full min-h-full">
      <main className="bg-slate-100 w-full h-full">
        <BudgetWizzard />
        <ClientForm />
        <Toolbox />
      </main>
    </div>
  );
}
