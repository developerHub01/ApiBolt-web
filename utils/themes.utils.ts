import sharp from "sharp";

interface ServerAssetResult {
  preview: File;
  thumbnail: File;
}

const generateThemeAssetsServer = async (
  file: File,
): Promise<ServerAssetResult> => {
  const buffer = Buffer.from(await file.arrayBuffer());

  const [previewBuffer, thumbnailBuffer] = await Promise.all([
    sharp(buffer)
      .resize(1920, 1080, {
        fit: "cover",
      })
      .webp({
        quality: 80,
      })
      .toBuffer(),
    sharp(buffer)
      .resize(400, 400, {
        fit: "cover",
      })
      .webp({
        quality: 80,
      })
      .toBuffer(),
  ]);

  return {
    preview: new File([new Uint8Array(previewBuffer)], "preview.webp", {
      type: "image/webp",
    }),
    thumbnail: new File([new Uint8Array(thumbnailBuffer)], "thumbnail.webp", {
      type: "image/webp",
    }),
  };
};

export default generateThemeAssetsServer;
