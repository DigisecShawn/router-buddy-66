import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PendingInput } from "@/components/PendingInput";
import { PendingSelect, SelectContent, SelectItem } from "@/components/PendingSelect";
import { Settings } from "lucide-react";

export default function SystemConfig() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">系統設定</h1>
        <p className="text-muted-foreground mt-2">配置系統基本設置和管理員選項</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            一般設置
          </CardTitle>
          <CardDescription>配置主機名稱和時區</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hostname">主機名稱</Label>
              <PendingInput 
                section="系統設定" 
                field="主機名稱" 
                id="hostname" 
                placeholder="DIGISEC_4G_LTE" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">時區</Label>
              <PendingSelect 
                section="系統設定" 
                field="時區" 
                defaultValue="asia-taipei"
                id="timezone"
              >
                <SelectContent>
                  <SelectItem value="asia-taipei">Asia/Taipei (UTC+8)</SelectItem>
                  <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                  <SelectItem value="asia-seoul">Asia/Seoul (UTC+9)</SelectItem>
                  <SelectItem value="asia-shanghai">Asia/Shanghai (UTC+8)</SelectItem>
                  <SelectItem value="asia-hong-kong">Asia/Hong Kong (UTC+8)</SelectItem>
                  <SelectItem value="asia-singapore">Asia/Singapore (UTC+8)</SelectItem>
                  <SelectItem value="asia-bangkok">Asia/Bangkok (UTC+7)</SelectItem>
                  <SelectItem value="asia-jakarta">Asia/Jakarta (UTC+7)</SelectItem>
                  <SelectItem value="asia-kolkata">Asia/Kolkata (UTC+5:30)</SelectItem>
                  <SelectItem value="asia-dubai">Asia/Dubai (UTC+4)</SelectItem>
                  <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                  <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                  <SelectItem value="europe-berlin">Europe/Berlin (UTC+1)</SelectItem>
                  <SelectItem value="europe-moscow">Europe/Moscow (UTC+3)</SelectItem>
                  <SelectItem value="america-new-york">America/New York (UTC-5)</SelectItem>
                  <SelectItem value="america-chicago">America/Chicago (UTC-6)</SelectItem>
                  <SelectItem value="america-denver">America/Denver (UTC-7)</SelectItem>
                  <SelectItem value="america-los-angeles">America/Los Angeles (UTC-8)</SelectItem>
                  <SelectItem value="america-sao-paulo">America/Sao Paulo (UTC-3)</SelectItem>
                  <SelectItem value="australia-sydney">Australia/Sydney (UTC+10)</SelectItem>
                  <SelectItem value="pacific-auckland">Pacific/Auckland (UTC+12)</SelectItem>
                  <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                </SelectContent>
              </PendingSelect>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">重設</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>管理員密碼</CardTitle>
          <CardDescription>修改登入密碼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">當前密碼</Label>
            <PendingInput 
              section="管理員密碼" 
              field="當前密碼" 
              id="current-password" 
              type="password" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">新密碼</Label>
            <PendingInput 
              section="管理員密碼" 
              field="新密碼" 
              id="new-password" 
              type="password" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">確認密碼</Label>
            <PendingInput 
              section="管理員密碼" 
              field="確認密碼" 
              id="confirm-password" 
              type="password" 
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">變更密碼</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>時間同步</CardTitle>
          <CardDescription>配置 NTP 時間同步服務器</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ntp-server">NTP 服務器</Label>
            <PendingInput 
              section="時間同步" 
              field="NTP 服務器" 
              id="ntp-server" 
              placeholder="pool.ntp.org" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sync-interval">自動校時間隔</Label>
            <PendingSelect 
              section="時間同步" 
              field="自動校時間隔" 
              defaultValue="daily"
              id="sync-interval"
            >
              <SelectContent>
                <SelectItem value="disabled">停用自動校時</SelectItem>
                <SelectItem value="hourly">每小時</SelectItem>
                <SelectItem value="6hours">每 6 小時</SelectItem>
                <SelectItem value="12hours">每 12 小時</SelectItem>
                <SelectItem value="daily">每天</SelectItem>
                <SelectItem value="weekly">每週</SelectItem>
              </SelectContent>
            </PendingSelect>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">立即同步</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
