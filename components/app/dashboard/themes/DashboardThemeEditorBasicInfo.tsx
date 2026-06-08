"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import useThemeEditorStore from "@/store/dashboard/theme-editor.store";
import { TThemeType } from "@/types/themes.types";

const THEME_TYPE_LIST: Array<{
  id: TThemeType;
  label: string;
}> = [
  {
    id: "dark",
    label: "Dark",
  },
  {
    id: "light",
    label: "Light",
  },
  {
    id: "custom",
    label: "Custom",
  },
];

interface Props {
  maxLength?: number;
}

const DashboardThemeEditorBasicInfo = ({ maxLength = 50 }: Props) => {
  const name = useThemeEditorStore((state) => state.name);
  const themeType = useThemeEditorStore((state) => state.themeType);
  const setName = useThemeEditorStore((state) => state.setName);
  const setThemeType = useThemeEditorStore((state) => state.setThemeType);

  return (
    <div className="grid gap-6">
      <Field>
        <FieldLabel htmlFor="theme-name" className="text-base font-medium">
          Theme Name
          {maxLength && (
            <span className="text-xs text-muted-foreground ml-2 font-normal">
              ({name.length}/{maxLength} characters)
            </span>
          )}
        </FieldLabel>
        <Input
          id="theme-name"
          placeholder="e.g. Neon Horizon"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={maxLength}
          className="bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all"
        />
      </Field>

      <Field>
        <FieldLabel className="text-base font-medium">Category</FieldLabel>
        <Select
          value={themeType}
          onValueChange={(val) => setThemeType(val as TThemeType)}
        >
          <SelectTrigger className="h-12 bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all">
            <SelectValue placeholder="Select theme type" />
          </SelectTrigger>
          <SelectContent>
            {THEME_TYPE_LIST.map(({ id, label }) => (
              <SelectItem key={id} value={id}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-[10px] text-muted-foreground mt-1.5 uppercase tracking-wider">
          Helps users find your theme in the marketplace
        </p>
      </Field>
    </div>
  );
};

export default DashboardThemeEditorBasicInfo;
