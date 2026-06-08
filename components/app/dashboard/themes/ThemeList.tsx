"use client";

import { useRouter } from "next/navigation";
import ThemesCard from "@/components/app/public/themes/ThemesCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ThemeMetaInterface } from "@/types/themes.types";
import { useThemesStore } from "@/store/dashboard/themes.store";
import { deleteThemeById } from "@/lib/actions/themes/actions";
import { toast } from "sonner";

interface Props {
  initialList: Array<ThemeMetaInterface>;
}

const ThemeList = ({ initialList }: Props) => {
  const router = useRouter();

  const deleteCandidateId = useThemesStore((state) => state.deleteCandidateId);
  const isDeleting = useThemesStore((state) => state.isDeleting);
  const setDeleteCandidate = useThemesStore(
    (state) => state.setDeleteCandidate,
  );
  const setIsDeleting = useThemesStore((state) => state.setIsDeleting);

  const handleDeleteTheme = async () => {
    if (!deleteCandidateId) return;

    setIsDeleting(true);
    const result = await deleteThemeById(deleteCandidateId);

    if (result) {
      toast.success("Theme deleted successfully");
      router.refresh();
    } else {
      toast.error("Failed to delete theme");
    }

    setIsDeleting(false);
    setDeleteCandidate(null);
  };

  return (
    <>
      <section className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {initialList.map((theme) => (
          <ThemesCard
            key={theme.id}
            {...theme}
            canDelete={true}
            canEdit={true}
            showAuthor={false}
            onDelete={() => setDeleteCandidate(theme.id)}
          />
        ))}
      </section>

      <AlertDialog
        open={Boolean(deleteCandidateId)}
        onOpenChange={(open) => !open && setDeleteCandidate(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              theme.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteCandidate(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTheme}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ThemeList;
