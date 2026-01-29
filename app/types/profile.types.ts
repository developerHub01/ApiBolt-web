import type { ThemeMetaInterface } from "~/types/theme.types";

export interface ProfileMetaInterface {
  id: string;
  user_name: string;
  full_name: string;
  bio: string | null;
  avatar_url: string;
  cover_url: string | null;
  created_at: string;
}

export interface ProfileInterface extends ProfileMetaInterface {
  socialLinks: Array<string>;
  themes: Array<ThemeMetaInterface>;
}
