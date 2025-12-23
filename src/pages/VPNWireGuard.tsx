import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, Trash2, Copy, Download, Edit, Key, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { VPNStatusMonitor } from "@/components/VPNStatusMonitor";
import { PendingInput } from "@/components/PendingInput";
import { PendingSwitch } from "@/components/PendingSwitch";

interface WireGuardPeer {
  id: string;
  name: string;
  publicKey: string;
  allowedIPs: string;
  endpoint?: string;
  lastHandshake?: string;
  transfer?: { rx: string; tx: string };
  enabled: boolean;
}

interface WireGuardInterface {
  enabled: boolean;
  privateKey: string;
  publicKey: string;
  listenPort: number;
  address: string;
}

export default function VPNWireGuard() {
  const [wgInterface, setWgInterface] = useState<WireGuardInterface>({
    enabled: true,
    privateKey: "oK56DE9Ue9zK76rAc8pBl6opph+1v36lm7cXXsQKrQM=",
    publicKey: "xTIBA5rboUvnH4htodjb60Y7YAf21J7YQMlNGC8HQ14=",
    listenPort: 51820,
    address: "10.0.0.1/24",
  });

  const [peers, setPeers] = useState<WireGuardPeer[]>([
    {
      id: "1",
      name: "行動裝置",
      publicKey: "xTIBA5rboUvnH4htodjb60Y7YAf21J7YQMlNGC8HQ14=",
      allowedIPs: "10.0.0.2/32",
      lastHandshake: "2 分鐘前",
      transfer: { rx: "128.5 MB", tx: "45.2 MB" },
      enabled: true,
    },
    {
      id: "2",
      name: "筆記型電腦",
      publicKey: "TrMvSoP4jYQlY6RIzBgbssQqY3vxI2Pi+y71lOWWXX0=",
      allowedIPs: "10.0.0.3/32",
      lastHandshake: "15 分鐘前",
      transfer: { rx: "256.8 MB", tx: "89.1 MB" },
      enabled: true,
    },
    {
      id: "3",
      name: "遠端辦公室",
      publicKey: "gN65BkIKy1eCE9pP1wdc8ROUtkHLF2PfAqYdyYBz6EA=",
      allowedIPs: "10.0.0.4/32, 192.168.10.0/24",
      endpoint: "203.0.113.50:51820",
      enabled: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPeer, setNewPeer] = useState({
    name: "",
    publicKey: "",
    allowedIPs: "",
    endpoint: "",
    persistentKeepalive: "25",
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "已複製",
      description: `${label} 已複製到剪貼簿`,
    });
  };

  const generateKeyPair = () => {
    // 模擬生成金鑰對
    const mockPrivateKey = "mock" + Math.random().toString(36).substring(2, 15) + "=";
    const mockPublicKey = "mock" + Math.random().toString(36).substring(2, 15) + "=";
    setWgInterface({
      ...wgInterface,
      privateKey: mockPrivateKey,
      publicKey: mockPublicKey,
    });
    toast({
      title: "金鑰已生成",
      description: "已生成新的 WireGuard 金鑰對",
    });
  };

  const togglePeer = (id: string) => {
    setPeers(peers.map(p => 
      p.id === id ? { ...p, enabled: !p.enabled } : p
    ));
  };

  const deletePeer = (id: string) => {
    setPeers(peers.filter(p => p.id !== id));
  };

  const addPeer = () => {
    if (newPeer.name && newPeer.publicKey && newPeer.allowedIPs) {
      setPeers([...peers, {
        id: Date.now().toString(),
        name: newPeer.name,
        publicKey: newPeer.publicKey,
        allowedIPs: newPeer.allowedIPs,
        endpoint: newPeer.endpoint || undefined,
        enabled: true,
      }]);
      setNewPeer({
        name: "",
        publicKey: "",
        allowedIPs: "",
        endpoint: "",
        persistentKeepalive: "25",
      });
      setShowAddForm(false);
    }
  };

  const generatePeerConfig = (peer: WireGuardPeer) => {
    const config = `[Interface]
PrivateKey = <CLIENT_PRIVATE_KEY>
Address = ${peer.allowedIPs.split(",")[0]}
DNS = 8.8.8.8

[Peer]
PublicKey = ${wgInterface.publicKey}
AllowedIPs = 0.0.0.0/0
Endpoint = <YOUR_SERVER_IP>:${wgInterface.listenPort}
PersistentKeepalive = 25`;
    
    copyToClipboard(config, "用戶端設定");
  };

  const connectedPeers = peers.filter(p => p.lastHandshake && p.enabled);

  const trafficStats = {
    bytesIn: "0.39",
    bytesOut: "0.13",
    packetsIn: "456,789",
    packetsOut: "234,567",
  };

  const connectionHistory = [
    { id: "1", time: "2024-01-15 10:00:00", event: "connected" as const, details: "行動裝置 握手成功" },
    { id: "2", time: "2024-01-15 09:45:00", event: "connected" as const, details: "筆記型電腦 握手成功" },
    { id: "3", time: "2024-01-14 20:00:00", event: "disconnected" as const, details: "遠端辦公室 連線逾時" },
    { id: "4", time: "2024-01-14 15:30:00", event: "connected" as const, details: "遠端辦公室 握手成功" },
    { id: "5", time: "2024-01-14 08:00:00", event: "error" as const, details: "無效的公鑰 - 握手失敗" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">WireGuard VPN</h1>
        <p className="text-muted-foreground mt-2">管理 WireGuard VPN 設定和對等節點</p>
      </div>

      {/* 連線狀態監控 */}
      <VPNStatusMonitor
        vpnType="WireGuard"
        isConnected={connectedPeers.length > 0}
        connectedSince={connectedPeers.length > 0 ? `${connectedPeers.length} 個對等節點已連線` : undefined}
        traffic={trafficStats}
        history={connectionHistory}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                介面設定
              </CardTitle>
              <CardDescription>WireGuard 伺服器介面設定</CardDescription>
            </div>
          <div className="flex items-center gap-2">
              <Label htmlFor="wg-enabled">啟用 WireGuard</Label>
              <PendingSwitch 
                section="WireGuard 設定" 
                field="啟用 WireGuard" 
                id="wg-enabled"
                defaultChecked={wgInterface.enabled}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>監聽埠</Label>
              <PendingInput 
                section="WireGuard 設定" 
                field="監聽埠"
                type="number"
                defaultValue={wgInterface.listenPort.toString()}
              />
            </div>
            <div className="space-y-2">
              <Label>介面位址</Label>
              <PendingInput 
                section="WireGuard 設定" 
                field="介面位址"
                defaultValue={wgInterface.address}
                placeholder="10.0.0.1/24"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>私鑰</Label>
              <Button variant="ghost" size="sm" onClick={generateKeyPair}>
                <RefreshCw className="w-4 h-4 mr-2" />
                重新生成金鑰對
              </Button>
            </div>
            <div className="flex gap-2">
              <Input 
                type="password"
                value={wgInterface.privateKey}
                readOnly
                className="font-mono"
              />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(wgInterface.privateKey, "私鑰")}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>公鑰</Label>
            <div className="flex gap-2">
              <Input 
                value={wgInterface.publicKey}
                readOnly
                className="font-mono"
              />
              <Button variant="outline" size="icon" onClick={() => copyToClipboard(wgInterface.publicKey, "公鑰")}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button>儲存介面設定</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                對等節點
              </CardTitle>
              <CardDescription>管理 WireGuard 連線的對等節點</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              新增對等節點
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {showAddForm && (
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">新增對等節點</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>名稱</Label>
                    <Input 
                      placeholder="例如：行動裝置"
                      value={newPeer.name}
                      onChange={(e) => setNewPeer({...newPeer, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>允許的 IP 位址</Label>
                    <Input 
                      placeholder="例如：10.0.0.2/32"
                      value={newPeer.allowedIPs}
                      onChange={(e) => setNewPeer({...newPeer, allowedIPs: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>對等節點公鑰</Label>
                  <Input 
                    placeholder="貼上對等節點的公鑰"
                    value={newPeer.publicKey}
                    onChange={(e) => setNewPeer({...newPeer, publicKey: e.target.value})}
                    className="font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>端點 (選填)</Label>
                    <Input 
                      placeholder="例如：203.0.113.50:51820"
                      value={newPeer.endpoint}
                      onChange={(e) => setNewPeer({...newPeer, endpoint: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>持續連線間隔 (秒)</Label>
                    <Input 
                      type="number"
                      value={newPeer.persistentKeepalive}
                      onChange={(e) => setNewPeer({...newPeer, persistentKeepalive: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={addPeer}>新增對等節點</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>取消</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名稱</TableHead>
                <TableHead>公鑰</TableHead>
                <TableHead>允許的 IP</TableHead>
                <TableHead>最後握手</TableHead>
                <TableHead>流量</TableHead>
                <TableHead>啟用</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {peers.map((peer) => (
                <TableRow key={peer.id}>
                  <TableCell className="font-medium">{peer.name}</TableCell>
                  <TableCell className="font-mono text-xs max-w-[150px] truncate">
                    {peer.publicKey.substring(0, 20)}...
                  </TableCell>
                  <TableCell className="text-sm">{peer.allowedIPs}</TableCell>
                  <TableCell>
                    {peer.lastHandshake ? (
                      <Badge variant="outline" className="text-green-400 border-green-500/30">
                        {peer.lastHandshake}
                      </Badge>
                    ) : (
                      <Badge variant="secondary">從未連線</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {peer.transfer ? (
                      <span>↓{peer.transfer.rx} ↑{peer.transfer.tx}</span>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Switch 
                      checked={peer.enabled} 
                      onCheckedChange={() => togglePeer(peer.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => generatePeerConfig(peer)}
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
                        onClick={() => deletePeer(peer.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {peers.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              尚未設定任何對等節點
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
