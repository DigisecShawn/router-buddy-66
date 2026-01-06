import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Cpu, HardDrive, Thermometer, Zap } from "lucide-react";

const System = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">系統信息</h2>
        <p className="text-muted-foreground">查看路由器的系統狀態和信息</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">CPU 使用率</p>
                <p className="text-2xl font-bold text-foreground">35%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Cpu className="w-6 h-6 text-white" />
              </div>
            </div>
            <Progress value={35} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">內存使用</p>
                <p className="text-2xl font-bold text-foreground">62%</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
            </div>
            <Progress value={62} className="mt-4 h-2" />
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">溫度</p>
                <p className="text-2xl font-bold text-foreground">42°C</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-success" />
              </div>
            </div>
            <p className="text-xs text-success mt-4">正常範圍</p>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">運行時間</p>
                <p className="text-2xl font-bold text-foreground">15天</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-warning" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">持續穩定</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>設備信息</CardTitle>
            <CardDescription>路由器硬件和軟件詳情</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">型號</span>
              <span className="text-sm font-medium text-foreground">SW-R1208v2</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">固件版本</span>
              <span className="text-sm font-medium text-foreground">1.2.45</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">硬件版本</span>
              <span className="text-sm font-medium text-foreground">A1</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">序列號</span>
              <span className="text-sm font-medium text-foreground">SN123456789</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">MAC 地址</span>
              <span className="text-sm font-medium text-foreground">A0:B1:C2:D3:E4:F5</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">LAN IP</span>
              <span className="text-sm font-medium text-foreground">192.168.1.1</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>系統管理</CardTitle>
            <CardDescription>維護和更新您的路由器</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
              檢查固件更新
            </Button>
            <Button variant="outline" className="w-full">
              備份設置
            </Button>
            <Button variant="outline" className="w-full">
              還原設置
            </Button>
            <Button variant="outline" className="w-full">
              重新啟動路由器
            </Button>
            <Button variant="outline" className="w-full text-destructive hover:text-destructive border-destructive/50">
              恢復出廠設置
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>網絡狀態</CardTitle>
          <CardDescription>當前網絡連接信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">WAN IP 地址</p>
              <p className="text-lg font-semibold text-foreground">203.127.45.123</p>
              <Badge variant="outline" className="mt-2">動態 IP</Badge>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">DNS 伺服器</p>
              <p className="text-lg font-semibold text-foreground">8.8.8.8</p>
              <p className="text-sm text-muted-foreground mt-1">8.8.4.4</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">閘道器</p>
              <p className="text-lg font-semibold text-foreground">192.168.1.1</p>
              <Badge className="mt-2 bg-success text-white">已連接</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default System;
