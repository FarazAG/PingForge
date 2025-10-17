"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";

import AddSiteButton from "./AddSiteButton";
import { ModeToggle } from "./themeToggle";

import { useSites } from "./site-context";
import { FlameKindling, X } from "lucide-react";

export default function AppSidebar() {
  const { sites, removeSite } = useSites();
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex justify-between px-2 items-center text-2xl font-semibold font-mono">
          PingForge
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tracked sites</SidebarGroupLabel>
          <ul>
            {sites.map((site, i) => (
              <li
                key={i}
                className="flex items-center justify-between  gap-2 text-sm py-2.5 text-foreground/90"
              >
                <div className="flex gap-x-2 items-center">
                  <FlameKindling size={17} />
                  {site.url}
                </div>
                <span
                  className="me-3 hover:bg-accent"
                  onClick={() => removeSite(site.url)}
                >
                  <X size={17} />
                </span>
              </li>
            ))}
          </ul>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AddSiteButton />
      </SidebarFooter>
    </Sidebar>
  );
}
