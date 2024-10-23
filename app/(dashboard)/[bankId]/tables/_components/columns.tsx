"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import CellActions from "./cell-actions";

export type TableColumn = {
  id: string;
  group: string;
  performer: string;
  partnerName: string;
  partnerContact: string;
  request: string;
  response: string;
  requestSolutionDate: string;
  solvingRequestInDays: number | null;
  feedback: string;
  source: string;
  requestStatus: string;
  requestCreatedAt: string;
};

export const columns: ColumnDef<TableColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Группа" />
    ),
  },
  {
    accessorKey: "performer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Исполнитель" />
    ),
  },
  {
    accessorKey: "partnerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Имя партнера" />
    ),
  },
  {
    accessorKey: "partnerContact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Контакт партнера" />
    ),
  },
  {
    accessorKey: "request",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Запрос" />
    ),
  },
  {
    accessorKey: "response",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ответ на запрос" />
    ),
  },
  {
    accessorKey: "requestSolutionDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата решения задачи" />
    ),
  },
  {
    accessorKey: "solvingRequestInDays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Решение задач в днях" />
    ),
  },
  {
    accessorKey: "feedback",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Книга жалоб" />
    ),
  },
  {
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Источник" />
    ),
  },
  {
    accessorKey: "requestStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
  },
  {
    accessorKey: "requestCreatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата создания запроса" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
];
