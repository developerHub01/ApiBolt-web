import { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import HeaderMenu from "@/components/app/common/header/HeaderMenu";
import ProfileMenu from "@/components/app/common/header/ProfileMenu";

interface Props extends ComponentProps<"section"> {
  className?: string;
}

const Header = ({ className, ...props }: Props) => {
  return (
    <section
      className={cn(
        "sticky top-0 w-full flex items-center justify-center py-4 z-50 transition-all duration-300 pointer-events-none",
        "bg-linear-to-b from-secondary/65 via-secondary/35 to-transparent",
        className,
      )}
      {...props}
    >
      <header className="container flex items-center justify-between gap-6 px-4">
        <Link
          href="/"
          className="text-lg sm:text-2xl font-black font-brand select-none flex items-center gap-3 transition-transform pointer-events-auto"
        >
          <Image
            src="/logo.svg"
            width={32}
            height={32}
            className="size-6 sm:size-8"
            alt="api-bolt"
            loading="eager"
          />
          <span className="tracking-tighter">APIBolt</span>
        </Link>
        <HeaderMenu profileMenu={<ProfileMenu />} />
      </header>
    </section>
  );
};

export default Header;
