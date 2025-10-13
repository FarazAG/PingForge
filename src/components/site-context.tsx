"use client";

import { createContext, useContext, useState } from "react";

type Site = { url: string };

type SiteContextType = {
  sites: Site[];
  addSite: (url: string) => void;
  removeSite: (url: string) => void;
};

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [sites, setSites] = useState<Site[]>([]);

  function addSite(url: string) {
    setSites((prev) => [...prev, { url }]);
  }

  function removeSite(url: string) {
    setSites((prev) => prev.filter((site) => site.url !== url));
  }

  return (
    <SiteContext.Provider value={{ sites, addSite, removeSite }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSites(): SiteContextType {
  const ctx = useContext(SiteContext);
  if (!ctx) {
    throw new Error("useSites must be used within a SiteProvider");
  }
  return ctx;
}
