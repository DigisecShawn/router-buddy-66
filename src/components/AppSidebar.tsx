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
import logo from "@/assets/logo.png";

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
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img src={logo} alt="DIGISEC" className="h-8" />
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">路由器</h2>
                <p className="text-xs text-sidebar-foreground/60">管理中心</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">主選單</SidebarGroupLabel>
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
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
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
