"use client";

import Link from "next/link";

interface Props {
  targets: Array<{
    id: string;
    label: string;
  }>;
}

const ScrollNav = ({ targets }: Props) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      {targets.map((target) => (
        <Link
          key={target.id}
          href={`#${target.id}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(target.id);
          }}
          className="px-4 py-2 bg-secondary/30 border border-white/5 rounded text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground hover:text-white hover:border-primary/50 hover:bg-secondary/50 transition-all active:scale-95 cursor-pointer"
        >
          {target.label}
        </Link>
      ))}
    </>
  );
};

export default ScrollNav;
