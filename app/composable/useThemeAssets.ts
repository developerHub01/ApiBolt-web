import { compressImage } from "~/composable/useImageOptimizer";

export const useThemeAssets = () => {
  const generateThemeAssets = async (originalFile: File) => {
    const [preview, thumbnail] = await Promise.all([
      compressImage(originalFile, {
        maxSizeMB: 0.7,
        maxWidthOrHeight: 1920,
      }),
      compressImage(originalFile, {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 400,
      }),
    ]);

    return {
      preview,
      thumbnail,
    };
  };

  return { generateThemeAssets };
};
