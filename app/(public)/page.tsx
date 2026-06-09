import Hero from "@/components/app/public/home/hero/Hero";
import VideoSection from "@/components/app/public/home/VideoSection";
import InstallationStats from "@/components/app/public/home/InstallationStats";
import Features from "@/components/app/public/home/Features";
import FakeApiSection from "@/components/app/public/home/FakeApiSection";
import CallToAction from "@/components/app/public/home/CallToAction";

const Page = () => {
  return (
    <main className="min-h-screen w-full bg-background text-foreground font-sans mx-auto">
      <Hero />
      <VideoSection />
      <InstallationStats />
      <Features />
      <FakeApiSection />
      <CallToAction />
    </main>
  );
};

export default Page;
