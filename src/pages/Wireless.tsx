import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wifi } from "lucide-react";

export default function Wireless() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">無線網絡</h1>
        <p className="text-muted-foreground mt-2">配置無線網絡設置和安全選項</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-primary" />
            無線設置
          </CardTitle>
          <CardDescription>配置 2.4GHz 和 5GHz 無線網絡</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="wifi-enabled">啟用無線</Label>
                <p className="text-sm text-muted-foreground">開啟或關閉無線功能</p>
              </div>
              <Switch id="wifi-enabled" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ssid">SSID (網絡名稱)</Label>
              <Input id="ssid" placeholder="OpenWrt" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel">頻道</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="channel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">自動</SelectItem>
                  <SelectItem value="1">1 (2412 MHz)</SelectItem>
                  <SelectItem value="6">6 (2437 MHz)</SelectItem>
                  <SelectItem value="11">11 (2462 MHz)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption">加密方式</Label>
              <Select defaultValue="wpa2">
                <SelectTrigger id="encryption">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">無加密</SelectItem>
                  <SelectItem value="wpa2">WPA2-PSK</SelectItem>
                  <SelectItem value="wpa3">WPA3-SAE</SelectItem>
                  <SelectItem value="mixed">WPA2/WPA3 混合</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">無線密碼</Label>
              <Input id="password" type="password" placeholder="至少 8 個字元" />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存設定</Button>
            <Button variant="outline">重設</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5GHz 無線設置</CardTitle>
          <CardDescription>配置 5GHz 頻段無線網絡</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="wifi5-enabled">啟用 5GHz</Label>
              <p className="text-sm text-muted-foreground">開啟 5GHz 頻段</p>
            </div>
            <Switch id="wifi5-enabled" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ssid5">SSID (網絡名稱)</Label>
            <Input id="ssid5" placeholder="OpenWrt_5G" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存設定</Button>
            <Button variant="outline">重設</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
