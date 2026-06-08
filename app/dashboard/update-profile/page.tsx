import * as motion from "motion/react-client";
import { DEFAULT_PROFILE_COVER } from "@/constant/profile.constant";
import { ProfileService } from "@/server/v1/modules/profile/profile.service";
import { getUserAction } from "@/lib/actions/auth/actions";
import ProfileUpdateForm from "@/components/app/dashboard/update-profile/ProfileUpdateForm";
import NotFound from "@/components/ui/not-found";

const getProfile = async (id: string) =>
  await ProfileService.getProfileById(id);

const Page = async () => {
  const user = (await getUserAction())!;
  const profile = await getProfile(user.id);

  if (!profile)
    return <NotFound description="Profile not found" showCTA={false} />;

  return (
    <motion.section
      className="w-full h-full flex flex-col items-center py-10"
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <ProfileUpdateForm
        initialData={{
          fullName: profile.full_name ?? "",
          bio: profile.bio ?? "",
          avatarUrl: profile.avatar_url ?? "",
          coverUrl: profile.cover_url ?? DEFAULT_PROFILE_COVER,
        }}
      />
    </motion.section>
  );
};

export default Page;
