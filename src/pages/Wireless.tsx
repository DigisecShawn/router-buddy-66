import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PendingInput } from "@/components/PendingInput";
import { PendingSwitch } from "@/components/PendingSwitch";
import { PendingSelect, SelectContent, SelectItem } from "@/components/PendingSelect";
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
              <PendingSwitch 
                section="2.4GHz 無線設定" 
                field="啟用無線" 
                id="wifi-enabled" 
                defaultChecked 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ssid">SSID (網絡名稱)</Label>
              <PendingInput 
                section="2.4GHz 無線設定" 
                field="SSID" 
                id="ssid" 
                placeholder="OpenWrt" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel">頻道</Label>
              <PendingSelect 
                section="2.4GHz 無線設定" 
                field="頻道" 
                defaultValue="auto"
                id="channel"
              >
                <SelectContent>
                  <SelectItem value="auto">自動</SelectItem>
                  <SelectItem value="1">1 (2412 MHz)</SelectItem>
                  <SelectItem value="6">6 (2437 MHz)</SelectItem>
                  <SelectItem value="11">11 (2462 MHz)</SelectItem>
                </SelectContent>
              </PendingSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption">加密方式</Label>
              <PendingSelect 
                section="2.4GHz 無線設定" 
                field="加密方式" 
                defaultValue="wpa2"
                id="encryption"
              >
                <SelectContent>
                  <SelectItem value="none">無加密</SelectItem>
                  <SelectItem value="wpa2">WPA2-PSK</SelectItem>
                  <SelectItem value="wpa3">WPA3-SAE</SelectItem>
                  <SelectItem value="mixed">WPA2/WPA3 混合</SelectItem>
                </SelectContent>
              </PendingSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">無線密碼</Label>
              <PendingInput 
                section="2.4GHz 無線設定" 
                field="無線密碼" 
                id="password" 
                type="password" 
                placeholder="至少 8 個字元" 
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">重設</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5GHz 無線設置</CardTitle>
          <CardDescription>配置 5GHz 頻段無線網絡</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="wifi5-enabled">啟用 5GHz</Label>
                <p className="text-sm text-muted-foreground">開啟 5GHz 頻段</p>
              </div>
              <PendingSwitch 
                section="5GHz 無線設定" 
                field="啟用 5GHz" 
                id="wifi5-enabled" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ssid5">SSID (網絡名稱)</Label>
              <PendingInput 
                section="5GHz 無線設定" 
                field="SSID" 
                id="ssid5" 
                placeholder="OpenWrt_5G" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="channel5">頻道</Label>
              <PendingSelect 
                section="5GHz 無線設定" 
                field="頻道" 
                defaultValue="auto"
                id="channel5"
              >
                <SelectContent>
                  <SelectItem value="auto">自動</SelectItem>
                  <SelectItem value="36">36 (5180 MHz)</SelectItem>
                  <SelectItem value="40">40 (5200 MHz)</SelectItem>
                  <SelectItem value="44">44 (5220 MHz)</SelectItem>
                  <SelectItem value="48">48 (5240 MHz)</SelectItem>
                  <SelectItem value="149">149 (5745 MHz)</SelectItem>
                  <SelectItem value="153">153 (5765 MHz)</SelectItem>
                  <SelectItem value="157">157 (5785 MHz)</SelectItem>
                  <SelectItem value="161">161 (5805 MHz)</SelectItem>
                </SelectContent>
              </PendingSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="encryption5">加密方式</Label>
              <PendingSelect 
                section="5GHz 無線設定" 
                field="加密方式" 
                defaultValue="wpa2"
                id="encryption5"
              >
                <SelectContent>
                  <SelectItem value="none">無加密</SelectItem>
                  <SelectItem value="wpa2">WPA2-PSK</SelectItem>
                  <SelectItem value="wpa3">WPA3-SAE</SelectItem>
                  <SelectItem value="mixed">WPA2/WPA3 混合</SelectItem>
                </SelectContent>
              </PendingSelect>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password5">無線密碼</Label>
              <PendingInput 
                section="5GHz 無線設定" 
                field="無線密碼" 
                id="password5" 
                type="password" 
                placeholder="至少 8 個字元" 
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">重設</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
