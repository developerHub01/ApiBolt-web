import Link from "next/link";
import SectionHeader from "@/components/app/common/SectionHeader";
import { ArrowRight, Code2 } from "lucide-react";

const FakeApiSection = () => {
  return (
    <section className="py-35 px-6 bg-linear-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <SectionHeader
            className="text-center"
            title={
              <>
                Free <span className="text-primary">Fake APIs</span>
              </>
            }
            description={
              <>
                Test your workflows with our free REST API endpoints. No
                authentication required.
              </>
            }
          />
        </div>

        <div className="text-center">
          <Link
            href="/fake"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Code2 className="w-5 h-5" />
            View API Documentation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FakeApiSection;
