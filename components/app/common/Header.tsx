"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
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

// import PublicCommonProfileMenu from "@/components/public-common-profile-menu";

const Header = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const background = useTransform(
    bgOpacity,
    (value) =>
      `linear-gradient(to bottom, rgba(21, 27, 37, ${0.9 * value}) 0%, rgba(21, 27, 37, ${0.5 * value}) 50%, rgba(21, 27, 37, 0) 100%)`,
  );

  const items = [
    {
      label: "Home",
      to: "/",
      active: pathname === "/",
    },
    {
      label: "Marketplace",
      to: "/marketplace",
      active: pathname.startsWith("/marketplace"),
    },
    {
      label: "Fake APIs",
      to: "/fake",
      active: pathname === "/fake",
    },
    {
      label: "Docs",
      to: "/docs",
      active: pathname.startsWith("/docs"),
    },
  ];

  return (
    <motion.section
      style={{ background }}
      className="sticky top-0 w-full flex items-center justify-center py-4 z-50 transition-all duration-300 pointer-events-none"
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
          />
          <span className="tracking-tighter">APIBolt</span>
        </Link>

        <div className="flex items-center gap-2 pointer-events-auto">
          <nav className="hidden md:flex items-center gap-1 mr-4">
            {items.map(({ to, label, active }) => (
              <Link key={to} href={to}>
                <Button
                  variant="ghost"
                  className={cn(
                    "px-4 rounded-full font-medium transition-all",
                    active
                      ? "bg-primary/10 text-primary hover:bg-primary/20"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* <PublicCommonProfileMenu /> */}

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
                {items.map(({ to, label, active }) => (
                  <Link key={to} href={to}>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-12 rounded-xl text-base font-medium transition-all",
                          active
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
      </header>
    </motion.section>
  );
};

export default Header;
