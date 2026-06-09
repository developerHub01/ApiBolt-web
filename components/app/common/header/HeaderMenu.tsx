"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ITEMS = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Marketplace",
    to: "/marketplace",
  },
  {
    label: "Fake APIs",
    to: "/fake",
  },
  {
    label: "Docs",
    to: "/docs",
  },
];

interface Props {
  profileMenu?: React.ReactNode;
}

const HeaderMenu = ({ profileMenu = null }: Props) => {
  const pathname = usePathname();

  const activeItem = useMemo(
    () =>
      ITEMS.find((item) => {
        if (item.to === "/docs") return pathname.startsWith(item.to);
        else return pathname === item.to;
      })?.to,
    [pathname],
  );

  return (
    <div className="flex items-center gap-2 pointer-events-auto">
      <nav className="hidden md:flex items-center gap-1 mr-4">
        {ITEMS.map(({ to, label }) => (
          <Link key={to} href={to}>
            <Button
              variant="ghost"
              className={cn(
                "px-4 rounded-full font-medium transition-all",
                {
                  "bg-primary/10 text-primary hover:bg-primary/20 backdrop-blur-3xl":
                    activeItem === to,
                  "text-muted-foreground hover:text-foreground":
                    activeItem !== to,
                },
              )}
            >
              {label}
            </Button>
          </Link>
        ))}
      </nav>

      {profileMenu}

      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full hover:bg-primary/10 hover:text-primary pointer-events-auto"
          >
            <Menu className="size-5 sm:size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-75 bg-card/80 backdrop-blur-xl border-white/5 p-8 flex flex-col gap-8"
        >
          <SheetHeader className="text-left gap-3">
            <SheetTitle className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                width={24}
                height={24}
                className="size-6"
                alt="api-bolt"
              />
              <span className="font-black tracking-tighter font-brand">
                APIBolt
              </span>
            </SheetTitle>
            <SheetDescription className="text-xs">
              Accelerate your workflow with premium API themes.
            </SheetDescription>
          </SheetHeader>

          <nav className="flex flex-col gap-2 mt-4">
            {ITEMS.map(({ to, label }) => (
              <Link key={to} href={to}>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-12 rounded-xl text-base font-medium transition-all",
                      activeItem === to
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-white/5",
                    )}
                  >
                    {label}
                  </Button>
                </SheetClose>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 border-t border-white/5">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} APIBolt
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HeaderMenu;
