import { Home, Wifi, Shield, Settings, Info, Signal, Radio, Network, Server } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "儀表板", url: "/", icon: Home },
  { title: "設備管理", url: "/devices", icon: Wifi },
  { title: "網絡設置", url: "/network", icon: Settings },
  { title: "GPRS設定", url: "/gprs", icon: Signal },
  { title: "NAT設定", url: "/nat", icon: Network },
  { title: "DMZ設定", url: "/dmz", icon: Server },
  { title: "安全設置", url: "/security", icon: Shield },
  { title: "系統信息", url: "/system", icon: Info },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border bg-white">
      <SidebarContent className="bg-white">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-md">
              <Wifi className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-foreground">路由器</h2>
                <p className="text-xs text-muted-foreground">管理中心</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">主選單</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? "bg-primary text-white font-medium shadow-md"
                            : "text-foreground hover:bg-muted"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
