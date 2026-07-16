import { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props extends Omit<ComponentProps<typeof Link>, "href"> {
  href?: string;
}

const SIdebarMenuHeadingLink = ({
  className = "",
  children,
  href = "/docs",
  ...props
}: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        "text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-foreground hover:underline px-3",
        className,
      )}
      {...props}
    >
      {children ?? "Documentation"}
    </Link>
  );
};

export default SIdebarMenuHeadingLink;
