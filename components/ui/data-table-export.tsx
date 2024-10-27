import { Table } from "@tanstack/react-table";
import * as XLSX from "xlsx";
import { Download } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableExportProps<TData> {
  table: Table<TData>;
}

export function DataTableExport<TData>({ table }: DataTableExportProps<TData>) {
  const handleExport = (format: "csv" | "xlsx") => {
    const exportColumns = table
      .getAllColumns()
      .filter((column) => !["select", "actions"].includes(column.id));

    const data = table.getFilteredRowModel().rows.map((row) => {
      return exportColumns.reduce((acc: any, column) => {
        acc[column.id] = column.accessorFn
          ? column.accessorFn(row.original as any, row.index)
          : row.getValue(column.id);

        return acc;
      }, {});
    });

    if (format === "csv") {
      exportToCSV(data, "export.csv");
    } else {
      exportToExcel(data, "export.xlsx");
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]);

    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((header) => JSON.stringify(row[header])).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute("download", filename);

      link.style.visibility = "hidden";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
  };

  const exportToExcel = (data: any[], filename: string) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Страница 1");
    XLSX.writeFile(workbook, filename);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download />
          Скачать
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport("csv")}>
          Скачать CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("xlsx")}>
          Скачать Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
