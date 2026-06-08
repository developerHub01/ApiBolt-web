import { CardHeader, CardDescription } from "@/components/ui/card";
import DashboardHeading from "@/components/app/dashboard/DashboardHeading";

const DashboardProfileUpdateHeader = () => {
  return (
    <CardHeader className="w-full text-center">
      <DashboardHeading>Update profile</DashboardHeading>
      <CardDescription>Update your profile details</CardDescription>
    </CardHeader>
  );
};

export default DashboardProfileUpdateHeader;
