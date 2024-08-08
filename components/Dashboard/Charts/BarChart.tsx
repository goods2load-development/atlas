import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface BarChartData {
  label: string;
  value: number;
  color: string;
}

interface BarChartGraphProps {
  data: BarChartData[];
  grid?: boolean;
  values?: boolean;
  barWidth?: number;
}

const BarChartGraph = ({
  data,
  grid = true,
  values = true,
  barWidth,
}: BarChartGraphProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={20}
        height={20}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {grid && <CartesianGrid stroke="#ccc" vertical={false} />}
        {values && <XAxis dataKey="name" className="hidden lg:block" />}
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="value"
          className="flex justify-center"
          barSize={barWidth || 40}
        >
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartGraph;
