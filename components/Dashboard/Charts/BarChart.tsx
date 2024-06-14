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
  name: string;
  value: number;
  color: string;
}

const data = [
  {
    name: "Dubai",
    value: 43,
    color: "#FFBD18",
  },
  {
    name: "India",
    value: 125,
    color: "#FF9F40",
  },
  {
    name: "Vietnam",
    value: 13,
    color: "#FF6720",
  },
  {
    name: "Saudi Arabia",
    value: 50,
    color: "#FB5304",
  },
];

const BarChartGraph = ({
  data,
  grid = true,
  values = true,
}: {
  data: BarChartData[];
  grid?: boolean;
  values?: boolean;
}) => {
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
        {values && <XAxis dataKey="name" />}
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" className="flex justify-center" barSize={40}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartGraph;
