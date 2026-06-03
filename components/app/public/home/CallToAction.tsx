import Link from "next/link";
import SectionHeader from "@/components/app/common/SectionHeader";
import { Download, User } from "lucide-react";
import { GithubIcon } from "@/icons";
import { APP_INSTALLER_URL, APP_RELEASE_URL } from "@/constant/index.constant";

const downloadButtons = [
  {
    id: "windows-download",
    label: "Download for Windows",
    Icon: Download,
    href: APP_INSTALLER_URL,
    isDownloadable: true,
  },
  {
    id: "all-release",
    label: "View All Releases",
    href: APP_RELEASE_URL,
  },
];

const socialLinks = [
  {
    id: "developer-profile",
    label: "Developer",
    url: "https://github.com/developerHub01",
    Icon: User,
  },
  {
    id: "github-repo",
    label: "View on GitHub",
    url: "https://github.com/developerHub01/ApiBolt",
    Icon: GithubIcon,
  },
];

const CallToAction = () => {
  return (
    <section className="py-35 px-6 border-t bg-linear-to-b from-muted/20 to-background relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="container mx-auto text-center">
        <SectionHeader
          className="text-center"
          title={
            <>
              Ready to get <span className="text-primary">started</span>?
            </>
          }
          description={
            <>
              Download ApiBolt for free. No account, no credit card, no
              tracking.
            </>
          }
        />

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          {downloadButtons.map(({ id, label, Icon, href, isDownloadable }) => (
            <Link
              key={id}
              href={href}
              target={isDownloadable ? `_self` : `_blank`}
              download={isDownloadable}
            >
              <button
                type="button"
                className="group inline-flex items-center justify-center gap-2 px-10 py-5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {Icon && (
                  <Icon className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                )}
                {label}
              </button>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-border/50">
          {socialLinks.map(({ id, label, url, Icon }) => (
            <Link
              key={id}
              href={url}
              target="_blank"
              className="group inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {Icon && (
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
