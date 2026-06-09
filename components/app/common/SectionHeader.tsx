import { cn } from "@/lib/utils";

interface Props {
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
}

const SectionHeader = ({ title, description, className = "" }: Props) => (
  <div className={cn("mb-12 text-center max-w-xl mx-auto", className)}>
    <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold font-brand pb-3 sm:pb-4 md:pb-6 bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70">
      {title}
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
      {description}
    </p>
  </div>
);

export default SectionHeader;
