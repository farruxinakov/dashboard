"use client";

import { useParams, useRouter } from "next/navigation";

import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableColumn } from "./columns";

interface CellActionsProps {
  data: TableColumn;
}

const CellActions: React.FC<CellActionsProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(`/${params.bankId}/tables/${data.id}`)}
      variant="ghost"
      size="icon"
    >
      <Edit className="h-4 w-4" />
      <span className="sr-only">Внести Изменения</span>
    </Button>
  );
};

export default CellActions;
