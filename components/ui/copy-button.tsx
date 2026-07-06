"use client";

import { ComponentPropsWithoutRef, useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props extends ComponentPropsWithoutRef<typeof Button> {
  value: string;
  showLabel?: boolean;
}

const CopyButton = ({
  value,
  className,
  size = "default",
  variant = "ghost",
  showLabel = true,
  ...props
}: Props) => {
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
      size={size}
      variant={variant}
      className={cn(className)}
      {...props}
    >
      {copied ? (
        <CheckIcon className="size-4" />
      ) : (
        <CopyIcon className="size-4" />
      )}
      {showLabel && <span>{copied ? "Copied" : "Copy"}</span>}
    </Button>
  );
};

export default CopyButton;
