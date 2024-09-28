"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

const Navbar = () => {
  const params = useParams();
  const pathname = usePathname();

  const routes = [
    {
      id: 1,
      label: "Обзор",
      href: `/${params.bankId}`,
    },
    {
      id: 2,
      label: "Таблицы",
      href: `/${params.bankId}/tables`,
    },
    {
      id: 3,
      label: "Общие",
      href: `/${params.bankId}/common`,
    },
    {
      id: 3,
      label: "Настройки",
      href: `/${params.bankId}/settings`,
    },
  ];

  return (
    <nav className="col-start-1 col-end-3 row-start-2 row-end-3 md:col-start-[initial] md:col-end-[initial] md:row-start-[initial] md:row-end-[initial]">
      <ul className="flex items-center">
        {routes.map((route) => (
          <li
            key={route.id}
            className="inline-flex h-9 items-center justify-center whitespace-nowrap px-4 py-2"
          >
            <Link
              href={route.href}
              className={cn(
                "relative text-sm font-medium before:absolute before:bottom-0 before:left-0 before:h-px before:w-0 before:translate-y-2 before:bg-primary before:transition-all before:duration-300 before:content-[''] hover:before:w-full",
                route.href === pathname && "before:w-full",
              )}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
