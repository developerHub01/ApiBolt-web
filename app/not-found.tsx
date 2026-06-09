import NotFound from "@/components/ui/not-found";

const Page = () => {
  return (
    <div className="mx-auto px-4 flex-1 flex justify-center items-center overflow-hidden w-full">
      <NotFound
        description="The page you're looking for doesn't exist. It might have been moved or deleted."
        className="min-h-[70vh] container"
      />
    </div>
  );
};

export default Page;
