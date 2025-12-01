import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuList = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "marketplace",
    label: "Marketplace",
    href: "/marketplace",
  },
];

const Navbar = () => {
  return (
    <header className="w-full flex justify-between items-center gap-3 py-4">
      <Link href={"/"} className="text-lg font-bold">
        ApiBolt
      </Link>
      <div className="flex items-center gap-3">
        {menuList.map(({ id, label, href }) => (
          <Link key={id} href={href} className="text-sm">
            {label}
          </Link>
        ))}
        <Link href={"/auth"}>
          <Button>Login</Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:ring-0 focus-within:ring-">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
