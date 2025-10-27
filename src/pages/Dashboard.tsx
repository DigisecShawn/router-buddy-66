import { Activity, Users, Download, Upload } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const connectedDevices = [
    { name: "iPhone 14 Pro", ip: "192.168.1.101", status: "在線", signal: 95 },
    { name: "MacBook Pro", ip: "192.168.1.102", status: "在線", signal: 88 },
    { name: "iPad Air", ip: "192.168.1.103", status: "在線", signal: 92 },
    { name: "Samsung TV", ip: "192.168.1.104", status: "在線", signal: 76 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">儀表板</h2>
        <p className="text-muted-foreground">實時監控您的網絡狀態</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="已連接設備"
          value="12"
          icon={Users}
          trend="+2 本月"
          trendUp={true}
        />
        <StatCard
          title="網絡狀態"
          value="優秀"
          icon={Activity}
        />
        <StatCard
          title="下載速度"
          value="125 Mbps"
          icon={Download}
          trend="+15%"
          trendUp={true}
        />
        <StatCard
          title="上傳速度"
          value="45 Mbps"
          icon={Upload}
          trend="+8%"
          trendUp={true}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">在線設備</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {connectedDevices.map((device, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium text-foreground">{device.name}</p>
                    <p className="text-sm text-muted-foreground">{device.ip}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                      <span className="text-sm text-success">{device.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">信號: {device.signal}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">網絡使用率</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">CPU 使用率</span>
                <span className="text-sm text-muted-foreground">35%</span>
              </div>
              <Progress value={35} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">內存使用率</span>
                <span className="text-sm text-muted-foreground">62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">頻寬使用率</span>
                <span className="text-sm text-muted-foreground">48%</span>
              </div>
              <Progress value={48} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">儲存空間</span>
                <span className="text-sm text-muted-foreground">28%</span>
              </div>
              <Progress value={28} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">網絡統計</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-gradient-primary text-white">
              <p className="text-3xl font-bold mb-1">2.4 TB</p>
              <p className="text-sm opacity-90">本月流量</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-secondary text-white">
              <p className="text-3xl font-bold mb-1">99.8%</p>
              <p className="text-sm opacity-90">運行時間</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-3xl font-bold mb-1 text-foreground">15ms</p>
              <p className="text-sm text-muted-foreground">延遲</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted">
              <p className="text-3xl font-bold mb-1 text-foreground">0.01%</p>
              <p className="text-sm text-muted-foreground">丟包率</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
