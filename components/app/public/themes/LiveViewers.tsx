"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createClient } from "@/lib/supabase/client";
import { RealtimePresenceState, User } from "@supabase/supabase-js";
import { motion } from "motion/react";

const supabase = createClient();

interface ViewersInterface {
  name: string;
  username?: string;
  avatar?: string;
}

interface Props {
  /** Theme id */
  id: string;
  user: User | null;
}

const formatCount = (num: number): string => {
  if (num >= 1000000) {
    const value = num / 1000000;
    return value % 1 ? value.toFixed(1) + "M" : value.toFixed(0) + "M";
  }
  if (num >= 1000) {
    const value = num / 1000;
    return value % 1 ? value.toFixed(1) + "K" : value.toFixed(0) + "K";
  }
  return num.toString();
};

const MAX_VIEWERS = 3;

const LiveViewers = ({ id, user }: Props) => {
  const [totalViewers, setTotalViewers] = useState<number>(0);
  const [viewers, setViewers] = useState<Array<ViewersInterface>>([]);

  useEffect(() => {
    const presenceKey = user?.id ?? crypto.randomUUID();

    const channel = supabase.channel(`room:theme-viewers-${id}`, {
      config: {
        presence: {
          key: presenceKey,
        },
      },
    });

    const handleRealtime = async () => {
      const activeUser: ViewersInterface = {
        name: user?.user_metadata.full_name || "Anonymous",
        username: user?.user_metadata.username,
        avatar: user?.user_metadata.avatar_url,
      };

      const state: RealtimePresenceState<ViewersInterface> =
        channel.presenceState();
      const currentSeatedUsers = Object.values(
        state,
      ).flat() as Array<ViewersInterface>;

      setViewers(currentSeatedUsers.slice(0, MAX_VIEWERS));
      setTotalViewers(currentSeatedUsers.length);

      const iAmAlreadyTracked =
        state[presenceKey] && Boolean(state[presenceKey].length);
      const iAmOnTheBench = currentSeatedUsers.some(
        (u) => u.name === activeUser?.name,
      );

      if (
        currentSeatedUsers.length < MAX_VIEWERS &&
        !iAmOnTheBench &&
        !iAmAlreadyTracked
      )
        await channel.track(activeUser);
    };

    channel.on("presence", { event: "sync" }, () => {
      handleRealtime();
    });

    channel.subscribe(async (status) => {
      if (status !== "SUBSCRIBED") return;
      handleRealtime();
    });

    return () => {
      channel.unsubscribe();
    };
  }, [
    id,
    user?.id,
    user?.user_metadata.avatar_url,
    user?.user_metadata.full_name,
    user?.user_metadata.username,
  ]);

  const extraViewersCount = totalViewers - viewers.length;
  const formattedExtraCount = useMemo(
    () => formatCount(extraViewersCount),
    [extraViewersCount],
  );

  return (
    <motion.div
      initial={{
        y: 20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-md p-2 rounded-full border border-zinc-800 shadow-xl flex items-center justify-center z-50"
    >
      <AvatarGroup>
        {viewers.map(({ avatar, name }, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Avatar
                size="lg"
                className="hover:scale-110 hover:-rotate-12 transition-all duration-150 ease-in-out cursor-pointer"
              >
                <AvatarImage src={avatar} alt={name} loading="eager" />
                <AvatarFallback>
                  {name?.substring(0, 2).toUpperCase() || "??"}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{name}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <AvatarGroupCount className="text-xs font-mono font-bold">
          {extraViewersCount > 0 ? (
            <>+{formattedExtraCount} Live</>
          ) : (
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold px-2 self-center animate-pulse flex flex-col justify-center items-center">
              <span>●</span>
              Live
            </span>
          )}
        </AvatarGroupCount>
      </AvatarGroup>
    </motion.div>
  );
};

export default LiveViewers;
