import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Network as NetworkIcon, Activity, Cable } from "lucide-react";

export default function Network() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">網絡介面</h1>
        <p className="text-muted-foreground mt-2">配置網絡介面和實體網路埠</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cable className="w-5 h-5 text-primary" />
            網路埠狀態
          </CardTitle>
          <CardDescription>查看所有網路埠的連接狀態</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>埠名稱</TableHead>
                <TableHead>類型</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>速度</TableHead>
                <TableHead>MAC 地址</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">WAN</TableCell>
                <TableCell>廣域網</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    <Activity className="w-3 h-3 mr-1" />
                    已連接
                  </Badge>
                </TableCell>
                <TableCell>1000 Mbps</TableCell>
                <TableCell className="font-mono text-sm">00:11:22:33:44:55</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">LAN1</TableCell>
                <TableCell>區域網</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    <Activity className="w-3 h-3 mr-1" />
                    已連接
                  </Badge>
                </TableCell>
                <TableCell>1000 Mbps</TableCell>
                <TableCell className="font-mono text-sm">00:11:22:33:44:56</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">LAN2</TableCell>
                <TableCell>區域網</TableCell>
                <TableCell>
                  <Badge variant="outline">未連接</Badge>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell className="font-mono text-sm">00:11:22:33:44:57</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">LAN3</TableCell>
                <TableCell>區域網</TableCell>
                <TableCell>
                  <Badge variant="outline">未連接</Badge>
                </TableCell>
                <TableCell>-</TableCell>
                <TableCell className="font-mono text-sm">00:11:22:33:44:58</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">LAN4</TableCell>
                <TableCell>區域網</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    <Activity className="w-3 h-3 mr-1" />
                    已連接
                  </Badge>
                </TableCell>
                <TableCell>100 Mbps</TableCell>
                <TableCell className="font-mono text-sm">00:11:22:33:44:59</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="wan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="wan">WAN 設定</TabsTrigger>
          <TabsTrigger value="lan">LAN 設定</TabsTrigger>
          <TabsTrigger value="vlan">VLAN 設定</TabsTrigger>
        </TabsList>

        <TabsContent value="wan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                WAN 口設定
              </CardTitle>
              <CardDescription>配置廣域網連接設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wan-type">連接類型</Label>
                  <Select defaultValue="dhcp">
                    <SelectTrigger id="wan-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dhcp">DHCP 自動獲取</SelectItem>
                      <SelectItem value="static">靜態 IP</SelectItem>
                      <SelectItem value="pppoe">PPPoE</SelectItem>
                      <SelectItem value="pptp">PPTP</SelectItem>
                      <SelectItem value="l2tp">L2TP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wan-port">實體埠</Label>
                  <Select defaultValue="eth0">
                    <SelectTrigger id="wan-port">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="eth0">eth0 (WAN)</SelectItem>
                      <SelectItem value="eth1">eth1</SelectItem>
                      <SelectItem value="eth2">eth2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wan-ip">IP 地址</Label>
                    <Input id="wan-ip" placeholder="自動獲取" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wan-mask">子網掩碼</Label>
                    <Input id="wan-mask" placeholder="自動獲取" disabled />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wan-gateway">網關</Label>
                    <Input id="wan-gateway" placeholder="自動獲取" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wan-dns">DNS 服務器</Label>
                    <Input id="wan-dns" placeholder="自動獲取" disabled />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wan-mtu">MTU 大小</Label>
                  <Input id="wan-mtu" type="number" defaultValue="1500" />
                  <p className="text-xs text-muted-foreground">
                    建議值：1500（Ethernet）、1492（PPPoE）
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="wan-clone-mac">克隆 MAC 地址</Label>
                    <p className="text-sm text-muted-foreground">使用自定義 MAC 地址</p>
                  </div>
                  <Switch id="wan-clone-mac" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wan-mac">MAC 地址</Label>
                  <Input id="wan-mac" placeholder="00:11:22:33:44:55" disabled />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button>儲存設定</Button>
                <Button variant="outline">重新連接</Button>
                <Button variant="outline">釋放 IP</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>PPPoE 設定</CardTitle>
              <CardDescription>配置 PPPoE 撥號連接（需選擇 PPPoE 連接類型）</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pppoe-username">使用者名稱</Label>
                <Input id="pppoe-username" placeholder="您的 ISP 提供的帳號" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pppoe-password">密碼</Label>
                <Input id="pppoe-password" type="password" placeholder="您的 ISP 提供的密碼" disabled />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pppoe-auto">自動連接</Label>
                  <p className="text-sm text-muted-foreground">開機時自動撥號</p>
                </div>
                <Switch id="pppoe-auto" defaultChecked disabled />
              </div>

              <div className="flex gap-2 pt-4">
                <Button disabled>儲存 PPPoE 設定</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <NetworkIcon className="w-5 h-5 text-primary" />
                LAN 口設定
              </CardTitle>
              <CardDescription>配置區域網設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="lan-ip">LAN IP 地址</Label>
                  <Input id="lan-ip" defaultValue="192.168.1.1" />
                  <p className="text-xs text-muted-foreground">
                    路由器在區域網中的 IP 地址
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lan-mask">子網掩碼</Label>
                  <Select defaultValue="255.255.255.0">
                    <SelectTrigger id="lan-mask">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="255.255.255.0">255.255.255.0 (/24)</SelectItem>
                      <SelectItem value="255.255.0.0">255.255.0.0 (/16)</SelectItem>
                      <SelectItem value="255.0.0.0">255.0.0.0 (/8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lan-ports">LAN 埠配置</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2">
                      <Switch id="lan1" defaultChecked />
                      <Label htmlFor="lan1" className="cursor-pointer">LAN1</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="lan2" defaultChecked />
                      <Label htmlFor="lan2" className="cursor-pointer">LAN2</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="lan3" defaultChecked />
                      <Label htmlFor="lan3" className="cursor-pointer">LAN3</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="lan4" defaultChecked />
                      <Label htmlFor="lan4" className="cursor-pointer">LAN4</Label>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    選擇作為 LAN 口的實體埠
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lan-jumbo">啟用 Jumbo Frame</Label>
                    <p className="text-sm text-muted-foreground">支持大型數據包傳輸</p>
                  </div>
                  <Switch id="lan-jumbo" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="lan-igmp">啟用 IGMP Snooping</Label>
                    <p className="text-sm text-muted-foreground">優化多播流量</p>
                  </div>
                  <Switch id="lan-igmp" defaultChecked />
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button>儲存設定</Button>
                <Button variant="outline">重設</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>埠速度和雙工設定</CardTitle>
              <CardDescription>配置各個埠的速度和雙工模式</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>埠名稱</TableHead>
                    <TableHead>速度</TableHead>
                    <TableHead>雙工模式</TableHead>
                    <TableHead>流量控制</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">LAN1</TableCell>
                    <TableCell>
                      <Select defaultValue="auto">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">自動</SelectItem>
                          <SelectItem value="1000">1000M</SelectItem>
                          <SelectItem value="100">100M</SelectItem>
                          <SelectItem value="10">10M</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="full">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">全雙工</SelectItem>
                          <SelectItem value="half">半雙工</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Switch defaultChecked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">LAN2</TableCell>
                    <TableCell>
                      <Select defaultValue="auto">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">自動</SelectItem>
                          <SelectItem value="1000">1000M</SelectItem>
                          <SelectItem value="100">100M</SelectItem>
                          <SelectItem value="10">10M</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="full">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">全雙工</SelectItem>
                          <SelectItem value="half">半雙工</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Switch defaultChecked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">LAN3</TableCell>
                    <TableCell>
                      <Select defaultValue="auto">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">自動</SelectItem>
                          <SelectItem value="1000">1000M</SelectItem>
                          <SelectItem value="100">100M</SelectItem>
                          <SelectItem value="10">10M</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="full">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">全雙工</SelectItem>
                          <SelectItem value="half">半雙工</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Switch defaultChecked />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">LAN4</TableCell>
                    <TableCell>
                      <Select defaultValue="auto">
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">自動</SelectItem>
                          <SelectItem value="1000">1000M</SelectItem>
                          <SelectItem value="100">100M</SelectItem>
                          <SelectItem value="10">10M</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select defaultValue="full">
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">全雙工</SelectItem>
                          <SelectItem value="half">半雙工</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Switch defaultChecked />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button>套用設定</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vlan">
          <Card>
            <CardHeader>
              <CardTitle>VLAN 設定</CardTitle>
              <CardDescription>配置虛擬區域網絡</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>VLAN ID</TableHead>
                    <TableHead>名稱</TableHead>
                    <TableHead>成員埠</TableHead>
                    <TableHead>Tagged 埠</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell>LAN1, LAN2, LAN3, LAN4</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">編輯</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-muted-foreground text-center" colSpan={5}>
                      沒有其他 VLAN 設定
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button variant="outline">新增 VLAN</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
