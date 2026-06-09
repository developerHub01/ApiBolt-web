"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  className?: string;
}

const CopyButton = ({ value, className }: Props) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleIdCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, [value]);

  return (
    <Button
      onClick={handleIdCopy}
      size="default"
      variant="outline"
      className={cn(className)}
    >
      {copied ? (
        <CheckIcon className="size-3.5 mr-2" />
      ) : (
        <CopyIcon className="size-3.5 mr-2" />
      )}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
};

export default CopyButton;
