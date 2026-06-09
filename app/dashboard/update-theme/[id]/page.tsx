import ThemeEditForm from "@/components/app/dashboard/themes/ThemeEditForm";
import * as motion from "motion/react-client";
import { TThemeType } from "@/types/themes.types";
import { ThemesService } from "@/server/v1/modules/themes/themes.service";
import NotFound from "@/components/ui/not-found";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const getThemeDetails = async (id: string) =>
  await ThemesService.getThemeById(id);

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const theme = await getThemeDetails(id);

  if (!theme) return <NotFound description="Theme not found" showCTA={false} />;

  return (
    <motion.section
      className="w-full h-full flex flex-col items-center py-10"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <ThemeEditForm
        initialData={{
          id: theme.id,
          name: theme.name,
          themeType: theme.type as TThemeType,
          palette: theme.palette as Record<string, string>,
          description: theme.description ?? "",
          previewUrl: theme.preview,
        }}
      />
    </motion.section>
  );
};

export default Page;
