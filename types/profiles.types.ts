import { ThemeMetaInterface } from "@/types/themes.types";

export interface ProfileInterface {
  id: string;
  user_name: string;
  full_name: string;
  avatar_url: string | null;
  cover_url: string | null;
  bio: string | null;
  created_at: Date | null;
}

export interface FullProfileInterface extends ProfileInterface {
  themes: Array<ThemeMetaInterface>;
}
