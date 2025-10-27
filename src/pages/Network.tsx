import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const Network = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">網絡設置</h2>
        <p className="text-muted-foreground">配置您的無線網絡和連接設置</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>2.4GHz 網絡</CardTitle>
            <CardDescription>配置 2.4GHz 頻段的無線網絡</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ssid-24">網絡名稱 (SSID)</Label>
              <Input id="ssid-24" defaultValue="MyRouter_2.4G" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-24">密碼</Label>
              <Input id="password-24" type="password" defaultValue="********" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>啟用網絡</Label>
                <p className="text-sm text-muted-foreground">開啟或關閉此頻段</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>隱藏 SSID</Label>
                <p className="text-sm text-muted-foreground">不廣播網絡名稱</p>
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
            <CardTitle>5GHz 網絡</CardTitle>
            <CardDescription>配置 5GHz 頻段的無線網絡</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ssid-5">網絡名稱 (SSID)</Label>
              <Input id="ssid-5" defaultValue="MyRouter_5G" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password-5">密碼</Label>
              <Input id="password-5" type="password" defaultValue="********" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>啟用網絡</Label>
                <p className="text-sm text-muted-foreground">開啟或關閉此頻段</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>隱藏 SSID</Label>
                <p className="text-sm text-muted-foreground">不廣播網絡名稱</p>
              </div>
              <Switch />
            </div>
            <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
              保存設置
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>高級設置</CardTitle>
          <CardDescription>配置進階網絡參數</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="channel-24">2.4GHz 信道</Label>
              <Input id="channel-24" defaultValue="自動" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="channel-5">5GHz 信道</Label>
              <Input id="channel-5" defaultValue="自動" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dns-1">首選 DNS</Label>
              <Input id="dns-1" defaultValue="8.8.8.8" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dns-2">備用 DNS</Label>
              <Input id="dns-2" defaultValue="8.8.4.4" />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>啟用 UPnP</Label>
                <p className="text-sm text-muted-foreground">自動端口轉發</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>啟用 IPv6</Label>
                <p className="text-sm text-muted-foreground">支持新一代網絡協議</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>訪客網絡</Label>
                <p className="text-sm text-muted-foreground">為訪客提供獨立網絡</p>
              </div>
              <Switch />
            </div>
          </div>

          <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
            應用所有設置
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Network;
