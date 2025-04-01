import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ProfileDetailAnalysis.css";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts";

function ProfileDetailAnalysis() {
  //const navigate = useNavigate();
  // 팔로워 서포트 비율 데이터

  const totalFollowers = 104000; // 전체 팔로워 수 (10.4만 명)
  const validSupporters = 32000; // 유효 팔로워 수 (3.2만 명)
  const percentage = ((validSupporters / totalFollowers) * 100).toFixed(1); // 백분율 계산

  // 차트 데이터
  const data = [
    { name: "유효 팔로워", value: validSupporters },
    { name: "기타 팔로워", value: totalFollowers - validSupporters },
  ];
  const COLORS = ["#9166ff", "#e5e5e5"]; // 보라색, 회색

  // 팔로워 서포트 비교 (유사 막대 그래프)
  const followerComparisonData = [
    { name: "우리 그룹", value: 3200 },
    { name: "다른 그룹", value: 3100 },
  ];

  // 팔로워 평균 다운로드 수 (막대그래프 + 평균선)
  const downloadData = [
    { day: "월", value: 1.8 },
    { day: "화", value: 2.3 },
    { day: "수", value: 1.9 },
    { day: "목", value: 2.7 },
    { day: "금", value: 2.5 },
    { day: "토", value: 2.9 },
    { day: "일", value: 2.1 },
  ];
  const average = 2.1; // 평균값

  return (
    <div className="profile-detail-root-container">
      <div className="profile-detail-container">
        <div className="profile-analysis-title">
          인플루언서 분석
        </div>
        <div className="grayLine" style={{ marginTop: "20px", marginBottom: "20px" }}></div>

        <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
          <div className="profile-analysis-box">
            <p className="profile-analysis-sub-title">
              예상 팔로워 서포트 비율
            </p>

            {/* 설명 */}
            <div>
              <div>
                <span style={{ width: "12px", height: "12px", background: "#9166ff", borderRadius: "50%", display: "inline-block" }}></span>
                <span className="profile-analysis-text">예상 유효 팔로워 서포트 수</span>
                <strong style={{ color: "#000", fontSize: "14px" }}>3.2만 명</strong>
              </div>
              <div>
                <span style={{ width: "12px", height: "12px", background: "#e5e5e5", borderRadius: "50%", display: "inline-block" }}></span>
                <span style={{ fontSize: "14px", color: "#666" }}>팔로워 수</span>
                <strong style={{ color: "#666", fontSize: "14px" }}>10.4만 명</strong>
              </div>
            </div>

            {/* 도넛형 차트 */}
            <PieChart width={200} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60} // 도넛 형태
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>

              {/* 중앙에 % 표시 */}
              <foreignObject x="50" y="50" width="100" height="100">
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", fontSize: "16px", fontWeight: "bold", color: "#333" }}>
                  {percentage}%
                </div>
              </foreignObject>
            </PieChart>

            <p style={{ fontSize: "14px", color: "#555", marginTop: "8px" }}>팔로워 대비 팔로워 서포트</p>
          </div>

          {/* 팔로워 서포트 비교 */}
          <div className="chart-section">
            <h3>팔로워 서포트 비교</h3>
            <BarChart width={300} height={200} data={followerComparisonData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#9166ff" radius={[10, 10, 0, 0]} />
            </BarChart>
          </div>

          {/* 팔로워 평균 다운로드 수 */}
          <div className="chart-section">
            <h3>팔로워 평균 다운로드 수</h3>
            <BarChart width={400} height={200} data={downloadData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#d9d9d9" />
              {/* 평균값을 가로선으로 표시 */}
              <Line type="monotone" dataKey={() => average} stroke="#9166ff" strokeWidth={2} dot={false} />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailAnalysis;
