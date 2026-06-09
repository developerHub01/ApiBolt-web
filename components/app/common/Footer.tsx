import Link from "next/link";

const Footer = () => {
  const devLink = "https://shakil102043.vercel.app/";

  return (
    <section className="flex justify-center items-center p-4 border-t">
      <p className="text-center text-sm">
        All right reserve for{" "}
        <span className="font-bold text-primary">ShakilLab</span> by
        <Link
          href={devLink}
          target="_blank"
          className="text-primary underline font-semibold px-1 tracking-wider"
        >
          developer
        </Link>
      </p>
      <Link
        href="https://www.flaticon.com/free-icons/github"
        title="github icons"
        hidden
      >
        Github icons created by Freepik - Flaticon
      </Link>
    </section>
  );
};

export default Footer;
