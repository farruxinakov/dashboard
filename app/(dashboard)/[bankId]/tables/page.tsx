import { format } from "date-fns";

import prisma from "@/db";

import Section from "@/components/custom-ui/section";
import { TableColumn } from "./_components/column";
import TablesClient from "./_components/tables-client";

export default async function TablesPage({
  params,
}: {
  params: { bankId: string };
}) {
  const tables = await prisma.table.findMany({
    where: {
      bankId: params.bankId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTables: TableColumn[] = tables.map((table) => ({
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
    <>
      <Section>
        <TablesClient data={formattedTables} />
      </Section>
    </>
  );
}
