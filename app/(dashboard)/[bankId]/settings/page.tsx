import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { prisma } from "@/prisma";

import Section from "@/components/ui/section";
import SettingsForm from "./_components/settings-form";

export default async function SettingsPage({
  params,
}: {
  params: { bankId: string };
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const bank = await prisma.bank.findFirst({
    where: {
      id: params.bankId,
      userId: session.user.id,
    },
  });

  if (!bank) {
    redirect("/");
  }

  return (
    <Section
      title="Параметры"
      description="Тут вы можете внести изменения, а также удалить свои банк."
      label="Удалить"
      route={`/api/banks/${params.bankId}`}
    >
      <SettingsForm initialData={bank} />
    </Section>
  );
}
