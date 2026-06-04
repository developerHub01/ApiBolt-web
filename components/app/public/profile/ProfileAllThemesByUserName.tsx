import Link from "next/link";
import { API_URL } from "@/constant/index.constant";
import ThemesSearch from "@/components/app/public/themes/ThemesSearch";
import ThemesCard from "@/components/app/public/themes/ThemesCard";
import ThemePagination from "@/components/app/public/themes/ThemePagination";
import { ApiResponse } from "@/server/types";
import { ThemeMetaResponse } from "@/types/server/themes.types";

interface SearchParams {
  page?: string;
  searchTerm?: string;
  searchFilter?: string;
}

interface Props {
  username: string;
  searchParams: Promise<SearchParams>;
  className?: string;
}

const defaultThemesMeta = {
  themeList: [],
  totalCount: 0,
  totalThemeCount: 0,
};

const fetchThemesByUser = async (
  username: string,
  page: number,
  pageSize: number,
  searchTerm: string,
  searchFilter: string,
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    userName: username,
    ...(searchTerm && { searchTerm }),
    ...(searchFilter !== "all" && {
      searchFilter,
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

const ProfileAllThemesByUserName = async ({
  username,
  searchParams,
  className,
}: Props) => {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const searchTerm = params.searchTerm || "";
  const themeType = params.searchFilter || "all";
  const pageSize = 6;

  const { themeList, totalCount, totalThemeCount } = await fetchThemesByUser(
    username,
    currentPage,
    pageSize,
    searchTerm,
    themeType,
  );

  return (
    <section
      className={`w-full flex flex-col gap-8 relative ${className || ""}`}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-170 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <ThemesSearch
        key={`${searchTerm}-${themeType}`}
        initialSearchTerm={searchTerm}
        initialThemeType={themeType}
        totalThemeCount={totalThemeCount}
        title={
          <>
            All themes by{" "}
            <span className="border-b-2 border-primary text-primary">
              {username}
            </span>
          </>
        }
      />

      <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {themeList.length ? (
          themeList.map((theme) => (
            <Link key={theme.id} href={`/theme/${theme.id}`} target="_blank">
              <ThemesCard
                {...theme}
                canDelete={false}
                showLink={false}
                showAuthor={false}
              />
            </Link>
          ))
        ) : (
          <section className="w-full py-20 flex flex-col items-center justify-center border-2 border-dashed rounded-xl border-muted min-h-96">
            <p className="text-xl font-semibold">No themes found</p>
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

export default ProfileAllThemesByUserName;
