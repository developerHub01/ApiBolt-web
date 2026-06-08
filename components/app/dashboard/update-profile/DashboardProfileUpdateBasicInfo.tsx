"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface Props {
  fullName: string;
  bio: string;
  onFullNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
}

const DashboardProfileUpdateBasicInfo = ({
  fullName,
  bio,
  onFullNameChange,
  onBioChange,
}: Props) => {
  const isNameInvalid = !fullName.trim();

  return (
    <div className="space-y-6 pt-4">
      <div className="grid gap-6">
        <Field>
          <FieldLabel
            htmlFor="full_name"
            className="text-base font-medium"
            data-invalid={isNameInvalid || undefined}
          >
            Full Name
            <span className="text-xs text-muted-foreground ml-2 font-normal">
              ({fullName?.length || 0}/50 characters)
            </span>
          </FieldLabel>
          <Input
            id="full_name"
            placeholder="e.g. John Doe"
            value={fullName}
            onChange={(e) => onFullNameChange(e.target.value)}
            maxLength={50}
            className={cn(
              "bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all",
              {
                "border-destructive": isNameInvalid,
              },
            )}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="bio" className="text-base font-medium">
            Short Bio
            <span className="text-xs text-muted-foreground ml-2 font-normal">
              ({bio?.length || 0}/200 characters)
            </span>
          </FieldLabel>
          <Textarea
            id="bio"
            placeholder="Write a short introduction about yourself..."
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            maxLength={200}
            className="resize-none min-h-32 bg-muted/20 border-white/5 focus-visible:ring-primary/50 transition-all p-4 leading-relaxed"
          />
        </Field>
      </div>
    </div>
  );
};

export default DashboardProfileUpdateBasicInfo;
