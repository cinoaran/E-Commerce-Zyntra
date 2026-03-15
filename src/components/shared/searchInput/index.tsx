"use client";

import React, {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);

  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    const params = new URLSearchParams(window.location.search);
    if (trimmedQuery) {
      params.set("query", trimmedQuery);
      router.push(`/search?${params.toString()}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <form
      className="w-full relative flex items-center justify-between"
      onSubmit={handleSearch}
    >
      <Input
        type="search"
        placeholder="Search..."
        className="bg-foreground placeholder:italic placeholder:text-foreground/50 webkit-search-cancel-button:appearance-none border-border pr-10"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center justify-center absolute top-1/2 right-0 -translate-y-1/2 w-12 h-14 bg-transparent hover:scale-110 transition-transform"
      >
        <Search size={14} />
      </button>
    </form>
  );
};

export default SearchInput;
