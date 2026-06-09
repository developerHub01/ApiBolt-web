import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemesCard from "@/components/app/public/themes/ThemesCard";
import { ThemeMetaInterface } from "@/types/themes.types";

interface Props {
  themes: Array<ThemeMetaInterface>;
  author: string;
}

const TopThemes = ({ themes, author }: Props) => {
  return (
    <section className="w-full flex flex-col gap-8 py-20 items-center">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-brand">
          Top Creations
        </h2>
        <p className="text-muted-foreground text-lg">
          Most popular themes by this author.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {themes.map((theme) => (
          <ThemesCard
            key={theme.id}
            {...theme}
            author={author}
            showAuthor={false}
            className="h-full"
          />
        ))}
      </div>
      <Link href="/dashboard/themes">
        <Button variant="outline" className="rounded-full px-8">
          Explore All Themes
        </Button>
      </Link>
    </section>
  );
};

export default TopThemes;
