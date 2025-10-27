import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, AlertTriangle } from "lucide-react";

const Security = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">安全設置</h2>
        <p className="text-muted-foreground">保護您的網絡安全</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">防火牆</h3>
              <Badge className="bg-success text-white">已啟用</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">加密</h3>
              <Badge className="bg-success text-white">WPA3</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">威脅檢測</h3>
              <Badge variant="outline">監控中</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>防火牆設置</CardTitle>
          <CardDescription>配置網絡防護規則</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>啟用防火牆</Label>
              <p className="text-sm text-muted-foreground">保護網絡免受外部威脅</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SPI 防火牆</Label>
              <p className="text-sm text-muted-foreground">狀態包檢測</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>DoS 攻擊防護</Label>
              <p className="text-sm text-muted-foreground">防止拒絕服務攻擊</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>IP 地址過濾</Label>
              <p className="text-sm text-muted-foreground">封鎖特定 IP 地址</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>無線安全</CardTitle>
            <CardDescription>保護您的無線網絡</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>WPA3 加密</Label>
                <p className="text-sm text-muted-foreground">最新的無線加密標準</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>MAC 地址過濾</Label>
                <p className="text-sm text-muted-foreground">只允許特定設備連接</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>AP 隔離</Label>
                <p className="text-sm text-muted-foreground">隔離無線設備之間的通信</p>
              </div>
              <Switch />
            </div>
            <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
              保存設置
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>家長控制</CardTitle>
            <CardDescription>管理家庭成員的網絡訪問</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>啟用家長控制</Label>
                <p className="text-sm text-muted-foreground">限制特定設備的訪問</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>網站過濾</Label>
                <p className="text-sm text-muted-foreground">封鎖不適當的內容</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>時間限制</Label>
                <p className="text-sm text-muted-foreground">設置網絡使用時間</p>
              </div>
              <Switch />
            </div>
            <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
              配置規則
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant border-warning/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            最近的安全事件
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-2 h-2 rounded-full bg-warning mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">檢測到多次失敗的登錄嘗試</p>
                <p className="text-xs text-muted-foreground">來自 IP: 203.127.45.12 - 2小時前</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
              <div className="w-2 h-2 rounded-full bg-success mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">固件更新已成功安裝</p>
                <p className="text-xs text-muted-foreground">版本 1.2.45 - 1天前</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
