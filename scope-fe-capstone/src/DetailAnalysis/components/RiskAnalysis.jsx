import React, { useEffect, useState } from "react";
import "../css/DashboardPage.css";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

import annotationPlugin from "chartjs-plugin-annotation";
ChartJS.register(annotationPlugin);

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const getRiskColor = (rank) => {
  if (rank === 1) return "#ffd6d6";
  if (rank === 2) return "#ffeacc";
  return "#fff9db";
};

const RiskAnalysis = ({ id }) => {
  const [data, setData] = useState([]);
  const [influencerName, setInfluencerName] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------
  // ① 인플루언서 이름 매핑 + JSON 로드
  // --------------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("[STEP1] id:", id);

        const mapRes = await fetch("/data/influencer_map.json");
        console.log("[STEP2] mapRes status:", mapRes.status);

        const map = await mapRes.json();
        console.log("[STEP3] map keys:", Object.keys(map).slice(0, 5));

        const normalizedId = id.startsWith("@") ? id.slice(1) : id;
        console.log("[STEP4] normalizedId:", normalizedId);

        const name = map[normalizedId];
        console.log("[STEP5] name:", name);

        if (!name) {
          console.error(`❌ influencer_map.json에 '${normalizedId}' 키가 없습니다.`);
          setLoading(false);
          return;
        }

        setInfluencerName(name);

        const res = await fetch(`/data/results_by_influencer/${name}.json`);
        console.log("[STEP6] result file:", `/data/results_by_influencer/${name}.json`);
        console.log("[STEP7] res status:", res.status);

        const json = await res.json();
        console.log("[STEP8] json length:", json.length);

        const formatted = json.map((v) => ({
          title: v.title,
          cb_score: (v.avg_cb_score * 15).toFixed(2),
          video_url: v.video_url,
          risk_zone: v.risk_zone,
          spike_dates: v.spike_dates,
          high_risk_dates: v.high_risk_dates,
          cb_score_trend: v.cb_score_trend,
          emotion_ratio: v.emotion_ratio,
          topic_ratio: v.topic_ratio,
          cluster_ratio: v.cluster_ratio,
          tfidf_keywords: v.tfidf_keywords,
          freq_keywords: v.freq_keywords,
          summary: v.summary,
          aggressive_comments: v.aggressive_comments,
          thumbnail: `https://img.youtube.com/vi/${v.video_url.split("v=")[1]}/0.jpg`,
        }));

        setData(formatted);
      } catch (err) {
        console.error("❌ 데이터 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);




  if (loading) return <p>⏳ 로딩 중...</p>;
  if (!influencerName) return <p>❌ 인플루언서 이름 매칭 실패</p>;

  const cbAvg =
    data.length > 0
      ? (data.reduce((sum, d) => sum + parseFloat(d.cb_score), 0) / data.length).toFixed(2)
      : 0;

  // --------------------------
  // ② 상세 분석 렌더링
  // --------------------------
  const renderDetail = (video) => {
    if (!video) return null;

    return (
      <div
        style={{
          marginTop: "40px",
          padding: "2rem",
          background: "#fff",
          borderRadius: "16px",
          border: "1px solid #ddd",
          fontFamily: "Paperlogy",
          lineHeight: "1.7",
        }}
      >
        {/* 🎬 유튜브 임베드 */}
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${video.video_url.split("v=")[1]}`}
          title={video.title}
          allowFullScreen
          style={{ borderRadius: "12px" }}
        />

        <h2 style={{ marginTop: "1.5rem" }}>{video.title}</h2>
        <p>
          📅 리스크 구간:{" "}
          <b>
            {video.risk_zone?.start_date} ~ {video.risk_zone?.end_date}
          </b>
        </p>
        <p>📈 급등일: {video.spike_dates.join(", ") || "없음"}</p>
        <p>⚠️ 고위험일: {video.high_risk_dates.join(", ") || "없음"}</p>
        <hr />


        {/* 📈 CB Score 시계열 */}
        <div style={{ marginTop: "2rem" }}>
          <h4>📈 CB Score 추이</h4>

          {Array.isArray(video.cb_score_trend) && video.cb_score_trend.length > 0 ? (() => {
            // ① 데이터 가공
            const labels = video.cb_score_trend.map(p => p.date.split("T")[0]);
            const values = video.cb_score_trend.map(p => p.cb_score * 15);
            const avg = values.reduce((a, b) => a + b, 0) / values.length;

            // ② 급등일 & 고위험일 & 리스크구간 처리
            const spikeSet = new Set(video.spike_dates.map(d => d.split("T")[0]));
            const highRiskSet = new Set(video.high_risk_dates.map(d => d.split("T")[0]));

            const zoneStart = video.risk_zone?.start_date?.split("T")[0];
            const zoneEnd = video.risk_zone?.end_date?.split("T")[0];
            const zoneStartIdx = labels.findIndex(d => d === zoneStart);
            const zoneEndIdx = labels.findIndex(d => d === zoneEnd);

            return (
              <>
                <Line
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "CB Score",
                        data: values,
                        borderColor: "steelblue",
                        backgroundColor: "rgba(70,130,180,0.2)",
                        tension: 0.3,
                        pointRadius: 5,
                        pointBackgroundColor: labels.map(d =>
                          spikeSet.has(d)
                            ? "#ff4d4f" // 빨강 (급등일)
                            : highRiskSet.has(d)
                              ? "#fa8c16" // 주황 (고위험일)
                              : "steelblue"
                        ),
                      },
                      {
                        label: "평균선",
                        data: Array(values.length).fill(avg),
                        borderColor: "gray",
                        borderDash: [5, 5],
                        borderWidth: 1,
                        pointRadius: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top" },
                      tooltip: {
                        mode: "index",
                        callbacks: {
                          label: ctx => {
                            const date = labels[ctx.dataIndex];
                            const tag = spikeSet.has(date)
                              ? " (급등일)"
                              : highRiskSet.has(date)
                                ? " (고위험)"
                                : "";
                            return `CB Score: ${ctx.parsed.y.toFixed(2)}${tag}`;
                          },
                        },
                      },
                      annotation: {
                        annotations:
                          zoneStartIdx >= 0 && zoneEndIdx >= 0
                            ? {
                              riskZone: {
                                type: "box",
                                xMin: labels[zoneStartIdx],
                                xMax: labels[zoneEndIdx],
                                backgroundColor: "rgba(255, 255, 150, 0.25)", // ✅ 연한 노란색
                                borderWidth: 0,
                              },
                            }
                            : {},
                      },
                    },
                    scales: {
                      x: {
                        ticks: { color: "#333" },
                        title: { display: true, text: "날짜" },
                      },
                      y: {
                        min: 0,
                        max: 15,
                        ticks: { color: "#333" },
                        title: { display: true, text: "CB Score (×15)" },
                      },
                    },
                    elements: {
                      line: { borderWidth: 2 },
                    },
                  }}
                />

                {/* 🟨 범례 (Legend) 추가 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "30px",
                    marginTop: "1rem",
                    fontSize: "14px",
                    fontFamily: "Paperlogy",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        background: "#ff4d4f",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span>급등일 (Spike)</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        background: "#fa8c16",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span>고위험일 (High-Risk)</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div
                      style={{
                        width: "18px",
                        height: "14px",
                        background: "rgba(255, 255, 150, 0.6)",
                        border: "1px solid #ccc",
                      }}
                    ></div>
                    <span>분석 구간 (Risk Zone)</span>
                  </div>
                </div>
              </>
            );
          })() : (
            <p>CB Score 데이터 없음</p>
          )}
        </div>



        {/* 📊 감정 / 주제 / 클러스터 */}
        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          {[
            { title: "감정 분포", data: video.emotion_ratio },
            { title: "주제 분포", data: video.topic_ratio },
            { title: "클러스터 분포", data: video.cluster_ratio },
          ].map((section, i) => (
            <div key={i} style={{ flex: 1 }}>
              <h4>📊 {section.title}</h4>
              {section.data ? (
                Object.entries(section.data).map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      // 클러스터만 gap 80으로, 나머지는 30
                      gap: section.title === "클러스터 분포" ? "80px" : "30px",
                      margin: "3px 0",
                    }}
                  >
                    <div style={{ width: "80px" }}>{k}</div>
                    <div
                      style={{
                        height: "10px",
                        width: `${v * 200}px`,
                        background: "#74b9ff",
                        borderRadius: "4px",
                      }}
                    />
                    <span>{(v * 100).toFixed(1)}%</span>
                  </div>
                ))
              ) : (
                <p>데이터 없음</p>
              )}
            </div>
          ))}

        </div>

        {/* 💬 키워드 */}
        <div style={{ marginTop: "2rem" }}>
          <h4>💡 주요 키워드 (TF-IDF)</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {video.tfidf_keywords.map((kw, i) => (
              <span
                key={i}
                style={{
                  background: "#e6f7ff",
                  padding: "5px 10px",
                  borderRadius: "12px",
                  fontSize: "14px",
                }}
              >
                {kw}
              </span>
            ))}
          </div>

          <h4 style={{ marginTop: "1rem" }}>🔥 단순 빈도 기반 키워드</h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {video.freq_keywords.map((kw, i) => (
              <span
                key={i}
                style={{
                  background: "#fff1b8",
                  padding: "5px 10px",
                  borderRadius: "12px",
                  fontSize: "14px",
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* 🗣 원본 댓글 */}
        <div style={{ marginTop: "2rem" }}>
          <h4>🗣 원본 댓글 ({video.aggressive_comments.length}개)</h4>
          <div
            style={{
              background: "#fafafa",
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #eee",
              maxHeight: "300px",
              overflowY: "scroll",
            }}
          >
            {video.aggressive_comments.length > 0 ? (
              video.aggressive_comments.map((c, idx) => (
                <p key={idx} style={{ fontSize: "14px", marginBottom: "0.6rem" }}>
                  <b>[{c.date.split("T")[0]}]</b> ({c.emotion}/{c.topic}) — {c.text}
                </p>
              ))
            ) : (
              <p>관련 댓글 없음</p>
            )}
          </div>
        </div>

        <hr />
        <p style={{ marginTop: "1rem" }}>📋 {video.summary}</p>
      </div>
    );
  };

  // --------------------------
  // ③ 메인 렌더링 (Top3 + 상세)
  // --------------------------
  return (
    <div className="profile-detail-container">
      <p
        className="profile-analysis-title2"
        style={{ fontFamily: "Paperlogy", fontWeight: "600" }}
      >
        ⚠️ {influencerName} — 위험도 상위 3개 영상
      </p>

      {/* Top3 카드 */}
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
            onClick={() => setSelectedVideo(row)} // 클릭 시 상세 표시
            style={{
              width: "400px",
              backgroundColor: getRiskColor(idx + 1),
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              cursor: "pointer",
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
            <div style={{ padding: "1rem", fontFamily: "Paperlogy" }}>
              <h3
                style={{
                  fontSize: "18px",
                  marginBottom: "0.5rem",
                  color: "#2a6ebb",
                }}
              >
                {row.title}
              </h3>
              <p style={{ margin: "0.2rem 0" }}>💬 평균 CB Score: {row.cb_score}</p>
              <p style={{ margin: "0.2rem 0" }}>📈 급등일: {row.spike_dates.join(", ")}</p>
              <p style={{ margin: "0.2rem 0" }}>⚠️ 고위험일: {row.high_risk_dates.join(", ")}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 상세 분석 렌더링 */}


      {selectedVideo && renderDetail(selectedVideo)}
    </div>
  );
};

export default RiskAnalysis;
