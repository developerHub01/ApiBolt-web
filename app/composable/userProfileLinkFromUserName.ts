export const userProfileLinkFromUserName = (userName?: string) => {
  return computed(() => (userName ? `/profile/${userName}` : null));
};
