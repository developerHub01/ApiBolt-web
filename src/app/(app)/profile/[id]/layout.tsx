import React from "react";

interface Props {
  children: React.ReactNode;
}

const MarketplaceLayout = ({ children }: Props) => {
  return <section className="w-full flex flex-col px-4 py-5">{children}</section>;
};

export default MarketplaceLayout;
