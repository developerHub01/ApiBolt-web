import Link from "next/link";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { NavItemInterface } from "@/types/dashboard.types";
import NavItemWrapper from "@/components/app/dashboard/layout/NavItemWrapper";

interface Props {
  item: NavItemInterface;
}

const DashboardLayoutNavItem = ({ item }: Props) => {
  const { title, Icon, url } = item;

  return (
    <SidebarMenuItem className="select-none">
      {url ? (
        <Link href={url}>
          <NavItemWrapper title={title} url={url}>
            {Icon && <Icon />}
            <span>{title}</span>
          </NavItemWrapper>
        </Link>
      ) : (
        <NavItemWrapper title={title} url={url}>
          {Icon && <Icon />}
          <span>{title}</span>
        </NavItemWrapper>
      )}
    </SidebarMenuItem>
  );
};

export default DashboardLayoutNavItem;
