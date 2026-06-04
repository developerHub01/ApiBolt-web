import { Metadata } from "next";
import Link from "next/link";
import { API_URL, SITE_URL } from "@/constant/index.constant";
import ThemesSearch from "@/components/app/public/themes/ThemesSearch";
import ThemesCard from "@/components/app/public/themes/ThemesCard";
import ThemePagination from "@/components/app/public/themes/ThemePagination";
import { ApiResponse } from "@/server/types";
import { ThemeMetaResponse } from "@/types/server/themes.types";

interface Props {
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
    searchFilter?: string;
  }>;
}

const defaultThemesMeta = {
  themeList: [],
  totalCount: 0,
  totalThemeCount: 0,
};

const fetchThemes = async (
  page: number,
  pageSize: number,
  searchTerm: string,
  searchFilter: string,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    ...(searchTerm && { searchTerm }),
    ...(searchFilter !== "all" && { searchFilter }),
  });

  const res = await fetch(
    `${API_URL}/client/themes/meta?${params.toString()}`,
    {
      next: {
        revalidate: 120,
      },
    },
  );

  if (!res.ok) return defaultThemesMeta;

  const json: ApiResponse<ThemeMetaResponse> = await res.json();

  if (!json.success || !json.data) return defaultThemesMeta;

  return {
    themeList: json.data.data,
    totalCount: json.data.meta.total,
    totalThemeCount: json.data.meta.totalThemeCount,
  };
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const params = await searchParams;
  const searchTerm = params.searchTerm || "";

  const title = searchTerm
    ? `Results for "${searchTerm}" | APIBolt Theme Marketplace`
    : "Explore APIBolt Community Themes | Professional UI Theme Marketplace";

  const description = searchTerm
    ? `Browse themes matching "${searchTerm}" for the APIBolt desktop app.`
    : "Explore and download custom themes for APIBolt.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`${SITE_URL}/og.png`],
      url: `${SITE_URL}/themes`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  };
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const searchTerm = params.searchTerm || "";
  const themeType = params.searchFilter || "all";
  const pageSize = 6;

  const { themeList, totalCount, totalThemeCount } = await fetchThemes(
    currentPage,
    pageSize,
    searchTerm,
    themeType,
  );

  return (
    <section className="w-full h-full flex flex-col gap-8 container mx-auto px-6 pt-40 md:pt-45 pb-20">
      <div className="fixed top-1/4 -left-20 size-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 size-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <ThemesSearch
        key={`${searchTerm}-${themeType}`}
        initialSearchTerm={searchTerm}
        initialThemeType={themeType}
        totalThemeCount={totalThemeCount}
      />

      <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themeList.length ? (
          themeList.map((theme) => (
            <Link key={theme.id} href={`/theme/${theme.id}`} target="_blank">
              <ThemesCard
                {...theme}
                canDelete={false}
                showLink={false}
                className="pointer-events-none"
              />
            </Link>
          ))
        ) : (
          <section className="w-full py-20 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted min-h-96">
            <div className="text-center">
              <p className="text-xl font-semibold">No themes found</p>
            </div>
          </section>
        )}
      </div>

      <ThemePagination
        total={totalCount}
        pageSize={pageSize}
        currentPage={currentPage}
        searchTerm={searchTerm}
        themeType={themeType}
      />
    </section>
  );
};

export default Page;
