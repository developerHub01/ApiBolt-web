import ThemeCard from "@/app/(app)/marketplace/_components/theme-card";

const ThemeGrid = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-6">
      {Array.from({ length: 10 }, (_, index) => (
        <ThemeCard key={index} />
      ))}
    </div>
  );
};

export default ThemeGrid;
