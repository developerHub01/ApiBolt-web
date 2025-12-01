import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

const themeThumbnail =
  "https://images.unsplash.com/photo-1764377975933-2ffbd913f3c2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const ThemeCard = () => {
  return (
    <article className="w-full p-3 flex flex-col gap-1">
      <AspectRatio ratio={16 / 9} className="rounded-sm overflow-hidden">
        <Image
          src={themeThumbnail}
          width={300}
          height={300}
          alt=""
          className="w-full h-full object-cover"
        />
      </AspectRatio>
      <p>Theme name</p>
    </article>
  );
};

export default ThemeCard;
