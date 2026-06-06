import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { signInWithGithub } from "@/lib/actions/auth/actions";
import { Card } from "@/components/ui/card";

interface Props {
  searchParams: {
    error?: string;
  };
}

const Page = ({ searchParams }: Props) => {
  return (
    <div className="relative flex flex-1 w-full flex-col items-center justify-center py-20 px-4 pt-40 overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed top-1/4 -left-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 size-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md bg-card/30 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-2xl px-6 md:p-12 flex flex-col items-center relative z-10">
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="size-16 rounded-2xl bg-linear-to-tr from-primary/20 to-transparent p-3 border border-white/10 mb-6 shadow-2xl">
            <Image
              src="/logo.svg"
              className="size-full object-contain"
              alt="api-bolt logo"
              width={64}
              height={64}
            />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-brand">
            Welcome back
          </h1>
          <p className="mt-3 text-muted-foreground text-base leading-relaxed max-w-70">
            Sign in to your account and continue your masterpiece.
          </p>
          {searchParams.error && (
            <p className="mt-2 text-sm text-destructive">
              Sign-in failed. Please try again.
            </p>
          )}
        </div>

        {/* Server Action form */}
        <form action={signInWithGithub} className="w-full flex justify-center">
          <button
            type="submit"
            className="flex h-14 w-full max-w-xs items-center justify-center gap-4 rounded-full bg-foreground text-background font-bold transition-all hover:bg-foreground/90 active:scale-[0.98] shadow-xl"
          >
            <Image
              src="/images/github.png"
              alt="github logo"
              width={24}
              height={24}
            />
            Continue with GitHub
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-white/5 w-full text-center">
          <Link
            href="/"
            className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Page;
