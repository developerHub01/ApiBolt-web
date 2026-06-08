"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import DashboardThemeEditorHeader from "@/components/app/dashboard/themes/DashboardThemeEditorHeader";
import DashboardThemeEditorBasicInfo from "@/components/app/dashboard/themes/DashboardThemeEditorBasicInfo";
import DashboardThemeEditorPreview from "@/components/app/dashboard/themes/DashboardThemeEditorPreview";
import DashboardThemeEditorPalette from "@/components/app/dashboard/themes/DashboardThemeEditorPalette";
import DashboardThemeEditorDescription from "@/components/app/dashboard/themes/DashboardThemeEditorDescription";
import useThemeCreateStore from "@/store/dashboard/theme-create.store";
import { publishThemeAction } from "@/lib/actions/themes/actions";

const ThemeCreateForm = () => {
  const router = useRouter();

  const name = useThemeCreateStore((state) => state.name);
  const description = useThemeCreateStore((state) => state.description);
  const themeType = useThemeCreateStore((state) => state.themeType);
  const palette = useThemeCreateStore((state) => state.palette);
  const previewUrl = useThemeCreateStore((state) => state.previewUrl);
  const previewFile = useThemeCreateStore((state) => state.previewFile);
  const isSubmitting = useThemeCreateStore((state) => state.isSubmitting);

  const setName = useThemeCreateStore((state) => state.setName);
  const setThemeType = useThemeCreateStore((state) => state.setThemeType);
  const setPalette = useThemeCreateStore((state) => state.setPalette);
  const setDescription = useThemeCreateStore((state) => state.setDescription);
  const setPreviewFile = useThemeCreateStore((state) => state.setPreviewFile);
  const setIsSubmitting = useThemeCreateStore((state) => state.setIsSubmitting);
  const resetForm = useThemeCreateStore((state) => state.resetForm);

  const isFormValid = useMemo(
    () => name.trim() && description.trim() && previewFile,
    [name, description, previewFile],
  );

  const handleSubmit = async (formData: FormData) => {
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      formData.append("name", name);
      formData.append("description", description);
      formData.append("type", themeType);
      formData.append("palette", JSON.stringify(palette));
      formData.append("preview", previewFile!);

      const result = await publishThemeAction(formData);

      if (result.success) {
        toast.success("Theme Published");
        resetForm();
        router.push("/dashboard/themes");
      } else toast.error(result.message || "Failed to publish");
    } catch {
      toast.error("An unexpected error occurred");
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
        <DashboardThemeEditorHeader
          heading="Create New Masterpiece"
          description="Configure your palette, assets, and metadata to share with the community."
        />
        <CardContent className="w-full flex flex-col gap-8 p-0">
          <DashboardThemeEditorBasicInfo
            name={name}
            themeType={themeType}
            onNameChange={setName}
            onThemeTypeChange={setThemeType}
          />
          <DashboardThemeEditorPreview
            previewUrl={previewUrl}
            onPreviewChange={setPreviewFile}
          />
          <DashboardThemeEditorPalette
            palette={palette}
            onPaletteChange={setPalette}
          />
          <DashboardThemeEditorDescription
            description={description}
            onDescriptionChange={setDescription}
          />
        </CardContent>
        <CardFooter className="w-full flex gap-4 justify-end pt-6 border-white/5 px-0">
          <Button
            type="submit"
            className="rounded-full shadow-xl"
            disabled={isSubmitting || !isFormValid}
          >
            {isSubmitting && <Spinner className="mr-2" />}
            <span>
              {isSubmitting ? "Publishing Theme..." : "Publish to Marketplace"}
            </span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ThemeCreateForm;
