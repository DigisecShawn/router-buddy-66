import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Signal, Activity } from "lucide-react";

export default function FourGRouting() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">4G 路由介面</h1>
        <p className="text-muted-foreground mt-2">配置 4G/LTE 移動網絡連接</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Signal className="w-5 h-5 text-primary" />
            連接狀態
          </CardTitle>
          <CardDescription>當前 4G 網絡連接狀態</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">連接狀態</p>
              <Badge variant="secondary" className="text-sm">
                <Activity className="w-3 h-3 mr-1" />
                已連接
              </Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">信號強度</p>
              <p className="text-lg font-semibold">-75 dBm</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">網絡類型</p>
              <p className="text-lg font-semibold">4G LTE</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">運營商</p>
              <p className="text-lg font-semibold">中華電信</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-primary" />
            4G 模組設置
          </CardTitle>
          <CardDescription>配置 4G 模組基本參數</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="4g-enabled">啟用 4G 模組</Label>
                <p className="text-sm text-muted-foreground">開啟或關閉 4G 連接功能</p>
              </div>
              <Switch id="4g-enabled" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modem-device">模組設備</Label>
              <Select defaultValue="/dev/ttyUSB0">
                <SelectTrigger id="modem-device">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="/dev/ttyUSB0">/dev/ttyUSB0</SelectItem>
                  <SelectItem value="/dev/ttyUSB1">/dev/ttyUSB1</SelectItem>
                  <SelectItem value="/dev/ttyUSB2">/dev/ttyUSB2</SelectItem>
                  <SelectItem value="auto">自動偵測</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apn">APN (接入點名稱)</Label>
              <Input id="apn" placeholder="internet" />
              <p className="text-xs text-muted-foreground">
                請向您的運營商確認正確的 APN 設置
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin-code">PIN 碼 (選填)</Label>
              <Input id="pin-code" type="password" placeholder="1234" maxLength={4} />
              <p className="text-xs text-muted-foreground">
                如果 SIM 卡啟用了 PIN 碼保護，請輸入
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="network-mode">網絡模式</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="network-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">自動 (4G/3G/2G)</SelectItem>
                  <SelectItem value="4g-only">僅 4G</SelectItem>
                  <SelectItem value="3g-only">僅 3G</SelectItem>
                  <SelectItem value="4g-3g">4G/3G</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="connection-type">連接類型</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="connection-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">自動</SelectItem>
                  <SelectItem value="ppp">PPP</SelectItem>
                  <SelectItem value="dhcp">DHCP</SelectItem>
                  <SelectItem value="qmi">QMI</SelectItem>
                  <SelectItem value="mbim">MBIM</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存設定</Button>
            <Button variant="outline">重新連接</Button>
            <Button variant="outline">斷開連接</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>流量統計</CardTitle>
          <CardDescription>查看 4G 網絡數據使用情況</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">本次連接上傳</p>
              <p className="text-2xl font-bold">245 MB</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">本次連接下載</p>
              <p className="text-2xl font-bold">1.2 GB</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">連接時長</p>
              <p className="text-2xl font-bold">3h 24m</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline" size="sm">重置統計</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>進階設定</CardTitle>
          <CardDescription>配置進階網絡參數</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mtu">MTU 大小</Label>
            <Input id="mtu" type="number" placeholder="1500" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-reconnect">自動重連</Label>
              <p className="text-sm text-muted-foreground">連接中斷時自動重新連接</p>
            </div>
            <Switch id="auto-reconnect" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dial-number">撥號號碼</Label>
            <Input id="dial-number" placeholder="*99#" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存進階設定</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
