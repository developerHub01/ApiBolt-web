import React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

const MainLayoutProviderWrapper = ({ children }: Props) => (
  <>
    <TooltipProvider>{children}</TooltipProvider>
    <Toaster
      toastOptions={{
        className: "bg-card text-card-foreground border-border",
      }}
    />
  </>
);

export default MainLayoutProviderWrapper;
