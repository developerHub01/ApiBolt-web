import { ComponentProps } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import GoBackButton from "@/components/ui/go-back-button";
import { cn } from "@/lib/utils";

interface Props extends ComponentProps<"section"> {
  description?: string;
}

const NotFound = ({ description, className, ...props }: Props) => {
  return (
    <section
      className={cn(
        "relative flex-1 py-12 flex justify-center items-center",
        className,
      )}
      {...props}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-2xl flex flex-col text-center px-4">
        <div className="relative inline-block mx-auto mb-8">
          <h1 className="text-[7rem] sm:text-[10rem] md:text-[14rem] font-black leading-none tracking-tighter flex justify-center items-center select-none text-foreground/90 tabular-nums text-center">
            4
            <span className="text-primary relative transform rotate-12 inline-block drop-shadow-[0_0_35px_rgba(213,194,144,0.3)]">
              0
            </span>
            4
          </h1>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-primary/50 to-transparent blur-sm" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-linear-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
          Lost in Outer Space?
        </h2>

        <p className="text-base md:text-lg leading-relaxed text-muted-foreground/80 max-w-md mx-auto mb-10">
          {description ||
            "The page you're searching for seems to have vanished into the digital void. Let's get you back on track."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button
              size="lg"
              className="px-8 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 w-35"
            >
              Return Home
            </Button>
          </Link>
          <GoBackButton className="w-35">Go Back</GoBackButton>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
