"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpRight, PencilRuler, Trash2 } from "lucide-react";

interface Props {
  id: string;
  canEdit: boolean;
  canDelete: boolean;
  showLink: boolean;
  onDelete?: () => void;
}

const CardActions = ({ id, canEdit, canDelete, showLink, onDelete }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {showLink && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/theme/${id}`} target="_blank">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/20 hover:text-primary"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">View Details</TooltipContent>
        </Tooltip>
      )}

      {canEdit && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/dashboard/update-theme/${id}`}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-primary/20 hover:text-primary"
              >
                <PencilRuler className="w-4 h-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom">Update</TooltipContent>
        </Tooltip>
      )}

      {canDelete && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Delete</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};

export default CardActions;
