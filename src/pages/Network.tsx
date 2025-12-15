import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PendingInput } from "@/components/PendingInput";
import { PendingSwitch } from "@/components/PendingSwitch";
import { PendingSelect, SelectContent, SelectItem } from "@/components/PendingSelect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe, Network as NetworkIcon, Server, Monitor, Smartphone, Laptop, Tv, Wifi, Tablet, Gamepad2, Printer, Camera, Speaker, Watch, Router, HardDrive } from "lucide-react";

// MAC 地址前綴對應廠商/設備類型 (OUI)
const macPrefixMap: Record<string, { vendor: string; type: string }> = {
  "00:1A:2B": { vendor: "Apple", type: "smartphone" },
  "A4:83:E7": { vendor: "Apple", type: "smartphone" },
  "F0:18:98": { vendor: "Apple", type: "laptop" },
  "3C:06:30": { vendor: "Apple", type: "laptop" },
  "00:50:56": { vendor: "VMware", type: "desktop" },
  "00:0C:29": { vendor: "VMware", type: "desktop" },
  "B8:27:EB": { vendor: "Raspberry Pi", type: "iot" },
  "DC:A6:32": { vendor: "Raspberry Pi", type: "iot" },
  "30:AE:A4": { vendor: "Espressif", type: "iot" },
  "24:0A:C4": { vendor: "Espressif", type: "iot" },
  "AC:67:B2": { vendor: "Espressif", type: "iot" },
  "00:1E:C2": { vendor: "Samsung", type: "smartphone" },
  "78:47:1D": { vendor: "Samsung", type: "tv" },
  "00:09:2D": { vendor: "Sony", type: "gaming" },
  "00:04:1F": { vendor: "Sony", type: "gaming" },
  "7C:BB:8A": { vendor: "Nintendo", type: "gaming" },
  "00:1F:A7": { vendor: "Microsoft", type: "gaming" },
  "00:1D:D8": { vendor: "Microsoft", type: "gaming" },
  "00:17:88": { vendor: "Philips", type: "iot" },
  "B4:E6:2D": { vendor: "Google", type: "speaker" },
  "F4:F5:D8": { vendor: "Google", type: "speaker" },
  "00:17:C4": { vendor: "HP", type: "printer" },
  "3C:D9:2B": { vendor: "HP", type: "printer" },
  "00:00:48": { vendor: "Epson", type: "printer" },
};

// 根據主機名稱關鍵字識別設備類型
const hostnamePatterns: { pattern: RegExp; type: string }[] = [
  { pattern: /iphone|android|galaxy|pixel|xiaomi|huawei|oppo|vivo|redmi|oneplus|realme/i, type: "smartphone" },
  { pattern: /ipad|tab|tablet|surface/i, type: "tablet" },
  { pattern: /macbook|laptop|notebook|thinkpad|dell|lenovo|asus|acer|hp-laptop/i, type: "laptop" },
  { pattern: /imac|desktop|pc|workstation|tower/i, type: "desktop" },
  { pattern: /smart-?tv|television|roku|fire-?tv|chromecast|appletv|lg-?tv|samsung-?tv|sony-?tv/i, type: "tv" },
  { pattern: /playstation|ps[345]|xbox|nintendo|switch|gaming/i, type: "gaming" },
  { pattern: /printer|epson|canon|brother|hp-print/i, type: "printer" },
  { pattern: /camera|cam|ipcam|webcam|hikvision|dahua|reolink/i, type: "camera" },
  { pattern: /echo|alexa|homepod|google-?home|nest|sonos|speaker/i, type: "speaker" },
  { pattern: /watch|fitbit|garmin|amazfit/i, type: "watch" },
  { pattern: /router|gateway|ap|access-?point|mesh/i, type: "router" },
  { pattern: /nas|synology|qnap|storage|backup/i, type: "storage" },
  { pattern: /esp32|esp8266|arduino|raspberry|pi|iot|sensor|smart-?plug|tuya|shelly/i, type: "iot" },
];

// 自動識別設備類型
const detectDeviceType = (hostname: string, mac: string): string => {
  // 先根據 MAC 前綴識別
  const macPrefix = mac.substring(0, 8).toUpperCase();
  if (macPrefixMap[macPrefix]) {
    return macPrefixMap[macPrefix].type;
  }

  // 再根據主機名稱識別
  for (const { pattern, type } of hostnamePatterns) {
    if (pattern.test(hostname)) {
      return type;
    }
  }

  return "unknown";
};

// 根據設備類型獲取圖示
const getDeviceIcon = (type: string) => {
  switch (type) {
    case "smartphone":
      return <Smartphone className="w-4 h-4" />;
    case "tablet":
      return <Tablet className="w-4 h-4" />;
    case "laptop":
      return <Laptop className="w-4 h-4" />;
    case "desktop":
      return <Monitor className="w-4 h-4" />;
    case "tv":
      return <Tv className="w-4 h-4" />;
    case "gaming":
      return <Gamepad2 className="w-4 h-4" />;
    case "printer":
      return <Printer className="w-4 h-4" />;
    case "camera":
      return <Camera className="w-4 h-4" />;
    case "speaker":
      return <Speaker className="w-4 h-4" />;
    case "watch":
      return <Watch className="w-4 h-4" />;
    case "router":
      return <Router className="w-4 h-4" />;
    case "storage":
      return <HardDrive className="w-4 h-4" />;
    case "iot":
      return <Wifi className="w-4 h-4" />;
    default:
      return <Wifi className="w-4 h-4" />;
  }
};

// 獲取設備類型名稱
const getDeviceTypeName = (type: string): string => {
  const typeNames: Record<string, string> = {
    smartphone: "手機",
    tablet: "平板",
    laptop: "筆電",
    desktop: "桌機",
    tv: "電視",
    gaming: "遊戲機",
    printer: "印表機",
    camera: "攝影機",
    speaker: "智慧音箱",
    watch: "智慧手錶",
    router: "路由器",
    storage: "儲存設備",
    iot: "IoT 裝置",
    unknown: "未知設備",
  };
  return typeNames[type] || "未知設備";
};

// 模擬連接設備資料（現在不需要預設 type，會自動識別）
const connectedDevicesRaw = [
  { hostname: "iPhone-張三", mac: "A4:83:E7:D4:E5:F6", ip: "192.168.1.101", leaseExpires: "11:32:45" },
  { hostname: "MacBook-Pro", mac: "F0:18:98:44:55:66", ip: "192.168.1.102", leaseExpires: "10:15:22" },
  { hostname: "Windows-PC", mac: "AA:BB:CC:DD:EE:FF", ip: "192.168.1.103", leaseExpires: "09:45:10" },
  { hostname: "Samsung-TV", mac: "78:47:1D:78:9A:BC", ip: "192.168.1.104", leaseExpires: "08:20:33" },
  { hostname: "ESP32-Sensor", mac: "30:AE:A4:EF:00:01", ip: "192.168.1.105", leaseExpires: "07:55:18" },
  { hostname: "PS5-Gaming", mac: "00:09:2D:12:34:56", ip: "192.168.1.106", leaseExpires: "06:30:00" },
  { hostname: "HP-Printer", mac: "00:17:C4:AB:CD:EF", ip: "192.168.1.107", leaseExpires: "05:15:42" },
  { hostname: "Google-Home", mac: "B4:E6:2D:11:22:33", ip: "192.168.1.108", leaseExpires: "04:45:10" },
];

// 自動識別每個設備的類型
const connectedDevices = connectedDevicesRaw.map(device => ({
  ...device,
  type: detectDeviceType(device.hostname, device.mac),
}));

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
                    <TableHead>類型</TableHead>
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
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {getDeviceTypeName(device.type)}
                        </Badge>
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
