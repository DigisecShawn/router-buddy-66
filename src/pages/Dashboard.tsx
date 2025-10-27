import { Activity, Users, Download, Upload, Signal, Smartphone, Wifi, Globe } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const connectedDevices = [
    { name: "iPhone 14 Pro", ip: "192.168.1.101", status: "在線", signal: 95 },
    { name: "MacBook Pro", ip: "192.168.1.102", status: "在線", signal: 88 },
    { name: "iPad Air", ip: "192.168.1.103", status: "在線", signal: 92 },
    { name: "Samsung TV", ip: "192.168.1.104", status: "在線", signal: 76 },
  ];

  // RSSI 歷史數據
  const rssiHistory = [
    { time: "00:00", rssi: -68, rsrp: -88, rsrq: -12 },
    { time: "04:00", rssi: -65, rsrp: -85, rsrq: -11 },
    { time: "08:00", rssi: -70, rsrp: -90, rsrq: -13 },
    { time: "12:00", rssi: -65, rsrp: -85, rsrq: -10 },
    { time: "16:00", rssi: -67, rsrp: -87, rsrq: -11 },
    { time: "20:00", rssi: -65, rsrp: -85, rsrq: -10 },
    { time: "24:00", rssi: -66, rsrp: -86, rsrq: -11 },
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
          title="信號強度"
          value="-65 dBm"
          icon={Signal}
          trend="優秀"
          trendUp={true}
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-elegant lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Signal className="w-5 h-5" />
              4G 信號歷史記錄
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rssiHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  domain={[-100, -60]}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rssi" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="RSSI (dBm)"
                  dot={{ fill: 'hsl(var(--primary))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rsrp" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="RSRP (dBm)"
                  dot={{ fill: 'hsl(var(--accent))' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rsrq" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="RSRQ (dB)"
                  dot={{ fill: 'hsl(var(--secondary))' }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 rounded-lg bg-primary/10">
                <p className="text-sm text-muted-foreground mb-1">當前 RSSI</p>
                <p className="text-xl font-bold text-primary">-65 dBm</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-accent/10">
                <p className="text-sm text-muted-foreground mb-1">當前 RSRP</p>
                <p className="text-xl font-bold text-accent">-85 dBm</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/10">
                <p className="text-sm text-muted-foreground mb-1">當前 RSRQ</p>
                <p className="text-xl font-bold text-secondary">-10 dB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              電信資訊
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-primary text-white">
                <div>
                  <p className="text-sm opacity-90 mb-1">電信商</p>
                  <p className="text-lg font-bold">中華電信</p>
                </div>
                <Wifi className="w-8 h-8 opacity-80" />
              </div>
              
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">網絡類型</span>
                  <Badge className="bg-success text-white">4G LTE</Badge>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">頻段</span>
                  <span className="text-sm font-medium text-foreground">Band 3 (1800MHz)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">PLMN</span>
                  <span className="text-sm font-medium text-foreground">46692</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-2">IMEI</p>
                <p className="text-sm font-mono text-foreground">867123456789012</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-2">IMSI</p>
                <p className="text-sm font-mono text-foreground">466920123456789</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-2">信號品質</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">SINR</span>
                    <span className="text-sm font-medium text-success">15 dB</span>
                  </div>
                  <Progress value={75} className="h-1.5" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5" />
            WAN 網絡資訊
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg bg-gradient-primary text-white">
              <p className="text-sm opacity-90 mb-1">WAN IP 地址</p>
              <p className="text-lg font-bold">203.127.45.123</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">動態 IP</Badge>
            </div>
            <div className="p-4 rounded-lg bg-gradient-secondary text-white">
              <p className="text-sm opacity-90 mb-1">連接時間</p>
              <p className="text-lg font-bold">15天 8小時</p>
              <Badge className="mt-2 bg-white/20 text-white border-white/30">持續在線</Badge>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">DNS 伺服器</p>
              <p className="text-sm font-medium text-foreground">8.8.8.8</p>
              <p className="text-sm font-medium text-foreground">8.8.4.4</p>
            </div>
            <div className="p-4 rounded-lg bg-muted">
              <p className="text-sm text-muted-foreground mb-1">閘道器</p>
              <p className="text-sm font-medium text-foreground">10.123.45.1</p>
              <Badge className="mt-2 bg-success text-white">已連接</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

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
