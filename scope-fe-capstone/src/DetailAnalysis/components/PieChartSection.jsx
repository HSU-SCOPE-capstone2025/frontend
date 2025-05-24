import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../css/AccountContent.css";

const renderTendencyLabel = (props) => {
  const { cx, cy, outerRadius, midAngle, name, percent, labelMap } = props;

  if (percent * 100 <= 0) return null; // 1% 미만 숨기기

  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 40; // line과 label의 간격격
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const isLeft = x < cx;

  // labelMap에서 줄바꿈 문자 포함된 텍스트 가져오기
  const labelText = (labelMap && labelMap[name]) || name;
  const lines = labelText.split('\n');

  return (
    <text
      x={x}
      y={y}
      textAnchor={isLeft ? "end" : "start"}
      dominantBaseline="central"
      className="pie-label-text"
    >
      {lines.map((line, index) => (
        <tspan key={index} x={x} dy={index === 0 ? 0 : 22}>
          {line}
        </tspan>
      ))}
      <tspan x={x} dy={22}>
        {` ${(percent * 100).toFixed(0)}%`}
      </tspan>
    </text>
  );
};

const PieChartSection = ({ title, data, colorMap, labelMap }) => {
  return (
    <div style={{ width: "600px", maxWidth: 600, margin: "1rem auto" }} >
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={160}
            // 2퍼센트 이하는 라벨이랑 선이 안나옴
            label={(props) =>
              props.percent * 100 <= 2 ? null : renderTendencyLabel({ ...props, labelMap })
            }
            labelLine={(props) => (props.percent * 100 <= 2 ? null : (
              <path
                d={`M${props.points[0].x},${props.points[0].y} L${props.points[1].x},${props.points[1].y}`}
                stroke="#2B2F33"
                strokeWidth={2}
                fill="none"
              />
            ))}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colorMap?.[entry.name] || "#ccc"}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) =>
              [`${value}%`, labelMap?.[name] || name]
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartSection;