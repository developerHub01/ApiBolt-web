import Image from "next/image";
import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import NavMain from "@/components/app/dashboard/layout/NavMain";
import NavSecondary from "@/components/app/dashboard/layout/NavSecondary";

interface Props {
  variant?: "inset" | "sidebar" | "floating";
}

const Sidebar = ({ variant = "sidebar" }: Props) => {
  return (
    <UISidebar collapsible="offcanvas" variant={variant}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard" className="flex items-center">
                <Image
                  src="/logo.svg"
                  alt="APIBolt"
                  width={25}
                  height={25}
                  className="object-contain"
                />
                <span className="text-base font-bold font-brand">APIBolt</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
    </UISidebar>
  );
};

export default Sidebar;
