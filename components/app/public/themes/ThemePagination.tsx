import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  total: number;
  pageSize: number;
  currentPage: number;
  searchTerm: string;
  themeType: string;
}

const getPages = ({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}): Array<number> => {
  const pages: Array<number> = [];
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, currentPage + 2);

  if (end - start < 4) {
    if (start === 1) end = Math.min(totalPages, 5);
    else if (end === totalPages) start = Math.max(1, totalPages - 4);
  }

  for (let i = start; i <= end; i++) pages.push(i);

  return pages;
};

const ThemePagination = ({
  total,
  pageSize,
  currentPage,
  searchTerm,
  themeType,
}: Props) => {
  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (themeType !== "all") params.set("searchFilter", themeType);
    params.set("page", page.toString());
    return `/marketplace?${params.toString()}`;
  };

  const pages = getPages({
    currentPage,
    totalPages,
  });

  return (
    <div className="flex flex-col gap-6">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? buildHref(currentPage - 1) : "#"}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={buildHref(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={currentPage < totalPages ? buildHref(currentPage + 1) : "#"}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ThemePagination;
