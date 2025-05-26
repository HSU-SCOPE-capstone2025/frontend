import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/AccountContent.css";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ReferenceLine, LineChart, Legend } from "recharts";
//import influencerAccountData from "../../data/influencerAccountData.js";
import PlatformPieChart from "./PlatformPieChart.jsx";
import { fetchAccountData } from "../../api/DetailApi.js";
import PieChartSection from "./PieChartSection";
import BubbleChartSection from "./BubbleChartSection.jsx";

// 인플루언서 감정 변화 그래프 데이터
import dwaekki_youtube from "../../data/influencerEmotion/dwaekki_youtube.js";
import dwaekki_instagram from "../../data/influencerEmotion/dwaekki_instagram.js";
import dwaekki_tiktok from "../../data/influencerEmotion/dwaekki_tiktok.js";
import ralral_youtube from "../../data/influencerEmotion/ralral_youtube.js";
import ralral_instagram from "../../data/influencerEmotion/ralral_instagram.js";
import ralral_tiktok from "../../data/influencerEmotion/ralral_tiktok.js";
import malwang_youtube from "../../data/influencerEmotion/malwang_youtube.js";
import malwang_instagram from "../../data/influencerEmotion/malwang_instagram.js";
import malwang_tiktok from "../../data/influencerEmotion/malwang_tiktok.js";
import silverspoon_tiktok from "../../data/influencerEmotion/silverspoon_tiktok.js";
import silverspoon_youtube from "../../data/influencerEmotion/silverspoon_youtube.js";
import silverspoon_instagram from "../../data/influencerEmotion/silverspoon_instagram.js";
import jyeon_instagram from "../../data/influencerEmotion/jyeon_instagram.js";
import jyeon_tiktok from "../../data/influencerEmotion/jyeon_tiktok.js";
import jyeon_youtube from "../../data/influencerEmotion/jyeon_youtube.js";

//비교할 이름
const specialNames = ["돼끼", "랄랄", "말왕", "은수저", "젼언니"];

const TENDENCY_COLOR_MAP = {
  '지지하는': '#E2FFD1',
  '정보제공형': '#E3E3E3',
  '공격적인': '#FFD7D7',
  '쾌활함': '#FFFBB5',
  '분석적': '#D9DEFF',
  '스팸': '#EED1FF',
  '공감하는': '#FFE8C0',
};

const tendencyLabelMap = {
  정보제공형: "중립적 정보제공형",
  분석적: "분석적",
  공격적인: "공격적",
  공감하는: "공감하는",
  스팸: "스팸",
  쾌활함: "쾌활함",
  지지하는: "지지적",
};

const TOPIC_COLOR_MAP = {
  "콘텐츠 평가": "#FFDEA2",
  "제품 / 아이템 리뷰": "#BCFFE0",
  "사회 / 시사 이슈": "#FF96AB",
  "유튜버 개인": "#BCB1FF",
  "사건 / 논란": "#FFC3C3",
  "기타 / 미분류": "#DBDBDB",
  "질문 / 피드백": "#B1E1FF",
  "정보 / 꿀팁": "#ACFEFF",
  "유머 / 드립": "#FFEC85",
  "공감 / 감정 공유": "#FFCFEE",
  // 기본 색상
  default: "#D3D3D3",
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [accountData, setAccountData] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState("youtube");
  const [platformScores, setPlatformScores] = useState({});

  //스코프점수 변화량 드롭다운
  const [selectedScopePlatform, setSelectedScopePlatform] = useState('youtube');

  //인플루언서 감정 변화
  const [selectedEmotionPlatform, setSelectedEmotionPlatform] = useState("youtube");

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



  const emotionDataMap = {
    돼끼: {
      youtube: dwaekki_youtube,
      instagram: dwaekki_instagram,
      tiktok: dwaekki_tiktok
    },
    랄랄: {
      youtube: ralral_youtube,
      instagram: ralral_instagram,
      tiktok: ralral_tiktok
    },
    말왕: {
      youtube: malwang_youtube,
      instagram: malwang_instagram,
      tiktok: malwang_tiktok
    },
    은수저: {
      youtube: silverspoon_youtube,
      instagram: silverspoon_instagram,
      tiktok: silverspoon_tiktok
    },
    젼언니: {
      youtube: jyeon_youtube,
      instagram: jyeon_instagram,
      tiktok: jyeon_tiktok
    },
    // 나머지 3명도 똑같이 구성
  };

  //인플루언서 감정 한글 매핑
  const emotionLabelMap = {
    neutral: "중립",
    calm: "차분함",
    happy: "행복",
    sad: "슬픔",
    angry: "분노",
    fearful: "공포",
    disgust: "혐오",
  };

  const selectedEmotionInfo = emotionDataMap[accountData.name]?.[selectedEmotionPlatform];
  const raw = selectedEmotionInfo?.emotionTimeline || [];

  const chartData = raw.map((item) => {
    const time = `${item.start_sec.toFixed(1)}s`;
    return {
      time,
      ...Object.entries(item.softmax).reduce((acc, [key, value]) => {
        acc[emotionLabelMap[key] || key] = +(value * 100).toFixed(1);
        return acc;
      }, {}),
    };
  });




  //감정 코멘트 관련 변수
  const emotionData = accountData[selectedPlatform]?.emotion || [];
  const sortedEmotions = [...emotionData].sort((a, b) => b.value - a.value);
  const topEmotion = sortedEmotions[0];

  const emotionComment = topEmotion ? (
    <>
      인플루언서의 댓글을 분석하여<br></br> 팔로워가 느끼는 감정을 시각화한 그래프입니다.<br /> 해당 인플루언서의 팔로워들은<br />{" "}
      <span style={{ color: "#0071E3" }}>
        "{topEmotion.name}" 감정
      </span>
      을{" "}
      <span style={{ color: "#0071E3" }}>
        {topEmotion.value}%
      </span>
      로 가장 많이 느끼고 있습니다.
    </>
  ) : (
    "감정 분석 데이터를 찾을 수 없습니다."
  );

  //성향 코멘트 관련 변수
  const tendencyData = accountData[selectedPlatform]?.tendency || [];
  const sortedTendencies = [...tendencyData].sort((a, b) => b.value - a.value);
  const topTendency = sortedTendencies[0];

  const tendencyComment = topEmotion ? (
    <>
      인플루언서의 댓글을 분석하여<br></br> 팔로워의 성향을 군집화한 그래프입니다.<br /> 해당 인플루언서의 팔로워들은<br />{" "}
      <span style={{ color: "#0071E3" }}>
        "{tendencyLabelMap[topTendency.name] || topTendency.name}"
      </span>
      비율이{" "}
      <span style={{ color: "#0071E3" }}>
        {topTendency.value}%
      </span>
      로 가장 높게 나타납니다.
    </>
  ) : (
    "감정 분석 데이터를 찾을 수 없습니다."
  );

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
          <a href="#scopeSCoreRatio" className="account-section-link">핵심 지지층 비율</a>
          <a href="#follower" className="account-section-link">팔로워 분석</a>
          <a href="#influencerEmotion" className="account-section-link">인플루언서 콘텐츠 감정 변화</a>
        </div>

        <p id="scopeScore" className="profile-analysis-title2">SCOPE 점수</p>
        <p className="profile-analysis-title3">팔로워 댓글을 분석해 <span style={{ color: "#0071E3" }}>핵심 지지층의 규모를 점수로 환산</span>하고, 인플루언서의 <span style={{ color: "#0071E3" }}>핵심 지지층의 영향력과 정도를 분석</span>합니다.<br />
          <span style={{ color: "#0071E3" }}>핵심 지지층이면 인플루언서에게 충성도가 높고, 해당 인플루언서를 지지하는 경향이 높게 나타납</span>니다.<br></br><br></br>
          SCOPE 점수에 더욱 자세히 알고싶다면<br /><br /><span style={{ color: "#0071E3", cursor: "pointer" }} onClick={() => navigate('/#scope-detail')}>이쪽을 클릭하세요</span></p>

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
                      stroke="#0071E3"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      name="SCOPE 점수"
                    />
                    <ReferenceLine
                      y={average}
                      stroke="#FF5E5E"
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      label={{
                        value: `평균 (${average.toFixed(1)})`,
                        position: "insideRight",
                        offset: 15,
                        fill: "#FF5E5E",
                        fontSize: 16,
                        fontFamily: "Paperlogy",
                        fontWeight: "600",
                        dy: 20
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>


            </div>
          </div>
        </div>

        <p id="scopeSCoreRatio" className="profile-analysis-title2">예상 핵심 지지층 비율</p>
        <p className="profile-analysis-title3"><span style={{ color: "#0071E3" }}>전체 댓글</span>을 전체 팔로워를 기반으로 하여 SCOPE 점수가 높은 팔로워들의 비율입니다.<br />단순한 팔로워 수가 아닌 <span style={{ color: "#0071E3" }}>‘실제로 반응하고 지지하는 팬’의 규모를 확인</span>할 수 있으며, 그로인해 인플루언서의 <span style={{ color: "#0071E3" }}>진짜 영향력을 정확히 평가</span>할 수 있습니다.</p>
        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-pie-title">
                예상 핵심 지지층 비율
              </p>
              <p className="platform-right-text">유튜브</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PlatformPieChart platform="youtube" data={accountData} />
              </div>
            </div>
          </div>

          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-pie-title">
                예상 핵심 지지층 비율
              </p>
              <p className="platform-right-text">인스타그램</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PlatformPieChart platform="instagram" data={accountData} />
              </div>
            </div>
          </div>

          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-pie-title">
                예상 핵심 지지층 비율
              </p>
              <p className="platform-right-text">틱톡</p>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PlatformPieChart platform="tiktok" data={accountData} />
              </div>
            </div>
          </div>
        </div>


        <p id="follower" className="profile-analysis-title2">팔로워 분석</p>

        <div style={{ marginLeft: "1400px", marginBottom: "20px" }}>
          {/* 플랫폼 선택 드롭다운 */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="custom-dropdown"
            style={{ backgroundColor: "#FAFAFA" }}
          >
            <option value="youtube">유튜브</option>
            <option value="instagram">인스타그램</option>
            <option value="tiktok">틱톡</option>
          </select>

        </div>

        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box-middle">
            <div>
              <p className="profile-analysis-sub-title" style={{ fontSize: "22px", paddingTop: "50px", paddingLeft: "30px" }}>팔로워 주요 감정</p>
              <p className="profile-analysis-sub-title" style={{ fontSize: "18px", paddingLeft: "30px" }}>{emotionComment}</p>
              <PieChartSection
                title="팔로워 주요 감정"
                data={accountData[selectedPlatform]?.emotion || {}}
                colorMap={EMOTION_COLOR_MAP}
                labelRenderer={renderOutsideLabel}
              />
            </div>
          </div>

          <div className="profile-analysis-box-middle">
            <div>
              <p className="profile-analysis-sub-title" style={{ fontSize: "22px", paddingTop: "50px", paddingLeft: "30px" }}>팔로워 주요 성향 군집화</p>
              <p className="profile-analysis-sub-title" style={{ fontSize: "18px", paddingLeft: "30px" }}>{tendencyComment}</p>
              <PieChartSection
                title="팔로워 주요 성향 군집화"
                data={accountData[selectedPlatform]?.tendency || {}}
                colorMap={TENDENCY_COLOR_MAP}
                labelMap={{
                  정보제공형: "중립적\n정보제공형",
                  분석적: "분석적",
                  공격적인: "공격적",
                  공감하는: "공감하는",
                  스팸: "스팸",
                  쾌활함: "쾌활함",
                  지지하는: "지지적"
                }}
                labelRenderer={renderTendencyLabel}
              />
            </div>
          </div>
        </div>

        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box-big">
            <div>
              <div>
                <p className="profile-analysis-sub-title" style={{ fontSize: "22px", marginRight: "1000px" }}>팔로워 주요 관심사</p>
                <p className="profile-analysis-sub-title" style={{ fontSize: "18px" }}>
                  해당 인플루언서의 댓글을 분석하여 많이 언급하는 주제와 키워드를 파악해 관심사를 분석한 그래프입니다.<br></br>주제 원을 클릭하면 해당 주제를 분석했던 댓글 데이터를 보실 수 있습니다.
                </p> <br></br><br></br>
              </div>
              <div>
                <BubbleChartSection
                  title="토픽 기반 분석"
                  data={accountData[selectedPlatform]?.topic || []}
                  colorMap={TOPIC_COLOR_MAP}
                />
              </div>
            </div>
          </div>
        </div>

        {["돼끼", "랄랄", "말왕", "은수저", "젼언니"].includes(accountData.name) && (
          <div>
            <p id="influencerEmotion" className="profile-analysis-title2">인플루언서 콘텐츠 감정 변화 그래프</p>

            <div className="profile-analysis-box-array">
              <div className="profile-analysis-box-big">
                <div>
                  <div style={{ marginBottom: "50px" }}>
                    <p className="profile-analysis-sub-title" style={{ fontSize: "22px", }}>
                      인플루언서 콘텐츠 감정 변화 그래프
                    </p>
                    <p className="profile-analysis-sub-title" style={{ fontSize: "18px" }}>
                      인플루언서의 영상을 분석하여 시간대별로 인플루언서의 감정 변화를 나타낸 그래프입니다.<br></br>
                      해당 인플루언서가 콘텐츠에서 나타내는 주요 감정을 알 수 있습니다.
                    </p>
                  </div>

                  <div style={{ marginBottom: "-30px" }}>
                    <p className="influencer-emotion-text">
                      🎬 {selectedEmotionInfo?.title}
                    </p>
                    <p className="influencer-emotion-text" style={{ fontSize: "16px" }}>
                      영상 아이디: {selectedEmotionInfo?.videoId}
                    </p>
                    {/* <p>업로드일: {selectedEmotionInfo?.uploadedAt}</p> */}
                    <a href={selectedEmotionInfo?.url} target="_blank" rel="noopener noreferrer" className="influencer-emotion-text" style={{ color: "#0071E3", fontSize: "16px" }}>
                      🔗 영상 보러가기
                    </a>
                  </div>

                  <div style={{ marginLeft: "1100px", marginBottom: "20px" }}>
                    <select
                      value={selectedEmotionPlatform}
                      onChange={(e) => setSelectedEmotionPlatform(e.target.value)}
                      className="custom-dropdown"
                    >
                      <option value="youtube">유튜브</option>
                      <option value="instagram">인스타그램</option>
                      <option value="tiktok">틱톡</option>
                    </select>
                  </div>

                  <ResponsiveContainer width={1200} height={400} style={{ fontFamily: "Paperlogy", fontSize: "16px", fontWeight: "500" }}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      {["중립", "차분함", "행복", "슬픔", "분노", "공포", "혐오"].map((label, i) => (
                        <Line
                          key={label}
                          type="monotone"
                          dataKey={label}
                          strokeWidth={2}
                          stroke={["#A3A3A3", "#6BA368", "#FF7BBD", "#9BCDFF", "#FFA786", "#C999ED", "#C0E188"][i]}
                          dot={false}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>
    </div >
  );
}

export default AccountContent;
