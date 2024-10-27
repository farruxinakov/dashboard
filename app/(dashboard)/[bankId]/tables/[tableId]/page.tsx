import { prisma } from "@/prisma";

import Section from "@/components/ui/section";
import TableForm from "./_components/table-form";

export default async function TablePage({
  params,
}: {
  params: { bankId: string; tableId: string };
}) {
  const table = await prisma.table.findUnique({
    where: {
      id: params.tableId,
    },
  });

  return (
    <Section
      title={table ? "Внести Изменения" : "Создать"}
      description={table ? "Тут вы можете внести изменения для своей таблицы." : "Тут вы можете создать новую таблицу."}
      label={table && "Удалить"}
      route={`/api/${params.bankId}/tables/${params.tableId}`}
      replace={`/${params.bankId}`}
    >
      <TableForm initialData={table} />
    </Section>
  );
}
