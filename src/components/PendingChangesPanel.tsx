import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePendingChanges } from "@/contexts/PendingChangesContext";
import { FileEdit, Check, X, Trash2, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";

export function PendingChangesPanel() {
  const { changes, removeChange, clearChanges, applyChanges } = usePendingChanges();
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    // 模擬應用設定的過程
    await new Promise(resolve => setTimeout(resolve, 1500));
    applyChanges();
    setIsApplying(false);
    toast.success("所有設定已成功應用到系統", {
      description: `共套用了 ${changes.length} 項變更`,
    });
  };

  const handleClear = () => {
    clearChanges();
    toast.info("已清除所有待定變更");
  };

  if (changes.length === 0) {
    return null;
  }

  // 按 section 分組變更
  const groupedChanges = changes.reduce((acc, change) => {
    if (!acc[change.section]) {
      acc[change.section] = [];
    }
    acc[change.section].push(change);
    return acc;
  }, {} as Record<string, typeof changes>);

  return (
    <div className="flex items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="relative">
            <FileEdit className="w-4 h-4 mr-2" />
            待定變更
            <Badge variant="destructive" className="ml-2 px-1.5 py-0 min-w-5 h-5">
              {changes.length}
            </Badge>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-primary" />
              待定變更
            </SheetTitle>
            <SheetDescription>
              以下變更尚未應用到系統，請確認後一鍵執行
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-280px)] mt-6">
            <div className="space-y-6">
              {Object.entries(groupedChanges).map(([section, sectionChanges]) => (
                <div key={section} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm font-medium">
                      {section}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {sectionChanges.length} 項變更
                    </span>
                  </div>
                  <div className="space-y-2 pl-2 border-l-2 border-primary/30">
                    {sectionChanges.map((change) => (
                      <div
                        key={change.id}
                        className="bg-muted/50 rounded-lg p-3 space-y-2 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground">
                            {change.field}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeChange(change.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-muted-foreground bg-destructive/10 px-2 py-0.5 rounded line-through">
                            {change.oldValue || "（空）"}
                          </span>
                          <span className="text-muted-foreground">→</span>
                          <span className="text-primary font-medium bg-primary/10 px-2 py-0.5 rounded">
                            {change.newValue || "（空）"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border space-y-3">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  className="w-full"
                  size="lg"
                  disabled={isApplying}
                >
                  {isApplying ? (
                    <>
                      <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                      正在應用設定...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      一鍵執行所有變更 ({changes.length})
                    </>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>確認應用設定</AlertDialogTitle>
                  <AlertDialogDescription>
                    即將套用 {changes.length} 項變更到系統。此操作可能會影響網絡連線，確定要繼續嗎？
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleApply}>
                    確認執行
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button 
              onClick={handleClear} 
              variant="outline"
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              清除所有變更
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" className="bg-primary hover:bg-primary/90" disabled={isApplying}>
            {isApplying ? (
              <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            一鍵執行
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>確認應用設定</AlertDialogTitle>
            <AlertDialogDescription>
              即將套用 {changes.length} 項變更到系統。此操作可能會影響網絡連線，確定要繼續嗎？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleApply}>
              確認執行
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
