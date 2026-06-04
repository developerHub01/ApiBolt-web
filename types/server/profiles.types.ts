import { ThemeMetaInterface } from "@/types/theme.types";

export interface FullProfileInterface {
  id: string;
  user_name: string;
  full_name: string;
  avatar_url: string | null;
  cover_url: string | null;
  bio: string | null;
  themes: Array<ThemeMetaInterface>;
}
