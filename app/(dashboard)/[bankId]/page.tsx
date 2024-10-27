import { redirect } from "next/navigation";

export default function DashboardPage({
  params,
}: {
  params: { bankId: string };
}) {
  redirect(`/${params.bankId}/tables`);
}
