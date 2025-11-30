import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const socialIcons = [
  {
    id: "facebook",
    link: "/",
  },
  {
    id: "twitter",
    link: "/",
  },
  {
    id: "linkedin",
    link: "/",
  },
  {
    id: "github",
    link: "/",
  },
];

const ProfileInfo = () => {
  return (
    <section className="w-full grid grid-cols-6 md:grid-cols-12 gap-2">
      <div className="border p-1 rounded-md col-span-6">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          quod doloribus, id, perferendis iusto quidem, quibusdam laboriosam cum
          velit illum animi vel nulla obcaecati ullam quaerat amet ad veniam
          fugiat!
        </p>
      </div>
      <div className="grid grid-cols-4 gap-1 p-1 rounded-md border col-span-6">
        {socialIcons.map(({ id, link }) => (
          <Link
            key={id}
            href={link}
            className="w-full aspect-square grid place-items-center"
          >
            <Button className="w-full h-full cursor-pointer" variant={"ghost"}>
              <Image
                src={`/icons/${id}.svg`}
                width={50}
                height={50}
                alt={id}
                className="size-10 object-cover border-2 border-white rounded-full"
              />
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProfileInfo;
