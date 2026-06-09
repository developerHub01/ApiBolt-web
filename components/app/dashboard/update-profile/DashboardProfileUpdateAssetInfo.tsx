"use client";

import { useRef, ChangeEvent } from "react";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

interface Props {
  avatarUrl: string;
  coverUrl: string;
  onAvatarChange: (file: File) => void;
  onCoverChange: (file: File) => void;
}

const DashboardProfileUpdateAssetInfo = ({
  avatarUrl,
  coverUrl,
  onAvatarChange,
  onCoverChange,
}: Props) => {
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleClickCover = () => coverInputRef.current?.click();
  const handleClickAvatar = () => avatarInputRef.current?.click();

  const handleFileSelect = (
    event: ChangeEvent<HTMLInputElement>,
    type: "avatar" | "cover",
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (type === "avatar") onAvatarChange(file);
    else onCoverChange(file);
  };

  return (
    <div className="flex flex-col gap-6">
      <FieldGroup>
        <Field>
          <FieldLabel className="text-lg font-semibold mb-3">
            Profile Identity Assets
          </FieldLabel>

          {/* Cover Upload */}
          <div
            className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-white/5 shadow-xl bg-muted/30"
            onClick={handleClickCover}
          >
            <AspectRatio ratio={16 / 4}>
              <Image
                src={coverUrl}
                alt="profile cover"
                fill
                className="object-cover transition-transform duration-500"
              />
            </AspectRatio>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <CameraIcon className="size-8 text-white mb-2" />
              <span className="text-white text-sm font-medium">
                Change Cover Art
              </span>
            </div>
          </div>
          <input
            type="file"
            title="Upload profile cover"
            ref={coverInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileSelect(e, "cover")}
          />

          {/* Avatar Upload Overflow */}
          <div className="relative flex justify-center -mt-16 md:-mt-20 lg:-mt-24 z-20 pointer-events-none">
            <div className="pointer-events-auto">
              <div
                className="relative size-32 md:size-40 lg:size-48 rounded-full border-4 border-background bg-muted overflow-hidden group cursor-pointer shadow-2xl transition-transform"
                onClick={handleClickAvatar}
              >
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <CameraIcon className="size-8 text-white" />
                </div>
              </div>
              <input
                title="Upload profile avatar"
                type="file"
                ref={avatarInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileSelect(e, "avatar")}
              />
            </div>
          </div>
        </Field>
      </FieldGroup>
    </div>
  );
};

export default DashboardProfileUpdateAssetInfo;
