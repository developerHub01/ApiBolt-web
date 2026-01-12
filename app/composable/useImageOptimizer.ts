import imageCompression from "browser-image-compression";

export type FileType = "image/webp" | "image/jpeg" | "image/png";

export interface ImageOptimizationOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  fileType?: FileType;
}

export const compressImage = async (
  file: File,
  customOptions: ImageOptimizationOptions = {}
) => {
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: "image/webp" as FileType,
    ...customOptions,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Compression failed:", error);
    throw error;
  }
};
