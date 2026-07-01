import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <ScrollArea className="h-full w-full relative" data-lenis-prevent>
      <div className="max-w-4xl mx-auto py-8 sm:py-10 px-6 sm:px-8 md:px-12 w-full">
        {children}
      </div>
    </ScrollArea>
  );
};

export default Layout;
