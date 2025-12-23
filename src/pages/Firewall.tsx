import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, Shield } from "lucide-react";

export default function Firewall() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">NAT / DMZ</h1>
        <p className="text-muted-foreground mt-2">配置網絡地址轉換和 DMZ 設置</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            DMZ 設置
          </CardTitle>
          <CardDescription>將指定主機暴露於外部網絡，允許所有入站連接</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dmz-enabled">啟用 DMZ</Label>
              <p className="text-sm text-muted-foreground">將指定 IP 設為 DMZ 主機</p>
            </div>
            <Switch id="dmz-enabled" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dmz-ip">DMZ 主機 IP</Label>
              <Input id="dmz-ip" placeholder="192.168.1.100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dmz-interface">WAN 介面</Label>
              <Select>
                <SelectTrigger id="dmz-interface">
                  <SelectValue placeholder="選擇介面" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wan">WAN</SelectItem>
                  <SelectItem value="wan6">WAN6</SelectItem>
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
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            端口轉發規則 (Port Forwarding)
          </CardTitle>
          <CardDescription>配置外部端口到內部設備的 NAT 轉發</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名稱</TableHead>
                <TableHead>協議</TableHead>
                <TableHead>外部端口</TableHead>
                <TableHead>內部 IP</TableHead>
                <TableHead>內部端口</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground text-center" colSpan={7}>
                  尚無轉發規則
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button variant="outline">新增規則</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>NAT 回環 (NAT Loopback)</CardTitle>
          <CardDescription>允許內網設備通過公網 IP 訪問內部服務</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="nat-loopback">啟用 NAT 回環</Label>
              <p className="text-sm text-muted-foreground">允許 LAN 客戶端使用外部地址訪問端口轉發的服務</p>
            </div>
            <Switch id="nat-loopback" defaultChecked />
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
