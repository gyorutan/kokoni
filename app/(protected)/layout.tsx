import { Footbar } from "@/components/footbar";
import { Navbar } from "@/components/navbar";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col items-center mx-auto max-w-[768px] min-w-[330px]">
      <Navbar />
      <main className="py-20 w-full px-4">{children}</main>
      <Footbar />
    </div>
  );
};

export default ProtectedLayout;
