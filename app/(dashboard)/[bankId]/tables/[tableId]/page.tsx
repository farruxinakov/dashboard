import { prisma } from "@/db";

import Section from "@/components/custom-ui/section";
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
      title="Заголовок"
      description="Описание."
      label={table && "Удалить"}
      route={`/api/${params.bankId}/tables/${params.tableId}`}
      replace={`/${params.bankId}`}
    >
      <TableForm initialData={table} />
    </Section>
  );
}
