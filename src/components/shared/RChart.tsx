"use client";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { Pie, PieChart, TooltipProps } from "recharts";

const chartConfig = {} satisfies ChartConfig;

type CustomTooltipProps = TooltipProps<number, string> & {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      amount: number | string;
    };
  }>;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-shark-2 text-white px-[0.375rem] py-1 rounded-md">
        <p className="text-xs font-medium">{`${data.amount}`}</p>
        <p className="text-s9">{data.name}</p>
      </div>
    );
  }
  return null;
};

interface Props {
  data: Array<{ name: string; amount: number | string; fill?: string }>;
}

function RChart({ data }: Props) {
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[200px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<CustomTooltip />} />
          <Pie data={data} dataKey="amount" innerRadius={40} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export default RChart;
