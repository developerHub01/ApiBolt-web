import type {
  ProfileMetaInterface,
  ThemeMetaInterface,
} from "~/types/theme.types";

export interface ProfileInterface extends ProfileMetaInterface {
  socialLinks: Array<string>;
  themes: Array<ThemeMetaInterface>;
}
