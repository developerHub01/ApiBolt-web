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
  version: number;
  install_count: number;
  authorId: string;
  authorUsername: string;
  updated_at: string;
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
