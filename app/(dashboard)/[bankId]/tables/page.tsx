import { format } from "date-fns";

import { prisma } from "@/db";

import Section from "@/components/custom-ui/section";
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
    requestSolutionDate: format(table.requestSolutionDate, "MMMM do, yyyy"),
    solvingRequestInDays: table.solvingRequestInDays,
    feedback: table.feedback,
    source: table.source,
    requestStatus: table.requestStatus,
    requestCreatedAt: format(table.requestCreatedAt, "MMMM do, yyyy"),
  }));

  return (
    <Section
      title="Заголовок"
      description="Описание."
      label="Создать"
      route={`/${params.bankId}/tables/new`}
    >
      <DataTable columns={columns} data={data} />
    </Section>
  );
}
