<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Badge from "@/components/ui/badge/Badge.vue";
import {
  User as AuthorIcon,
  CloudDownload as DownloadIcon,
} from "lucide-vue-next";

const { onClose } = defineProps<{
  id?: string | null;
  onClose: () => void;
}>();

const handleClose = (open: boolean) => {
  if (!open) onClose();
};
</script>

<template>
  <Sheet :open="Boolean(id)" @update:open="handleClose">
    <SheetContent
      class="inset-5 h-auto ml-auto rounded-md border-0 w-10/12 sm:max-w-2xl gap-0"
    >
      <SheetHeader>
        <SheetTitle>Theme Name</SheetTitle>
        <SheetDescription class="hidden"></SheetDescription>
      </SheetHeader>
      <ScrollArea class="flex-1 min-h-0 p-4 border-y">
        <section class="w-full h-full flex flex-col gap-2 text-sm">
          <AspectRatio :ratio="16 / 9" class="bg-muted rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              alt="Photo by Drew Beamer"
              fill
              class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </AspectRatio>
          <div class="flex items-center gap-2 text-sm">
            <AuthorIcon :size="16" />
            <NuxtLink href="/profile/1">
              <Button variant="link" class="underline px-0 cursor-pointer">
                Username
              </Button>
            </NuxtLink>
            <Badge variant="secondary" class="ml-auto">Dark</Badge>
            <Badge variant="secondary"><DownloadIcon />10k</Badge>
          </div>
          <p v-for="value in Array.from({ length: 10 })">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, sunt
            provident facilis maiores corporis temporibus tempora officia nulla
            exercitationem vitae quisquam doloremque atque minima similique
            fugiat ut impedit rerum ad.
          </p>
        </section>
      </ScrollArea>
      <SheetFooter>
        <Button type="button" class="self-end">Install in app</Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
