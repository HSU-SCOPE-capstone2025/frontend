import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from "recharts";

const COLORS = ["#0071E3", "#D9D9D9"];

const PlatformPieChart = ({ platform, data }) => {
    let highFssRatio = 0;

    switch (platform) {
        case "youtube":
            highFssRatio = data.youHighFssRatio;
            break;
        case "instagram":
            highFssRatio = data.instaHighFssRatio;
            break;
        case "tiktok":
            highFssRatio = data.tikHighFssRatio;
            break;
        default:
            break;
    }

    const chartData = [
        { name: "핵심 지지층", value: highFssRatio },
        { name: "비핵심 지지층", value: 1 - highFssRatio },
    ];

    const percentage = ((highFssRatio) * 100).toFixed(1);

    const formatToMan = (num) => (num / 10000).toFixed(1) + "만 명";

    return (
        <div style={{ textAlign: "center" }}>
            <p className="profile-analysis-sub-title">
                {platform} 예상 팔로워 서포트 비율
            </p>

            {/* 여기에 범례 블록 추가 */}
            <div style={{ marginTop: "1rem", textAlign: "left", display: "inline-block" }}>
                <div>
                    <span style={{ width: "12px", height: "12px", background: "#0071E3", borderRadius: "50%", display: "inline-block" }}></span>
                    <span className="profile-analysis-text" style={{ marginLeft: "15px" }}>핵심 지지층</span>
                </div>
                <div style={{ marginTop: "8px" }}>
                    <span style={{ width: "12px", height: "12px", background: "#d9d9d9", borderRadius: "50%", display: "inline-block" }}></span>
                    <span className="profile-analysis-text" style={{ marginLeft: "15px" }}>비핵심 지지층</span>
                </div>
            </div>

            <PieChart width={300} height={300}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                    <Label
                        value={`${percentage}%`}
                        position="center"
                        fill="#0071E3"
                        style={{ fontSize: "20px", fontWeight: "bold" }}
                    />
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </div>
    );
};

export default PlatformPieChart;
