import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  User as AuthorIcon,
  CloudDownload as DownloadIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  API_BOLT_DESKTOP_APP_PROTOCOL,
  SITE_URL,
} from "@/constant/index.constant";
import type { ThemeInterface } from "@/types/theme.types";
import CopyButton from "@/components/ui/copy-button";

const ThemesDetails = ({
  id,
  authorUsername,
  description,
  install_count,
  name,
  palette,
  preview,
  type,
  version,
  author,
}: ThemeInterface) => {
  const paletteList = Object.entries(palette);
  const authorProfileLink = `${SITE_URL}/profile/${authorUsername}`;
  const installUrl = `${API_BOLT_DESKTOP_APP_PROTOCOL}://theme/${id}`;

  return (
    <section className="container mx-auto py-12 px-4 flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent font-brand first-letter:uppercase">
          {name}
        </h1>
      </div>

      <div className="relative group rounded-2xl border-2 border-white/10 bg-card/40 p-2 backdrop-blur-md shadow-2xl">
        <div className="absolute inset-0 bg-primary/10 blur-3xl opacity-20 group-hover:opacity-80 transition-opacity pointer-events-none" />
        <AspectRatio
          ratio={16 / 9}
          className="relative z-10 bg-muted/20 rounded-xl overflow-hidden border border-white/5"
        >
          <Image
            src={preview}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 1040px"
            className="object-cover transition-transform duration-700"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center py-6 border-b border-white/10">
        <div className="flex flex-col sm:flex-row gap-4 md:items-center">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <AuthorIcon className="w-4 h-4" />
            {authorProfileLink ? (
              <Link
                href={authorProfileLink}
                target="_blank"
                className="text-foreground hover:text-primary font-medium hover:underline transition-colors underline overflow-hidden line-clamp-1"
              >
                {author}
              </Link>
            ) : (
              <span>{author}</span>
            )}
          </div>

          <div className="hidden md:block w-px h-4 bg-white/10" />

          <div className="flex gap-3">
            <Badge
              variant="secondary"
              className="capitalize px-3 py-1 bg-white/5 hover:bg-white/10"
            >
              {type}
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-white/5 hover:bg-white/10"
            >
              <DownloadIcon className="w-3 h-3 mr-1.5" />
              {install_count} Install{install_count > 1 ? "s" : ""}
            </Badge>
            <Badge
              variant="secondary"
              className="px-3 py-1 bg-white/5 hover:bg-white/10"
            >
              Version: {version}
            </Badge>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <CopyButton
            value={id}
            className="rounded-full border-white/10 hover:bg-white/5 text-xs"
          />
          {id && (
            <Link href={installUrl}>
              <Button>Install in app</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Description
        </h2>
        <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed first-letter:uppercase">
          <p>{description}</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">Palette</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 rounded-xl overflow-hidden bg-card/20 backdrop-blur-sm">
          {paletteList.map(([key, value], index) => (
            <Fragment key={key}>
              <div
                className={cn(
                  "capitalize p-3 flex items-center text-sm font-medium border-b border-r border-white/10 text-muted-foreground bg-accent/10",
                  {
                    "border-b-0": index >= paletteList.length - 1,
                  },
                )}
              >
                {key.replaceAll("-", " ")}
              </div>
              <div
                className={cn(
                  "p-3 border-b border-white/10 flex items-center justify-center",
                  {
                    "border-b-0": index >= paletteList.length - 1,
                    "lg:border-r border-white/10": !(index % 2),
                  },
                )}
              >
                <div
                  className="h-8 w-full rounded shadow-sm ring-1 ring-white/10"
                  style={{
                    background: value,
                  }}
                  title={value}
                />
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemesDetails;
