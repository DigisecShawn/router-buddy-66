import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HardDrive, Download, Upload, AlertCircle } from "lucide-react";

export default function Backup() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">備份與還原</h1>
        <p className="text-muted-foreground mt-2">備份或還原系統配置</p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          備份檔案包含所有系統設置和配置。請妥善保管備份檔案。
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            備份配置
          </CardTitle>
          <CardDescription>下載當前系統配置檔案</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            點擊下方按鈕將當前系統配置備份為檔案。此檔案可用於日後還原系統設置。
          </p>
          <Button className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            下載備份檔案
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            還原配置
          </CardTitle>
          <CardDescription>從備份檔案還原系統設置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              警告：還原操作將覆蓋當前所有設置。建議先備份當前配置。
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button variant="outline">
                選擇備份檔案
              </Button>
              <span className="text-sm text-muted-foreground">尚未選擇檔案</span>
            </div>
            <Button disabled>
              <Upload className="w-4 h-4 mr-2" />
              還原配置
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-primary" />
            重置系統
          </CardTitle>
          <CardDescription>恢復出廠設置</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              警告：此操作將清除所有設置並恢復到出廠狀態，無法復原！
            </AlertDescription>
          </Alert>
          <Button variant="destructive">重置為出廠設置</Button>
        </CardContent>
      </Card>
    </div>
  );
}
