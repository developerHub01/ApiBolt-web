import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavItemInterface } from "@/types/dashboard.types";
import NavItem from "@/components/app/dashboard/layout/NavItem";
import { House, Palette, PackagePlus, UserPen } from "lucide-react";

const navItems: Array<NavItemInterface> = [
  {
    title: "Home",
    url: "/dashboard",
    Icon: House,
  },
  {
    title: "Update profile",
    url: "/dashboard/update-profile",
    Icon: UserPen,
  },
  {
    title: "My Themes",
    url: "/dashboard/themes",
    Icon: Palette,
  },
  {
    title: "Create Theme",
    url: "/dashboard/create-theme",
    Icon: PackagePlus,
  },
];

const NavMain = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavMain;
