import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePendingChanges } from "@/contexts/PendingChangesContext";
import { FileEdit, Check, X, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function PendingChangesPanel() {
  const { changes, removeChange, clearChanges, applyChanges } = usePendingChanges();

  const handleApply = () => {
    applyChanges();
    toast.success("已成功應用所有變更");
  };

  const handleClear = () => {
    clearChanges();
    toast.info("已清除所有待定變更");
  };

  if (changes.length === 0) {
    return null;
  }

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
        <SheetContent>
          <SheetHeader>
            <SheetTitle>待定變更</SheetTitle>
            <SheetDescription>
              以下變更尚未應用到系統
            </SheetDescription>
          </SheetHeader>
          
          <ScrollArea className="h-[calc(100vh-200px)] mt-6">
            <div className="space-y-4">
              {changes.map((change) => (
                <div
                  key={change.id}
                  className="border border-border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{change.section}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChange(change.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {change.field}
                    </p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground line-through">
                        {change.oldValue || "（空）"}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-primary font-medium">
                        {change.newValue || "（空）"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-background border-t border-border space-y-2">
            <Button 
              onClick={handleApply} 
              className="w-full"
              size="lg"
            >
              <Check className="w-4 h-4 mr-2" />
              應用所有變更 ({changes.length})
            </Button>
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

      <Button onClick={handleApply} size="sm" className="bg-primary hover:opacity-90">
        <Check className="w-4 h-4 mr-2" />
        應用變更
      </Button>
    </div>
  );
}
