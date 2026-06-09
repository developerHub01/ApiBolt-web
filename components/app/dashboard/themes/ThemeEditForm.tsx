"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import DashboardThemeEditorHeader from "@/components/app/dashboard/themes/DashboardThemeEditorHeader";
import DashboardThemeEditorBasicInfo from "@/components/app/dashboard/themes/DashboardThemeEditorBasicInfo";
import DashboardThemeEditorPreview from "@/components/app/dashboard/themes/DashboardThemeEditorPreview";
import DashboardThemeEditorPalette from "@/components/app/dashboard/themes/DashboardThemeEditorPalette";
import DashboardThemeEditorDescription from "@/components/app/dashboard/themes/DashboardThemeEditorDescription";
import useThemeEditStore from "@/store/dashboard/theme-edit.store";
import { updateThemeAction } from "@/lib/actions/themes/actions";
import { ThemeInterface, TThemeType } from "@/types/themes.types";

interface Props {
  initialData: {
    id: string;
    name: string;
    themeType: TThemeType;
    palette: ThemeInterface["palette"];
    description: string;
    previewUrl: string;
  };
}

const ThemeEditForm = ({ initialData }: Props) => {
  const name = useThemeEditStore((state) => state.name);
  const description = useThemeEditStore((state) => state.description);
  const themeType = useThemeEditStore((state) => state.themeType);
  const palette = useThemeEditStore((state) => state.palette);
  const previewUrl = useThemeEditStore((state) => state.previewUrl);
  const previewFile = useThemeEditStore((state) => state.previewFile);
  const isSubmitting = useThemeEditStore((state) => state.isSubmitting);
  const serverBaseline = useThemeEditStore((state) => state.serverBaseline);

  const setName = useThemeEditStore((state) => state.setName);
  const setThemeType = useThemeEditStore((state) => state.setThemeType);
  const setPalette = useThemeEditStore((state) => state.setPalette);
  const setDescription = useThemeEditStore((state) => state.setDescription);
  const setPreviewUrl = useThemeEditStore((state) => state.setPreviewUrl);
  const setPreviewFile = useThemeEditStore((state) => state.setPreviewFile);
  const setIsSubmitting = useThemeEditStore((state) => state.setIsSubmitting);
  const setServerBaseline = useThemeEditStore(
    (state) => state.setServerBaseline,
  );
  const resetToBaseline = useThemeEditStore((state) => state.resetToBaseline);

  if (!serverBaseline) {
    setServerBaseline({
      name: initialData.name.trim(),
      themeType: initialData.themeType,
      palette: {
        ...initialData.palette,
      },
      description: initialData.description.trim(),
      previewUrl: initialData.previewUrl,
    });
    setName(initialData.name);
    setThemeType(initialData.themeType);
    setPalette(initialData.palette);
    setDescription(initialData.description);
    setPreviewUrl(initialData.previewUrl);
    setPreviewFile(null);
  }

  const isPaletteDirty = useMemo(() => {
    if (!serverBaseline) return false;
    return Object.keys(palette).some(
      (key) => palette[key] !== serverBaseline.palette[key],
    );
  }, [palette, serverBaseline]);

  const hasUnsavedChanges = useMemo(() => {
    if (!serverBaseline) return false;
    const textChanged =
      name.trim() !== serverBaseline.name ||
      themeType !== serverBaseline.themeType ||
      description.trim() !== serverBaseline.description;
    return textChanged || isPaletteDirty || !!previewFile;
  }, [
    name,
    description,
    themeType,
    previewFile,
    isPaletteDirty,
    serverBaseline,
  ]);

  const handleReset = () => {
    resetToBaseline();
    toast.info("Changes discarded");
  };

  const handleSubmit = async (formData: FormData) => {
    if (!hasUnsavedChanges) return;

    setIsSubmitting(true);

    try {
      if (name.trim() !== serverBaseline?.name)
        formData.append("name", name.trim());
      if (description.trim() !== serverBaseline?.description)
        formData.append("description", description.trim());
      if (themeType !== serverBaseline?.themeType)
        formData.append("type", themeType);
      if (isPaletteDirty) formData.append("palette", JSON.stringify(palette));
      if (previewFile) formData.append("preview", previewFile);

      const result = await updateThemeAction(initialData.id, formData);

      if (result.success) {
        setServerBaseline({
          name: name.trim(),
          themeType: themeType,
          palette: { ...palette },
          description: description.trim(),
          previewUrl: previewFile
            ? URL.createObjectURL(previewFile)
            : serverBaseline?.previewUrl || "",
        });
        setPreviewFile(null);
        toast.success("Theme Updated");
      } else toast.error(result.message || "Update Failed");
    } catch {
      toast.error("Update Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!serverBaseline)
    return (
      <Card className="w-full border border-white/10 bg-card/40 backdrop-blur-xl shadow-2xl rounded-3xl p-4 md:p-8">
        <div className="flex items-center justify-center h-64">
          <Spinner />
        </div>
      </Card>
    );

  return (
    <form
      action={handleSubmit}
      className="w-full max-w-4xl flex flex-col gap-8"
    >
      <Card className="w-full border border-white/10 bg-card/40 backdrop-blur-xl shadow-2xl rounded-3xl p-4 md:p-8 flex flex-col gap-8">
        <DashboardThemeEditorHeader
          heading="Edit Theme"
          description="Modify your theme settings and save changes to the gallery."
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
            type="button"
            variant="outline"
            className="rounded-full shadow-xl"
            disabled={isSubmitting || !hasUnsavedChanges}
            onClick={handleReset}
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="rounded-full shadow-xl"
            disabled={
              isSubmitting ||
              !description.trim() ||
              !name.trim() ||
              !hasUnsavedChanges
            }
          >
            {isSubmitting && <Spinner className="mr-2" />}
            <span>{isSubmitting ? "Updating..." : "Update Theme"}</span>
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default ThemeEditForm;
