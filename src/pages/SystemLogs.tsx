import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Filter } from "lucide-react";
import { toast } from "sonner";

type LogLevel = "all" | "info" | "warning" | "error";

interface LogEntry {
  time: string;
  level: "info" | "warning" | "error";
  message: string;
}

const systemLogs: LogEntry[] = [
  { time: "2024-01-15 14:32:15", level: "info", message: "系統啟動完成" },
  { time: "2024-01-15 14:32:10", level: "info", message: "網路介面 eth0 已連接" },
  { time: "2024-01-15 14:32:08", level: "info", message: "DHCP 服務已啟動" },
  { time: "2024-01-15 14:32:05", level: "warning", message: "檢測到新的固件版本可用" },
  { time: "2024-01-15 14:32:00", level: "info", message: "防火牆規則已載入" },
  { time: "2024-01-15 14:31:55", level: "info", message: "無線網路 2.4GHz 已啟用" },
  { time: "2024-01-15 14:31:50", level: "info", message: "無線網路 5GHz 已啟用" },
  { time: "2024-01-15 14:31:45", level: "error", message: "NTP 同步失敗，將在 5 分鐘後重試" },
  { time: "2024-01-15 14:31:40", level: "info", message: "USB 儲存裝置已掛載" },
  { time: "2024-01-15 14:31:35", level: "info", message: "系統時間已同步" },
  { time: "2024-01-15 14:31:30", level: "warning", message: "CPU 溫度略高 (45°C)" },
  { time: "2024-01-15 14:31:25", level: "info", message: "記憶體使用率正常" },
  { time: "2024-01-15 14:31:20", level: "error", message: "無法連接到遠端伺服器" },
  { time: "2024-01-15 14:31:15", level: "info", message: "VPN 服務已啟動" },
  { time: "2024-01-15 14:31:10", level: "warning", message: "儲存空間使用率達 80%" },
  { time: "2024-01-15 14:31:05", level: "info", message: "QoS 規則已套用" },
  { time: "2024-01-15 14:31:00", level: "info", message: "DNS 快取已清除" },
  { time: "2024-01-15 14:30:55", level: "error", message: "DDNS 更新失敗" },
  { time: "2024-01-15 14:30:50", level: "info", message: "Port Forwarding 規則已載入" },
  { time: "2024-01-15 14:30:45", level: "info", message: "系統初始化完成" },
];

const SystemLogs = () => {
  const [filter, setFilter] = useState<LogLevel>("all");

  const filteredLogs = filter === "all" 
    ? systemLogs 
    : systemLogs.filter(log => log.level === filter);

  const getLevelBadgeStyle = (level: string) => {
    switch (level) {
      case "error":
        return "border-destructive text-destructive bg-destructive/10";
      case "warning":
        return "border-warning text-warning bg-warning/10";
      default:
        return "border-success text-success bg-success/10";
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case "error":
        return "錯誤";
      case "warning":
        return "警告";
      default:
        return "資訊";
    }
  };

  const handleExport = () => {
    const logContent = filteredLogs
      .map(log => `[${log.time}] [${getLevelText(log.level)}] ${log.message}`)
      .join("\n");
    
    const blob = new Blob([logContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `system-logs-${new Date().toISOString().split("T")[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success("日誌已匯出");
  };

  const getFilterStats = () => {
    const infoCount = systemLogs.filter(l => l.level === "info").length;
    const warningCount = systemLogs.filter(l => l.level === "warning").length;
    const errorCount = systemLogs.filter(l => l.level === "error").length;
    return { infoCount, warningCount, errorCount, total: systemLogs.length };
  };

  const stats = getFilterStats();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">系統紀錄</h2>
        <p className="text-muted-foreground">查看和管理系統事件日誌</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">全部紀錄</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{stats.infoCount}</p>
              <p className="text-sm text-muted-foreground">資訊</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">{stats.warningCount}</p>
              <p className="text-sm text-muted-foreground">警告</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-elegant">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{stats.errorCount}</p>
              <p className="text-sm text-muted-foreground">錯誤</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle>日誌列表</CardTitle>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={filter} onValueChange={(value: LogLevel) => setFilter(value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="篩選級別" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="info">資訊</SelectItem>
                    <SelectItem value="warning">警告</SelectItem>
                    <SelectItem value="error">錯誤</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleExport} variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                匯出紀錄
              </Button>
            </div>
          </div>
          <CardDescription>
            顯示 {filteredLogs.length} 筆紀錄 {filter !== "all" && `(篩選: ${getLevelText(filter)})`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {filteredLogs.map((log, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors border border-border/50"
                >
                  <span className="text-xs text-muted-foreground whitespace-nowrap font-mono min-w-[140px]">
                    {log.time}
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`min-w-[50px] justify-center ${getLevelBadgeStyle(log.level)}`}
                  >
                    {getLevelText(log.level)}
                  </Badge>
                  <span className="text-sm text-foreground flex-1">{log.message}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemLogs;
