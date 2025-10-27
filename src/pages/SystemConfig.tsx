import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
              <Input id="hostname" placeholder="OpenWrt" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">時區</Label>
              <Select defaultValue="asia-taipei">
                <SelectTrigger id="timezone">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-taipei">Asia/Taipei (UTC+8)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="asia-hong-kong">Asia/Hong Kong</SelectItem>
                  <SelectItem value="asia-shanghai">Asia/Shanghai</SelectItem>
                </SelectContent>
              </Select>
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
          <CardTitle>管理員密碼</CardTitle>
          <CardDescription>修改登入密碼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">當前密碼</Label>
            <Input id="current-password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">新密碼</Label>
            <Input id="new-password" type="password" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">確認密碼</Label>
            <Input id="confirm-password" type="password" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button>變更密碼</Button>
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
            <Input id="ntp-server" placeholder="pool.ntp.org" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存設定</Button>
            <Button variant="outline">立即同步</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
