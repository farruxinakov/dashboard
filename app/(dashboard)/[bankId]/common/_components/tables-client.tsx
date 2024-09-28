"use client";

import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/custom-ui/heading";
import { Paragraph } from "@/components/custom-ui/paragraph";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { columns, TableColumn } from "./column";
import { DataTable } from "./data-table";

interface TablesClientProps {
  data: TableColumn[];
}

const TablesClient: React.FC<TablesClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <Heading size="h3">Таблицы (1)</Heading>
          <Paragraph className="text-muted-foreground">
            Управляйте и создавайте таблицы для своего банка.
          </Paragraph>
        </div>
        <Button onClick={() => router.push(`/${params.bankId}/tables/new`)}>
          Создать
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TablesClient;
