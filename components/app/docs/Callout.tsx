import {
  Lightbulb,
  Info,
  AlertTriangle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  variant?: "tip" | "note" | "warning" | "info";
  label?: string;
  children: React.ReactNode;
}

const variantMap: Record<
  string,
  {
    icon: LucideIcon;
    classes: string;
  }
> = {
  tip: {
    icon: Lightbulb,
    classes: "bg-emerald-500/5 border-emerald-500/20 text-emerald-200",
  },
  note: {
    icon: Info,
    classes: "bg-blue-500/5 border-blue-500/20 text-blue-200",
  },
  warning: {
    icon: AlertTriangle,
    classes: "bg-amber-500/5 border-amber-500/20 text-amber-200",
  },
  info: {
    icon: Zap,
    classes: "bg-primary/5 border-primary/20 text-primary",
  },
};

export const Callout = ({ variant = "tip", label, children }: Props) => {
  const entry = variantMap[variant] || variantMap.tip;
  const Icon = entry.icon;
  const variantClasses = entry.classes;

  return (
    <div
      className={cn("my-5 flex gap-3 rounded-lg border p-4", variantClasses)}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed">
        {label && <span className="font-bold mr-1.5">{label}</span>}
        {children}
      </div>
    </div>
  );
};
