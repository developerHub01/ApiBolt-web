"use client";

import { useState, ChangeEvent, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionHeader from "@/components/app/common/SectionHeader";

type TThemeTypeSearch = "all" | "dark" | "light" | "custom";

interface ThemeTypeOption {
  id: TThemeTypeSearch;
  label: string;
}

interface Props {
  initialSearchTerm: string;
  initialThemeType: string;
  totalThemeCount: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
}

const themeTypeList: Array<ThemeTypeOption> = [
  {
    id: "all",
    label: "All Types",
  },
  {
    id: "dark",
    label: "Dark Themes",
  },
  {
    id: "light",
    label: "Light Themes",
  },
  {
    id: "custom",
    label: "Custom Themes",
  },
];

const ThemesSearch = ({
  initialSearchTerm,
  initialThemeType,
  totalThemeCount,
  title,
  description,
}: Props) => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [themeType, setThemeType] = useState<TThemeTypeSearch>(
    initialThemeType as TThemeTypeSearch,
  );

  const showClearSearch = searchTerm || themeType !== "all";

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.set("searchTerm", searchTerm);
    if (themeType !== "all") params.set("searchFilter", themeType);
    params.set("page", "1");

    router.push(`/marketplace?${params.toString()}`);
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    setThemeType("all");
    router.push("/marketplace");
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 py-10">
      <SectionHeader
        title={
          title ?? (
            <>
              <span className="text-primary">Theme</span> Market
            </>
          )
        }
        description={
          description ?? (
            <>
              {totalThemeCount > 0 ? (
                <>
                  Explore and share{" "}
                  <span className="inline-block bg-primary text-primary-foreground rounded-full px-3 py-1 mx-0.5 text-sm font-bold ring-1 ring-primary/30 backdrop-blur-sm shadow-[0_0_80px_0px] shadow-primary animate-pulse">
                    {totalThemeCount}+
                  </span>{" "}
                  custom themes to make your workspace truly yours.
                </>
              ) : (
                "Explore and share custom themes to make your workspace truly yours."
              )}
            </>
          )
        }
      />

      <form
        className="w-full max-w-2xl bg-card/40 backdrop-blur-md rounded-2xl border-2 border-white/10 p-2 flex flex-col sm:flex-row gap-2 shadow-2xl"
        onSubmit={handleSubmit}
      >
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
          <Input
            type="text"
            placeholder="Search themes..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            className="pl-10 border-transparent ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/50 hover:bg-muted/50 transition-colors h-full min-h-8"
          />
        </div>

        <div className="flex gap-2 border-white/5 h-full items-center">
          <Select
            value={themeType}
            onValueChange={(val: string) =>
              setThemeType(val as TThemeTypeSearch)
            }
          >
            <SelectTrigger className="flex-1 sm:w-32.5 border-0 bg-transparent focus:ring-0 shadow-none hover:bg-muted/20 h-full!">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {themeTypeList.map(({ id, label }) => (
                <SelectItem key={id} value={id}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="flex-1 sm:w-25" size={"lg"}>
            Search
          </Button>
        </div>
      </form>

      {showClearSearch && (
        <div className="flex gap-2 items-center animate-in fade-in slide-in-from-top-2">
          <Badge
            variant="secondary"
            className="h-8 px-4 cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors rounded-full"
            onClick={handleClearFilter}
          >
            Clear Filters
            <X className="w-3 h-3 ml-2" />
          </Badge>
        </div>
      )}
    </div>
  );
};

export default ThemesSearch;
