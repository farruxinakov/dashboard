import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { prisma } from "@/prisma";

import Section from "@/components/ui/section";
import { columns, TableColumn } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function GeneralPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const banks = await prisma.bank.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const tables = await prisma.table.findMany({
    where: {
      bankId: {
        in: banks.map((bank) => bank.id),
      },
    },
    include: {
      Bank: {
        select: {
          name: true,
        },
      },
    },
  });

  const data: TableColumn[] = tables.map((table) => ({
    id: table.id,
    bankName: table.Bank.name,
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
    <Section title="Обшие Таблицы" description="Вот список ваших общих таблиц.">
      <DataTable columns={columns} data={data} />
    </Section>
  );
}
