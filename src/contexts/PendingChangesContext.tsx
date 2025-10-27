import { createContext, useContext, useState, ReactNode } from "react";

export interface PendingChange {
  id: string;
  section: string;
  field: string;
  oldValue: string;
  newValue: string;
  timestamp: number;
}

interface PendingChangesContextType {
  changes: PendingChange[];
  addChange: (section: string, field: string, oldValue: string, newValue: string) => void;
  removeChange: (id: string) => void;
  clearChanges: () => void;
  applyChanges: () => void;
}

const PendingChangesContext = createContext<PendingChangesContextType | undefined>(undefined);

export function PendingChangesProvider({ children }: { children: ReactNode }) {
  const [changes, setChanges] = useState<PendingChange[]>([]);

  const addChange = (section: string, field: string, oldValue: string, newValue: string) => {
    const id = `${section}-${field}-${Date.now()}`;
    const newChange: PendingChange = {
      id,
      section,
      field,
      oldValue,
      newValue,
      timestamp: Date.now(),
    };

    setChanges((prev) => {
      // 移除同一個 section 和 field 的舊變更
      const filtered = prev.filter(
        (change) => !(change.section === section && change.field === field)
      );
      return [...filtered, newChange];
    });
  };

  const removeChange = (id: string) => {
    setChanges((prev) => prev.filter((change) => change.id !== id));
  };

  const clearChanges = () => {
    setChanges([]);
  };

  const applyChanges = () => {
    // 這裡可以添加實際的應用邏輯
    console.log("應用變更:", changes);
    // 清空變更列表
    clearChanges();
  };

  return (
    <PendingChangesContext.Provider
      value={{ changes, addChange, removeChange, clearChanges, applyChanges }}
    >
      {children}
    </PendingChangesContext.Provider>
  );
}

export function usePendingChanges() {
  const context = useContext(PendingChangesContext);
  if (context === undefined) {
    throw new Error("usePendingChanges must be used within a PendingChangesProvider");
  }
  return context;
}
