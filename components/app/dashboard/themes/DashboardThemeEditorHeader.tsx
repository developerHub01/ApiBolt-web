import { CardHeader, CardDescription } from "@/components/ui/card";
import DashboardHeading from "@/components/app/dashboard/DashboardHeading";

interface Props {
  heading: string;
  description: string;
}

const DashboardThemeEditorHeader = ({ heading, description }: Props) => {
  return (
    <CardHeader className="w-full text-center">
      <DashboardHeading>{heading}</DashboardHeading>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default DashboardThemeEditorHeader;
