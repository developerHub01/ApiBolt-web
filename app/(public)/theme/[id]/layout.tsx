import React from "react";
import { Metadata } from "next";
import { API_URL, SITE_URL } from "@/constant/index.constant";
import { ApiResponse } from "@/types/server/api.types";
import { ThemeInterface } from "@/types/theme.types";

interface Props {
  children: React.ReactNode;
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { id: themeId } = await params;

  try {
    const res = await fetch(`${API_URL}/client/themes/details/${themeId}`, {
      next: {
        revalidate: 60,
      },
    });
    const json: ApiResponse<ThemeInterface> = await res.json();

    if (!json.success || !json.data)
      return {
        title: "Theme not found | APIBolt Marketplace",
        description:
          "The requested theme could not be found in the APIBolt community marketplace.",
      };

    const theme = json.data;

    const seoTitle = `${theme.name} Theme for APIBolt | Professional UI Style`;
    const seoDescription = `Check out the "${theme.name}" theme created by ${theme.author} (@${theme.authorUsername}) for APIBolt.`;
    const seoImage = theme.thumbnail
      ? theme.thumbnail.startsWith("http")
        ? theme.thumbnail
        : `${SITE_URL}${theme.thumbnail}`
      : `${SITE_URL}/og.png`;

    return {
      title: seoTitle,
      description: seoDescription,
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        images: [seoImage],
        url: `${SITE_URL}/themes/${themeId}`,
      },
      twitter: {
        card: "summary_large_image",
        title: seoTitle,
        description: seoDescription,
        images: [seoImage],
      },
    };
  } catch {
    return {
      title: "Theme not found | APIBolt Marketplace",
    };
  }
};

const Layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Layout;
