import { Input } from "@/components/ui/input";
import { SearchContext } from "@/context/SearchContextProvider";
import { useContext, useEffect, useRef } from "react";
import { X, Search } from "lucide-react";

function SearchBox() {
  const ref = useRef<HTMLInputElement>(null);

  const { search, setSearch, focusTrigger } = useContext(SearchContext);

  useEffect(() => {
    if (focusTrigger) {
      ref.current?.focus();
    }
  }, [focusTrigger]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        ref.current?.focus();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleClearSearch = () => {
    setSearch("");
    ref.current?.focus();
  };

  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search"
        className="pl-8 focus-visible:ring-purple-700 focus-visible:border-gray-200"
        ref={ref}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <X
        className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground hover:text-gray-900 cursor-pointer"
        onClick={handleClearSearch}
      />
    </div>
  );
}

export default SearchBox;
