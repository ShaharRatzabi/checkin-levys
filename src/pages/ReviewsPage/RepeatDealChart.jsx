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
import { TrendingUp, Users, ThumbsUp, ThumbsDown } from "lucide-react";
import "./RepeatDealChart.css";

const COLORS = ["#e8773a", "#c4c4c4"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rdc-tooltip">
        <span className="rdc-tooltip-label">{d.label}</span>
        <span className="rdc-tooltip-value" style={{ color: payload[0].color }}>
          {d.value}%
        </span>
        <span className="rdc-tooltip-count">{d.count} לקוחות</span>
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

  const totalReviews = reviews?.length || 0;
  const yesPercent = data.length > 0 ? data[0].value : 0;

  const chartDescription =
    data.length > 0
      ? `${data[0].value}% מהלקוחות יסגרו שוב דרך Check-In, ${data[1].value}% לא יסגרו שוב, מתוך ${totalReviews} ביקורות`
      : "אין נתונים להצגה";

  return (
    <div className="rdc-wrapper" dir="rtl">
      {/* ═══ Header ═══ */}
      <div className="rdc-header">
        <div className="rdc-header-icon" aria-hidden="true">
          <TrendingUp size={22} />
        </div>
        <div>
          <h2 className="rdc-title">האם תבחרו ב-Check-In שוב?</h2>
          <p className="rdc-subtitle">על סמך {totalReviews} ביקורות מאומתות</p>
        </div>
      </div>

      {/* ═══ Stat Cards ═══ */}
      {data.length > 0 && (
        <div className="rdc-stats-row">
          <div className="rdc-stat-card rdc-stat-positive">
            <div className="rdc-stat-icon" aria-hidden="true">
              <ThumbsUp size={20} />
            </div>
            <div className="rdc-stat-info">
              <span className="rdc-stat-number">{data[0].value}%</span>
              <span className="rdc-stat-label">יחזרו אלינו</span>
            </div>
          </div>
          <div className="rdc-stat-card rdc-stat-neutral">
            <div className="rdc-stat-icon" aria-hidden="true">
              <Users size={20} />
            </div>
            <div className="rdc-stat-info">
              <span className="rdc-stat-number">{totalReviews}</span>
              <span className="rdc-stat-label">סה״כ ביקורות</span>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Chart ═══ */}
      <div
        className="rdc-chart-area"
        role="img"
        aria-label={`גרף עמודות: ${chartDescription}`}
      >
        {/* ✅ טבלה נסתרת לקוראי מסך — חלופה נגישה לגרף */}
        <table className="sr-only">
          <caption>נתוני שביעות רצון לקוחות</caption>
          <thead>
            <tr>
              <th scope="col">תשובה</th>
              <th scope="col">אחוז</th>
              <th scope="col">מספר לקוחות</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.name}>
                <td>{d.label}</td>
                <td>{d.value}%</td>
                <td>{d.count}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            barCategoryGap={40}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(0,0,0,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 15, fill: "#6b7280", fontWeight: 600 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 13, fill: "#9ca3af" }}
              width={45}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(0,0,0,0.03)", radius: 8 }}
            />
            <Bar dataKey="value" radius={[12, 12, 4, 4]} maxBarSize={72}>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ═══ Insight Bar ═══ */}
      {data.length > 0 && (
        <div className="rdc-insight-bar">
          <div
            className="rdc-insight-fill"
            style={{ width: `${yesPercent}%` }}
            aria-hidden="true"
          />
          <div className="rdc-insight-content">
            <div className="rdc-insight-item">
              <ThumbsUp size={14} aria-hidden="true" />
              <span>
                <strong>{data[0].value}%</strong> יסגרו שוב ({data[0].count})
              </span>
            </div>
            <div className="rdc-insight-item rdc-insight-no">
              <ThumbsDown size={14} aria-hidden="true" />
              <span>
                <strong>{data[1].value}%</strong> לא ({data[1].count})
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RepeatDealChart;
