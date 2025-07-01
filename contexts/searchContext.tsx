// context/SearchContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import SmoothScroll from "@/app/component/common/SmoothScroll";

const SearchContext = createContext<{
  searchActive: boolean;
  setSearchActive: (value: boolean) => void;
}>({
  searchActive: false,
  setSearchActive: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <SearchContext.Provider value={{ searchActive, setSearchActive }}>
        {!searchActive && <SmoothScroll/>}
      {children}
    </SearchContext.Provider>
  );
};
