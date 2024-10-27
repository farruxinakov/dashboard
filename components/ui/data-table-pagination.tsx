import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Paragraph } from "@/components/ui/paragraph";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <Paragraph variant="muted">
        Выбрано {table.getFilteredSelectedRowModel().rows.length} из{" "}
        {table.getFilteredRowModel().rows.length} строк.
      </Paragraph>
      <div className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex items-center gap-x-2">
          <Heading size="h6">Строк на странице</Heading>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Heading size="h6">
          Страница {table.getState().pagination.pageIndex + 1} из{" "}
          {table.getPageCount()}
        </Heading>
        <div className="flex items-center gap-x-2">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            variant="outline"
            size="icon"
          >
            <span className="sr-only">Перейти на первую страницу</span>
            <DoubleArrowLeftIcon />
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            variant="outline"
            size="icon"
          >
            <span className="sr-only">Перейти на предыдущую страницу</span>
            <ChevronLeftIcon />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant="outline"
            size="icon"
          >
            <span className="sr-only">Перейти на следующую страницу</span>
            <ChevronRightIcon />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            variant="outline"
            size="icon"
          >
            <span className="sr-only">Перейти на последнюю страницу</span>
            <DoubleArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
