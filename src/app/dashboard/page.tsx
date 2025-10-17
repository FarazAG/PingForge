"use client";
import DashboardCard from "@/components/dashboard-card";
import { useSites } from "@/components/site-context";

export default function DashboardPage() {
  const { sites } = useSites();

  return (
    <>
      <div className="min-h-screen w-screen flex items-center gap-5 py-5 flex-col">
        <div className="font-semibold text-3xl flex justify-center pb-5 w-full font-mono">
          Dashboard
        </div>
        <div className="flex w-full items-center gap-5 flex-wrap px-4 justify-center">
          {sites.map((site, i) => (
            <DashboardCard key={i} url={site.url} />
          ))}
        </div>
      </div>
    </>
  );
}
