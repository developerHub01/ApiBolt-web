"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import useThemeEditorStore from "@/store/dashboard/theme-editor.store";

interface Props {
  maxLength?: number;
}

const DashboardThemeEditorDescription = ({ maxLength = 500 }: Props) => {
  const description = useThemeEditorStore((state) => state.description);
  const setDescription = useThemeEditorStore((state) => state.setDescription);

  return (
    <div className="grid gap-6">
      <Field>
        <FieldLabel
          htmlFor="theme-description"
          className="text-base font-medium"
        >
          Theme Description
          {maxLength && (
            <span className="text-xs text-muted-foreground ml-2 font-normal">
              ({description.length}/{maxLength} characters)
            </span>
          )}
        </FieldLabel>
        <Textarea
          id="theme-description"
          placeholder="Describe your theme's style, inspiration, and key features..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={maxLength}
          className="w-full resize-none min-h-40 bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all p-4 leading-relaxed"
        />
      </Field>
    </div>
  );
};

export default DashboardThemeEditorDescription;
