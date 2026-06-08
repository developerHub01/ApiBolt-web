import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
}

const MainLayoutProviderWrapper = ({ children }: Props) => (
  <TooltipProvider>{children}</TooltipProvider>
);

export default MainLayoutProviderWrapper;
