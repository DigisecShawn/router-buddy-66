import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function Firewall() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">防火牆</h1>
        <p className="text-muted-foreground mt-2">配置網絡安全和訪問控制規則</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            防火牆狀態
          </CardTitle>
          <CardDescription>管理防火牆總開關和基本設置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="firewall-enabled">啟用防火牆</Label>
              <p className="text-sm text-muted-foreground">保護網絡免受未授權訪問</p>
            </div>
            <Switch id="firewall-enabled" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="syn-flood">SYN Flood 防護</Label>
              <p className="text-sm text-muted-foreground">防止 SYN 洪水攻擊</p>
            </div>
            <Switch id="syn-flood" defaultChecked />
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存設定</Button>
            <Button variant="outline">重設</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>區域設置</CardTitle>
          <CardDescription>配置防火牆區域和轉發規則</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>區域</TableHead>
                <TableHead>輸入</TableHead>
                <TableHead>輸出</TableHead>
                <TableHead>轉發</TableHead>
                <TableHead>偽裝</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">LAN</TableCell>
                <TableCell><Badge variant="secondary">接受</Badge></TableCell>
                <TableCell><Badge variant="secondary">接受</Badge></TableCell>
                <TableCell><Badge variant="secondary">接受</Badge></TableCell>
                <TableCell>關閉</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">WAN</TableCell>
                <TableCell><Badge variant="destructive">拒絕</Badge></TableCell>
                <TableCell><Badge variant="secondary">接受</Badge></TableCell>
                <TableCell><Badge variant="destructive">拒絕</Badge></TableCell>
                <TableCell>開啟</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>端口轉發規則</CardTitle>
          <CardDescription>配置外部端口到內部設備的轉發</CardDescription>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-muted-foreground text-center" colSpan={6}>
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
    </div>
  );
}
