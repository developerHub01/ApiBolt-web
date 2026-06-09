"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import DashboardProfileUpdateHeader from "@/components/app/dashboard/update-profile/DashboardProfileUpdateHeader";
import DashboardProfileUpdateAssetInfo from "@/components/app/dashboard/update-profile/DashboardProfileUpdateAssetInfo";
import DashboardProfileUpdateBasicInfo from "@/components/app/dashboard/update-profile/DashboardProfileUpdateBasicInfo";
import useProfileEditStore from "@/store/dashboard/profile-edit.store";
import { DEFAULT_PROFILE_COVER } from "@/constant/profile.constant";
import { updateProfileAction } from "@/lib/actions/profile/actions";

interface Props {
  initialData: {
    fullName: string;
    bio: string;
    avatarUrl: string;
    coverUrl: string;
  };
}

const ProfileUpdateForm = ({ initialData }: Props) => {
  const router = useRouter();
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  const fullName = useProfileEditStore((state) => state.fullName);
  const bio = useProfileEditStore((state) => state.bio);
  const avatarUrl = useProfileEditStore((state) => state.avatarUrl);
  const coverUrl = useProfileEditStore((state) => state.coverUrl);
  const avatarFile = useProfileEditStore((state) => state.avatarFile);
  const coverFile = useProfileEditStore((state) => state.coverFile);
  const isSubmitting = useProfileEditStore((state) => state.isSubmitting);
  const serverBaseline = useProfileEditStore((state) => state.serverBaseline);

  const setFullName = useProfileEditStore((state) => state.setFullName);
  const setBio = useProfileEditStore((state) => state.setBio);
  const setAvatarUrl = useProfileEditStore((state) => state.setAvatarUrl);
  const setCoverUrl = useProfileEditStore((state) => state.setCoverUrl);
  const setAvatarFile = useProfileEditStore((state) => state.setAvatarFile);
  const setCoverFile = useProfileEditStore((state) => state.setCoverFile);
  const setIsSubmitting = useProfileEditStore((state) => state.setIsSubmitting);
  const setServerBaseline = useProfileEditStore(
    (state) => state.setServerBaseline,
  );
  const resetToBaseline = useProfileEditStore((state) => state.resetToBaseline);

  if (!hasInitialized) {
    setServerBaseline({
      fullName: initialData.fullName.trim(),
      bio: initialData.bio.trim(),
    });
    setFullName(initialData.fullName);
    setBio(initialData.bio);
    setAvatarUrl(initialData.avatarUrl);
    setCoverUrl(initialData.coverUrl || DEFAULT_PROFILE_COVER);
    setHasInitialized(true);
  }

  const hasUnsavedChanges = useMemo(() => {
    if (!serverBaseline) return false;
    const textChanged =
      fullName.trim() !== serverBaseline.fullName ||
      bio.trim() !== serverBaseline.bio;
    const filesChanged = !!(avatarFile || coverFile);
    return textChanged || filesChanged;
  }, [fullName, bio, avatarFile, coverFile, serverBaseline]);

  const handleReset = () => {
    resetToBaseline();
    toast.info("Changes discarded");
  };

  const handleSubmit = async (formData: FormData) => {
    if (!hasUnsavedChanges || isSubmitting) return;

    setIsSubmitting(true);

    try {
      formData.append("fullName", fullName);
      formData.append("bio", bio);
      if (avatarFile) formData.append("avatar", avatarFile);
      if (coverFile) formData.append("cover", coverFile);

      const result = await updateProfileAction(formData);

      if (result.success && result.data) {
        const updated = result.data;

        setServerBaseline({
          fullName: updated.full_name?.trim() ?? "",
          bio: updated.bio?.trim() ?? "",
        });
        setFullName(updated.full_name ?? "");
        setBio(updated.bio ?? "");
        setAvatarUrl(updated.avatar_url ?? "");
        setCoverUrl(updated.cover_url ?? DEFAULT_PROFILE_COVER);
        setAvatarFile(null);
        setCoverFile(null);

        toast.success("Profile Updated");

        router.refresh();
      } else
        toast.error("Update Failed", {
          description: result.message || "An unexpected error occurred.",
        });
    } catch {
      toast.error("Update Failed", {
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-4xl flex flex-col gap-8"
    >
      <Card className="w-full border border-white/10 bg-card/40 backdrop-blur-xl shadow-2xl rounded-3xl p-4 md:p-8 flex flex-col gap-8">
        <DashboardProfileUpdateHeader />
        <CardContent className="w-full flex flex-col gap-2 p-0">
          <DashboardProfileUpdateAssetInfo
            avatarUrl={avatarUrl}
            coverUrl={coverUrl}
            onAvatarChange={setAvatarFile}
            onCoverChange={setCoverFile}
          />
          <DashboardProfileUpdateBasicInfo
            fullName={fullName}
            bio={bio}
            onFullNameChange={setFullName}
            onBioChange={setBio}
          />
        </CardContent>
        <CardFooter className="w-full flex gap-4 justify-end pt-6">
          {hasUnsavedChanges && (
            <Button
              type="button"
              variant="outline"
              className="rounded-full shadow-xl"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Reset
            </Button>
          )}
          <Button
            type="submit"
            className="rounded-full shadow-xl"
            disabled={isSubmitting || !fullName.trim() || !hasUnsavedChanges}
          >
            {isSubmitting && <Spinner className="mr-2" />}
            <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ProfileUpdateForm;
