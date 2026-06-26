"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/app/docs/MobileMenu";
import DesktopMenu from "@/components/app/docs/DesktopMenu";

const PublicDocsSidebar = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMobileOpen(false);
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopMenu />

      {/* Mobile Sidebar */}
      <MobileMenu isOpen={isMobileOpen} handleToggleOpen={setIsMobileOpen} />
    </>
  );
};

export default PublicDocsSidebar;
