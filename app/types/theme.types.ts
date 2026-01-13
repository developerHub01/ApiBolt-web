export interface ProfileInterface {
  id: string;
  user_name: string;
  full_name: string;
  bio: string | null;
  avatar_url: string;
  cover_url: string | null;
  created_at: string;
}

export type TThemeType = "dark" | "light" | "custom";
export type TThemeTypeSearch = "all" | TThemeType;

export interface SearchState {
  searchTerm: string;
  themeType: TThemeTypeSearch;
}

export interface ThemeInterface {
  id: string;
  name: string;
  description: string;
  type: TThemeType;
  preview: string;
  thumbnail: string;
  author?: string;
  created_at: string;
}
