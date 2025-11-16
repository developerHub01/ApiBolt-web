import AuthenticationButton from "@/app/(app)/_components/authentication-button";
import Link from "next/link";

const Header = () => {
  return (
    <section className="w-full flex justify-between items-center gap-2">
      <Link href={"/"}>ApiBolt</Link>
      <div className="flex items-center gap-1">
        <AuthenticationButton />
      </div>
    </section>
  );
};

export default Header;
