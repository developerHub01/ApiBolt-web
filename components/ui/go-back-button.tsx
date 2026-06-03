"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const GoBackButton = ({ className, children }: Props) => {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={() => router.back()}
      className={cn("text-muted-foreground hover:text-foreground", className)}
    >
      {children}
    </Button>
  );
};

export default GoBackButton;
