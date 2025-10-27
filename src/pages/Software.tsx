import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Info, Search, Download } from "lucide-react";

export default function Software() {
  const installedPackages = [
    { name: "luci", version: "git-24.001", description: "LuCI Web 界面" },
    { name: "firewall4", version: "2024-01-15", description: "防火牆管理工具" },
    { name: "dnsmasq", version: "2.89", description: "DNS 和 DHCP 服務器" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">軟體管理</h1>
        <p className="text-muted-foreground mt-2">管理已安裝的軟體包和安裝新軟體</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            系統更新
          </CardTitle>
          <CardDescription>檢查並安裝系統更新</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            點擊下方按鈕檢查可用的軟體包更新
          </p>
          <div className="flex gap-2">
            <Button>
              <Download className="w-4 h-4 mr-2" />
              更新軟體包列表
            </Button>
            <Button variant="outline">升級已安裝軟體</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>已安裝軟體包</CardTitle>
          <CardDescription>查看和管理已安裝的軟體包</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="搜尋軟體包..." className="pl-10" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>軟體包名稱</TableHead>
                <TableHead>版本</TableHead>
                <TableHead>說明</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {installedPackages.map((pkg) => (
                <TableRow key={pkg.name}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{pkg.version}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {pkg.description}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" disabled>
                      移除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>可用軟體包</CardTitle>
          <CardDescription>瀏覽並安裝新的軟體包</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            請先更新軟體包列表以查看可用軟體
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
