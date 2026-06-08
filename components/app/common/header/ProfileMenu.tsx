import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserAction } from "@/lib/actions/auth/actions";
import ProfileDropdown from "@/components/app/common/header/ProfileDropdown";

const UserMenu = async () => {
  const user = await getUserAction();

  if (!user)
    return (
      <Link href="/auth">
        <Button className="rounded-full h-8 sm:h-9 px-4 sm:px-6 text-xs sm:text-sm font-semibold shadow-lg hover:scale-105 transition-transform active:scale-95">
          Get Started
        </Button>
      </Link>
    );

  return <ProfileDropdown user={user} />;
};

export default UserMenu;
