import { Metadata } from "next";
import Header from "@/components/app/common/header/Header";
import PublicDocsSidebar from "@/components/app/docs/PublicDocsSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SITE_URL } from "@/constant/index.constant";

export const metadata: Metadata = {
  title: {
    template: "%s | APIBolt Documentation",
    default: "Documentation | APIBolt",
  },
  description:
    "Complete documentation for APIBolt - the professional API testing desktop app. Learn about assertions, test organization, environment access, and advanced debugging.",
  openGraph: {
    title: "Documentation | APIBolt",
    description:
      "Complete documentation for APIBolt API testing. Master assertions, test organization, and advanced debugging.",
    url: `${SITE_URL}/docs`,
    siteName: "APIBolt",
    images: [`${SITE_URL}/og.png`],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation | APIBolt",
    description:
      "Complete documentation for APIBolt API testing. Master assertions, test organization, and advanced debugging.",
    images: [`${SITE_URL}/og.png`],
  },
};

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen w-full flex flex-col bg-background text-foreground overflow-hidden">
      <Header className="shrink-0 border-b border-border/40 z-20 bg-background/80 backdrop-blur-xl" />

      <div className="flex-1 flex overflow-hidden w-full">
        <PublicDocsSidebar />

        <main className="flex-1 min-w-0 flex flex-col bg-background relative z-0 overflow-hidden">
          <ScrollArea className="h-full w-full relative" data-lenis-prevent>
            <div className="max-w-4xl mx-auto py-8 sm:py-10 px-6 sm:px-8 md:px-12 w-full">
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default Layout;
