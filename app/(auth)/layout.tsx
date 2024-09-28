import { redirect } from "next/navigation";

import { PropsWithChildren } from "react";

import { auth } from "@/auth";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return <>{children}</>;
}
