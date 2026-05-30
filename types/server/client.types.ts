export interface AppInstallReportBodyInterface {
  version: string;
  deviceId: string;
}

export interface InstallThemeBodyPayloadInterface {
  themeId: string;
  deviceId: string;
  actionType: "install" | "uninstall";
}