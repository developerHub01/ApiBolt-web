import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileUserDetailsSkeleton = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <AspectRatio
        ratio={3 / 1}
        className="bg-muted rounded-lg overflow-hidden w-full mx-auto"
      >
        <Skeleton className="w-full h-full" />
      </AspectRatio>
      <div className="w-full max-w-4xl -mt-16 md:-mt-24 lg:-mt-28 z-10 px-4">
        <div className="bg-card/30 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
          <Skeleton className="size-32 md:size-40 lg:size-48 rounded-full border-4 border-primary/10" />

          <div className="flex-1 flex flex-col items-center md:items-start w-full gap-4 pb-2">
            <div className="space-y-2 w-full flex flex-col items-center md:items-start">
              <Skeleton className="h-10 w-3/4 max-w-64" />
              <Skeleton className="h-6 w-1/4 max-w-32" />
            </div>

            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileUserDetailsSkeleton;
