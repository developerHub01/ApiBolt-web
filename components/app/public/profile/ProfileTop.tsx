import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_PROFILE_AVATAR,
  DEFAULT_PROFILE_COVER,
} from "@/constant/profile.constant";
import type { ProfileInterface } from "@/types/profile.types";
import { cn } from "@/lib/utils";
import { GithubIcon } from "@/icons";

interface Props {
  profile: ProfileInterface;
  className?: string;
}

const ProfileTop = ({ profile, className }: Props) => {
  const coverUrl = profile.cover_url ?? DEFAULT_PROFILE_COVER;
  const avatarUrl = profile.avatar_url ?? DEFAULT_PROFILE_AVATAR;

  return (
    <section
      className={cn(
        "w-full flex flex-col justify-center items-center",
        className,
      )}
    >
      <AspectRatio
        ratio={3 / 1}
        className="bg-muted rounded-lg overflow-hidden max-w-4xl mx-auto shadow-2xl"
      >
        <section
          className="w-full h-full"
          style={{
            background: `url(${coverUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
      </AspectRatio>

      <div className="w-full max-w-4xl -mt-6 md:-mt-18 lg:-mt-28 z-10 px-4">
        <div className="bg-card/30 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
          <div className="size-32 md:size-40 lg:size-48 rounded-full overflow-hidden border-4 border-primary/20 p-1 bg-linear-to-tr from-primary/50 to-transparent shadow-xl">
            <Image
              src={avatarUrl}
              width={300}
              height={300}
              loading="lazy"
              className="size-full rounded-full object-cover bg-background"
              alt={`${profile.full_name} ${profile.user_name} profile avatar`}
            />
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-4 pb-2">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                {profile.full_name}
              </h1>
              <p className="text-primary font-medium text-base md:text-lg">
                @{profile.user_name}
              </p>
            </div>

            {profile.bio && (
              <p className="text-muted-foreground max-w-2xl text-base md:text-lg leading-relaxed">
                {profile.bio}
              </p>
            )}

            <div className="flex items-center gap-3 pt-2">
              <Link
                href={`https://github.com/${profile.user_name}`}
                target="_blank"
              >
                <Button className="rounded-full px-6 transition-all hover:scale-105 active:scale-95">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileTop;
