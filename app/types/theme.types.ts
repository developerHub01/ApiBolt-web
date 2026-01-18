export interface ProfileMetaInterface {
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

export interface ThemeMetaInterface {
  id: string;
  name: string;
  description: string;
  type: TThemeType;
  thumbnail: string;
  author?: string;
}

export interface ThemeInterface extends ThemeMetaInterface {
  preview: string;
  palette: Record<string, string>;
  version: string;
  install_count: number;
  authorId: string;
  authorUsername: string;
}

export interface ThemeListThemeMetaInterface {
  data: Array<ThemeMetaInterface>;
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}
