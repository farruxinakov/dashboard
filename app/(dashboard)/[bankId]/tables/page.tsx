import { prisma } from "@/prisma";

import Section from "@/components/ui/section";
import { TableColumn, columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function TablesPage({
  params,
}: {
  params: { bankId: string };
}) {
  const tables = await prisma.table.findMany({
    where: {
      bankId: params.bankId,
    },
  });

  const data: TableColumn[] = tables.map((table) => ({
    id: table.id,
    group: table.group,
    performer: table.performer,
    partnerName: table.partnerName,
    partnerContact: table.partnerContact,
    request: table.request,
    response: table.response,
    requestSolutionDate: table.requestSolutionDate.toISOString(),
    solvingRequestInDays: table.solvingRequestInDays,
    feedback: table.feedback,
    source: table.source,
    requestStatus: table.requestStatus,
    requestCreatedAt: table.requestCreatedAt.toISOString(),
  }));

  return (
    <Section
      title="Таблицы"
      description="Вот список ваших таблиц."
      label="Создать"
      route={`/${params.bankId}/tables/new`}
    >
      <DataTable columns={columns} data={data} />
    </Section>
  );
}
