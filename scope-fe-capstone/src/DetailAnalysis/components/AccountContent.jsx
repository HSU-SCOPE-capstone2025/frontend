import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/AccountContent.css";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ReferenceLine, LineChart, Legend } from "recharts";
import influencerAccountData from "../../data/influencerAccountData.js";
import PlatformPieChart from "./PlatformPieChart.jsx";
import { fetchAccountData } from "../../api/DetailApi.js";

const platforms = ['youtube', 'instagram', 'tiktok'];

const TENDENCY_COLOR_MAP = {
  '지지적': '#E2FFD1',
  '중립적 정보제공형': '#E3E3E3',
  '공격적': '#FFD7D7',
  '쾌활함': '#FFFBB5',
  '분석적': '#D9DEFF',
  '스팸': '#EED1FF',
  '공감하는': '#FFE8C0',
};

// 유틸: 보여줄 이름 포맷
const formatTendencyName = (name) => {
  return name === '중립적 정보제공형' ? '중립형\n정보제공형' : name;
};

// 라벨 커스텀 (줄바꿈)
const renderTendencyLabel = ({ cx, cy, outerRadius, midAngle, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const isLeft = x < cx;

  const lines = formatTendencyName(name).split('\n');

  return (
    <text
      x={x}
      y={y}
      textAnchor={isLeft ? 'end' : 'start'}
      dominantBaseline="central"
      className="pie-label-text"
    >
      {lines.map((line, index) => (
        <tspan key={index} x={x} dy={index === 0 ? 0 : 22}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

const EMOTION_COLOR_MAP = {
  행복: '#FFD9EC',
  슬픔: '#D1E9FF',
  중립: '#DADADA',
  혐오: '#C0E188',
  분노: '#FFCDBB',
  놀람: '#FFF4B6',
  공포: '#C999ED',
};


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

// 시작시작시작작
const AccountContent = () => {
  const { id } = useParams();
  const [accountData, setAccountData] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('youtube');
  const [platformScores, setPlatformScores] = useState({});


  const { tendency, emotion, topic } = influencerAccountData.platforms[selectedPlatform];
  const [selectedTopic, setSelectedTopic] = useState(null);
  const topicData = influencerAccountData.platforms[selectedPlatform]?.topic || [];
  const [selectedScopePlatform, setSelectedScopePlatform] = useState("youtube");



  // 꽃모양 원 위치 계산
  const positions = useMemo(() => {
    const centerX = 350;
    const centerY = 300;

    // 유튜브 토픽 데이터 가져오기
    const topicData = influencerAccountData.platforms.youtube.topic;

    const sorted = [...topicData].sort((a, b) => b.value - a.value);
    const total = topicData.reduce((sum, t) => sum + t.value, 0);

    const positions = [];

    // 중앙 원 (가장 큰 value)
    const centerTopic = sorted[0];
    const centerDiameter = 70 + (centerTopic.value / total) * 160;
    positions.push({
      ...centerTopic,
      x: centerX - centerDiameter / 2,
      y: centerY - centerDiameter / 2,
      diameter: centerDiameter,
    });

    // 주변 원들
    const angleStep = (2 * Math.PI) / (sorted.length - 1);
    let angle = 0;
    const baseRadius = centerDiameter / 2 + 90;

    for (let i = 1; i < sorted.length; i++) {
      const topic = sorted[i];
      const diameter = 50 + (topic.value / total) * 120;

      let placed = false;

      for (let r = baseRadius; r < 600; r += 12) {
        const x = centerX + r * Math.cos(angle) - diameter / 2;
        const y = centerY + r * Math.sin(angle) - diameter / 2;

        const overlaps = positions.some((p) => {
          const dx = p.x + p.diameter / 2 - (x + diameter / 2);
          const dy = p.y + p.diameter / 2 - (y + diameter / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist < (p.diameter + diameter) / 2 + 10;
        });

        if (!overlaps) {
          positions.push({ ...topic, x, y, diameter });
          placed = true;
          break;
        }
      }

      if (!placed) {
        const fallbackX = centerX + (baseRadius + 200) * Math.cos(angle) - diameter / 2;
        const fallbackY = centerY + (baseRadius + 200) * Math.sin(angle) - diameter / 2;
        positions.push({ ...topic, x: fallbackX, y: fallbackY, diameter });
      }

      angle += angleStep;
    }

    return positions;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAccountData(id);

        // platformScores 변환
        const convertedScores = {};
        if (data.platformScores) {
          for (const platform in data.platformScores) {
            convertedScores[platform] = data.platformScores[platform].map(({ date, fss }) => ({
              date,
              scopeScore: fss,
            }));
          }
        }

        setAccountData(data);
        setPlatformScores(convertedScores); // 변환된 데이터 저장
      } catch (error) {
        console.error("계정 분석 데이터 불러오기 실패:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!accountData) {
    return <div>데이터 로딩 중...</div>;
  }


  const scopeScoreData = platformScores[selectedScopePlatform] || [];

  const average =
    scopeScoreData.length > 0
      ? scopeScoreData.reduce((sum, d) => sum + d.scopeScore, 0) / scopeScoreData.length
      : 0;

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
                <PlatformPieChart platform="youtube" data={accountData} />
              </div>
            </div>
          </div>

          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PlatformPieChart platform="instagram" data={accountData} />
              </div>
            </div>
          </div>

          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PlatformPieChart platform="tiktok" data={accountData} />
              </div>
            </div>
          </div>
        </div>


        <p id="audience" className="profile-analysis-title2">팔로워 분석</p>

        {/* 드롭다운 UI */}
        <div style={{ marginLeft: '100px' }}>
          <label htmlFor="platformSelect" style={{ marginRight: '10px', fontWeight: 'bold' }}>플랫폼 선택:</label>
          <select
            id="platformSelect"
            value={selectedPlatform}
            onChange={(e) => {
              setSelectedPlatform(e.target.value);
              setSelectedTopic(null); // 토픽 초기화
            }}
          >
            {platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box" style={{ width: "650px", height: "750px" }}>
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                팔로워 주요 성향 군집화
              </p>
              <span className="normal-text">
                인플루언서의 댓글을 분석하여 팔로워를 군집화한 그래프입니다.<br />
              </span>

              <div style={{ display: "flex", alignItems: "center" }}>
                <PieChart width={600} height={450}>
                  <Pie
                    data={influencerAccountData.platforms[selectedPlatform]?.tendency || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    dataKey="value"
                    paddingAngle={0}
                    label={renderTendencyLabel}
                    labelLine={renderCustomLine}
                  >
                    {(influencerAccountData.platforms[selectedPlatform]?.tendency || []).map((entry, index) => (
                      <Cell
                        key={`cell-tendency-${index}`}
                        fill={TENDENCY_COLOR_MAP[formatTendencyName(entry.name)] || '#ccc'}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
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
                    data={emotion}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={160}
                    dataKey="value"
                    paddingAngle={0}
                    label={renderOutsideLabel}
                    labelLine={renderCustomLine}
                  >
                    {emotion.map((entry, index) => (
                      <Cell
                        key={`cell-emotion-${index}`}
                        fill={EMOTION_COLOR_MAP[entry.name] || '#ccc'}
                      />
                    ))}
                  </Pie>
                </PieChart>

              </div>
            </div>
          </div>



        </div>

        <div className="profile-analysis-box-array">

          <div className="profile-analysis-box-big">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">오디언스 주요 주제</p>
              <span className="normal-text">
                해당 인플루언서 계정의 주요 오디언스는<br />
                다음과 같은 주제가 많이 언급되고 있습니다.
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
                      backgroundColor: "#90caf9",
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      boxSizing: 'border-box',
                      padding: '5px',
                      color: '#000',
                      cursor: 'pointer'
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
                  <h3 style={{ fontSize: '18px' }}>🗨️ {selectedTopic.name} 관련 댓글</h3>
                  {selectedTopic.comments && selectedTopic.comments.length > 0 ? (
                    <ul>
                      {selectedTopic.comments.map((comment, i) => (
                        <li key={i} style={{ margin: '5px 0', fontSize: '14px' }}>{comment}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ fontSize: '14px', color: '#888' }}>아직 수집된 댓글이 없습니다.</p>
                  )}
                </div>
              )}
            </div>
          </div>






        </div>


      </div>
    </div >
  );
}

export default AccountContent;
