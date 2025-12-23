import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowDown, ArrowUp, Clock, History } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TrafficStats {
  bytesIn: string;
  bytesOut: string;
  packetsIn: string;
  packetsOut: string;
}

interface ConnectionHistory {
  id: string;
  time: string;
  event: "connected" | "disconnected" | "error";
  details: string;
}

interface VPNStatusMonitorProps {
  vpnType: "IPSec" | "WireGuard" | "OpenVPN";
  isConnected: boolean;
  connectedSince?: string;
  traffic: TrafficStats;
  history: ConnectionHistory[];
}

export function VPNStatusMonitor({ vpnType, isConnected, connectedSince, traffic, history }: VPNStatusMonitorProps) {
  const getEventBadge = (event: ConnectionHistory["event"]) => {
    switch (event) {
      case "connected":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">已連線</Badge>;
      case "disconnected":
        return <Badge variant="secondary">已斷線</Badge>;
      case "error":
        return <Badge variant="destructive">錯誤</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 連線狀態 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            {vpnType} 連線狀態
          </CardTitle>
          <CardDescription>即時監控 VPN 連線狀態</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                連線狀態
              </div>
              <div className="text-2xl font-bold">
                {isConnected ? '已連線' : '已斷線'}
              </div>
              {connectedSince && isConnected && (
                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3" />
                  {connectedSince}
                </div>
              )}
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ArrowDown className="w-4 h-4 text-green-500" />
                接收流量
              </div>
              <div className="text-2xl font-bold text-green-500">{traffic.bytesIn}</div>
              <div className="text-sm text-muted-foreground">{traffic.packetsIn} 封包</div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <ArrowUp className="w-4 h-4 text-blue-500" />
                發送流量
              </div>
              <div className="text-2xl font-bold text-blue-500">{traffic.bytesOut}</div>
              <div className="text-sm text-muted-foreground">{traffic.packetsOut} 封包</div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Activity className="w-4 h-4" />
                總流量
              </div>
              <div className="text-2xl font-bold">
                {parseFloat(traffic.bytesIn) + parseFloat(traffic.bytesOut)} GB
              </div>
              <div className="text-sm text-muted-foreground">雙向累計</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 連線歷史 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            連線歷史
          </CardTitle>
          <CardDescription>最近的連線事件記錄</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>時間</TableHead>
                <TableHead>事件</TableHead>
                <TableHead>詳細資訊</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-muted-foreground">{item.time}</TableCell>
                  <TableCell>{getEventBadge(item.event)}</TableCell>
                  <TableCell>{item.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {history.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              尚無連線歷史記錄
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
