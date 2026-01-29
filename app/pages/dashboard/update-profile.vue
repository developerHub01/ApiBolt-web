<template>
  <form
    @submit.prevent="handleUpdate"
    class="w-full h-full grid place-items-center"
  >
    <Card class="w-full h-full border-0 gap-6 py-8 items-center max-w-4xl">
      <DashboardProfileUpdateHeader />
      <CardContent class="w-full flex flex-col gap-6 flex-1">
        <DashboardProfileUpdateAssetInfo
          :avatarUrl="profileData.avatarUrl"
          :coverUrl="profileData.coverUrl"
          @update:avatarFile="handleAvatarChange"
          @update:coverFile="handleCoverChange"
        />
        <DashboardProfileUpdateBasicInfo
          v-model:fullName="profileData.fullName"
          v-model:bio="profileData.bio"
        />
      </CardContent>
      <CardFooter class="w-full flex gap-2 justify-end">
        <Button
          type="submit"
          :disabled="
            isSubmitting || !profileData.fullName.trim() || !hasUnsavedChanges
          "
        >
          <Spinner v-if="isSubmitting" />
          <span v-if="isSubmitting">Updating...</span>
          <span v-else>Update</span>
        </Button>
      </CardFooter>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { toast } from "vue-sonner";
import { FetchError } from "ofetch";
import { DEFAULT_PROFILE_COVER } from "~/constant/profile.constant";
import type { ProfileMetaInterface } from "~/types/profile.types";
import type { ApiResponse } from "~~/server/types";

const isSubmitting = ref(false);

const serverBaseline = shallowRef<{
  fullName: string;
  bio: string;
} | null>(null);

const profileData = reactive({
  fullName: "",
  bio: "",
  avatarUrl: "",
  coverUrl: "",
  avatarFile: null as File | null,
  coverFile: null as File | null,
});

const { data: response } = await useFetch<ApiResponse<ProfileMetaInterface>>(
  "/api/v1/profile-meta",
);

if (response.value?.data) {
  const profile = response.value.data;
  profileData.fullName = profile.full_name;
  profileData.bio = profile.bio ?? "";
  profileData.avatarUrl = profile.avatar_url;
  profileData.coverUrl = profile.cover_url ?? DEFAULT_PROFILE_COVER;

  serverBaseline.value = {
    fullName: profile.full_name.trim(),
    bio: profile.bio?.trim() ?? "",
  };
}

const hasUnsavedChanges = computed(() => {
  const textChanged =
    profileData.fullName.trim() !== serverBaseline.value?.fullName ||
    profileData.bio.trim() !== serverBaseline.value?.bio;

  const filesChanged = !!(profileData.avatarFile || profileData.coverFile);

  return textChanged || filesChanged;
});

const handleAvatarChange = (file: File) => {
  profileData.avatarFile = file;
  profileData.avatarUrl = URL.createObjectURL(file);
};

const handleCoverChange = (file: File) => {
  profileData.coverFile = file;
  profileData.coverUrl = URL.createObjectURL(file);
};

const handleUpdate = async () => {
  if (!hasUnsavedChanges.value || isSubmitting.value) return;

  isSubmitting.value = true;

  const formData = new FormData();
  formData.append("fullName", profileData.fullName);
  formData.append("bio", profileData.bio);

  if (profileData.avatarFile) formData.append("avatar", profileData.avatarFile);
  if (profileData.coverFile) formData.append("cover", profileData.coverFile);

  try {
    const res = await $fetch<ApiResponse<ProfileMetaInterface>>(
      "/api/v1/profile",
      {
        method: "PATCH",
        body: formData,
      },
    );

    if (res.success && res.data) {
      const updated = res.data;
      const cacheBuster = `?t=${Date.now()}`;

      serverBaseline.value = {
        fullName: updated.full_name?.trim(),
        bio: updated.bio?.trim() ?? "",
      };

      profileData.fullName = updated.full_name;
      profileData.bio = updated.bio ?? "";
      profileData.avatarUrl = updated.avatar_url + cacheBuster;
      profileData.coverUrl =
        (updated.cover_url ?? DEFAULT_PROFILE_COVER) + cacheBuster;

      profileData.avatarFile = null;
      profileData.coverFile = null;

      toast.success("Profile Updated", {
        description: "Your changes have been saved.",
      });
    }
  } catch (err) {
    const error = err as FetchError<ApiResponse<null>>;
    console.error("Update failed:", error);

    toast.error("Update Failed", {
      description: error.data?.message || "An unexpected error occurred.",
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>
