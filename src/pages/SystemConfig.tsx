import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PendingInput } from "@/components/PendingInput";
import { PendingSelect, SelectContent, SelectItem } from "@/components/PendingSelect";
import { PendingSwitch } from "@/components/PendingSwitch";
import { Settings, Shield } from "lucide-react";

export default function SystemConfig() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">系統設定</h1>
        <p className="text-muted-foreground mt-2">配置系統基本設置和管理員選項</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            一般設置
          </CardTitle>
          <CardDescription>配置主機名稱和時區</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hostname">主機名稱</Label>
              <PendingInput 
                section="系統設定" 
                field="主機名稱" 
                id="hostname" 
                placeholder="DIGISEC_4G_LTE" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">時區</Label>
              <PendingSelect 
                section="系統設定" 
                field="時區" 
                defaultValue="asia-taipei"
                id="timezone"
              >
                <SelectContent>
                  <SelectItem value="asia-taipei">Asia/Taipei (UTC+8)</SelectItem>
                  <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+9)</SelectItem>
                  <SelectItem value="asia-seoul">Asia/Seoul (UTC+9)</SelectItem>
                  <SelectItem value="asia-shanghai">Asia/Shanghai (UTC+8)</SelectItem>
                  <SelectItem value="asia-hong-kong">Asia/Hong Kong (UTC+8)</SelectItem>
                  <SelectItem value="asia-singapore">Asia/Singapore (UTC+8)</SelectItem>
                  <SelectItem value="asia-bangkok">Asia/Bangkok (UTC+7)</SelectItem>
                  <SelectItem value="asia-jakarta">Asia/Jakarta (UTC+7)</SelectItem>
                  <SelectItem value="asia-kolkata">Asia/Kolkata (UTC+5:30)</SelectItem>
                  <SelectItem value="asia-dubai">Asia/Dubai (UTC+4)</SelectItem>
                  <SelectItem value="europe-london">Europe/London (UTC+0)</SelectItem>
                  <SelectItem value="europe-paris">Europe/Paris (UTC+1)</SelectItem>
                  <SelectItem value="europe-berlin">Europe/Berlin (UTC+1)</SelectItem>
                  <SelectItem value="europe-moscow">Europe/Moscow (UTC+3)</SelectItem>
                  <SelectItem value="america-new-york">America/New York (UTC-5)</SelectItem>
                  <SelectItem value="america-chicago">America/Chicago (UTC-6)</SelectItem>
                  <SelectItem value="america-denver">America/Denver (UTC-7)</SelectItem>
                  <SelectItem value="america-los-angeles">America/Los Angeles (UTC-8)</SelectItem>
                  <SelectItem value="america-sao-paulo">America/Sao Paulo (UTC-3)</SelectItem>
                  <SelectItem value="australia-sydney">Australia/Sydney (UTC+10)</SelectItem>
                  <SelectItem value="pacific-auckland">Pacific/Auckland (UTC+12)</SelectItem>
                  <SelectItem value="utc">UTC (UTC+0)</SelectItem>
                </SelectContent>
              </PendingSelect>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">重設</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Watch Dog 機制
          </CardTitle>
          <CardDescription>配置系統自動監控和重啟機制</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* LTE RSSI 監控 */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">LTE RSSI 監控</Label>
                <p className="text-sm text-muted-foreground">當 LTE 訊號低於閾值時自動重啟</p>
              </div>
              <PendingSwitch 
                section="Watch Dog" 
                field="LTE RSSI 監控啟用" 
                defaultChecked={false}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rssi-threshold">RSSI 閾值 (dBm)</Label>
                <PendingSelect 
                  section="Watch Dog" 
                  field="RSSI 閾值" 
                  defaultValue="-100"
                  id="rssi-threshold"
                >
                  <SelectContent>
                    <SelectItem value="-80">-80 dBm (良好)</SelectItem>
                    <SelectItem value="-90">-90 dBm (一般)</SelectItem>
                    <SelectItem value="-100">-100 dBm (較差)</SelectItem>
                    <SelectItem value="-110">-110 dBm (很差)</SelectItem>
                  </SelectContent>
                </PendingSelect>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rssi-check-interval">檢查間隔</Label>
                <PendingSelect 
                  section="Watch Dog" 
                  field="RSSI 檢查間隔" 
                  defaultValue="5min"
                  id="rssi-check-interval"
                >
                  <SelectContent>
                    <SelectItem value="1min">每 1 分鐘</SelectItem>
                    <SelectItem value="5min">每 5 分鐘</SelectItem>
                    <SelectItem value="10min">每 10 分鐘</SelectItem>
                    <SelectItem value="30min">每 30 分鐘</SelectItem>
                  </SelectContent>
                </PendingSelect>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rssi-fail-count">連續失敗次數</Label>
                <PendingSelect 
                  section="Watch Dog" 
                  field="RSSI 連續失敗次數" 
                  defaultValue="3"
                  id="rssi-fail-count"
                >
                  <SelectContent>
                    <SelectItem value="1">1 次</SelectItem>
                    <SelectItem value="3">3 次</SelectItem>
                    <SelectItem value="5">5 次</SelectItem>
                    <SelectItem value="10">10 次</SelectItem>
                  </SelectContent>
                </PendingSelect>
              </div>
            </div>
          </div>

          {/* 定時重開機 */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">定時重開機</Label>
                <p className="text-sm text-muted-foreground">按照設定時間自動重啟系統</p>
              </div>
              <PendingSwitch 
                section="Watch Dog" 
                field="定時重開機啟用" 
                defaultChecked={false}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reboot-schedule">重啟週期</Label>
                <PendingSelect 
                  section="Watch Dog" 
                  field="重啟週期" 
                  defaultValue="daily"
                  id="reboot-schedule"
                >
                  <SelectContent>
                    <SelectItem value="daily">每天</SelectItem>
                    <SelectItem value="weekly">每週</SelectItem>
                    <SelectItem value="monthly">每月</SelectItem>
                  </SelectContent>
                </PendingSelect>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reboot-time">重啟時間</Label>
                <PendingInput 
                  section="Watch Dog" 
                  field="重啟時間" 
                  id="reboot-time" 
                  type="time"
                  defaultValue="03:00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reboot-day">重啟日期（每週/每月）</Label>
                <PendingSelect 
                  section="Watch Dog" 
                  field="重啟日期" 
                  defaultValue="sunday"
                  id="reboot-day"
                >
                  <SelectContent>
                    <SelectItem value="sunday">週日</SelectItem>
                    <SelectItem value="monday">週一</SelectItem>
                    <SelectItem value="tuesday">週二</SelectItem>
                    <SelectItem value="wednesday">週三</SelectItem>
                    <SelectItem value="thursday">週四</SelectItem>
                    <SelectItem value="friday">週五</SelectItem>
                    <SelectItem value="saturday">週六</SelectItem>
                    <SelectItem value="1">每月 1 日</SelectItem>
                    <SelectItem value="15">每月 15 日</SelectItem>
                  </SelectContent>
                </PendingSelect>
              </div>
            </div>
          </div>

          {/* Ping 失敗重開機 */}
          <div className="space-y-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base font-medium">Ping 失敗重開機</Label>
                <p className="text-sm text-muted-foreground">當無法 Ping 通目標主機時自動重啟</p>
              </div>
              <PendingSwitch 
                section="Watch Dog" 
                field="Ping 失敗重開機啟用" 
                defaultChecked={false}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ping-target">Ping 目標主機</Label>
                <PendingInput 
                  section="Watch Dog" 
                  field="Ping 目標主機" 
                  id="ping-target" 
                  placeholder="8.8.8.8"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ping-interval">檢查間隔</Label>
                <PendingSelect 
                  section="Watch Dog" 
                  field="Ping 檢查間隔" 
                  defaultValue="5min"
                  id="ping-interval"
                >
                  <SelectContent>
                    <SelectItem value="1min">每 1 分鐘</SelectItem>
                    <SelectItem value="5min">每 5 分鐘</SelectItem>
                    <SelectItem value="10min">每 10 分鐘</SelectItem>
                    <SelectItem value="30min">每 30 分鐘</SelectItem>
                  </SelectContent>
                </PendingSelect>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ping-fail-count">連續失敗次數</Label>
                <PendingSelect 
                  section="Watch Dog" 
                  field="Ping 連續失敗次數" 
                  defaultValue="3"
                  id="ping-fail-count"
                >
                  <SelectContent>
                    <SelectItem value="1">1 次</SelectItem>
                    <SelectItem value="3">3 次</SelectItem>
                    <SelectItem value="5">5 次</SelectItem>
                    <SelectItem value="10">10 次</SelectItem>
                  </SelectContent>
                </PendingSelect>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ping-timeout">Ping 逾時時間</Label>
                <PendingSelect 
                  section="Watch Dog" 
                  field="Ping 逾時時間" 
                  defaultValue="5"
                  id="ping-timeout"
                >
                  <SelectContent>
                    <SelectItem value="3">3 秒</SelectItem>
                    <SelectItem value="5">5 秒</SelectItem>
                    <SelectItem value="10">10 秒</SelectItem>
                    <SelectItem value="30">30 秒</SelectItem>
                  </SelectContent>
                </PendingSelect>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>管理員密碼</CardTitle>
          <CardDescription>修改登入密碼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">當前密碼</Label>
            <PendingInput 
              section="管理員密碼" 
              field="當前密碼" 
              id="current-password" 
              type="password" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password">新密碼</Label>
            <PendingInput 
              section="管理員密碼" 
              field="新密碼" 
              id="new-password" 
              type="password" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">確認密碼</Label>
            <PendingInput 
              section="管理員密碼" 
              field="確認密碼" 
              id="confirm-password" 
              type="password" 
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">變更密碼</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>時間同步</CardTitle>
          <CardDescription>配置 NTP 時間同步服務器</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ntp-server">NTP 服務器</Label>
            <PendingInput 
              section="時間同步" 
              field="NTP 服務器" 
              id="ntp-server" 
              placeholder="pool.ntp.org" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sync-interval">自動校時間隔</Label>
            <PendingSelect 
              section="時間同步" 
              field="自動校時間隔" 
              defaultValue="daily"
              id="sync-interval"
            >
              <SelectContent>
                <SelectItem value="disabled">停用自動校時</SelectItem>
                <SelectItem value="hourly">每小時</SelectItem>
                <SelectItem value="6hours">每 6 小時</SelectItem>
                <SelectItem value="12hours">每 12 小時</SelectItem>
                <SelectItem value="daily">每天</SelectItem>
                <SelectItem value="weekly">每週</SelectItem>
              </SelectContent>
            </PendingSelect>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline">立即同步</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
