import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Signal, Radio, Smartphone } from "lucide-react";

const GPRS = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">GPRS / 4G 設定</h2>
        <p className="text-muted-foreground">配置行動網路連接參數</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Signal className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">信號強度</h3>
              <p className="text-2xl font-bold text-success">-65 dBm</p>
              <Badge className="bg-success text-white">優秀</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Radio className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">網絡類型</h3>
              <p className="text-2xl font-bold text-primary">4G LTE</p>
              <Badge variant="outline">已連接</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">電信商</h3>
              <p className="text-xl font-bold text-accent">中華電信</p>
              <Badge variant="outline">46692</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>APN 設定</CardTitle>
          <CardDescription>設定接入點名稱 (Access Point Name)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="apn">APN</Label>
              <Input id="apn" placeholder="internet" defaultValue="internet" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auth-type">驗證類型</Label>
              <Select defaultValue="none">
                <SelectTrigger id="auth-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">無</SelectItem>
                  <SelectItem value="pap">PAP</SelectItem>
                  <SelectItem value="chap">CHAP</SelectItem>
                  <SelectItem value="pap-chap">PAP/CHAP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">用戶名</Label>
              <Input id="username" placeholder="選填" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密碼</Label>
              <Input id="password" type="password" placeholder="選填" />
            </div>
          </div>
          <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
            保存 APN 設定
          </Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>網絡模式設定</CardTitle>
            <CardDescription>選擇優先連接的網絡類型</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="network-mode">網絡模式</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="network-mode">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">自動 (4G/3G/2G)</SelectItem>
                  <SelectItem value="4g-only">僅 4G</SelectItem>
                  <SelectItem value="4g-3g">4G/3G</SelectItem>
                  <SelectItem value="3g-only">僅 3G</SelectItem>
                  <SelectItem value="2g-only">僅 2G</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>數據漫遊</Label>
                <p className="text-sm text-muted-foreground">允許在漫遊時使用數據</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>自動重連</Label>
                <p className="text-sm text-muted-foreground">連接斷開時自動重新連接</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
              應用設定
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>PIN 碼管理</CardTitle>
            <CardDescription>SIM 卡 PIN 碼設定</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>啟用 PIN 碼</Label>
                <p className="text-sm text-muted-foreground">開機時需要輸入 PIN 碼</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-pin">當前 PIN 碼</Label>
              <Input id="current-pin" type="password" maxLength={4} placeholder="••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-pin">新 PIN 碼</Label>
              <Input id="new-pin" type="password" maxLength={4} placeholder="••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-pin">確認 PIN 碼</Label>
              <Input id="confirm-pin" type="password" maxLength={4} placeholder="••••" />
            </div>
            <Button variant="outline" className="w-full">
              更改 PIN 碼
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>連接資訊</CardTitle>
          <CardDescription>當前行動網路詳細資訊</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">IMEI</p>
              <p className="text-sm font-medium text-foreground">867123456789012</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">IMSI</p>
              <p className="text-sm font-medium text-foreground">466920123456789</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">手機號碼</p>
              <p className="text-sm font-medium text-foreground">+886 912 345 678</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">基站 ID</p>
              <p className="text-sm font-medium text-foreground">12345</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">頻段</p>
              <p className="text-sm font-medium text-foreground">Band 3 (1800MHz)</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">RSRP</p>
              <p className="text-sm font-medium text-foreground">-85 dBm</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">RSRQ</p>
              <p className="text-sm font-medium text-foreground">-10 dB</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground mb-1">SINR</p>
              <p className="text-sm font-medium text-foreground">15 dB</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GPRS;
