"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import useThemeEditorStore from "@/store/dashboard/theme-editor.store";
import { isValidColor } from "@/utils/color.utils";

interface Props {
  name: string;
  initialColor: string;
}

const DashboardThemeEditorPaletteRow = ({ name, initialColor }: Props) => {
  const [localColor, setLocalColor] = useState<string>(initialColor);
  const [prevInitialColor, setPrevInitialColor] = useState<string>(initialColor);
  const setPalette = useThemeEditorStore((state) => state.setPalette);
  const currentPalette = useThemeEditorStore((state) => state.palette);

  if (initialColor !== prevInitialColor) {
    setPrevInitialColor(initialColor);
    setLocalColor(initialColor);
  }

  const isError = useMemo(() => !isValidColor(localColor), [localColor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalColor(newColor);

    if (isValidColor(newColor) && newColor !== currentPalette[name])
      setPalette({
        ...currentPalette,
        [name]: newColor.toLowerCase(),
      });
  };

  return (
    <div className="w-full flex items-center justify-between gap-2 p-3">
      <p className="line-clamp-1 flex-1 capitalize text-sm">
        {name.replaceAll("-", " ")}
      </p>
      <div
        className={cn(
          "flex gap-2 p-1 rounded-sm bg-background w-33 pr-2.5 border shadow shrink-0",
          {
            "border-destructive ring-1 ring-destructive": isError,
          },
        )}
      >
        <div
          className="size-7 rounded-xs border border-white/50 border-dashed shadow shrink-0"
          style={{
            background: localColor,
          }}
        />
        <div className="flex-1 border-b">
          <input
            id={name}
            value={localColor}
            placeholder={initialColor}
            onChange={handleChange}
            className="w-full px-0 py-0 border-0 bg-transparent focus-visible:ring-0 focus-visible:outline-0 rounded-none h-full text-center uppercase tracking-wide text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardThemeEditorPaletteRow;
