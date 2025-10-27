import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PendingChangesPanel } from "@/components/PendingChangesPanel";
import { ReactNode } from "react";
import logo from "@/assets/logo.png";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <img src={logo} alt="DIGISEC" className="h-8 mr-4" />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-foreground">路由器管理系統</h1>
            </div>
            <div className="flex items-center gap-4">
              <PendingChangesPanel />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span className="text-sm text-muted-foreground">在線</span>
              </div>
            </div>
          </header>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
