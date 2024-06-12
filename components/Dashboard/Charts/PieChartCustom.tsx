import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MapDetails } from "../MarketTrends/components/TabMapDetails";

const PieChartCustom = ({ data }: { data: MapDetails[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={180}
          endAngle={-180}
          innerRadius={50}
          outerRadius={80}
          dataKey="value"
          isAnimationActive={false}
          className="outline-none"
        >
          {data.map((entry, index) => {
            return (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke="none"
                strokeWidth={2}
              />
            );
          })}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartCustom;
