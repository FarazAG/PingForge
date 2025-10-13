import AppSidebar from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SiteProvider } from "@/components/site-context";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <SiteProvider>
        <AppSidebar />

        <SidebarTrigger />

        {children}
      </SiteProvider>
    </SidebarProvider>
  );
}
