import { Suspense } from "react";
import ProfileTop from "@/components/app/public/profile/ProfileTop";
import ProfileTopThemes from "@/components/app/dashboard/profile/ProfileTopThemes";
import ProfileUserDetailsSkeleton from "@/components/app/public/profile/ProfileUserDetailsSkeleton";
import { FullProfileInterface } from "@/types/profiles.types";
import { ProfileService } from "@/server/v1/modules/profile/profile.service";
import { createClient } from "@/lib/supabase/server";

const getMyProfile = async (): Promise<FullProfileInterface | null> => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error();

    return await ProfileService.getFullProfileById(user.id);
  } catch {
    return null;
  }
};

const ProfileContent = async () => {
  const data = await getMyProfile();

  if (!data) return <ProfileUserDetailsSkeleton />;

  return (
    <>
      <ProfileTop profile={data} />
      <ProfileTopThemes themes={data.themes} author={data.user_name} />
    </>
  );
};

const Page = async () => {
  return (
    <section className="max-w-4xl mx-auto">
      <Suspense fallback={<ProfileUserDetailsSkeleton />}>
        <ProfileContent />
      </Suspense>
    </section>
  );
};

export default Page;
