import React, { useMemo } from "react";
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
import { TrendingUp } from "lucide-react";
import "./RepeatDealChart.css";

const COLORS = ["#10b981", "#ef4444"]; // ירוק / אדום

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{d.label}</p>
        <p className="tooltip-value" style={{ color: payload[0].color }}>
          {d.value}%
        </p>
      </div>
    );
  }
  return null;
};

function RepeatDealChart({ reviews }) {
  const data = useMemo(() => {
    if (!reviews || reviews.length === 0) return [];

    const total = reviews.length;
    const yesCount = reviews.filter((r) => r.will_book_again === "yes").length;
    const noCount = total - yesCount;

    return [
      {
        name: "כן",
        value: Math.round((yesCount / total) * 100),
        label: "יסגרו שוב",
        count: yesCount,
      },
      {
        name: "לא",
        value: Math.round((noCount / total) * 100),
        label: "לא יסגרו שוב",
        count: noCount,
      },
    ];
  }, [reviews]);

  return (
    <div className="repeat-deal-chart" dir="rtl">
      <div className="chart-header">
        <div className="chart-header-title">
          <TrendingUp className="icon" />
          <h2>האם תבחרו ב Check-In שוב לחופשה הבאה?</h2>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            barCategoryGap={16}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, fill: "#6b7280", fontWeight: 500 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={80}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {data.length > 0 && (
        <div className="chart-insights">
          <div className="insight-item positive">
            <span className="dot" style={{ backgroundColor: COLORS[0] }} />
            <span>
              <strong>{data[0].value}%</strong> מהלקוחות צפויים לחזור (
              {data[0].count})
            </span>
          </div>
          <div className="insight-item negative">
            <span className="dot" style={{ backgroundColor: COLORS[1] }} />
            <span>
              <strong>{data[1].value}%</strong> לא צפויים לחזור ({data[1].count}
              )
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RepeatDealChart;
