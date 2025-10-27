import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const NAT = () => {
  const natRules = [
    {
      name: "Web Server",
      externalPort: "80",
      internalIp: "192.168.1.100",
      internalPort: "80",
      protocol: "TCP",
      enabled: true,
    },
    {
      name: "HTTPS Server",
      externalPort: "443",
      internalIp: "192.168.1.100",
      internalPort: "443",
      protocol: "TCP",
      enabled: true,
    },
    {
      name: "FTP Server",
      externalPort: "21",
      internalIp: "192.168.1.101",
      internalPort: "21",
      protocol: "TCP",
      enabled: false,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">NAT 設定</h2>
          <p className="text-muted-foreground">配置網絡地址轉換和端口轉發規則</p>
        </div>
        <Button className="bg-gradient-primary text-white hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          新增規則
        </Button>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Network className="w-5 h-5" />
                NAT 狀態
              </CardTitle>
              <CardDescription>網絡地址轉換當前狀態</CardDescription>
            </div>
            <Badge className="bg-success text-white">已啟用</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>啟用 NAT</Label>
              <p className="text-sm text-muted-foreground">開啟網絡地址轉換功能</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Full Cone NAT</Label>
              <p className="text-sm text-muted-foreground">完全錐型 NAT（適合 P2P 應用）</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>NAT 加速</Label>
              <p className="text-sm text-muted-foreground">硬體加速 NAT 轉換</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>端口轉發規則</CardTitle>
          <CardDescription>將外部端口轉發到內部 IP 地址</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>規則名稱</TableHead>
                  <TableHead>外部端口</TableHead>
                  <TableHead>內部 IP</TableHead>
                  <TableHead>內部端口</TableHead>
                  <TableHead>協議</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {natRules.map((rule, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>{rule.externalPort}</TableCell>
                    <TableCell>{rule.internalIp}</TableCell>
                    <TableCell>{rule.internalPort}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{rule.protocol}</Badge>
                    </TableCell>
                    <TableCell>
                      {rule.enabled ? (
                        <Badge className="bg-success text-white">啟用</Badge>
                      ) : (
                        <Badge variant="outline">停用</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          編輯
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>新增端口轉發規則</CardTitle>
          <CardDescription>建立新的端口轉發規則</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="rule-name">規則名稱</Label>
              <Input id="rule-name" placeholder="例如: Web Server" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protocol">協議</Label>
              <Select defaultValue="tcp">
                <SelectTrigger id="protocol">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tcp">TCP</SelectItem>
                  <SelectItem value="udp">UDP</SelectItem>
                  <SelectItem value="both">TCP & UDP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="external-port">外部端口</Label>
              <Input id="external-port" type="number" placeholder="例如: 80" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="internal-ip">內部 IP 地址</Label>
              <Input id="internal-ip" placeholder="例如: 192.168.1.100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="internal-port">內部端口</Label>
              <Input id="internal-port" type="number" placeholder="例如: 8080" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source-ip">來源 IP（選填）</Label>
              <Input id="source-ip" placeholder="留空表示任意來源" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="space-y-0.5">
              <Label>啟用此規則</Label>
              <p className="text-sm text-muted-foreground">立即生效</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex gap-3">
            <Button className="flex-1 bg-gradient-primary text-white hover:opacity-90">
              新增規則
            </Button>
            <Button variant="outline" className="flex-1">
              清除
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>UPnP 設定</CardTitle>
          <CardDescription>通用即插即用端口映射</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>啟用 UPnP</Label>
              <p className="text-sm text-muted-foreground">允許設備自動配置端口轉發</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>安全模式</Label>
              <p className="text-sm text-muted-foreground">僅允許授權設備使用 UPnP</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
            保存 UPnP 設定
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NAT;
