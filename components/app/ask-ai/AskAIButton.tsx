"use client";

import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot as AIIcon } from "lucide-react";

interface Props {
  children?: React.ReactNode;
}

const AskAIButton = ({ children = <DefaultChildren /> }: Props) => {
  const pathname = usePathname();

  const isActive = useMemo(() => pathname === "/ask-ai", [pathname]);

  return (
    <div className="px-3">
      <Link href="/ask-ai">
        <Button className="w-full" variant={isActive ? "secondary" : "outline"}>
          {children}
        </Button>
      </Link>
    </div>
  );
};

const DefaultChildren = () => (
  <>
    <AIIcon />
    Ask AI
  </>
);

export default AskAIButton;
