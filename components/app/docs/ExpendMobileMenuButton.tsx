"use client";

import { useSidebarStore } from "@/store/docs/sidebar.store";
import { Menu } from "lucide-react";

const ExpendMobileMenuButton = () => {
  const isOpen = useSidebarStore((state) => state.isMobileMenuOpen);
  const handleOpen = useSidebarStore((state) => state.handleOpen);

  if (isOpen) return null;

  return (
    <button
      type="button"
      title="Open documentation menu"
      aria-label="Open documentation menu"
      onClick={handleOpen}
      className="fixed bottom-3 left-3 z-40 flex items-center justify-center size-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all md:bottom-8 md:right-8 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
    >
      <Menu className="w-5 h-5 absolute transition-all duration-200" />
    </button>
  );
};

export default ExpendMobileMenuButton;
