export const useAuth = () => {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  // console.log(user);

  const handleSignInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    console.log({
      data,
      error,
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    console.log({
      error,
    });

    if (!error) {
      // Remove session from browser manually
      localStorage.removeItem("supabase.auth.token");
      // force re-init of auth state
      window.location.reload();
    }
  };

  return {
    supabase,
    user,
    isLoggedIn: computed(() => !!user.value),
    avatar: computed(
      () =>
        user.value?.user_metadata?.avatar_url ?? "https://github.com/shadcn.png"
    ),
    name: computed(() => user.value?.user_metadata?.name ?? null),
    handleSignInWithGithub,
    handleLogout,
  };
};
