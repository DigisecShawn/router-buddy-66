import { Input } from "@/components/ui/input";
import { usePendingChanges } from "@/contexts/PendingChangesContext";
import { ComponentProps, useState, useEffect } from "react";

interface PendingInputProps extends Omit<ComponentProps<typeof Input>, "onChange"> {
  section: string;
  field: string;
  defaultValue?: string;
}

export function PendingInput({ section, field, defaultValue = "", ...props }: PendingInputProps) {
  const { addChange } = usePendingChanges();
  const [value, setValue] = useState(defaultValue);
  const [originalValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (newValue !== originalValue) {
      addChange(section, field, originalValue, newValue);
    }
  };

  return (
    <Input
      {...props}
      value={value}
      onChange={handleChange}
      className={value !== originalValue ? "border-primary" : ""}
    />
  );
}
