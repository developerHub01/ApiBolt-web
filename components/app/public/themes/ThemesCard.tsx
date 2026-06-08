import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "lucide-react";
import CardActions from "@/components/app/public/themes/CardActions";
import type { ThemeMetaInterface } from "@/types/theme.types";
import { cn } from "@/lib/utils";

interface Props extends ThemeMetaInterface {
  canDelete?: boolean;
  canEdit?: boolean;
  showAuthor?: boolean;
  showLink?: boolean;
  className?: string;
}

const ThemesCard = ({
  id,
  name,
  description,
  thumbnail,
  type,
  author,
  canDelete = false,
  canEdit = false,
  showAuthor = true,
  showLink = true,
  className = "",
}: Props) => {
  return (
    <div
      className={cn(
        "theme-card group relative flex flex-col rounded-xl border-2 border-white/10 bg-card/40 backdrop-blur-md overflow-hidden hover:border-primary/30 transition-colors duration-500 p-5 h-full",
        className,
      )}
      data-theme-id={id}
    >
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

      <AspectRatio
        ratio={16 / 9}
        className="relative w-full rounded-lg overflow-hidden bg-muted/20 border-2 border-white/5 z-10"
      >
        <Image
          src={thumbnail}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-all duration-700 ease-out"
          loading="lazy"
        />
      </AspectRatio>

      <div className="relative pt-4 flex-1 flex flex-col z-10 gap-2">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1 first-letter:uppercase">
            {name}
          </h3>
          <Badge variant="secondary" className="capitalize text-xs shrink-0">
            {type}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed first-letter:uppercase">
          {description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between gap-4">
          {showAuthor && (
            <Button
              variant="link"
              className="p-0 has-[>svg]:px-0 h-auto text-xs text-muted-foreground hover:text-foreground/80 no-underline hover:underline"
            >
              <User className="w-3 h-3 mr-1" />
              {author}
            </Button>
          )}

          <CardActions
            id={id}
            canEdit={canEdit}
            canDelete={canDelete}
            showLink={showLink}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemesCard;
