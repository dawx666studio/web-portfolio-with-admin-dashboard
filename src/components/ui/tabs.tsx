import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  selectedValue: string;
  setSelectedValue: (val: string) => void;
}>({ selectedValue: "", setSelectedValue: () => {} });

export function Tabs({
  defaultValue = "",
  value,
  onValueChange,
  children,
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = React.useState(value || defaultValue);

  const selectedValue = value !== undefined ? value : internalValue;
  const setSelectedValue = (val: string) => {
    setInternalValue(val);
    onValueChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ selectedValue, setSelectedValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-2xl bg-cream-200 p-1 border-2 border-black/80 gap-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { selectedValue, setSelectedValue } = React.useContext(TabsContext);
  const isActive = selectedValue === value;

  return (
    <button
      type="button"
      onClick={() => setSelectedValue(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition-all",
        isActive
          ? "bg-fructus-red text-white shadow-retro-sm"
          : "text-fructus-dark hover:bg-cream-300",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { selectedValue } = React.useContext(TabsContext);
  if (selectedValue !== value) return null;

  return (
    <div className={cn("mt-4 focus-visible:outline-none", className)}>
      {children}
    </div>
  );
}
