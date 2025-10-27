import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings } from "lucide-react";

export default function DHCP() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">DHCP 和 DNS</h1>
        <p className="text-muted-foreground mt-2">配置 DHCP 服務器和 DNS 設置</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            DHCP 服務器
          </CardTitle>
          <CardDescription>配置自動 IP 地址分配</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dhcp-enabled">啟用 DHCP</Label>
                <p className="text-sm text-muted-foreground">自動分配 IP 地址給客戶端</p>
              </div>
              <Switch id="dhcp-enabled" defaultChecked />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-ip">起始 IP 地址</Label>
                <Input id="start-ip" placeholder="192.168.1.100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-ip">結束 IP 地址</Label>
                <Input id="end-ip" placeholder="192.168.1.200" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lease-time">租約時間 (小時)</Label>
              <Input id="lease-time" type="number" placeholder="12" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gateway">網關</Label>
              <Input id="gateway" placeholder="192.168.1.1" />
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
          <CardTitle>DNS 設置</CardTitle>
          <CardDescription>配置域名解析服務器</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="dns1">主要 DNS</Label>
            <Input id="dns1" placeholder="8.8.8.8" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dns2">備用 DNS</Label>
            <Input id="dns2" placeholder="8.8.4.4" />
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存設定</Button>
            <Button variant="outline">重設</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>靜態租約</CardTitle>
          <CardDescription>為特定設備分配固定 IP 地址</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>主機名稱</TableHead>
                <TableHead>MAC 地址</TableHead>
                <TableHead>IP 地址</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground text-center" colSpan={4}>
                  尚無靜態租約
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button variant="outline">新增靜態租約</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
