import { MapDetails } from '../MarketTrends/Tabs/TabMapDetails';

import React from 'react';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const PieChartCustom = ({ data }: { data: MapDetails[] }) => {
  const sortedData = [...data].sort((a, b) => a.value - b.value);
  const maxValue = sortedData.reduce(
    (max, item) => (item.value > max ? item.value : max),
    0,
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip />
        <Pie
          data={sortedData}
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
          {sortedData.map((entry, index) => (
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
