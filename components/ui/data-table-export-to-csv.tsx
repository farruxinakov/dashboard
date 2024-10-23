"use client";

import { Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DataTableExportToCsvProps<TData> {
  table: Table<TData>;
}

export function DataTableExportToCSV<TData>({
  table,
}: DataTableExportToCsvProps<TData>) {
  const exportTableToCSV = (
    table: Table<TData>,
    opts: {
      filename?: string;
      excludeColumns?: (keyof TData | "select" | "actions" | string)[];
      onlySelected?: boolean;
    },
  ) => {
    const {
      filename = "table",
      excludeColumns = [],
      onlySelected = false,
    } = opts;

    const headers = table
      .getAllLeafColumns()
      .map((column) => column.id)
      .filter((id) => !excludeColumns.includes(id));

    const csvContent = [
      headers.join(","),
      ...(onlySelected
        ? table.getFilteredSelectedRowModel().rows
        : table.getRowModel().rows
      ).map((row) =>
        headers
          .map((header) => {
            const cellValue = row.getValue(header);

            return typeof cellValue === "string"
              ? `"${cellValue.replace(/"/g, '""')}"`
              : cellValue;
          })
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);

    link.style.visibility = "hidden";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={() =>
        exportTableToCSV(table, {
          filename: "data-table",
          excludeColumns: ["select", "actions"],
        })
      }
      variant="outline"
    >
      <Download className="mr-2 h-4 w-4" />
      Скачать
    </Button>
  );
}
