import { Switch } from "@/components/ui/switch";
import { usePendingChanges } from "@/contexts/PendingChangesContext";
import { ComponentProps, useState } from "react";

interface PendingSwitchProps extends Omit<ComponentProps<typeof Switch>, "onCheckedChange"> {
  section: string;
  field: string;
  defaultChecked?: boolean;
}

export function PendingSwitch({ section, field, defaultChecked = false, ...props }: PendingSwitchProps) {
  const { addChange } = usePendingChanges();
  const [checked, setChecked] = useState(defaultChecked);
  const [originalValue] = useState(defaultChecked);

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
    
    if (newChecked !== originalValue) {
      addChange(
        section,
        field,
        originalValue ? "啟用" : "停用",
        newChecked ? "啟用" : "停用"
      );
    }
  };

  return (
    <Switch
      {...props}
      checked={checked}
      onCheckedChange={handleChange}
    />
  );
}
