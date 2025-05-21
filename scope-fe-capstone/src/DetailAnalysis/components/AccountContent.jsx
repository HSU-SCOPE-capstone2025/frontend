import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/AccountContent.css";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ReferenceLine, LineChart, Legend } from "recharts";
import influencerAccountData from "../../data/influencerAccountData.js";
import PlatformPieChart from "./PlatformPieChart.jsx";
// import { fetchAccountData } from "../../api/DetailApi.js";

const TENDENCY_DATA = [
  { name: "지지적", value: 30, emoji: "🥰", color: "#E2FFD1" },
  { name: "중립적 정보제공형", value: 20, emoji: "🧑‍🏫", color: "#E3E3E3" },
  { name: "공격적", value: 5, emoji: "😡", color: "#FFD7D7" },
  { name: "쾌활함", value: 15, emoji: "😄", color: "#FFFCC7" },
  { name: "분석적", value: 10, emoji: "🧐", color: "#D9DEFF" },
  { name: "스팸", value: 10, emoji: "🚫", color: "#EED1FF" },
  { name: "공감하는", value: 10, emoji: "🥺", color: "#FFE8C0" },
];

const TOPIC_DATA = [
  {
    name: "사건/논란", value: 15, color: "#E2FFD1",
    comments: [
      "이런 논란이 또 생기다니...",
      "솔직히 이번 사건은 실망이에요",
    ],
  },
  {
    name: "콘텐츠 평가", value: 10, color: "#CFE7FF",
    comments: [
      "이번 영상 진짜 재밌었어요!",
      "편집이 더 깔끔해졌네요",
    ],
  },
  { name: "유튜버 개인", value: 30, color: "#FFD7D7" },
  { name: "제품/아이템 리뷰", value: 18, color: "#FFFCC7" },
  { name: "사회/시사 이슈", value: 12, color: "#D9DEFF" },
  { name: "공감/감정 공유", value: 5, color: "#EED1FF" },
  { name: "정보/꿀팁", value: 10, color: "#E3E3E3" },
  { name: "유머/드립", value: 5, color: "#E3E3E3" },
  { name: "질문/피드백", value: 10, color: "#E3E3E3" },
  { name: "기타/미분류", value: 5, color: "#E3E3E3" },
];

const EMOTION_DATA = [
  { name: "행복", value: 30, color: "#FFD9EC" },
  { name: "슬픔", value: 15, color: "#D1E9FF" },
  { name: "중립", value: 20, color: "#DADADA" },
  { name: "혐오", value: 10, color: "#C0E188" },
  { name: "분노", value: 10, color: "#FFCDBB" },
  { name: "놀람", value: 5, color: "#FFF4B6" },
  { name: "공포", value: 10, color: "#C999ED" },
];

const CENTER_X = 300;
const CENTER_Y = 250;
const MIN_DIAMETER = 80;
const DEFAULT_SCALE = 6;
const MIN_DISTANCE = 5;

const calculateDiameter = (value) => {
  const minArea = 8000; // 5%에 해당하는 최소 면적
  const maxValue = 100;  // 가장 큰 value 기준
  const scaleFactor = Math.sqrt((value / maxValue) * minArea * Math.PI); // 면적 비례
  return Math.max(80, scaleFactor * 2); // 지름으로 변환
};

function checkOverlap(x, y, diameter, placed) {
  for (const item of placed) {
    const dx = item.x - x;
    const dy = item.y - y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = (item.diameter + diameter) / 2 + MIN_DISTANCE;
    if (dist < minDist) return true;
  }
  return false;
}

function placeBubbles() {
  const sortedData = [...TOPIC_DATA].sort((a, b) => a.value - b.value);
  const centerData = sortedData.pop(); // 가장 큰 값 중심에
  const centerDiameter = calculateDiameter(centerData.value);
  const positions = [
    {
      ...centerData,
      x: CENTER_X - centerDiameter / 2,
      y: CENTER_Y - centerDiameter / 2,
      diameter: centerDiameter,
    },
  ];

  const angleStep = (2 * Math.PI) / sortedData.length;
  let angle = 0;
  const baseRadius = centerDiameter / 2 + 80;

  for (let i = 0; i < sortedData.length; i++) {
    const data = sortedData[i];
    const diameter = calculateDiameter(data.value);
    let radius = baseRadius;
    let placed = false;

    // 충돌 없는 위치 찾기
    for (let j = 0; j < 100; j++) {
      const x = CENTER_X + radius * Math.cos(angle) - diameter / 2;
      const y = CENTER_Y + radius * Math.sin(angle) - diameter / 2;

      if (!checkOverlap(x, y, diameter, positions)) {
        positions.push({ ...data, x, y, diameter });
        placed = true;
        break;
      }
      radius += 10; // 한 바퀴 돌면서 점점 더 멀리
    }
    angle += angleStep;

    if (!placed) {
      // 못 놓은 경우: 가장자리에 강제로 배치
      positions.push({
        ...data,
        x: CENTER_X + (baseRadius + 150) * Math.cos(angle) - diameter / 2,
        y: CENTER_Y + (baseRadius + 150) * Math.sin(angle) - diameter / 2,
        diameter,
      });
    }
  }

  return positions;
}

// 렌더링 예시 (React에서 사용)
const positions = placeBubbles();


// 언어 비율 변수
const languageData = [
  { language: "한국어", percent: 68 },
  { language: "영어", percent: 20 },
];
const totalPercent = languageData.reduce((sum, lang) => sum + lang.percent, 0);
const etcPercent = 100 - totalPercent;

const renderCustomLine = (props) => {
  const { points, index } = props;

  // 선의 시작점과 끝점 좌표
  const [start, end] = points;

  return (
    <path
      d={`M${start.x},${start.y}L${end.x},${end.y}`}
      stroke="#2B2F33"        // 원하는 색상
      strokeWidth={2}         // 굵기
      fill="none"
    />
  );
};

const renderOutsideLabel = ({ name, percent, x, y, cx, cy }) => {
  const displayPercent = (percent * 100).toFixed(0);
  if (percent < 0.03) return null;

  // 파이 중심으로부터 어느 쪽에 있는지 계산해서 정렬 방향을 조정
  const isLeft = x < cx;

  return (
    <text
      x={x + (isLeft ? -10 : 10)} // 왼쪽이면 왼쪽으로, 오른쪽이면 오른쪽으로 밀어줌
      y={y}
      textAnchor={isLeft ? "end" : "start"} // 정렬 방향
      dominantBaseline="central"
      className="pie-label-text"
    >
      {name} ({displayPercent}%)
    </text>
  );
};

// 안에 { influencerId } 넣기기
const AccountContent = () => {
  // const { id } = useParams();
  // const [accountData, setAccountData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchAccountData(id);
  //       setAccountData(data);
  //     } catch (error) {
  //       console.error("계정 분석 데이터 불러오기 실패:", error);
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  // if (!accountData) {
  //   return <div>데이터 로딩 중...</div>;
  //}



  const [selectedScopePlatform, setSelectedScopePlatform] = useState("youtube");
  const scopeScoreData = influencerAccountData.platformScores[selectedScopePlatform] || [];
  const average =
    scopeScoreData.length > 0
      ? scopeScoreData.reduce((sum, d) => sum + d.scopeScore, 0) / scopeScoreData.length
      : 0;

  const [selectedTopic, setSelectedTopic] = useState(null);


  const sortedEmotionData = [...TENDENCY_DATA].sort((a, b) => b.value - a.value);

  const top3 = [...TENDENCY_DATA]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  //const navigate = useNavigate();
  // 팔로워 서포트 비율 데이터

  const totalFollowers = 104000; // 전체 팔로워 수 (10.4만 명)
  const validSupporters = 32000; // 유효 팔로워 수 (3.2만 명)
  const percentage = ((validSupporters / totalFollowers) * 100).toFixed(1); // 백분율 계산

  // 차트 데이터
  // const data = [
  //   { name: "유효 팔로워", value: validSupporters, color: "#0071E3" },
  //   { name: "기타 팔로워", value: totalFollowers - validSupporters, color: "#D9D9D9" },
  // ];

  const influencerName = "이사배";
  const influencerSupport = 32000;
  const averageGroupSupport = 21000;
  const maxValue = Math.max(influencerSupport, averageGroupSupport);

  const recentSupportData = [
    { value: 18000 },
    { value: 25000 },
    { value: 20000 },
    { value: 23000 },
    { value: 27000 },
    { value: 19000 },
    { value: 21000 },
  ];
  const averageSupport = recentSupportData.reduce((acc, curr) => acc + curr.value, 0) / recentSupportData.length;

  const subData = [
    { week: "1/16", subscribers: 29500 },
    { week: "1/23", subscribers: 30000 },
    { week: "1/30", subscribers: 28700 },
    { week: "2/6", subscribers: 33000 },
    { week: "2/16", subscribers: 22600 },
  ];

  const viewGrowthRate = 32.5; // 조회 성장률
  const groupAverageGrowthRate = 27.2; // 유사 그룹 평균 성장률

  return (
    <div>
      <div className="profile-detail-container">

        <div className="account-section-nav">
          <a href="#scopeScore" className="account-section-link">SCOPE 점수</a>
          <a href="#engagement" className="account-section-link">인게이지먼트</a>
          <a href="#audience" className="account-section-link">오디언스</a>
        </div>

        <p id="scopeScore" className="profile-analysis-title2">SCOPE 점수</p>
        <p className="profile-analysis-title3">팔로워 댓글을 분석해 핵심 지지층의 규모를 점수로 환산하고, 인플루언서의 핵심 지지층의 영향력과 정도를 분석합니다.<br />
          핵심 지지층이면 인플루언서에게 충성도가 높고, 해당 인플루언서를 지지하는 경향이 높게 나타납니다.<br></br><br></br>
          SCOPE 점수에 더욱 자세히 알고싶다면 이쪽을 클릭하세요</p>

        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box-big">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                SCOPE 점수 변화 그래프
              </p>
              <p className="normal-text">
                이 그래프는 해당 인플루언서 팔로워의 반응이 어떻게 달려졌는지 시각적으로 보여줍니다.<br />
                점수가 상승하면 핵심 지지층의 <span className="blue-text">지지도가 강화</span>되었음을, 하락 시에는 <span className="blue-text">관심 이탈이나 부정적 반응</span>이 증가했음을 의미합니다.
              </p>
              <br />
              <p className="normal-text">SCOPE 점수 변화 그래프</p>

              <div style={{ marginLeft: "1000px" }}>
                <label htmlFor="scope-platform-select" className="normal-text" style={{ fontSize: "16px" }}>플랫폼 선택: </label>
                <select
                  id="scope-platform-select"
                  value={selectedScopePlatform}
                  onChange={(e) => setSelectedScopePlatform(e.target.value)}
                  className="custom-dropdown"
                >
                  <option value="youtube">유튜브</option>
                  <option value="instagram">인스타그램</option>
                  <option value="tiktok">틱톡</option>
                </select>
              </div>

              <div style={{ width: "1200px", height: 300, marginTop: "1rem" }}>
                <ResponsiveContainer>
                  <LineChart data={scopeScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="scopeScore"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      name="SCOPE 점수"
                    />
                    <ReferenceLine
                      y={average}
                      label={{
                        value: `평균 (${average.toFixed(1)})`,
                        position: "insideRight",
                        fill: "#333",
                        fontSize: 12
                      }}
                      stroke="red"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>


            </div>
          </div>
        </div>

        <p id="scopeScore" className="profile-analysis-title2">예상 핵심 지지층 비율</p>
        <p className="profile-analysis-title3">게시물에서 전체 팔로워를 기반으로 하여 SCOPE 점수가 높은 팔로워들의 비율입니다.<br />단순한 팔로워 수가 아닌 ‘실제로 반응하고 지지하는 팬’의 규모를 확인할 수 있으며, 그로인해 인플루언서의 진짜 영향력을 정확히 평가할 수 있습니다.</p>
        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PlatformPieChart platform="youtube" data={influencerAccountData} />
              </div>
            </div>
          </div>

          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PlatformPieChart platform="instagram" data={influencerAccountData} />
              </div>
            </div>
          </div>

          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PlatformPieChart platform="tiktok" data={influencerAccountData} />
              </div>
            </div>
          </div>


        </div>


        <p id="audience" className="profile-analysis-title2">오디언스</p>
        <p className="profile-analysis-title3">해당 인플루언서가 어떤 오디언스와 가장 잘 소통하며, 인플루언서의 메시지가 어떤 범위로 퍼질 수 있는 지 이해하는데 도움을 줍니다.</p>
        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box-big">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                오디언스 주요 성향
              </p>
              <span className="normal-text">
                해당 인플루언서 계정의 주요 오디언스는 댓글에서 주로
                <span style={{ color: "#0071E3" }}> 지지적, 정보 제공형</span> 성향을 보이는 것으로 분석됩니다.
              </span>

              <div style={{ display: "flex", alignItems: "center" }}>
                <PieChart width={600} height={450}>
                  <Pie
                    data={TENDENCY_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    dataKey="value"
                    paddingAngle={0}
                    label={renderOutsideLabel}
                    labelLine={renderCustomLine}
                  >
                    {TENDENCY_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>

                <div style={{ marginLeft: "50px" }}>
                  <p className="account-text-bold">오디언스 주요 성향 정리</p>
                  <ul className="account-text-normal" style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {sortedEmotionData.map((item, index) => {
                      const isTop3 = index < 3;

                      return (
                        <li
                          key={index}
                          style={{
                            marginBottom: '15px',
                            fontWeight: isTop3 ? '600' : '500',
                            // color: isTop3 ? '#0071E3' : '#2B2F33', // 1~3위는 파란색 계열 강조
                            color: '#2B2F33',
                            fontSize: '16px',
                          }}
                        >
                          {index + 1}. {item.emoji} {item.name} - {item.value}%
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

          </div>



        </div>

        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box" style={{ width: "650px", height: "750px" }}>
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">오디언스 주요 주제</p>
              <span className="normal-text">
                해당 인플루언서 계정의 주요 오디언스는<br />다음과 같은 주제가 많이 언급되고 있습니다.
              </span>

              <div
                style={{
                  marginBottom: '-50px',
                  width: '600px',
                  height: '500px',
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {positions.map((pos, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedTopic(pos)}
                    style={{
                      position: 'absolute',
                      top: `${pos.y}px`,
                      left: `${pos.x}px`,
                      width: `${pos.diameter}px`,
                      height: `${pos.diameter}px`,
                      backgroundColor: pos.color,
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      boxSizing: 'border-box',
                      padding: '5px',
                      color: '#000',
                    }}
                  >
                    <div>
                      <div>{pos.name}</div>
                      <div>{pos.value}%</div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTopic && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd' }}>
                  <h3 style={{ fontSize: '18px' }}>
                    🗨️ {selectedTopic.name} 관련 댓글
                  </h3>

                  {selectedTopic.comments && selectedTopic.comments.length > 0 ? (
                    <ul>
                      {selectedTopic.comments.map((comment, i) => (
                        <li key={i} style={{ margin: '5px 0', fontSize: '14px' }}>
                          {comment}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontSize: '14px', color: '#888' }}>아직 수집된 댓글이 없습니다.</p>
                  )}
                </div>
              )}


            </div>
          </div>

          <div className="profile-analysis-box" style={{ width: "650px", height: "750px" }}>
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">오디언스 주요 감정</p>
              <span className="normal-text">
                해당 인플루언서 계정의 주요 오디언스는<br />행복과 중립을 주로 을 느끼는 것으로 분석됩니다.
              </span>

              <div style={{ display: "flex", alignItems: "center" }}>
                <PieChart width={600} height={450}>
                  <Pie
                    data={EMOTION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    dataKey="value"
                    paddingAngle={0}
                    label={renderOutsideLabel}
                    labelLine={renderCustomLine}
                  >
                    {EMOTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>




        </div>


      </div>
    </div >
  );
}

export default AccountContent;
