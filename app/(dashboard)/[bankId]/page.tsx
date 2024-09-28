import prisma from "@/db";

import Section from "@/components/custom-ui/section";
import DashboardClient from "./_components/dashboard-client";

export default async function DashboardPage({
  params,
}: {
  params: { bankId: string };
}) {
  const tables = await prisma.table.findMany({
    where: {
      bankId: params.bankId,
    },
  });

  return (
    <>
      <Section>
        <DashboardClient data={tables} />
      </Section>
    </>
  );
}
