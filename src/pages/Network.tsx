import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PendingInput } from "@/components/PendingInput";
import { PendingSwitch } from "@/components/PendingSwitch";
import { PendingSelect, SelectContent, SelectItem } from "@/components/PendingSelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Network as NetworkIcon, Server, Monitor, Smartphone, Laptop, Tv, Wifi } from "lucide-react";

const connectedDevices = [
  { hostname: "iPhone-張三", mac: "A1:B2:C3:D4:E5:F6", ip: "192.168.1.101", type: "smartphone", leaseExpires: "11:32:45" },
  { hostname: "MacBook-Pro", mac: "11:22:33:44:55:66", ip: "192.168.1.102", type: "laptop", leaseExpires: "10:15:22" },
  { hostname: "Windows-PC", mac: "AA:BB:CC:DD:EE:FF", ip: "192.168.1.103", type: "desktop", leaseExpires: "09:45:10" },
  { hostname: "Smart-TV", mac: "12:34:56:78:9A:BC", ip: "192.168.1.104", type: "tv", leaseExpires: "08:20:33" },
  { hostname: "ESP32-IoT", mac: "DE:AD:BE:EF:00:01", ip: "192.168.1.105", type: "other", leaseExpires: "07:55:18" },
];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case "smartphone":
      return <Smartphone className="w-4 h-4" />;
    case "laptop":
      return <Laptop className="w-4 h-4" />;
    case "desktop":
      return <Monitor className="w-4 h-4" />;
    case "tv":
      return <Tv className="w-4 h-4" />;
    default:
      return <Wifi className="w-4 h-4" />;
  }
};

export default function Network() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">網絡介面</h1>
        <p className="text-muted-foreground mt-2">配置基本網絡設定</p>
      </div>

      <Tabs defaultValue="wan" className="space-y-4">
        <TabsList>
          <TabsTrigger value="wan">WAN 設定</TabsTrigger>
          <TabsTrigger value="lan">LAN 設定</TabsTrigger>
          <TabsTrigger value="dns">DNS 設定</TabsTrigger>
        </TabsList>

        <TabsContent value="wan">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                WAN 口設定
              </CardTitle>
              <CardDescription>配置廣域網連接</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wan-type">連接類型</Label>
                  <PendingSelect 
                    section="WAN 設定" 
                    field="連接類型" 
                    defaultValue="dhcp"
                    id="wan-type"
                  >
                    <SelectContent>
                      <SelectItem value="dhcp">DHCP 自動獲取</SelectItem>
                      <SelectItem value="static">靜態 IP</SelectItem>
                      <SelectItem value="pppoe">PPPoE 撥號</SelectItem>
                    </SelectContent>
                  </PendingSelect>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wan-mtu">MTU 大小</Label>
                  <PendingInput 
                    section="WAN 設定" 
                    field="MTU 大小" 
                    id="wan-mtu" 
                    type="number" 
                    defaultValue="1500" 
                  />
                  <p className="text-xs text-muted-foreground">
                    建議值：1500（Ethernet）、1492（PPPoE）
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="wan-clone-mac">克隆 MAC 地址</Label>
                    <p className="text-sm text-muted-foreground">使用自定義 MAC 地址</p>
                  </div>
                  <PendingSwitch 
                    section="WAN 設定" 
                    field="克隆 MAC 地址" 
                    id="wan-clone-mac" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>PPPoE 撥號設定</CardTitle>
              <CardDescription>僅在選擇 PPPoE 連接類型時需要配置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pppoe-username">使用者名稱</Label>
                <PendingInput 
                  section="PPPoE 設定" 
                  field="使用者名稱" 
                  id="pppoe-username" 
                  placeholder="您的 ISP 提供的帳號"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pppoe-password">密碼</Label>
                <PendingInput 
                  section="PPPoE 設定" 
                  field="密碼" 
                  id="pppoe-password" 
                  type="password" 
                  placeholder="您的 ISP 提供的密碼"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pppoe-auto">自動連接</Label>
                  <p className="text-sm text-muted-foreground">開機時自動撥號</p>
                </div>
                <PendingSwitch 
                  section="PPPoE 設定" 
                  field="自動連接" 
                  id="pppoe-auto" 
                  defaultChecked 
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>靜態 IP 設定</CardTitle>
              <CardDescription>僅在選擇靜態 IP 連接類型時需要配置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="static-ip">IP 地址</Label>
                  <PendingInput 
                    section="靜態 IP 設定" 
                    field="IP 地址" 
                    id="static-ip" 
                    placeholder="例如：192.168.1.100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="static-mask">子網掩碼</Label>
                  <PendingInput 
                    section="靜態 IP 設定" 
                    field="子網掩碼" 
                    id="static-mask" 
                    placeholder="例如：255.255.255.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="static-gateway">網關</Label>
                  <PendingInput 
                    section="靜態 IP 設定" 
                    field="網關" 
                    id="static-gateway" 
                    placeholder="例如：192.168.1.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="static-dns">DNS 服務器</Label>
                  <PendingInput 
                    section="靜態 IP 設定" 
                    field="DNS 服務器" 
                    id="static-dns" 
                    placeholder="例如：8.8.8.8"
                  />
                </div>
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
                  <PendingInput 
                    section="LAN 設定" 
                    field="LAN IP 地址" 
                    id="lan-ip" 
                    defaultValue="192.168.1.1" 
                  />
                  <p className="text-xs text-muted-foreground">
                    路由器在區域網中的 IP 地址
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lan-mask">子網掩碼</Label>
                  <PendingSelect 
                    section="LAN 設定" 
                    field="子網掩碼" 
                    defaultValue="255.255.255.0"
                    id="lan-mask"
                  >
                    <SelectContent>
                      <SelectItem value="255.255.255.0">255.255.255.0 (/24)</SelectItem>
                      <SelectItem value="255.255.0.0">255.255.0.0 (/16)</SelectItem>
                      <SelectItem value="255.0.0.0">255.0.0.0 (/8)</SelectItem>
                    </SelectContent>
                  </PendingSelect>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <Label htmlFor="lan-dhcp">啟用 DHCP 服務器</Label>
                    <p className="text-sm text-muted-foreground">自動分配 IP 給連接設備</p>
                  </div>
                  <PendingSwitch 
                    section="LAN 設定" 
                    field="DHCP 服務器" 
                    id="lan-dhcp" 
                    defaultChecked 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dhcp-start">DHCP 起始 IP</Label>
                    <PendingInput 
                      section="LAN 設定" 
                      field="DHCP 起始 IP" 
                      id="dhcp-start" 
                      defaultValue="192.168.1.100" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dhcp-end">DHCP 結束 IP</Label>
                    <PendingInput 
                      section="LAN 設定" 
                      field="DHCP 結束 IP" 
                      id="dhcp-end" 
                      defaultValue="192.168.1.200" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lease-time">租約時間（小時）</Label>
                  <PendingInput 
                    section="LAN 設定" 
                    field="租約時間" 
                    id="lease-time" 
                    type="number" 
                    defaultValue="12" 
                  />
                  <p className="text-xs text-muted-foreground">
                    客戶端 IP 地址的有效時間
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                已連接設備
              </CardTitle>
              <CardDescription>目前透過 DHCP 取得 IP 的裝置（共 {connectedDevices.length} 台）</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>設備</TableHead>
                    <TableHead>MAC 地址</TableHead>
                    <TableHead>IP 地址</TableHead>
                    <TableHead>租約到期</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connectedDevices.map((device, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded bg-muted">
                            {getDeviceIcon(device.type)}
                          </div>
                          <span className="font-medium">{device.hostname}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{device.mac}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{device.ip}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{device.leaseExpires}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">設為靜態</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="mt-6">
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
        </TabsContent>

        <TabsContent value="dns">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5 text-primary" />
                DNS 設定
              </CardTitle>
              <CardDescription>配置域名解析服務器</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dns1">主要 DNS</Label>
                <PendingInput 
                  section="DNS 設定" 
                  field="主要 DNS" 
                  id="dns1" 
                  defaultValue="8.8.8.8" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dns2">備用 DNS</Label>
                <PendingInput 
                  section="DNS 設定" 
                  field="備用 DNS" 
                  id="dns2" 
                  defaultValue="8.8.4.4" 
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <Label htmlFor="dns-override">覆蓋 ISP DNS</Label>
                  <p className="text-sm text-muted-foreground">使用自定義 DNS 替代 ISP 提供的</p>
                </div>
                <PendingSwitch 
                  section="DNS 設定" 
                  field="覆蓋 ISP DNS" 
                  id="dns-override" 
                  defaultChecked 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
