import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePendingChanges } from "@/contexts/PendingChangesContext";
import { ReactNode, useState } from "react";

interface PendingSelectProps {
  section: string;
  field: string;
  defaultValue?: string;
  children: ReactNode;
  id?: string;
  placeholder?: string;
}

export function PendingSelect({ section, field, defaultValue = "", children, id, placeholder }: PendingSelectProps) {
  const { addChange } = usePendingChanges();
  const [value, setValue] = useState(defaultValue);
  const [originalValue] = useState(defaultValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    if (newValue !== originalValue) {
      addChange(section, field, originalValue, newValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger id={id} className={value !== originalValue ? "border-primary" : ""}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      {children}
    </Select>
  );
}

export { SelectContent, SelectItem };
