const defaultBannerUrl =
  "https://images.unsplash.com/photo-1759661990336-51bd4b951fea?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ProfileTop = () => {
  return (
    <section
      className="w-full rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] min-h-36"
      style={{
        background: `url(${defaultBannerUrl})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        aspectRatio: 6 / 1.5,
      }}
    ></section>
  );
};

export default ProfileTop;
