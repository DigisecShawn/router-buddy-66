import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Plus, Trash2, Edit, Upload, Download, Users, Server } from "lucide-react";
import { useState } from "react";
import { VPNStatusMonitor } from "@/components/VPNStatusMonitor";
import { PendingInput } from "@/components/PendingInput";
import { PendingSwitch } from "@/components/PendingSwitch";
import { PendingSelect, SelectContent as PendingSelectContent, SelectItem as PendingSelectItem } from "@/components/PendingSelect";

interface OpenVPNClient {
  id: string;
  name: string;
  commonName: string;
  virtualIP: string;
  realIP?: string;
  connectedSince?: string;
  bytesReceived?: string;
  bytesSent?: string;
  status: "connected" | "disconnected";
  enabled: boolean;
}

interface OpenVPNServer {
  enabled: boolean;
  protocol: string;
  port: number;
  deviceMode: string;
  topology: string;
  serverNetwork: string;
  pushRoutes: string;
  pushDNS: string;
  cipher: string;
  auth: string;
  tlsAuth: boolean;
  compression: string;
}

export default function VPNOpenVPN() {
  const [serverConfig, setServerConfig] = useState<OpenVPNServer>({
    enabled: true,
    protocol: "udp",
    port: 1194,
    deviceMode: "tun",
    topology: "subnet",
    serverNetwork: "10.8.0.0/24",
    pushRoutes: "192.168.1.0/24",
    pushDNS: "8.8.8.8",
    cipher: "AES-256-GCM",
    auth: "SHA256",
    tlsAuth: true,
    compression: "lz4-v2",
  });

  const [clients, setClients] = useState<OpenVPNClient[]>([
    {
      id: "1",
      name: "員工 A",
      commonName: "employee_a",
      virtualIP: "10.8.0.2",
      realIP: "203.0.113.45",
      connectedSince: "2024-01-15 09:30:00",
      bytesReceived: "256.8 MB",
      bytesSent: "89.1 MB",
      status: "connected",
      enabled: true,
    },
    {
      id: "2",
      name: "員工 B",
      commonName: "employee_b",
      virtualIP: "10.8.0.3",
      status: "disconnected",
      enabled: true,
    },
    {
      id: "3",
      name: "遠端伺服器",
      commonName: "remote_server",
      virtualIP: "10.8.0.4",
      realIP: "198.51.100.20",
      connectedSince: "2024-01-14 18:00:00",
      bytesReceived: "1.2 GB",
      bytesSent: "890 MB",
      status: "connected",
      enabled: true,
    },
  ]);

  const [showAddClient, setShowAddClient] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    commonName: "",
  });

  const connectedClients = clients.filter(c => c.status === "connected");

  const trafficStats = {
    bytesIn: "1.5",
    bytesOut: "0.98",
    packetsIn: "1,234,567",
    packetsOut: "987,654",
  };

  const connectionHistory = [
    { id: "1", time: "2024-01-15 09:30:00", event: "connected" as const, details: "員工 A 從 203.0.113.45 連線" },
    { id: "2", time: "2024-01-14 18:00:00", event: "connected" as const, details: "遠端伺服器 從 198.51.100.20 連線" },
    { id: "3", time: "2024-01-14 17:45:00", event: "disconnected" as const, details: "員工 B 斷線" },
    { id: "4", time: "2024-01-14 09:00:00", event: "connected" as const, details: "員工 B 從 192.0.2.100 連線" },
    { id: "5", time: "2024-01-13 23:00:00", event: "error" as const, details: "TLS 握手失敗 - 無效的憑證" },
  ];

  const toggleClient = (id: string) => {
    setClients(clients.map(c => 
      c.id === id ? { ...c, enabled: !c.enabled } : c
    ));
  };

  const deleteClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  const addClient = () => {
    if (newClient.name && newClient.commonName) {
      const nextIP = `10.8.0.${clients.length + 2}`;
      setClients([...clients, {
        id: Date.now().toString(),
        name: newClient.name,
        commonName: newClient.commonName,
        virtualIP: nextIP,
        status: "disconnected",
        enabled: true,
      }]);
      setNewClient({ name: "", commonName: "" });
      setShowAddClient(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">OpenVPN</h1>
        <p className="text-muted-foreground mt-2">管理 OpenVPN 伺服器和用戶端連線</p>
      </div>

      {/* 連線狀態監控 */}
      <VPNStatusMonitor
        vpnType="OpenVPN"
        isConnected={connectedClients.length > 0}
        connectedSince={connectedClients.length > 0 ? `${connectedClients.length} 個用戶端已連線` : undefined}
        traffic={trafficStats}
        history={connectionHistory}
      />

      <Tabs defaultValue="server" className="space-y-6">
        <TabsList>
          <TabsTrigger value="server" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            伺服器設定
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            用戶端管理
          </TabsTrigger>
        </TabsList>

        <TabsContent value="server" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    OpenVPN 伺服器
                  </CardTitle>
                  <CardDescription>設定 OpenVPN 伺服器參數</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="ovpn-enabled">啟用伺服器</Label>
                  <PendingSwitch 
                    section="OpenVPN 伺服器" 
                    field="啟用伺服器"
                    id="ovpn-enabled"
                    defaultChecked={serverConfig.enabled}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>協定</Label>
                  <PendingSelect section="OpenVPN 伺服器" field="協定" defaultValue={serverConfig.protocol}>
                    <PendingSelectContent>
                      <PendingSelectItem value="udp">UDP</PendingSelectItem>
                      <PendingSelectItem value="tcp">TCP</PendingSelectItem>
                    </PendingSelectContent>
                  </PendingSelect>
                </div>
                <div className="space-y-2">
                  <Label>埠號</Label>
                  <PendingInput 
                    section="OpenVPN 伺服器" 
                    field="埠號"
                    type="number"
                    defaultValue={serverConfig.port.toString()}
                  />
                </div>
                <div className="space-y-2">
                  <Label>裝置模式</Label>
                  <PendingSelect section="OpenVPN 伺服器" field="裝置模式" defaultValue={serverConfig.deviceMode}>
                    <PendingSelectContent>
                      <PendingSelectItem value="tun">TUN (路由模式)</PendingSelectItem>
                      <PendingSelectItem value="tap">TAP (橋接模式)</PendingSelectItem>
                    </PendingSelectContent>
                  </PendingSelect>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>伺服器網路</Label>
                  <PendingInput 
                    section="OpenVPN 伺服器" 
                    field="伺服器網路"
                    defaultValue={serverConfig.serverNetwork}
                    placeholder="10.8.0.0/24"
                  />
                </div>
                <div className="space-y-2">
                  <Label>拓撲模式</Label>
                  <PendingSelect section="OpenVPN 伺服器" field="拓撲模式" defaultValue={serverConfig.topology}>
                    <PendingSelectContent>
                      <PendingSelectItem value="subnet">Subnet</PendingSelectItem>
                      <PendingSelectItem value="net30">Net30</PendingSelectItem>
                      <PendingSelectItem value="p2p">Point-to-Point</PendingSelectItem>
                    </PendingSelectContent>
                  </PendingSelect>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>推送路由</Label>
                  <PendingInput 
                    section="OpenVPN 伺服器" 
                    field="推送路由"
                    defaultValue={serverConfig.pushRoutes}
                    placeholder="192.168.1.0/24"
                  />
                </div>
                <div className="space-y-2">
                  <Label>推送 DNS</Label>
                  <PendingInput 
                    section="OpenVPN 伺服器" 
                    field="推送 DNS"
                    defaultValue={serverConfig.pushDNS}
                    placeholder="8.8.8.8"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">加密設定</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>加密演算法</Label>
                    <PendingSelect section="OpenVPN 加密" field="加密演算法" defaultValue={serverConfig.cipher}>
                      <PendingSelectContent>
                        <PendingSelectItem value="AES-256-GCM">AES-256-GCM</PendingSelectItem>
                        <PendingSelectItem value="AES-128-GCM">AES-128-GCM</PendingSelectItem>
                        <PendingSelectItem value="AES-256-CBC">AES-256-CBC</PendingSelectItem>
                        <PendingSelectItem value="AES-128-CBC">AES-128-CBC</PendingSelectItem>
                      </PendingSelectContent>
                    </PendingSelect>
                  </div>
                  <div className="space-y-2">
                    <Label>驗證演算法</Label>
                    <PendingSelect section="OpenVPN 加密" field="驗證演算法" defaultValue={serverConfig.auth}>
                      <PendingSelectContent>
                        <PendingSelectItem value="SHA256">SHA-256</PendingSelectItem>
                        <PendingSelectItem value="SHA384">SHA-384</PendingSelectItem>
                        <PendingSelectItem value="SHA512">SHA-512</PendingSelectItem>
                      </PendingSelectContent>
                    </PendingSelect>
                  </div>
                  <div className="space-y-2">
                    <Label>壓縮</Label>
                    <PendingSelect section="OpenVPN 加密" field="壓縮" defaultValue={serverConfig.compression}>
                      <PendingSelectContent>
                        <PendingSelectItem value="lz4-v2">LZ4-v2</PendingSelectItem>
                        <PendingSelectItem value="lzo">LZO</PendingSelectItem>
                        <PendingSelectItem value="none">無壓縮</PendingSelectItem>
                      </PendingSelectContent>
                    </PendingSelect>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <PendingSwitch 
                    section="OpenVPN 加密" 
                    field="TLS 驗證"
                    id="tls-auth"
                    defaultChecked={serverConfig.tlsAuth}
                  />
                  <Label htmlFor="tls-auth">啟用 TLS 驗證 (tls-auth)</Label>
                </div>
              </div>

              <div className="flex gap-2">
                <Button>儲存設定</Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  匯出伺服器設定
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    用戶端管理
                  </CardTitle>
                  <CardDescription>管理 OpenVPN 用戶端憑證和連線</CardDescription>
                </div>
                <Button onClick={() => setShowAddClient(!showAddClient)}>
                  <Plus className="w-4 h-4 mr-2" />
                  新增用戶端
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {showAddClient && (
                <Card className="border-primary/30 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg">新增用戶端</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>用戶端名稱</Label>
                        <Input 
                          placeholder="例如：員工 A"
                          value={newClient.name}
                          onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Common Name (CN)</Label>
                        <Input 
                          placeholder="例如：employee_a"
                          value={newClient.commonName}
                          onChange={(e) => setNewClient({...newClient, commonName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={addClient}>新增用戶端</Button>
                      <Button variant="outline" onClick={() => setShowAddClient(false)}>取消</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>名稱</TableHead>
                    <TableHead>Common Name</TableHead>
                    <TableHead>虛擬 IP</TableHead>
                    <TableHead>真實 IP</TableHead>
                    <TableHead>狀態</TableHead>
                    <TableHead>流量</TableHead>
                    <TableHead>啟用</TableHead>
                    <TableHead>操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell className="font-mono text-sm">{client.commonName}</TableCell>
                      <TableCell>{client.virtualIP}</TableCell>
                      <TableCell>{client.realIP || "-"}</TableCell>
                      <TableCell>
                        {client.status === "connected" ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">已連線</Badge>
                        ) : (
                          <Badge variant="secondary">已斷線</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {client.bytesReceived ? (
                          <span>↓{client.bytesReceived} ↑{client.bytesSent}</span>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={client.enabled} 
                          onCheckedChange={() => toggleClient(client.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            title="下載用戶端設定"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => deleteClient(client.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {clients.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  尚未設定任何用戶端
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
