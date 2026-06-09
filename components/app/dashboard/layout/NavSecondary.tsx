import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import NavItem from "@/components/app/dashboard/layout/NavItem";
import { NavItemInterface } from "@/types/dashboard.types";
import { ArrowLeft } from "lucide-react";

const navItems: Array<NavItemInterface> = [
  {
    title: "Back To Home",
    url: "/",
    Icon: ArrowLeft,
  },
];

interface Props {
  className?: string;
}

const NavSecondary = ({ className }: Props) => {
  return (
    <SidebarGroup className={className}>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavSecondary;
