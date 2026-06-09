import { cn } from "@/lib/utils";

interface Item {
  code: string;
  label: string;
}

interface Props {
  leftColumn: Array<Item>;
  rightColumn: Array<Item>;
}

const CoreIdeaGrid = ({ leftColumn, rightColumn }: Props) => {
  return (
    <div className={cn("grid sm:grid-cols-2 gap-4 mt-2")}>
      <div className={cn("space-y-3")}>
        {leftColumn.map((item, index) => (
          <div key={index} className={cn("flex items-start gap-2")}>
            <code
              className={cn(
                "px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground",
              )}
            >
              {item.code}
            </code>
            <span className={cn("text-sm text-muted-foreground leading-snug")}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className={cn("space-y-3")}>
        {rightColumn.map((item, index) => (
          <div key={index} className={cn("flex items-start gap-2")}>
            <code
              className={cn(
                "px-1.5 py-0.5 text-xs rounded bg-muted font-mono text-foreground",
              )}
            >
              {item.code}
            </code>
            <span className={cn("text-sm text-muted-foreground leading-snug")}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoreIdeaGrid;
