import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRightLeft, Shield, Plus, Pencil, Trash2 } from "lucide-react";
import { PendingInput } from "@/components/PendingInput";
import { PendingSwitch } from "@/components/PendingSwitch";
import { PendingSelect, SelectContent as PendingSelectContent, SelectItem as PendingSelectItem } from "@/components/PendingSelect";
import { usePendingChanges } from "@/contexts/PendingChangesContext";

interface PortForwardRule {
  id: string;
  name: string;
  protocol: string;
  externalPort: string;
  internalIp: string;
  internalPort: string;
  enabled: boolean;
}

// 用於追蹤待定的規則變更
interface PendingRule {
  action: "add" | "edit" | "delete" | "toggle";
  rule: PortForwardRule;
  originalRule?: PortForwardRule;
}

const initialFormState = {
  name: "",
  protocol: "tcp",
  externalPort: "",
  internalIp: "",
  internalPort: "",
  enabled: true,
};

export default function Firewall() {
  const { addChange } = usePendingChanges();
  const [committedRules, setCommittedRules] = useState<PortForwardRule[]>([]);
  const [pendingRuleChanges, setPendingRuleChanges] = useState<PendingRule[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<PortForwardRule | null>(null);
  const [formData, setFormData] = useState(initialFormState);

  // 計算顯示的規則（已提交 + 待定變更）
  const displayRules = (() => {
    let result = [...committedRules];
    
    pendingRuleChanges.forEach(pending => {
      if (pending.action === "add") {
        result.push({ ...pending.rule, id: `pending-${pending.rule.id}` });
      } else if (pending.action === "delete") {
        result = result.filter(r => r.id !== pending.rule.id);
      } else if (pending.action === "edit" || pending.action === "toggle") {
        result = result.map(r => r.id === pending.rule.id ? pending.rule : r);
      }
    });
    
    return result;
  })();

  const handleOpenDialog = (rule?: PortForwardRule) => {
    if (rule) {
      setEditingRule(rule);
      setFormData({
        name: rule.name,
        protocol: rule.protocol,
        externalPort: rule.externalPort,
        internalIp: rule.internalIp,
        internalPort: rule.internalPort,
        enabled: rule.enabled,
      });
    } else {
      setEditingRule(null);
      setFormData(initialFormState);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingRule(null);
    setFormData(initialFormState);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.externalPort || !formData.internalIp || !formData.internalPort) {
      return;
    }

    if (editingRule) {
      const updatedRule: PortForwardRule = {
        ...editingRule,
        ...formData,
      };
      
      // 移除此規則的舊待定變更
      setPendingRuleChanges(prev => prev.filter(p => p.rule.id !== editingRule.id));
      
      // 新增編輯待定變更
      setPendingRuleChanges(prev => [...prev, {
        action: "edit",
        rule: updatedRule,
        originalRule: editingRule,
      }]);

      addChange(
        "端口轉發規則",
        `編輯規則: ${formData.name}`,
        `${editingRule.externalPort} → ${editingRule.internalIp}:${editingRule.internalPort}`,
        `${formData.externalPort} → ${formData.internalIp}:${formData.internalPort}`
      );
    } else {
      const newRule: PortForwardRule = {
        id: Date.now().toString(),
        ...formData,
      };
      
      setPendingRuleChanges(prev => [...prev, {
        action: "add",
        rule: newRule,
      }]);

      addChange(
        "端口轉發規則",
        `新增規則: ${formData.name}`,
        "（無）",
        `${formData.protocol.toUpperCase()} ${formData.externalPort} → ${formData.internalIp}:${formData.internalPort}`
      );
    }
    handleCloseDialog();
  };

  const handleDelete = (rule: PortForwardRule) => {
    // 檢查是否是待定新增的規則
    const isPendingAdd = pendingRuleChanges.some(p => p.action === "add" && `pending-${p.rule.id}` === rule.id);
    
    if (isPendingAdd) {
      // 如果是待定新增的規則，直接從待定列表移除
      setPendingRuleChanges(prev => prev.filter(p => !(p.action === "add" && `pending-${p.rule.id}` === rule.id)));
    } else {
      // 移除此規則的其他待定變更
      setPendingRuleChanges(prev => prev.filter(p => p.rule.id !== rule.id));
      
      // 新增刪除待定變更
      setPendingRuleChanges(prev => [...prev, {
        action: "delete",
        rule: rule,
      }]);

      addChange(
        "端口轉發規則",
        `刪除規則: ${rule.name}`,
        `${rule.protocol.toUpperCase()} ${rule.externalPort} → ${rule.internalIp}:${rule.internalPort}`,
        "（刪除）"
      );
    }
  };

  const toggleRuleEnabled = (rule: PortForwardRule) => {
    const newEnabled = !rule.enabled;
    const updatedRule = { ...rule, enabled: newEnabled };
    
    // 移除此規則的舊待定變更（toggle類型）
    setPendingRuleChanges(prev => prev.filter(p => !(p.rule.id === rule.id && p.action === "toggle")));
    
    // 檢查是否是待定新增或編輯的規則
    const existingPending = pendingRuleChanges.find(p => p.rule.id === rule.id && (p.action === "add" || p.action === "edit"));
    
    if (existingPending) {
      // 更新現有待定變更
      setPendingRuleChanges(prev => prev.map(p => 
        p.rule.id === rule.id ? { ...p, rule: updatedRule } : p
      ));
    } else {
      setPendingRuleChanges(prev => [...prev, {
        action: "toggle",
        rule: updatedRule,
        originalRule: rule,
      }]);
    }

    addChange(
      "端口轉發規則",
      `${rule.name} 狀態`,
      rule.enabled ? "啟用" : "停用",
      newEnabled ? "啟用" : "停用"
    );
  };

  // 檢查規則是否有待定變更
  const isPending = (ruleId: string) => {
    return pendingRuleChanges.some(p => p.rule.id === ruleId || `pending-${p.rule.id}` === ruleId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">NAT / DMZ</h1>
        <p className="text-muted-foreground mt-2">配置網絡地址轉換和 DMZ 設置</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            DMZ 設置
          </CardTitle>
          <CardDescription>將指定主機暴露於外部網絡，允許所有入站連接</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dmz-enabled">啟用 DMZ</Label>
              <p className="text-sm text-muted-foreground">將指定 IP 設為 DMZ 主機</p>
            </div>
            <PendingSwitch section="DMZ 設置" field="啟用 DMZ" id="dmz-enabled" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dmz-ip">DMZ 主機 IP</Label>
              <PendingInput section="DMZ 設置" field="DMZ 主機 IP" id="dmz-ip" placeholder="192.168.1.100" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dmz-interface">WAN 介面</Label>
              <PendingSelect section="DMZ 設置" field="WAN 介面" id="dmz-interface" defaultValue="wan">
                <PendingSelectContent>
                  <PendingSelectItem value="wan">WAN</PendingSelectItem>
                  <PendingSelectItem value="wan6">WAN6</PendingSelectItem>
                </PendingSelectContent>
              </PendingSelect>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-primary" />
            端口轉發規則 (Port Forwarding)
          </CardTitle>
          <CardDescription>配置外部端口到內部設備的 NAT 轉發</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名稱</TableHead>
                <TableHead>協議</TableHead>
                <TableHead>外部端口</TableHead>
                <TableHead>內部 IP</TableHead>
                <TableHead>內部端口</TableHead>
                <TableHead>狀態</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayRules.length === 0 ? (
                <TableRow>
                  <TableCell className="text-muted-foreground text-center" colSpan={7}>
                    尚無轉發規則
                  </TableCell>
                </TableRow>
              ) : (
                displayRules.map((rule) => (
                  <TableRow key={rule.id} className={isPending(rule.id) ? "bg-primary/5 border-l-2 border-l-primary" : ""}>
                    <TableCell className="font-medium">
                      {rule.name}
                      {isPending(rule.id) && (
                        <Badge variant="outline" className="ml-2 text-xs text-primary border-primary">
                          待定
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{rule.protocol.toUpperCase()}</Badge>
                    </TableCell>
                    <TableCell>{rule.externalPort}</TableCell>
                    <TableCell>{rule.internalIp}</TableCell>
                    <TableCell>{rule.internalPort}</TableCell>
                    <TableCell>
                      <Switch 
                        checked={rule.enabled} 
                        onCheckedChange={() => toggleRuleEnabled(rule)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleOpenDialog(rule)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDelete(rule)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  新增規則
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingRule ? "編輯端口轉發規則" : "新增端口轉發規則"}
                  </DialogTitle>
                  <DialogDescription>
                    配置從外部端口到內部設備的網絡地址轉換規則
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="rule-name">規則名稱 *</Label>
                    <Input
                      id="rule-name"
                      placeholder="例如: Web Server"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="rule-protocol">協議 *</Label>
                    <Select 
                      value={formData.protocol}
                      onValueChange={(value) => setFormData({ ...formData, protocol: value })}
                    >
                      <SelectTrigger id="rule-protocol">
                        <SelectValue placeholder="選擇協議" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tcp">TCP</SelectItem>
                        <SelectItem value="udp">UDP</SelectItem>
                        <SelectItem value="tcp+udp">TCP + UDP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="external-port">外部端口 *</Label>
                      <Input
                        id="external-port"
                        placeholder="例如: 8080 或 8080-8090"
                        value={formData.externalPort}
                        onChange={(e) => setFormData({ ...formData, externalPort: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="internal-port">內部端口 *</Label>
                      <Input
                        id="internal-port"
                        placeholder="例如: 80 或 80-90"
                        value={formData.internalPort}
                        onChange={(e) => setFormData({ ...formData, internalPort: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="internal-ip">內部 IP 地址 *</Label>
                    <Input
                      id="internal-ip"
                      placeholder="例如: 192.168.1.100"
                      value={formData.internalIp}
                      onChange={(e) => setFormData({ ...formData, internalIp: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <Label htmlFor="rule-enabled">啟用規則</Label>
                      <p className="text-sm text-muted-foreground">立即生效此轉發規則</p>
                    </div>
                    <Switch
                      id="rule-enabled"
                      checked={formData.enabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseDialog}>
                    取消
                  </Button>
                  <Button onClick={handleSubmit}>
                    {editingRule ? "更新" : "新增"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>NAT 回環 (NAT Loopback)</CardTitle>
          <CardDescription>允許內網設備通過公網 IP 訪問內部服務</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="nat-loopback">啟用 NAT 回環</Label>
              <p className="text-sm text-muted-foreground">允許 LAN 客戶端使用外部地址訪問端口轉發的服務</p>
            </div>
            <PendingSwitch section="NAT 回環" field="啟用 NAT 回環" id="nat-loopback" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}