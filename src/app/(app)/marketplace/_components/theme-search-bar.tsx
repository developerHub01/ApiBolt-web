import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const THEME_TYPE = ["all", "light", "dark", "custom"];

const ThemeSearchbar = () => {
  return (
    <div className="w-full px-10 py-20 flex justify-center items-center min-h-[60vh]">
      <div className="w-full max-w-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="p-2 border rounded-full flex">
          <Input
            className="w-full border-0 bg-transparent dark:bg-transparent focus-visible:border-0 focus-visible:ring-transparent text-sm"
            placeholder="Search theme by name or id"
          />
          <ButtonGroup>
            <Select>
              <SelectTrigger className="capitalize min-w-30">
                <SelectValue placeholder="Theme type" />
              </SelectTrigger>
              <SelectContent>
                {THEME_TYPE.map((id) => (
                  <SelectItem key={id} value={id} className="capitalize">
                    {id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="secondary"
              size={"icon"}
              className="rounded-e-full"
            >
              <SearchIcon />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default ThemeSearchbar;
