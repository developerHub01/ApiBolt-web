import { Metadata } from "next";
import { notFound } from "next/navigation";
import { API_URL, SITE_URL } from "@/constant/index.constant";
import { ApiResponse } from "@/server/types";
import type { ProfileInterface } from "@/types/profile.types";
import ProfileTop from "@/components/app/public/profile/ProfileTop";
import ProfileAllThemesByUserName from "@/components/app/public/profile/ProfileAllThemesByUserName";

interface Params {
  username: string;
}

interface Props {
  params: Promise<Params>;
  searchParams: Promise<{
    page?: string;
    searchTerm?: string;
    searchFilter?: string;
  }>;
}

const fetchProfile = async (username: string) => {
  const res = await fetch(`${API_URL}/profile/${username}`, {
    next: {
      revalidate: 120,
    },
  });

  if (!res.ok) return null;

  const json: ApiResponse<ProfileInterface> = await res.json();
  if (!json.success || !json.data) return null;

  return json.data;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { username } = await params;
  const profile = await fetchProfile(username);

  const title = profile
    ? `${profile.user_name} user profile`
    : "User profile not found";
  const description = profile
    ? `${profile.user_name} user profile, with full name ${profile.full_name} - APIBolt.`
    : "Following user profile not found - APIBolt.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`${SITE_URL}/og.png`],
      url: `${SITE_URL}/profile/${username}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og.png`],
    },
  };
};

const Page = async ({ params, searchParams }: Props) => {
  const { username } = await params;
  const profile = await fetchProfile(username);

  if (!profile) notFound();

  return (
    <section className="w-full container mx-auto flex flex-col pt-30">
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 bg-primary/20 rounded-full blur-[150px] pointer-events-none opacity-50" />
        <ProfileTop profile={profile} className="p-4" />
      </div>
      <ProfileAllThemesByUserName
        username={username}
        searchParams={searchParams}
        className="px-4"
      />
    </section>
  );
};

export default Page;
