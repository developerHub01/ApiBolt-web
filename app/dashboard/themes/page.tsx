import { API_URL } from "@/constant/index.constant";
import ThemesSearch from "@/components/app/public/themes/ThemesSearch";
import ThemePagination from "@/components/app/public/themes/ThemePagination";
import { ApiResponse } from "@/server/types";
import { ThemeMetaResponse } from "@/types/themes.types";
import ThemeList from "@/components/app/dashboard/themes/ThemeList";

interface Props {
  searchParams: Promise<{
    page?: string;
    term?: string;
    filter?: string;
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
    byMe: "true",
    ...(searchTerm && {
      term: searchTerm,
    }),
    ...(searchFilter !== "all" && {
      filter: searchFilter,
    }),
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

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const searchTerm = params.term || "";
  const themeType = params.filter || "all";
  const pageSize = 6;

  const { themeList, totalCount, totalThemeCount } = await fetchThemes(
    currentPage,
    pageSize,
    searchTerm,
    themeType,
  );

  return (
    <section className="w-full h-full flex flex-col gap-8 container mx-auto px-6 py-10">
      <ThemesSearch
        key={`${searchTerm}-${themeType}`}
        initialSearchTerm={searchTerm}
        initialThemeType={themeType}
        totalThemeCount={totalThemeCount}
        title={<>My themes</>}
        description={
          <>Discover and share custom themes to personalize your workspace</>
        }
      />

      {themeList.length ? (
        <>
          <ThemeList initialList={themeList} />
          <ThemePagination
            total={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            searchTerm={searchTerm}
            themeType={themeType}
          />
        </>
      ) : (
        <section className="w-full py-20 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted min-h-96">
          <div className="text-center">
            <p className="text-xl font-semibold">No themes found</p>
          </div>
        </section>
      )}
    </section>
  );
};

export default Page;
