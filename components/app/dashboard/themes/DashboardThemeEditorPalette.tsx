"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FieldLabel } from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Copy as CopyIcon,
  ClipboardPaste as PasteIcon,
  CloudDownload as DownloadIcon,
  RotateCcw as ResetIcon,
  Import as ImportIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { DEFAULT_THEME_PALETTE } from "@/constant/default-theme.constant";
import { isValidColor } from "@/utils/color.utils";
import { ThemeInterface } from "@/types/themes.types";
import DashboardThemeEditorPaletteRow from "@/components/app/dashboard/themes/DashboardThemeEditorPaletteRow";

interface ActionButton {
  id: "copy" | "paste" | "download" | "import" | "reset";
  Icon: LucideIcon;
  label: string;
}

const ACTION_BUTTON_LIST: Array<ActionButton> = [
  {
    id: "copy",
    Icon: CopyIcon,
    label: "Copy clipboard",
  },
  {
    id: "paste",
    Icon: PasteIcon,
    label: "Paste your clipboard",
  },
  {
    id: "download",
    Icon: DownloadIcon,
    label: "Download palette as JSON",
  },
  {
    id: "import",
    Icon: ImportIcon,
    label: "Import JSON palette into editor",
  },
  {
    id: "reset",
    Icon: ResetIcon,
    label: "Reset palette to current theme",
  },
];

interface Props {
  palette: ThemeInterface["palette"];
  onPaletteChange: (palette: ThemeInterface["palette"]) => void;
}

const DashboardThemeEditorPalette = ({ palette, onPaletteChange }: Props) => {
  const handlePaletteModifier = async (
    type: ActionButton["id"],
  ): Promise<void> => {
    switch (type) {
      case "copy": {
        await navigator.clipboard.writeText(JSON.stringify(palette, null, 2));
        toast.success("Copied success", {
          description: "Palette copied to clipboard",
        });
        break;
      }
      case "paste": {
        const text = await navigator.clipboard.readText();
        try {
          const payload = JSON.parse(text) as ThemeInterface["palette"];
          if (Object.values(payload).some((c) => !isValidColor(c))) {
            toast.error("Paste error", {
              description: "Palette is not valid.",
            });
            return;
          }
          onPaletteChange(payload);
          toast.success("Paste success");
        } catch {
          toast.error("Paste error", { description: "Invalid JSON" });
        }
        break;
      }
      case "reset": {
        onPaletteChange({ ...DEFAULT_THEME_PALETTE });
        toast.success("Reset success");
        break;
      }
      case "download": {
        const blob = new Blob([JSON.stringify(palette, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement("a"), {
          href: url,
          download: "theme-palette.json",
        });
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Download success");
        break;
      }
      case "import": {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.style.display = "none";
        input.onchange = async (e: Event) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file) return;
          const importedText = await file.text();
          try {
            const payload = JSON.parse(importedText) as Record<string, string>;
            if (Object.values(payload).some((c) => !isValidColor(c))) {
              toast.error("Import error", {
                description: "Invalid JSON palette",
              });
              return;
            }
            onPaletteChange(payload);
            toast.success("Import success");
          } catch {
            toast.error("Import error");
          }
        };
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
        break;
      }
    }
  };

  return (
    <section className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <FieldLabel className="text-base font-semibold">
          Color Palette
        </FieldLabel>
        <div className="flex gap-2">
          {ACTION_BUTTON_LIST.map(({ id, Icon, label }) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="size-9 rounded-full bg-muted/20 border-white/5 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  onClick={() => handlePaletteModifier(id)}
                >
                  <Icon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <ScrollArea className="w-full h-100 bg-muted/20 border border-white/5 p-4 rounded-2xl shadow-inner overflow-hidden">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3 pr-2">
          {Object.entries(palette).map(([name, color]) => (
            <DashboardThemeEditorPaletteRow
              key={name}
              name={name}
              color={color}
              onChange={(newColor) =>
                onPaletteChange({ ...palette, [name]: newColor.toLowerCase() })
              }
            />
          ))}
        </section>
      </ScrollArea>
    </section>
  );
};

export default DashboardThemeEditorPalette;
