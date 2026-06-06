"use client";

import React from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { NavItemInterface } from "@/types/dashboard.types";
import { usePathname } from "next/navigation";

interface Props extends Pick<NavItemInterface, "title" | "url"> {
  children: React.ReactNode;
}

const NavItemWrapper = ({ title, url, children }: Props) => {
  const pathname = usePathname();
  const isActive = url ? pathname === url : false;

  return (
    <SidebarMenuButton
      tooltip={title}
      className="cursor-pointer"
      isActive={isActive}
    >
      {children}
    </SidebarMenuButton>
  );
};

export default NavItemWrapper;
