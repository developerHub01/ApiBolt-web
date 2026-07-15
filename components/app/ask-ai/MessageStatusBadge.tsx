import React from "react";
import { Loader2 } from "lucide-react";

interface Props {
  children: React.ReactNode;
  isLoading: boolean;
}

const MessageStatusBadge = ({ children, isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="flex items-center gap-1.5 text-secondary-foreground/50 font-medium mt-1 select-none animate-pulse">
      <Loader2 className="size-4 animate-spin" />
      {children}
    </div>
  );
};

export default MessageStatusBadge;
