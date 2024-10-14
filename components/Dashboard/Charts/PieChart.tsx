"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

export interface PieData {
  name: string;
  value: number;
  color: string;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  ...args
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  let positionX = x;

  if (name.length > 15) {
    positionX =
      x > 120
        ? x - name.length * 2 - name.length
        : x + name.length * 2 + name.length;
  }

  percent = (percent * 100).toFixed(0);

  return (
    <>
      {/* {percent >= 5 && (
        <text
          x={positionX}
          y={y - 10}
          fill="white"
          textAnchor={x > cx ? "start" : "end"}
          dominantBaseline="central"
          className="text-[8px]"
        >
          {name}
        </text>
      )} */}
      {/* <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-[10px]"
      >
        {`${percent}%`}
      </text> */}
    </>
  );
};

const CircleChart = ({ data }: { data: PieData[] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={
            isMobile ? (...args) => renderCustomizedLabel(...args) : undefined
          }
          outerRadius={"auto"}
          fill="#8884d8"
          dataKey="value"
          className="outline-none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              className="outline-none"
              stroke={entry.color}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CircleChart;
