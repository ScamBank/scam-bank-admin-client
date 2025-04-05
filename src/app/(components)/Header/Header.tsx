import { Navigation } from "./components";

export const Header = async () => {
  return (
    <header className="flex items-center justify-between bg-company-primary px-7 h-16 w-full sticky top-0">
      <h1 className="text-lg font-semibold">Скам Банк</h1>
      <Navigation />
    </header>
  );
};
