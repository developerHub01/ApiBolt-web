import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import SocialLoginButtons from "@/app/(app)/_components/social-login-buttons";

const AuthenticationButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-2xl p-0 h-full max-h-4/5"
        showCloseButton={false}
      >
        <Card className="overflow-hidden p-5 h-full">
          <CardContent className="grid h-full p-0 md:grid-cols-2">
            <div className="w-full flex flex-col">
              <DialogTitle>Login with social</DialogTitle>
              <SocialLoginButtons />
            </div>
            <div className="bg-muted rounded-md overflow-hidden relative hidden md:block">
              <Image
                src="https://images.unsplash.com/photo-1763063462165-94125cccf210"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                width={500}
                height={500}
              />
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthenticationButton;
