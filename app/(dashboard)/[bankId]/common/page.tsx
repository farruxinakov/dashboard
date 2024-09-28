import { redirect } from "next/navigation";

import { format } from "date-fns";

import { auth } from "@/auth";

import prisma from "@/db";

import Section from "@/components/custom-ui/section";
import CommonClient from "./_components/common-client";
import { TableColumn } from "./_components/column";

export default async function CommonPage() {
  const session = await auth();

  if (!session?.user) {
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

  const formattedTables: TableColumn[] = tables.map((table) => ({
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
    <Section>
      <CommonClient data={formattedTables} />
    </Section>
  );
}
