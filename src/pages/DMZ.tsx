import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Server, AlertTriangle, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const DMZ = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">DMZ 設定</h2>
        <p className="text-muted-foreground">配置非軍事區主機設定</p>
      </div>

      <Alert className="border-warning/50 bg-warning/5">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <AlertTitle className="text-warning">安全警告</AlertTitle>
        <AlertDescription>
          DMZ 主機會完全暴露於互聯網，所有端口都會被轉發到指定設備。請確保 DMZ 主機具備足夠的安全防護措施。
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Server className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">DMZ 狀態</h3>
              <Badge variant="outline">未啟用</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">防火牆</h3>
              <Badge className="bg-success text-white">已啟用</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6 text-warning" />
              </div>
              <h3 className="font-semibold text-foreground">安全等級</h3>
              <Badge className="bg-warning text-white">高風險</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            DMZ 主機設定
          </CardTitle>
          <CardDescription>設定非軍事區主機的 IP 地址</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="space-y-0.5">
              <Label>啟用 DMZ</Label>
              <p className="text-sm text-muted-foreground">開啟 DMZ 主機功能</p>
            </div>
            <Switch />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dmz-ip">DMZ 主機 IP 地址</Label>
            <Input id="dmz-ip" placeholder="例如: 192.168.1.100" />
            <p className="text-xs text-muted-foreground">
              請輸入要設為 DMZ 主機的內部 IP 地址
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              DMZ 主機安全建議
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>確保 DMZ 主機運行最新的安全更新</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>在 DMZ 主機上啟用防火牆和入侵檢測系統</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>定期監控 DMZ 主機的網絡活動和日誌</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>只在必要時使用 DMZ，優先考慮端口轉發</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>不要在 DMZ 主機上存儲敏感數據</span>
              </li>
            </ul>
          </div>

          <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
            應用 DMZ 設定
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>DMZ 與端口轉發的區別</CardTitle>
            <CardDescription>了解不同網絡配置方式的差異</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-primary text-white">
                <h4 className="font-semibold mb-2">DMZ 主機</h4>
                <ul className="space-y-1 text-sm opacity-90">
                  <li>• 所有端口都被轉發</li>
                  <li>• 完全暴露於互聯網</li>
                  <li>• 適合需要大量端口的應用</li>
                  <li>• 安全風險較高</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2 text-foreground">端口轉發</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 僅轉發指定端口</li>
                  <li>• 可精確控制訪問</li>
                  <li>• 適合特定服務</li>
                  <li>• 安全性較高（推薦）</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>當前 DMZ 配置</CardTitle>
            <CardDescription>已設定的 DMZ 主機資訊</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">DMZ 狀態</span>
                <Badge variant="outline">未啟用</Badge>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">DMZ 主機 IP</span>
                <span className="text-sm font-medium text-foreground">未設定</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">MAC 地址</span>
                <span className="text-sm font-medium text-foreground">-</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">設備名稱</span>
                <span className="text-sm font-medium text-foreground">-</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-muted-foreground">最後更新</span>
                <span className="text-sm font-medium text-foreground">-</span>
              </div>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertTitle>安全提示</AlertTitle>
              <AlertDescription className="text-xs">
                建議使用靜態 IP 或 DHCP 保留來確保 DMZ 主機 IP 地址不會改變
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>DMZ 流量統計</CardTitle>
          <CardDescription>監控 DMZ 主機的網絡流量</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-2xl font-bold text-foreground mb-1">0</p>
              <p className="text-sm text-muted-foreground">活躍連接</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-2xl font-bold text-foreground mb-1">0 MB</p>
              <p className="text-sm text-muted-foreground">接收流量</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-2xl font-bold text-foreground mb-1">0 MB</p>
              <p className="text-sm text-muted-foreground">發送流量</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <p className="text-2xl font-bold text-foreground mb-1">0</p>
              <p className="text-sm text-muted-foreground">被阻擋請求</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DMZ;
