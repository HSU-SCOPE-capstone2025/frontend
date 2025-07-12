// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import GaugeChart from "react-gauge-chart";
import { useLocation } from "react-router-dom";
import "./../css/DashboardPage.css";

const API_BASE = "http://3.34.90.217:5000/api";

const normalizeScore = (score) => Math.min(Math.max(score / 100, 0), 1);
const normalizeCBScore = (score) => Math.min(Math.max(score / 15, 0), 1);
const getRiskLevelColor = (cbScore) => {
  if (cbScore <= 3) return "#e0f7e9";
  if (cbScore <= 6) return "#fff9db";
  if (cbScore <= 9) return "#ffeacc";
  if (cbScore <= 12) return "#ffd6d6";
  return "#f3d1ff";
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DashboardPage = ({ id }) => {
  const [data, setData] = useState([]);
  const [avgData, setAvgData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(true); // 테이블 토글 상태
  // const query = useQuery();
  // const initialInfluencer = query.get("influencer_name") || "";
  // const [selectedInfluencer, setSelectedInfluencer] = useState(initialInfluencer);
  const idToNameMap = {
    hee__bab: "히밥",
    hugbears: "달달투어",
    minsco_: "민스코",
    enjoycouple: "엔조이커플",
    yooxicman: "육식맨",
    very_simplecooking: "자취요리신",
    yellow_aquarium: "해수인",
    fundamental_kr: "뻔더",
    yonamism: "취미로 요리하는 남자",
    hxxax_: "혜안",

    mejooandcats: "김메주와 고양이들",
    under_world_b1: "언더월드",
    bboyongnyong: "뽀용뇽",
    cherry__0705: "지한",
    "baby_pig.rabbit": "돼끼",
    __ralral__: "랄랄",
    salim_nam_official: "살림남",
    ipduck_official: "입시덕후",
    chimchakman_official: "침착맨",
    trytoeat222: "먹어볼래TryToEat",

    tikitakabooboo: "인생 녹음 중",
    horseking123: "말왕",
    instawakgood: "우왁굳",
    dudely_08: "더들리",
    jeon_unni_: "젼언니",
    g_movie__: "지무비",
    jesusujeo: "은수저",
    esther__park: "박에스더",
    minsajang_: "요리하는 민사장",
    joodoong_e: "주둥이방송",
  };

  const mappedName = idToNameMap[id] || "";
  const [selectedInfluencer, setSelectedInfluencer] = useState(mappedName);

  const [selectedRow, setSelectedRow] = useState(null); // 선택된 행 인덱스 저장
  const [chatResponse, setChatResponse] = useState(""); // 응답 텍스트용 state
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedInfluencer]);

  const sendChatQuery = async (rowData, purpose) => {
    setIsGenerating(true); // 시작 시 true
    setChatResponse("");   // 이전 결과 초기화

    try {
      // v= 뒤 해시값만 추출
      const videoId = new URL(rowData.video_url).searchParams.get("v");

      const query = `"${rowData.influencer_name}"의 영상(${videoId})에 대한 negative 댓글 [${purpose}] CB: ${rowData.cb_score}, EC: ${rowData.ec_score}`;

      const response = await axios.post("http://3.34.90.217:5000/chat", {
        query: query,
        gpt: true
      });

      const resultText = response.data.gpt_summary + response.data.result;
      setChatResponse(`[${purpose}] 완료됨:\n` + resultText);
    } catch (err) {
      console.error("POST 실패:", err);
      setChatResponse("❌ 요청 중 오류가 발생했습니다.");
    } finally {
      setIsGenerating(false); // 완료 시 false
    }
  };


  const fetchData = async () => {
    setLoading(true);
    try {
      const riskUrl = selectedInfluencer
        ? `${API_BASE}/youtube-risk?influencer_name=${encodeURIComponent(selectedInfluencer)}`
        : `${API_BASE}/youtube-risk`;

      const avgUrl = selectedInfluencer
        ? `${API_BASE}/youtube-risk-avg?influencer_name=${encodeURIComponent(selectedInfluencer)}`
        : `${API_BASE}/youtube-risk-avg`;

      const [riskRes, avgRes] = await Promise.all([
        axios.get(riskUrl),
        axios.get(avgUrl),
      ]);

      setData(riskRes.data);
      setAvgData(avgRes.data);
    } catch (err) {
      console.error("데이터 로드 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="profile-detail-container">
        <p id="scopeScore" className="profile-analysis-title2" style={{ fontFamily: "Paperlogy", fontWeight: "600" }}>
          📊 유튜브 리스크 대시보드
        </p>
        <p className="profile-analysis-title3" style={{ lineHeight: "1.6" }}>
          <strong>CB (Cyberbullying Score)</strong>: 영상에 달린 댓글 중 공격성, 혐오, 비난, 조롱 등의
          <strong> 사이버불링 관련 표현</strong>의 밀도를 수치화한 지표입니다. <br />점수가 높을수록
          <b> 악성 댓글의 비율이 높음</b>을 의미합니다.<br /><br />
          <strong>EC (Echo Chamber Score)</strong>: 특정한 의견이 <u>동질적인 댓글</u>
          을 통해 반복적으로 증폭되는 경향을 측정한 지표입니다.<br />
          점수가 높을수록 <b>의견 다양성이 부족하고 편향된 반응</b>이 나타납니다.
        </p>

        {/* <input
        type="text"
        placeholder="인플루언서 이름으로 검색"
        value={selectedInfluencer}
        onChange={(e) => setSelectedInfluencer(e.target.value)}
        style={{ padding: "0.5rem", width: "300px", marginBottom: "1.5rem" }}
      /> */}

        {loading ? (
          <p>데이터 로딩 중...</p>
        ) : (
          <>

            <p className="profile-analysis-title2" style={{ fontFamily: "Paperlogy", fontWeight: "600" }}>
              🔥 평균 리스크 점수
            </p>
            <p className="profile-analysis-title3" style={{ lineHeight: "1.6" }}>
              각 인플루언서의 <strong>평균 리스크 점수</strong>는 개별 영상들의 리스크 분석 결과를 기반으로 도출된 종합 지표입니다.<br />
              아래의 게이지 차트는 각각 <strong>CB (사이버불링)</strong> 및 <strong>EC (에코 챔버)</strong> 점수의 평균값을 시각화한 것입니다.<br />
              색상은 리스크 수준을 다음과 같이 구분합니다:
            </p>

            <p className="profile-analysis-title3" style={{ listStyle: "square", lineHeight: "1.0" }}>
              <p><span style={{ color: "#2ecc71", fontWeight: "600" }}>● <span style={{ marginLeft: "10px" }}>매우 낮음</span></span> (안전한 수준)</p>
              <p><span style={{ color: "#f1c40f", fontWeight: "600" }}>● <span style={{ marginLeft: "10px" }}>낮음</span></span> (주의 필요)</p>
              <p><span style={{ color: "#e67e22", fontWeight: "600" }}>● <span style={{ marginLeft: "10px" }}>보통</span></span> (부분 위험 존재)</p>
              <p><span style={{ color: "#e74c3c", fontWeight: "600" }}>● <span style={{ marginLeft: "10px" }}>높음</span></span> (경고 수준)</p>
              <p><span style={{ color: "#8e44ad", fontWeight: "600" }}>● <span style={{ marginLeft: "10px" }}>매우 높음</span></span> (심각한 리스크)</p>
            </p>

            <p className="profile-analysis-title3">
              이 점수는 향후 콘텐츠 관리 및 커뮤니티 대응 전략 수립에 유용한 참고자료로 활용될 수 있습니다.
            </p>

            <div className="profile-analysis-box-array">
              {avgData.length === 0 ? (
                <p>검색된 평균 데이터가 없습니다.</p>
              ) : (
                avgData.map((row, idx) => (
                  <div style={{ width: "900px" }}>
                    <div key={idx} style={{ textAlign: "center" }}>
                      {/* <p className="profile-analysis-title2" style={{ margin: "0" }}>
                        {row.influencer_name}</p> */}
                      <div style={{ display: "flex", gap: "100px" }}>
                        <GaugeChart
                          id={`cb-gauge-${idx}`}
                          nrOfLevels={20}
                          arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                          colors={["#2ecc71", "#f1c40f", "#e67e22", "#e74c3c", "#8e44ad"]}
                          percent={normalizeCBScore(row.avg_cb_score)}
                          arcPadding={0.02}
                          textColor="#000"
                          formatTextValue={() => `CB: ${row.avg_cb_score}`}
                          needleColor="#000"
                        />
                        <GaugeChart
                          id={`ec-gauge-${idx}`}
                          nrOfLevels={20}
                          arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                          colors={["#2ecc71", "#f1c40f", "#e67e22", "#e74c3c", "#8e44ad"]}
                          percent={normalizeScore(row.avg_ec_score)}
                          arcPadding={0.02}
                          textColor="#000"
                          formatTextValue={() => `EC: ${row.avg_ec_score}`}
                          needleColor="#000"
                        />
                      </ div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <p className="profile-analysis-title2" style={{ fontFamily: "Paperlogy", fontWeight: "600", cursor: "pointer", marginLeft: "75px" }} onClick={() => setShowTable(!showTable)}>
              📺 영상별 리스크 {showTable ? "🔽" : "▶"}
            </p>
            <p className="profile-analysis-title3" style={{ marginLeft: "-105px", lineHeight: "1.6" }}>
              각 영상에 대한 리스크 점수를 분석한 표입니다. 행의 배경색은 해당 영상의 리스크 수준을 시각적으로 나타냅니다.
              <br />
              좌측의 체크박스를 선택한 후 아래 버튼을 클릭하면,
              SCOPE AI가 해당 영상의 리스크 점수를 정밀 분석하고
              이에 따른 <strong>적절한 대응 방안</strong>을 제공합니다.
            </p>

            <div className="profile-analysis-box-array">
              {showTable && (
                <div
                  style={{
                    width: "1550px",
                    //border: "1px solid #888", // 표 바깥 테두리
                    //borderRadius: "16px", // 둥글게
                    overflow: "hidden", // 둥근 모서리 유지
                    fontFamily: "Paperlogy"
                  }}
                >
                  <table
                    border="1"
                    cellPadding="10"
                    style={{
                      width: "100%",
                      borderCollapse: "collapse"
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#ffffff" }}>
                        <th></th> {/* 체크박스 열 */}
                        <th>인플루언서</th>
                        <th>제목</th>
                        <th>날짜</th>
                        <th>CB Score</th>
                        <th>EC Score</th>
                        <th>url</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length === 0 ? (
                        <tr>
                          <td colSpan="7" style={{ textAlign: "center" }}>데이터가 없습니다.</td>
                        </tr>
                      ) : (
                        data.map((row, idx) => (
                          <tr
                            key={idx}
                            style={{
                              backgroundColor: getRiskLevelColor(row.cb_score),
                              transition: "background-color 0.3s"
                            }}
                          >
                            <td style={{ textAlign: "center" }}>
                              <input
                                type="radio"
                                name="selectedRow"
                                checked={selectedRow === idx}
                                onChange={() => setSelectedRow(idx)}
                                style={{
                                  width: "18px",
                                  height: "18px",
                                  accentColor: "#4a90e2",
                                  cursor: "pointer"
                                }}
                              />
                            </td>
                            <td>{row.influencer_name}</td>
                            <td>
                              <a
                                href={row.video_url}
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "#2a6ebb", textDecoration: "none" }}
                              >
                                {row.title}
                              </a>
                            </td>
                            <td>{row.date}</td>
                            <td>{row.cb_score}</td>
                            <td>{row.ec_score}</td>
                            <td>{row.video_url}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </>
        )}

        <div className="profile-analysis-box-array">
          <button
            className="riskButton report"
            onClick={() => {
              if (selectedRow == null) {
                alert("먼저 테이블에서 항목을 선택하세요.");
                return;
              }
              sendChatQuery(data[selectedRow], "리포트 생성");
            }}
          >
            🔍 리포트 생성
          </button>

          <button
            className="riskButton response"
            onClick={() => {
              if (selectedRow == null) {
                alert("먼저 테이블에서 항목을 선택하세요.");
                return;
              }
              sendChatQuery(data[selectedRow], "대처방안 생성");
            }}
          >
            💡 대처방안 생성
          </button>

          <button
            className="riskButton opposite"
            onClick={() => {
              if (selectedRow == null) {
                alert("먼저 테이블에서 항목을 선택하세요.");
                return;
              }
              sendChatQuery(data[selectedRow], "반대관점 콘텐츠 제안");
            }}
          >
            🔁 반대관점 콘텐츠 제안
          </button>
        </div>

        <p className="profile-analysis-title2" style={{ fontFamily: "Paperlogy", fontWeight: "600", cursor: "pointer", marginLeft: "75px", marginTop: "30px" }} onClick={() => setShowTable(!showTable)}>
          영상별 인사이트 리포트
        </p>
        <p className="profile-analysis-title3" style={{ marginLeft: "-105px", lineHeight: "1.6" }}>
          표에서 영상을 선택후 버튼을 누르시면 실시간으로 SCOPE AI가 각 카테고리에 맞게 리포트를 생성합니다.
        </p>

        {isGenerating && (
          <div className="profile-analysis-box-array">
            <div
              style={{
                width: "1520px",
                marginTop: "0.5rem",
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontFamily: "Paperlogy",
                fontWeight: "500",
                fontSize: "18px",
                lineHeight: "1.6"
              }}
            >
              <span>⏳ SCOPE AI가 리포트를 생성 중입니다...</span>
              <span className="loading-spinner"></span>
            </div>
          </div>
        )}

        {chatResponse && !isGenerating && (
          <div className="profile-analysis-box-array">
            <div
              style={{
                width: "1520px",
                marginTop: "0.5rem",
                whiteSpace: "pre-wrap",
                backgroundColor: "#fff",
                padding: "1rem",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontFamily: "Paperlogy",
                fontWeight: "400",
                fontSize: "18px",
                lineHeight: "1.6"
              }}
            >
              {chatResponse}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;