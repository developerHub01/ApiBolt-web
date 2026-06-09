import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
}

const ExpectHighlight = ({ children }: Props) => {
  return (
    <div
      className={cn(
        "mt-4 p-4 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-between",
      )}
    >
      <div className={cn("flex items-center gap-3")}>{children}</div>
    </div>
  );
};

export default ExpectHighlight;
