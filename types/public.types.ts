import { LucideIcon } from "lucide-react";

export interface HomeFeatureInterface {
  id: number;
  title: string;
  description: string;
  image: string | null;
  thumbnail: string | null;
  icon: LucideIcon;
}
