"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  emptyMessage = "No items found",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) => {
    if (!searchKey || !searchTerm) return true;
    const val = item[searchKey];
    if (typeof val === "string") {
      return val.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {searchKey && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 text-sm"
          />
        </div>
      )}

      <div className="bg-white rounded-3xl border-2 border-black/80 overflow-hidden shadow-retro-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-black/10 bg-cream-100 text-xs font-black uppercase tracking-wider text-fructus-dark">
                {columns.map((col, idx) => (
                  <th key={idx} className={`p-4 ${col.className || ""}`}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 text-sm font-medium">
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-8 text-center text-muted-foreground font-bold"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="hover:bg-cream-50/80 transition-colors"
                  >
                    {columns.map((col, colIdx) => (
                      <td key={colIdx} className={`p-4 ${col.className || ""}`}>
                        {col.cell
                          ? col.cell(item)
                          : col.accessorKey
                          ? String(item[col.accessorKey] ?? "")
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
