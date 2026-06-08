import React from "react";
import { CardTitle } from "@/components/ui/card";

interface Props {
  children: React.ReactNode;
}

const DashboardHeading = ({ children }: Props) => {
  return (
    <CardTitle className="text-center text-3xl font-brand font-semibold pb-1">
      {children}
    </CardTitle>
  );
};

export default DashboardHeading;
