import prisma from "@/db";

import Section from "@/components/custom-ui/section";
import TableForm from "./_components/table-form";

export default async function TablePage({
  params,
}: {
  params: { tableId: string };
}) {
  const table = await prisma.table.findUnique({
    where: {
      id: params.tableId,
    },
  });

  return (
    <>
      <Section>
        <TableForm initialData={table} />
      </Section>
    </>
  );
}
