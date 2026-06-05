import { LucideIcon } from "lucide-react";

export interface DocsNavItem {
  slug: string;
  label: string;
  icon?: LucideIcon;
  children?: Array<DocsNavItem>;
}
