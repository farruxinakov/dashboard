"use client";

import * as React from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [filterBy, setFilterBy] = React.useState({
    id: "group",
    header: "Группа",
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-4 py-4 md:grid-cols-[auto_1fr]">
        <Input
          value={
            (table.getColumn(filterBy.id)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(filterBy.id)?.setFilterValue(event.target.value)
          }
          placeholder="Поиск..."
          className="max-w-sm"
        />
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">Поиск ({filterBy.header})</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuGroup>
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      column.getIsVisible() && column.id !== "actions",
                  )
                  .map((column, index) => {
                    const header =
                      index === 0 && typeof column.columnDef.header !== "string"
                        ? "Группа"
                        : (column.columnDef.header?.toString() ?? "");

                    return (
                      <DropdownMenuItem
                        key={column.id}
                        disabled={column.id === filterBy.id}
                        onClick={() =>
                          setFilterBy({
                            id: column.id,
                            header: header,
                          })
                        }
                      >
                        {header}
                      </DropdownMenuItem>
                    );
                  })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Столбцы
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide() && column.id !== "actions",
                )
                .map((column, index, columns) => {
                  const header =
                    index === 0 && typeof column.columnDef.header !== "string"
                      ? "Группа"
                      : (column.columnDef.header?.toString() ?? "");

                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        const visibleLenght = columns.filter((col) =>
                          col.getIsVisible(),
                        ).length;

                        if (visibleLenght === 1) {
                          if (value) {
                            column.toggleVisibility(!!value);
                          }

                          return;
                        }

                        column.toggleVisibility(!!value);

                        if (column.id === filterBy.id) {
                          const nextVisibleColumn = columns.find(
                            (col, idx) => idx > index && col.getIsVisible(),
                          );

                          if (nextVisibleColumn) {
                            setFilterBy({
                              id: nextVisibleColumn.id,
                              header:
                                nextVisibleColumn.columnDef.header?.toString() ??
                                "",
                            });
                          } else {
                            const firstVisibleColumn = columns.find((col) =>
                              col.getIsVisible(),
                            );

                            if (firstVisibleColumn) {
                              setFilterBy({
                                id: firstVisibleColumn.id,
                                header:
                                  firstVisibleColumn.columnDef.header?.toString() ??
                                  "",
                              });
                            }
                          }
                        }
                      }}
                      className="capitalize"
                    >
                      {header}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          variant="outline"
          size="sm"
        >
          Предыдущий
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          variant="outline"
          size="sm"
        >
          Следующий
        </Button>
      </div>
    </div>
  );
}
