import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { prisma } from "@/db";

import Section from "@/components/custom-ui/section";
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
      title="Заголовок"
      description="Описание."
      label="Удалить"
      route={`/api/banks/${params.bankId}`}
    >
      <SettingsForm initialData={bank} />
    </Section>
  );
}
