import { Heading } from "@/components/custom-ui/heading";
import { Paragraph } from "@/components/custom-ui/paragraph";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./data-table";
import { columns, TableColumn } from "./column";

interface CommonClientProps {
  data: TableColumn[];
}

const CommonClient: React.FC<CommonClientProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <Heading size="h3">Общие Таблицы</Heading>
        <Paragraph className="text-muted-foreground">
          Тут распологаются таблицы каждого банка.
        </Paragraph>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CommonClient;
