import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-50 h-full flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
