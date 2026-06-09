"use client";

import { ChangeEvent, useRef } from "react";
import Image from "next/image";
import { ImageIcon, CameraIcon } from "lucide-react";
import { toast } from "sonner";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { THEME_PREVIEW_SIZE } from "@/constant/default-theme.constant";

const REQUIRED_RATIO = (
  THEME_PREVIEW_SIZE.REQUIRED_WIDTH / THEME_PREVIEW_SIZE.REQUIRED_HEIGHT
).toFixed(2);

const { REQUIRED_WIDTH, REQUIRED_HEIGHT, MAX_SIZE_MB } = THEME_PREVIEW_SIZE;

interface Props {
  previewUrl: string;
  onPreviewChange: (file: File) => void;
}

const DashboardThemeEditorPreview = ({
  previewUrl,
  onPreviewChange,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => fileInputRef.current?.click();

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size / (1024 * 1024) > MAX_SIZE_MB) {
      toast.error(`Max size is ${MAX_SIZE_MB}MB`);
      return;
    }

    const img = new window.Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      if ((img.width / img.height).toFixed(2) !== REQUIRED_RATIO) {
        toast.error(`Required size: ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}px`);
        return;
      }
      onPreviewChange(file);
    };
    img.src = objectUrl;
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="space-y-1">
        <FieldLabel className="text-base font-semibold">
          Discovery Asset
        </FieldLabel>
        <p className="text-xs text-muted-foreground">
          Recommend: 1920x1080 (16:9) | Max 2MB
        </p>
      </div>
      <FieldGroup>
        <Field>
          <div
            className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-white/5 bg-muted/20 shadow-xl transition-all hover:border-primary/50"
            onClick={handleClick}
          >
            <AspectRatio ratio={16 / 9}>
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="theme preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-4 bg-muted/10">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ImageIcon className="size-8 text-primary/60" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">
                      Click to upload theme preview
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG or WEBP only
                    </p>
                  </div>
                </div>
              )}
            </AspectRatio>

            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl overflow-hidden">
              <div className="p-3 rounded-full bg-white/20 border border-white/20 mb-2">
                <CameraIcon className="size-6 text-white" />
              </div>
              <span className="text-white text-sm font-semibold tracking-wide uppercase">
                {previewUrl ? "Replace Artwork" : "Choose Artwork"}
              </span>
            </div>
          </div>

          <input
            title="Upload theme preview"
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </Field>
      </FieldGroup>
    </div>
  );
};

export default DashboardThemeEditorPreview;
