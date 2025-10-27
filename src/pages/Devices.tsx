import { Smartphone, Laptop, Tv, Tablet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Devices = () => {
  const devices = [
    {
      name: "iPhone 14 Pro",
      type: "手機",
      icon: Smartphone,
      ip: "192.168.1.101",
      mac: "A1:B2:C3:D4:E5:F6",
      status: "在線",
      signal: 95,
      connected: "2小時前",
    },
    {
      name: "MacBook Pro",
      type: "電腦",
      icon: Laptop,
      ip: "192.168.1.102",
      mac: "A2:B3:C4:D5:E6:F7",
      status: "在線",
      signal: 88,
      connected: "5小時前",
    },
    {
      name: "iPad Air",
      type: "平板",
      icon: Tablet,
      ip: "192.168.1.103",
      mac: "A3:B4:C5:D6:E7:F8",
      status: "在線",
      signal: 92,
      connected: "1小時前",
    },
    {
      name: "Samsung TV",
      type: "電視",
      icon: Tv,
      ip: "192.168.1.104",
      mac: "A4:B5:C6:D7:E8:F9",
      status: "在線",
      signal: 76,
      connected: "3小時前",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">設備管理</h2>
          <p className="text-muted-foreground">管理所有已連接的設備</p>
        </div>
        <Button className="bg-gradient-primary text-white hover:opacity-90">
          刷新列表
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {devices.map((device, index) => (
          <Card key={index} className="shadow-elegant hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                    <device.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{device.type}</p>
                  </div>
                </div>
                <Badge variant={device.status === "在線" ? "default" : "secondary"} className="bg-success text-white">
                  {device.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">IP 地址</p>
                  <p className="text-sm font-medium text-foreground">{device.ip}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">MAC 地址</p>
                  <p className="text-sm font-medium text-foreground">{device.mac}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">信號強度</p>
                  <p className="text-sm font-medium text-foreground">{device.signal}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">連接時間</p>
                  <p className="text-sm font-medium text-foreground">{device.connected}</p>
                </div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  詳細信息
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  限速設置
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  封鎖
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Devices;
