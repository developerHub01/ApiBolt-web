<template>
  <section class="w-full flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <FieldLabel class="text-base font-semibold">Color Palette</FieldLabel>
      <div class="flex gap-2">
        <TooltipProvider
          v-for="{ id, Icon, label } in ACTION_BUTTON_LIST"
          :key="id"
        >
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                variant="outline"
                size="icon"
                class="size-9 rounded-full bg-muted/20 border-white/5 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                @click="() => handlePaletteModifier(id)"
              >
                <component :is="Icon" class="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent align="end">
              <p>{{ label }}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>

    <ScrollArea
      data-lenis-prevent
      class="w-full h-[400px] bg-muted/20 border border-white/5 p-4 rounded-2xl shadow-inner overflow-hidden"
    >
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-3 pr-2">
        <DashboardThemeEditorPaletteRow
          v-for="(color, name) in props.palette"
          :key="name"
          :name="name"
          :color="color"
          v-model="props.palette[name]!"
        />
      </section>
    </ScrollArea>
  </section>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import { FieldLabel } from "@/components/ui/field";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Copy as CopyIcon,
  ClipboardPaste as PasteIcon,
  CloudDownload as DownloadIcon,
  RotateCcw as ResetIcon,
  Import as ImportIcon,
} from "lucide-vue-next";
import type { LucideIcon } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { DEFAULT_THEME_PALETTE } from "~/constant/default-theme.constant";

type Palette = Record<string, string>;

interface ActionButton {
  id: "copy" | "paste" | "download" | "import" | "reset";
  Icon: LucideIcon;
  label: string;
}

const props = defineProps<{
  palette: Palette;
}>();
const emit = defineEmits<{
  (e: "update:palette", value: Palette): void;
}>();

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
const handlePaletteModifier = async (
  type: ActionButton["id"],
): Promise<void> => {
  switch (type) {
    case "copy": {
      await navigator.clipboard.writeText(
        JSON.stringify(props.palette, null, 2),
      );
      toast.success("Copied success", {
        description: "Palette copied to clipboard",
      });
      break;
    }
    case "paste": {
      const text = await navigator.clipboard.readText();
      const payload = JSON.parse(text) as Record<string, string>;
      if (Object.values(payload).some((c) => !isValidColor(c))) {
        toast.error("Paste error", {
          description: "Palette is not valid. Couldn't paste",
        });
        return;
      }
      emit("update:palette", payload);
      toast.success("Paste success", {
        description: "Palette pasted successfully.",
      });
      break;
    }
    case "reset": {
      emit("update:palette", {
        ...DEFAULT_THEME_PALETTE,
      });
      toast.success("Reset success", {
        description: "Theme palette reset successfully.",
      });
      break;
    }
    case "download": {
      try {
        const blob = new Blob([JSON.stringify(props.palette, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = Object.assign(document.createElement("a"), {
          href: url,
          download: "theme-palette.json",
        });
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Download success", {
          description: "Theme palette downloaded successfully.",
        });
      } catch {
        toast.error("Download error", {
          description: "Something went wrong. Can't download.",
        });
      }
      break;
    }
    case "import": {
      try {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.style.display = "none";

        input.onchange = async (e: Event) => {
          const target = e.target as HTMLInputElement;
          if (!target.files || !target.files[0]) return;

          const file = target.files[0];
          const text = await file.text();
          const payload = JSON.parse(text) as Record<string, string>;

          if (
            typeof payload !== "object" ||
            Object.values(payload).some((c) => !isValidColor(c))
          ) {
            toast.error("Import error", {
              description: "Invalid JSON palette",
            });
            return;
          }

          emit("update:palette", payload);
          toast.success("Import success", {
            description: "Theme palette imported successfully.",
          });
        };

        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
      } catch {
        toast.error("Import error", { description: "Invalid JSON palette" });
      }
      break;
    }
  }
};
</script>
