import { redirect } from "next/navigation";

import { auth } from "@/auth";

import prisma from "@/db";

import Section from "@/components/custom-ui/section";
import SettingsForm from "./_components/settings-form";

export default async function SettingsPage({
  params,
}: {
  params: { bankId: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
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
    <>
      <Section>
        <SettingsForm initialData={bank} />
      </Section>
    </>
  );
}
