import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, Label } from "recharts";

const COLORS = ["#0071E3", "#D9D9D9"];

const PlatformPieChart = ({ platform, data }) => {
    let totalFollowers = 0;
    let highScopeCount = 0;

    switch (platform) {
        case "instagram":
            totalFollowers = data.instaFollowers;
            highScopeCount = data.instaHighScopeCount;
            break;
        case "youtube":
            totalFollowers = data.youFollowers;
            highScopeCount = data.youHighScopeCount;
            break;
        case "tiktok":
            totalFollowers = data.tikFollowers;
            highScopeCount = data.tikHighScopeCount;
            break;
        default:
            break;
    }

    const chartData = [
        { name: "핵심 지지층", value: highScopeCount },
        { name: "기타 팔로워", value: totalFollowers - highScopeCount },
    ];

    const percentage = ((highScopeCount / totalFollowers) * 100).toFixed(1);

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
                    <span className="profile-analysis-text" style={{ marginLeft: "15px" }}>예상 유효 팔로워 서포트 수</span>
                    <span className="profile-analysis-text" style={{ marginLeft: "40px" }}>{formatToMan(highScopeCount)}</span>
                </div>
                <div style={{ marginTop: "8px" }}>
                    <span style={{ width: "12px", height: "12px", background: "#d9d9d9", borderRadius: "50%", display: "inline-block" }}></span>
                    <span className="profile-analysis-text" style={{ marginLeft: "15px" }}>팔로워 수</span>
                    <span className="profile-analysis-text" style={{ marginLeft: "145px" }}>{formatToMan(totalFollowers)}</span>
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
