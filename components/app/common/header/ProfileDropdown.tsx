"use client";

import Link from "next/link";
import { User as UserIcon, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/actions/auth/actions";
import type { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}

const ProfileDropdown = ({ user }: Props) => {
  const avatar =
    user.user_metadata?.avatar_url ?? "https://github.com/shadcn.png";
  const name = user.user_metadata?.name ?? null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none pointer-events-auto">
        <Avatar className="size-9 ring-2 ring-primary/20 hover:ring-primary transition-all cursor-pointer">
          <AvatarImage src={avatar} alt={name || "User"} />
          <AvatarFallback className="bg-muted text-xs font-bold">
            {name?.slice(0, 2).toUpperCase() || "CN"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-card/80 backdrop-blur-xl border-white/10 rounded-xl p-2 shadow-2xl"
      >
        <div className="px-2 py-3 mb-2 border-b border-white/5">
          <p className="text-sm font-bold truncate">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <Link href="/dashboard">
          <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-primary/10 hover:text-primary transition-colors gap-3 py-2.5">
            <UserIcon className="size-4" />
            <span>Personal Dashboard</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/update-profile">
          <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-primary/10 hover:text-primary transition-colors gap-3 py-2.5">
            <Settings className="size-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={signOut}
          className="cursor-pointer rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors gap-3 py-2.5"
        >
          <Settings className="size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
