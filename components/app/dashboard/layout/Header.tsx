import { SidebarTrigger } from "@/components/ui/sidebar";
import HeaderLogo from "@/components/app/dashboard/layout/HeaderLogo";
import HeaderAvatar from "@/components/app/dashboard/layout/HeaderAvatar";

const Header = () => {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 h-12">
        <SidebarTrigger className="-ml-1" />
        <HeaderLogo />
        <div className="ml-auto flex items-center gap-2">
          <HeaderAvatar />
        </div>
      </div>
    </header>
  );
};

export default Header;
