"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/app/docs/MobileMenu";
import DesktopMenu from "@/components/app/docs/DesktopMenu";
import { useSidebarStore } from "@/store/docs/sidebar.store";

const PublicDocsSidebar = () => {
  const pathname = usePathname();
  const isMobileMenuOpen = useSidebarStore((state) => state.isMobileMenuOpen);
  const handleToggle = useSidebarStore((state) => state.handleToggle);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    handleToggle(false);
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <DesktopMenu />

      {/* Mobile Sidebar */}
      <MobileMenu isOpen={isMobileMenuOpen} handleToggleOpen={handleToggle} />
    </>
  );
};

export default PublicDocsSidebar;
