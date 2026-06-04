import ExampleToggle from "@/components/app/public/fake/ExampleToggle";
import { cn } from "@/lib/utils";

interface Props {
  method: string;
  path: string;
  description?: string;
  params?: Array<string>;
  example?: string;
}

const EndpointCard = ({
  method,
  path,
  description,
  params,
  example,
}: Props) => {
  return (
    <div className="border border-border/60 bg-card rounded-lg overflow-hidden group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-muted/20 border-b border-border/40">
        <div className="flex items-center gap-3 overflow-hidden">
          <span
            className={cn(
              "shrink-0 px-2.5 py-1 rounded text-[10px] font-bold font-mono uppercase tracking-wider border select-none",
              "bg-secondary text-muted-foreground border-border",
              {
                "bg-blue-500/10 text-blue-500 border-blue-500/20":
                  method === "GET",
                "bg-green-500/10 text-green-500 border-green-500/20":
                  method === "POST",
                "bg-orange-500/10 text-orange-500 border-orange-500/20":
                  method === "PUT",
                "bg-yellow-500/10 text-yellow-500 border-yellow-500/20":
                  method === "PATCH",
                "bg-red-500/10 text-red-500 border-red-500/20":
                  method === "DELETE",
              },
            )}
          >
            {method}
          </span>
          <code
            className="font-mono text-sm text-foreground/90 truncate"
            title={path}
          >
            {path}
          </code>
        </div>
        {description && (
          <div className="text-xs text-muted-foreground font-medium md:text-right">
            {description}
          </div>
        )}
      </div>

      {(params?.length || example) && (
        <div className="p-4 space-y-4">
          {params?.length && (
            <div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-2">
                Parameters
              </div>
              <div className="flex flex-wrap gap-2">
                {params.map((param) => (
                  <span
                    key={param}
                    className="px-2 py-1 rounded border border-border bg-background text-xs font-mono text-muted-foreground"
                  >
                    {param}
                  </span>
                ))}
              </div>
            </div>
          )}

          {example && <ExampleToggle example={example} />}
        </div>
      )}
    </div>
  );
};

export default EndpointCard;
