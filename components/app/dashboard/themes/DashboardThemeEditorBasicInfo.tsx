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
  name: string;
  themeType: TThemeType;
  maxLength?: number;
  onNameChange: (value: string) => void;
  onThemeTypeChange: (value: TThemeType) => void;
}

const DashboardThemeEditorBasicInfo = ({
  name,
  themeType,
  maxLength = 50,
  onNameChange,
  onThemeTypeChange,
}: Props) => {
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
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={maxLength}
          className="bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all"
        />
      </Field>

      <Field>
        <FieldLabel className="text-base font-medium">Category</FieldLabel>
        <Select value={themeType} onValueChange={onThemeTypeChange}>
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
