import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Signal, Settings, Info } from "lucide-react";

export default function GPRS() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">GPRS 設定</h1>
        <p className="text-muted-foreground mt-2">配置 GPRS/3G 數據連接參數</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Signal className="w-5 h-5 text-primary" />
            GPRS 連接設定
          </CardTitle>
          <CardDescription>配置 GPRS 數據連接基本參數</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="gprs-enabled">啟用 GPRS</Label>
                <p className="text-sm text-muted-foreground">開啟 GPRS 數據連接</p>
              </div>
              <Switch id="gprs-enabled" defaultChecked />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gprs-apn">APN 設定</Label>
              <Input id="gprs-apn" placeholder="internet" />
              <p className="text-xs text-muted-foreground">
                接入點名稱，請向運營商確認
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gprs-username">使用者名稱</Label>
                <Input id="gprs-username" placeholder="選填" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gprs-password">密碼</Label>
                <Input id="gprs-password" type="password" placeholder="選填" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="auth-type">認證類型</Label>
              <Select defaultValue="auto">
                <SelectTrigger id="auth-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">自動</SelectItem>
                  <SelectItem value="pap">PAP</SelectItem>
                  <SelectItem value="chap">CHAP</SelectItem>
                  <SelectItem value="none">無認證</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存設定</Button>
            <Button variant="outline">測試連接</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profiles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profiles">APN 配置檔</TabsTrigger>
          <TabsTrigger value="operators">運營商設定</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles">
          <Card>
            <CardHeader>
              <CardTitle>APN 配置檔管理</CardTitle>
              <CardDescription>管理多個 APN 配置檔案</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名稱</TableHead>
                    <TableHead>APN</TableHead>
                    <TableHead>認證</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">預設配置</TableCell>
                    <TableCell>internet</TableCell>
                    <TableCell>無</TableCell>
                    <TableCell>啟用中</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">編輯</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground text-center" colSpan={5}>
                      沒有更多配置檔
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button variant="outline">新增配置檔</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operators">
          <Card>
            <CardHeader>
              <CardTitle>運營商選擇</CardTitle>
              <CardDescription>選擇網絡運營商</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="operator-mode">運營商選擇模式</Label>
                <Select defaultValue="auto">
                  <SelectTrigger id="operator-mode">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">自動選擇</SelectItem>
                    <SelectItem value="manual">手動選擇</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="operator-list">可用運營商</Label>
                <Select defaultValue="46692">
                  <SelectTrigger id="operator-list">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="46692">中華電信 (46692)</SelectItem>
                    <SelectItem value="46697">台灣大哥大 (46697)</SelectItem>
                    <SelectItem value="46601">遠傳電信 (46601)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="roaming">數據漫遊</Label>
                  <p className="text-sm text-muted-foreground">在國外時使用數據網絡</p>
                </div>
                <Switch id="roaming" />
              </div>

              <div className="flex gap-2 pt-4">
                <Button>套用設定</Button>
                <Button variant="outline">掃描網絡</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            連接管理
          </CardTitle>
          <CardDescription>管理 GPRS 連接行為</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="always-on">保持常連</Label>
              <p className="text-sm text-muted-foreground">始終保持 GPRS 連接</p>
            </div>
            <Switch id="always-on" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="on-demand">按需連接</Label>
              <p className="text-sm text-muted-foreground">有流量時才建立連接</p>
            </div>
            <Switch id="on-demand" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="idle-timeout">閒置超時 (秒)</Label>
            <Input id="idle-timeout" type="number" placeholder="300" />
            <p className="text-xs text-muted-foreground">
              無流量時自動斷開的等待時間
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="retry-interval">重試間隔 (秒)</Label>
            <Input id="retry-interval" type="number" placeholder="30" />
            <p className="text-xs text-muted-foreground">
              連接失敗後重試的等待時間
            </p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button>儲存設定</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            常見 APN 設定
          </CardTitle>
          <CardDescription>台灣主要運營商 APN 參考</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>運營商</TableHead>
                <TableHead>APN</TableHead>
                <TableHead>使用者名稱</TableHead>
                <TableHead>密碼</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">中華電信</TableCell>
                <TableCell>internet</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">台灣大哥大</TableCell>
                <TableCell>internet</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">遠傳電信</TableCell>
                <TableCell>internet</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">台灣之星</TableCell>
                <TableCell>internet</TableCell>
                <TableCell>-</TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
