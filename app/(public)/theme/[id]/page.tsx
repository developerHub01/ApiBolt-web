import ThemesDetails from "@/components/app/public/themes/ThemesDetails";
import NotFound from "@/components/ui/not-found";
import { unstable_cache } from "next/cache";
import { ClientService } from "@/server/v1/modules/client/client.service";
import { ThemeDetailsInterface } from "@/types/themes.types";
import { Metadata } from "next";
import { SITE_URL } from "@/constant/index.constant";
import LiveViewers from "@/components/app/public/themes/LiveViewers";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const fetchTheme = unstable_cache(
  async (id: string) => await ClientService.getThemeDetailsById(id),
  ["theme_details_by_id"],
  {
    revalidate: 60 * 60,
  },
);

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;
  const theme = await fetchTheme(id);

  if (!theme)
    return {
      title: "Theme not found - APIBolt",
      description: "This theme does not exist or has been deleted.",
    };

  const title = `${theme.name} - APIBolt Theme`;
  const description = `Download and explore the ${theme.name} theme for APIBolt.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`${SITE_URL}/og.png`],
      url: `${SITE_URL}/theme/${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  };
};

const Page = async ({ params }: Props) => {
  const { id: themeId } = await params;
  let theme: ThemeDetailsInterface | null = null;
  let hasError = false;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    theme = await fetchTheme(themeId);
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
      <LiveViewers id={themeId} user={user} />
    </div>
  );
};

export default Page;
