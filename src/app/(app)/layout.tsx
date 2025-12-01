import React from "react";
import Navbar from "@/app/(app)/_components/nav-bar/nav-bar";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <section className="w-full max-w-6xl px-5 mx-auto">
      <Navbar />
      {children}
    </section>
  );
};

export default AppLayout;
