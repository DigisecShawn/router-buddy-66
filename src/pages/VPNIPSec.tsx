import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { VPNStatusMonitor } from "@/components/VPNStatusMonitor";
import { PendingInput } from "@/components/PendingInput";
import { PendingSelect, SelectContent as PendingSelectContent, SelectItem as PendingSelectItem } from "@/components/PendingSelect";

interface IPSecTunnel {
  id: string;
  name: string;
  remoteGateway: string;
  localSubnet: string;
  remoteSubnet: string;
  status: "connected" | "disconnected" | "connecting";
  enabled: boolean;
}

export default function VPNIPSec() {
  const [tunnels, setTunnels] = useState<IPSecTunnel[]>([
    {
      id: "1",
      name: "總部連線",
      remoteGateway: "203.0.113.1",
      localSubnet: "192.168.1.0/24",
      remoteSubnet: "10.0.0.0/24",
      status: "connected",
      enabled: true,
    },
    {
      id: "2",
      name: "分公司連線",
      remoteGateway: "198.51.100.1",
      localSubnet: "192.168.1.0/24",
      remoteSubnet: "172.16.0.0/24",
      status: "disconnected",
      enabled: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTunnel, setNewTunnel] = useState({
    name: "",
    remoteGateway: "",
    localSubnet: "",
    remoteSubnet: "",
    psk: "",
    ikeVersion: "ikev2",
    phase1Encryption: "aes256",
    phase1Hash: "sha256",
    phase1DH: "14",
    phase2Encryption: "aes256",
    phase2Hash: "sha256",
    phase2PFS: "14",
  });

  const getStatusBadge = (status: IPSecTunnel["status"]) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">已連線</Badge>;
      case "disconnected":
        return <Badge variant="secondary">已斷線</Badge>;
      case "connecting":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">連線中</Badge>;
    }
  };

  const toggleTunnel = (id: string) => {
    setTunnels(tunnels.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled, status: !t.enabled ? "connecting" : "disconnected" } : t
    ));
  };

  const deleteTunnel = (id: string) => {
    setTunnels(tunnels.filter(t => t.id !== id));
  };

  const addTunnel = () => {
    if (newTunnel.name && newTunnel.remoteGateway && newTunnel.localSubnet && newTunnel.remoteSubnet) {
      setTunnels([...tunnels, {
        id: Date.now().toString(),
        name: newTunnel.name,
        remoteGateway: newTunnel.remoteGateway,
        localSubnet: newTunnel.localSubnet,
        remoteSubnet: newTunnel.remoteSubnet,
        status: "disconnected",
        enabled: false,
      }]);
      setNewTunnel({
        name: "",
        remoteGateway: "",
        localSubnet: "",
        remoteSubnet: "",
        psk: "",
        ikeVersion: "ikev2",
        phase1Encryption: "aes256",
        phase1Hash: "sha256",
        phase1DH: "14",
        phase2Encryption: "aes256",
        phase2Hash: "sha256",
        phase2PFS: "14",
      });
      setShowAddForm(false);
    }
  };

  const connectedTunnels = tunnels.filter(t => t.status === "connected");

  const trafficStats = {
    bytesIn: "2.4",
    bytesOut: "1.8",
    packetsIn: "2,345,678",
    packetsOut: "1,876,543",
  };

  const connectionHistory = [
    { id: "1", time: "2024-01-15 08:00:00", event: "connected" as const, details: "總部連線 通道已建立" },
    { id: "2", time: "2024-01-14 22:30:00", event: "disconnected" as const, details: "分公司連線 通道斷開" },
    { id: "3", time: "2024-01-14 09:15:00", event: "connected" as const, details: "分公司連線 通道已建立" },
    { id: "4", time: "2024-01-13 18:00:00", event: "error" as const, details: "總部連線 IKE 協商失敗" },
    { id: "5", time: "2024-01-13 17:45:00", event: "disconnected" as const, details: "總部連線 通道斷開" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">VPN IPSec</h1>
        <p className="text-muted-foreground mt-2">管理 IPSec VPN 通道設定</p>
      </div>

      {/* 連線狀態監控 */}
      <VPNStatusMonitor
        vpnType="IPSec"
        isConnected={connectedTunnels.length > 0}
        connectedSince={connectedTunnels.length > 0 ? `${connectedTunnels.length} 個通道已連線` : undefined}
        traffic={trafficStats}
        history={connectionHistory}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                IPSec 通道
              </CardTitle>
              <CardDescription>設定和管理 IPSec VPN 通道</CardDescription>
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              新增通道
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {showAddForm && (
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">新增 IPSec 通道</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>通道名稱</Label>
                    <PendingInput 
                      section="IPSec 通道"
                      field="通道名稱"
                      placeholder="例如：總部連線"
                      defaultValue={newTunnel.name}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>遠端閘道 IP</Label>
                    <PendingInput 
                      section="IPSec 通道"
                      field="遠端閘道 IP"
                      placeholder="例如：203.0.113.1"
                      defaultValue={newTunnel.remoteGateway}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>本地子網路</Label>
                    <PendingInput 
                      section="IPSec 通道"
                      field="本地子網路"
                      placeholder="例如：192.168.1.0/24"
                      defaultValue={newTunnel.localSubnet}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>遠端子網路</Label>
                    <PendingInput 
                      section="IPSec 通道"
                      field="遠端子網路"
                      placeholder="例如：10.0.0.0/24"
                      defaultValue={newTunnel.remoteSubnet}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>預共用金鑰 (PSK)</Label>
                    <PendingInput 
                      section="IPSec 通道"
                      field="預共用金鑰"
                      type="password"
                      placeholder="輸入預共用金鑰"
                      defaultValue={newTunnel.psk}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>IKE 版本</Label>
                    <PendingSelect section="IPSec 通道" field="IKE 版本" defaultValue={newTunnel.ikeVersion}>
                      <PendingSelectContent>
                        <PendingSelectItem value="ikev1">IKEv1</PendingSelectItem>
                        <PendingSelectItem value="ikev2">IKEv2</PendingSelectItem>
                      </PendingSelectContent>
                    </PendingSelect>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Phase 1 設定</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>加密演算法</Label>
                      <PendingSelect section="IPSec Phase 1" field="加密演算法" defaultValue={newTunnel.phase1Encryption}>
                        <PendingSelectContent>
                          <PendingSelectItem value="aes128">AES-128</PendingSelectItem>
                          <PendingSelectItem value="aes256">AES-256</PendingSelectItem>
                          <PendingSelectItem value="3des">3DES</PendingSelectItem>
                        </PendingSelectContent>
                      </PendingSelect>
                    </div>
                    <div className="space-y-2">
                      <Label>雜湊演算法</Label>
                      <PendingSelect section="IPSec Phase 1" field="雜湊演算法" defaultValue={newTunnel.phase1Hash}>
                        <PendingSelectContent>
                          <PendingSelectItem value="sha1">SHA-1</PendingSelectItem>
                          <PendingSelectItem value="sha256">SHA-256</PendingSelectItem>
                          <PendingSelectItem value="sha512">SHA-512</PendingSelectItem>
                        </PendingSelectContent>
                      </PendingSelect>
                    </div>
                    <div className="space-y-2">
                      <Label>DH 群組</Label>
                      <PendingSelect section="IPSec Phase 1" field="DH 群組" defaultValue={newTunnel.phase1DH}>
                        <PendingSelectContent>
                          <PendingSelectItem value="2">Group 2 (1024-bit)</PendingSelectItem>
                          <PendingSelectItem value="5">Group 5 (1536-bit)</PendingSelectItem>
                          <PendingSelectItem value="14">Group 14 (2048-bit)</PendingSelectItem>
                          <PendingSelectItem value="19">Group 19 (256-bit ECP)</PendingSelectItem>
                          <PendingSelectItem value="20">Group 20 (384-bit ECP)</PendingSelectItem>
                        </PendingSelectContent>
                      </PendingSelect>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Phase 2 設定</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>加密演算法</Label>
                      <PendingSelect section="IPSec Phase 2" field="加密演算法" defaultValue={newTunnel.phase2Encryption}>
                        <PendingSelectContent>
                          <PendingSelectItem value="aes128">AES-128</PendingSelectItem>
                          <PendingSelectItem value="aes256">AES-256</PendingSelectItem>
                          <PendingSelectItem value="3des">3DES</PendingSelectItem>
                        </PendingSelectContent>
                      </PendingSelect>
                    </div>
                    <div className="space-y-2">
                      <Label>雜湊演算法</Label>
                      <PendingSelect section="IPSec Phase 2" field="雜湊演算法" defaultValue={newTunnel.phase2Hash}>
                        <PendingSelectContent>
                          <PendingSelectItem value="sha1">SHA-1</PendingSelectItem>
                          <PendingSelectItem value="sha256">SHA-256</PendingSelectItem>
                          <PendingSelectItem value="sha512">SHA-512</PendingSelectItem>
                        </PendingSelectContent>
                      </PendingSelect>
                    </div>
                    <div className="space-y-2">
                      <Label>PFS 群組</Label>
                      <PendingSelect section="IPSec Phase 2" field="PFS 群組" defaultValue={newTunnel.phase2PFS}>
                        <PendingSelectContent>
                          <PendingSelectItem value="none">無</PendingSelectItem>
                          <PendingSelectItem value="2">Group 2 (1024-bit)</PendingSelectItem>
                          <PendingSelectItem value="5">Group 5 (1536-bit)</PendingSelectItem>
                          <PendingSelectItem value="14">Group 14 (2048-bit)</PendingSelectItem>
                          <PendingSelectItem value="19">Group 19 (256-bit ECP)</PendingSelectItem>
                        </PendingSelectContent>
                      </PendingSelect>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={addTunnel}>新增通道</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>取消</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名稱</TableHead>
                <TableHead>遠端閘道</TableHead>
                <TableHead>本地子網路</TableHead>
                <TableHead>遠端子網路</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>啟用</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tunnels.map((tunnel) => (
                <TableRow key={tunnel.id}>
                  <TableCell className="font-medium">{tunnel.name}</TableCell>
                  <TableCell>{tunnel.remoteGateway}</TableCell>
                  <TableCell>{tunnel.localSubnet}</TableCell>
                  <TableCell>{tunnel.remoteSubnet}</TableCell>
                  <TableCell>{getStatusBadge(tunnel.status)}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={tunnel.enabled} 
                      onCheckedChange={() => toggleTunnel(tunnel.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => deleteTunnel(tunnel.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {tunnels.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              尚未設定任何 IPSec 通道
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
