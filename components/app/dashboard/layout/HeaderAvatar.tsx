"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { signOutAction } from "@/lib/actions/auth/actions";

const HeaderAvatar = () => {
  return (
    <div className="flex flex-row flex-wrap items-center gap-12">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              onClick={signOutAction}
              aria-label="Logout from account"
            >
              <LogOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="end">
            <p>Logout from account</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default HeaderAvatar;
