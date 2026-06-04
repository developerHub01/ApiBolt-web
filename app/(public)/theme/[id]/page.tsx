import ThemesDetails from "@/components/app/public/themes/ThemesDetails";
import NotFound from "@/components/ui/not-found";
import type { ThemeInterface } from "@/types/theme.types";
import { ApiResponse } from "@/types/server/api.types";
import { API_URL } from "@/constant/index.constant";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const { id: themeId } = await params;
  let theme: ThemeInterface | null = null;
  let hasError = false;

  try {
    const res = await fetch(`${API_URL}/client/themes/details/${themeId}`, {
      next: {
        revalidate: 60,
      },
    });
    const json: ApiResponse<ThemeInterface> = await res.json();

    if (json.success && json.data) theme = json.data;
    else hasError = true;
  } catch {
    hasError = true;
  }

  if (hasError || !theme)
    return (
      <div className="w-full mx-auto pt-24 relative">
        <div className="absolute bottom-10 right-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <NotFound description="This theme not found. Maybe these theme not exist or author may deleted the theme." />
      </div>
    );

  return (
    <div className="w-full mx-auto pt-24 relative">
      <div className="absolute bottom-10 right-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <ThemesDetails {...theme} />
    </div>
  );
};

export default Page;
