"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
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
    accessorKey: "group",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Группа
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "performer",
    header: "Исполнитель",
  },
  {
    accessorKey: "partnerName",
    header: "Имя партнёра",
  },
  {
    accessorKey: "partnerContact",
    header: "Контакт партнёра",
  },
  {
    accessorKey: "request",
    header: "Запрос",
  },
  {
    accessorKey: "response",
    header: "Ответ на запрос",
  },
  {
    accessorKey: "requestSolutionDate",
    header: "Дата решения задачи",
  },
  {
    accessorKey: "solvingRequestInDays",
    header: "Решение задач в днях",
  },
  {
    accessorKey: "feedback",
    header: "Книга жалоб",
  },
  {
    accessorKey: "source",
    header: "Источник",
  },
  {
    accessorKey: "requestStatus",
    header: "Статус",
  },
  {
    accessorKey: "requestCreatedAt",
    header: "Дата создания запроса",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
