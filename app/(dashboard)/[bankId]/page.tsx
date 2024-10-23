import { redirect } from "next/navigation";

import { format } from "date-fns";

import { auth } from "@/auth";

import { prisma } from "@/db";

import Section from "@/components/custom-ui/section";
import { columns, TableColumn } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function DashboardPage() {
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
    requestSolutionDate: format(table.requestSolutionDate, "MMMM do, yyyy"),
    solvingRequestInDays: table.solvingRequestInDays,
    feedback: table.feedback,
    source: table.source,
    requestStatus: table.requestStatus,
    requestCreatedAt: format(table.requestCreatedAt, "MMMM do, yyyy"),
  }));

  return (
    <Section title="Заголовок" description="Описание.">
      <DataTable columns={columns} data={data} />
    </Section>
  );
}
