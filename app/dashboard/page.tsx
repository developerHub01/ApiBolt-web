import { Suspense } from "react";
import type { ProfileInterface } from "@/types/profile.types";
import type { ApiResponse } from "@/server/types";
import ProfileTop from "@/components/app/public/profile/ProfileTop";
import ProfileTopThemes from "@/components/app/dashboard/profile/ProfileTopThemes";
import ProfileUserDetailsSkeleton from "@/components/app/public/profile/ProfileUserDetailsSkeleton";
import { API_URL } from "@/constant/index.constant";

const fetchProfile =
  async (): Promise<ApiResponse<ProfileInterface> | null> => {
    try {
      const response = await fetch(`${API_URL}/profile`, {
        cache: "no-store",
      });
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    }
  };

const Page = async () => {
  const data = await fetchProfile();

  return (
    <section className="max-w-4xl mx-auto">
      <Suspense fallback={<ProfileUserDetailsSkeleton />}>
        {!data || !data.data || !data.success ? (
          <ProfileUserDetailsSkeleton />
        ) : (
          <>
            <ProfileTop profile={data.data} />
            <ProfileTopThemes
              themes={data.data.themes}
              author={data.data.user_name}
            />
          </>
        )}
      </Suspense>
    </section>
  );
};

export default Page;
