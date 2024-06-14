import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { MapDetails } from "../MarketTrends/components/TabMapDetails";

const PieChartCustom = ({ data }: { data: MapDetails[] }) => {
  const maxValue = data.reduce(
    (max, item) => (item.value > max ? item.value : max),
    0
  );

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
          {data
            .sort((a, b) => a.value - b.value)
            .map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
                strokeWidth={entry.value === maxValue ? 12 : 0}
              />
            ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartCustom;
