import React from "react";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return <section className="w-full max-w-6xl px-5 mx-auto">{children}</section>;
};

export default AppLayout;
