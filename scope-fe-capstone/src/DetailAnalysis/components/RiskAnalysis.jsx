import React, { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { useNavigate } from "react-router-dom";
import "../css/DashboardPage.css";

const DEMO_DATA = [
  {
    title: "주둥이방송 | 라면집 사장님 몰래 촬영 논란",
    cb_score: 13.2,
    ec_score: 78,
    date: "2025-09-10",
    video_url: "https://www.youtube.com/watch?v=abcd1234",
    thumbnail: "https://img.youtube.com/vi/abcd1234/0.jpg",
  },
  {
    title: "주둥이방송 | 화제의 삼겹살 리뷰 (댓글 전쟁🔥)",
    cb_score: 11.5,
    ec_score: 65,
    date: "2025-08-23",
    video_url: "https://www.youtube.com/watch?v=wxyz5678",
    thumbnail: "https://img.youtube.com/vi/wxyz5678/0.jpg",
  },
  {
    title: "주둥이방송 | 카페 알바생 사건 해명 영상",
    cb_score: 10.7,
    ec_score: 72,
    date: "2025-09-28",
    video_url: "https://www.youtube.com/watch?v=mnop9012",
    thumbnail: "https://img.youtube.com/vi/mnop9012/0.jpg",
  },
];

const normalizeScore = (score) => Math.min(Math.max(score / 100, 0), 1);
const normalizeCBScore = (score) => Math.min(Math.max(score / 15, 0), 1);
const getRiskColor = (rank) => {
  if (rank === 1) return "#ffd6d6"; // 빨강 톤 (위험)
  if (rank === 2) return "#ffeacc"; // 주황 톤
  return "#fff9db"; // 노랑 톤
};

const RiskAnalysis = ({ id }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setData(DEMO_DATA);
  }, []);

  const cbAvg =
    data.length > 0
      ? (data.reduce((sum, d) => sum + d.cb_score, 0) / data.length).toFixed(2)
      : 0;
  const ecAvg =
    data.length > 0
      ? (data.reduce((sum, d) => sum + d.ec_score, 0) / data.length).toFixed(2)
      : 0;

  return (
    <div className="profile-detail-container">
      <p
        className="profile-analysis-title2"
        style={{ fontFamily: "Paperlogy", fontWeight: "600" }}
      >
        ⚠️ 주둥이방송 — 위험도 상위 3개 영상 (데모)
      </p>

      {/* 상위 3개 평균 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginBottom: "30px",
          transform: "scale(0.7)", 
        }}
      >
        <GaugeChart
          id="cb-avg"
          nrOfLevels={20}
          arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
          colors={["#2ecc71", "#f1c40f", "#e67e22", "#e74c3c", "#8e44ad"]}
          percent={normalizeCBScore(cbAvg)}
          arcPadding={0.02}
          textColor="#000"
          formatTextValue={() => `CB 평균: ${cbAvg}`}
          needleColor="#000"

        />
        <GaugeChart
          id="ec-avg"
          nrOfLevels={20}
          arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
          colors={["#2ecc71", "#f1c40f", "#e67e22", "#e74c3c", "#8e44ad"]}
          percent={normalizeScore(ecAvg)}
          arcPadding={0.02}
          textColor="#000"
          formatTextValue={() => `EC 평균: ${ecAvg}`}
          needleColor="#000"
        />
      </div>

      {/* 카드형 순위 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {data.map((row, idx) => (
          <div
            key={idx}
            onClick={() =>
              navigate(
                `/DetailAnalysis/${id}/riskanalysis/${encodeURIComponent(
                  row.video_url.split("v=")[1]
                )}`
              )
            }
            style={{
              width: "400px",
              backgroundColor: getRiskColor(idx + 1),
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={row.thumbnail}
                alt="thumbnail"
                style={{
                  width: "100%",
                  height: "220px",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  backgroundColor: "#00000099",
                  color: "#fff",
                  padding: "6px 12px",
                  borderRadius: "10px",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                🏆 {idx + 1}위
              </div>
            </div>
            <div
              style={{
                padding: "1rem",
                fontFamily: "Paperlogy",
                lineHeight: "1.5",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  marginBottom: "0.5rem",
                  color: "#2a6ebb",
                  cursor: "pointer",
                }}
              >
                {row.title}
              </h3>
              <p style={{ margin: "0.2rem 0" }}>
                📅 {new Date(row.date).toLocaleDateString("ko-KR")}
              </p>
              <p style={{ margin: "0.2rem 0" }}>💬 CB Score: {row.cb_score}</p>
              <p style={{ margin: "0.2rem 0" }}>🌀 EC Score: {row.ec_score}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 분석 요약 */}
      <div
        className="profile-analysis-box-array"
        style={{ marginTop: "40px", width: "90%", marginLeft: "auto", marginRight: "auto" }}
      >
        <div
          style={{
            width: "100%",
            backgroundColor: "#fff",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #ddd",
            fontFamily: "Paperlogy",
            lineHeight: "1.6",
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>📊 위험 요약 (데모)</h3>
          <p>
            주둥이방송의 상위 3개 영상은 CB 평균 <b>{cbAvg}</b>, EC 평균{" "}
            <b>{ecAvg}</b>로 나타났습니다.
          </p>
          <p>
            특히 1위 영상(“라면집 사장님 몰래 촬영 논란”)은 댓글 내 공격성
            및 논란 키워드 출현 비율이 높았습니다.
          </p>
          <p>
            EC Score가 높아 특정 의견의 반복 노출, 즉{" "}
            <u>에코 챔버 현상</u>이 감지되었습니다. 향후 콘텐츠 기획 시{" "}
            <b>감정 완화형 표현</b>과 <b>댓글 관리</b> 전략이 필요합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
