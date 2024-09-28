"use client";

import { Table } from "@prisma/client";

import { format } from "date-fns";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Heading } from "@/components/custom-ui/heading";
import { Paragraph } from "@/components/custom-ui/paragraph";
import { Separator } from "@/components/ui/separator";

const chartConfig = {
  totalRequest: {
    label: "Запросы",
    color: "hsl(var(--chart-1))",
  },
  totalSolvingRequestInDays: {
    label: "Решения задач в днях",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface DashboardClientProps {
  data: Table[];
}

const DashboardClient: React.FC<DashboardClientProps> = ({ data }) => {
  const groupedData = data.reduce(
    (acc, item) => {
      const monthKey = format(new Date(item.requestCreatedAt), "MMMM yyyy");

      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          totalRequest: 0,
          totalSolvingRequestInDays: 0,
        };
      }

      acc[monthKey].totalRequest += 1;
      acc[monthKey].totalSolvingRequestInDays += item.solvingRequestInDays || 0;

      return acc;
    },
    {} as Record<
      string,
      { month: string; totalRequest: number; totalSolvingRequestInDays: number }
    >,
  );

  const chartData = Object.values(groupedData);

  return (
    <div className="flex flex-col gap-y-8">
      <div>
        <Heading size="h3">Обзор Диаграммы</Heading>
        <Paragraph className="text-muted-foreground">
          Вы можете просмотреть ежемесячный отчет.
        </Paragraph>
      </div>
      <Separator />
      <ChartContainer
        config={chartConfig}
        className="max-h-[calc(100dvh-23.125rem)] min-h-[calc(100dvh-23.125rem)] w-full md:max-h-[calc(100dvh-18.125rem)] md:min-h-[calc(100dvh-18.125rem)]"
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="totalRequest" fill="hsl(var(--chart-1))" radius={4} />
          <Bar
            dataKey="totalSolvingRequestInDays"
            fill="hsl(var(--chart-2))"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default DashboardClient;
