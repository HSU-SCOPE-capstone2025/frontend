import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/AccountContent.css";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Rectangle, ReferenceLine, LineChart } from "recharts";

const EMOTION_DATA = [
  { name: "지지하는", value: 30, emoji: "🥰", color: "#E2FFD1" },
  { name: "정보제공형", value: 20, emoji: "🧑‍🏫", color: "#CFE7FF" },
  { name: "공격적인", value: 5, emoji: "😠", color: "#FFD7D7" },
  { name: "유쾌함", value: 15, emoji: "😄", color: "#FFFCC7" },
  { name: "분석적", value: 10, emoji: "🧐", color: "#D9DEFF" },
  { name: "스팸", value: 10, emoji: "🚫", color: "#EED1FF" },
  { name: "중립적", value: 10, emoji: "😐", color: "#E3E3E3" },
];

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

// 언어 바바
const AccountContent = () => {
  const LanguageBar = ({ language, percent, color = "#0071E3" }) => (
  <div style={{ marginBottom: "40px" }}>
    <div style={{ marginBottom: "4px", fontSize: "16px", fontWeight: "500" }}>
      {language}
    </div>
    <div
      style={{
        backgroundColor: "#e0e0e0",
        borderRadius: "20px",
        height: "10px",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          borderRadius: "20px",
          height: "100%",
          width: `${percent}%`,
          transition: "width 0.5s",
        }}
      ></div>
    </div>
  </div>
);

  const sortedEmotionData = [...EMOTION_DATA].sort((a, b) => b.value - a.value);

  const top3 = [...EMOTION_DATA]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);

  //const navigate = useNavigate();
  // 팔로워 서포트 비율 데이터

  const totalFollowers = 104000; // 전체 팔로워 수 (10.4만 명)
  const validSupporters = 32000; // 유효 팔로워 수 (3.2만 명)
  const percentage = ((validSupporters / totalFollowers) * 100).toFixed(1); // 백분율 계산

  // 차트 데이터
  const data = [
    { name: "유효 팔로워", value: validSupporters, color: "#0071E3" },
    { name: "기타 팔로워", value: totalFollowers - validSupporters, color: "#D9D9D9" },
  ];

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
          <a href="#followerSupport" className="account-section-link">팔로워 서포트</a>
          <a href="#engagement" className="account-section-link">인게이지먼트</a>
          <a href="#audience" className="account-section-link">오디언스</a>
        </div>

        <p id="followerSupport" className="profile-analysis-title2">팔로워 서포트</p>
        <p className="profile-analysis-title3">계정의 팔로워 수와 질을 심층적으로 이해하고, 영향력을 측정합니다. 또한 장기적 관점에서의 성장 잠재력과 시장 내 위치를 평가할 수 있습니다.</p>

        <div className="profile-analysis-box-array">
          { /*1. 예상 팔로워 서포트 비율 */}
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                예상 팔로워 서포트 비율
              </p>

              {/* 설명 */}
              <div>
                <div>
                  <span style={{ width: "12px", height: "12px", background: "#0071E3", borderRadius: "50%", display: "inline-block" }}></span>
                  <span className="profile-analysis-text" style={{ marginLeft: "15px" }}>예상 유효 팔로워 서포트 수</span>
                  <span className="profile-analysis-text" style={{ marginLeft: "40px" }}>3.2만 명</span>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <span style={{ width: "12px", height: "12px", background: "#d9d9d9", borderRadius: "50%", display: "inline-block" }}></span>
                  <span className="profile-analysis-text" style={{ marginLeft: "15px" }}>팔로워 수</span>
                  <span className="profile-analysis-text" style={{ marginLeft: "145px" }}>10.4만 명</span>
                </div>
              </div>

              {/* 도넛형 차트 */}
              <div className="follower-chart-wrapper">
                <PieChart width={200} height={200}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={53} // 도넛 형태
                    outerRadius={80}
                    fill="#0071E3"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>

                  {/* 중앙에 % 표시 */}
                  <foreignObject x="50" y="50" width="100" height="100">
                    <div className="profile-percent-text">
                      {percentage}%
                    </div>
                  </foreignObject>
                </PieChart>

                <p className="profile-analysis-text" style={{ fontSize: "14px" }}>팔로워 대비 팔로워 서포트</p>
              </div>
            </div>
          </div>

          { /* 2. 예상 팔로워 서포트 비교 */}
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">예상 팔로워 서포트 비교</p>
              <p className="average-line-text">
                팔로워 서포트의 수가 <span style={{ color: "#0071E3" }}>{influencerSupport.toLocaleString()}명</span>
                으로<br />
                유사 그룹 평균과 <span style={{ color: "#0071E3" }}>비슷합니다</span>
              </p>

              {/* 막대 + 텍스트를 중앙 정렬 */}
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", width: "100%" }}>
                {[{ name: influencerName, value: influencerSupport, color: "#0071E3" }, { name: "유사 그룹 평균", value: averageGroupSupport, color: "#D9D9D9" }].map((item, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* 개별 막대 그래프 */}
                    <ResponsiveContainer width={180} height={150}>
                      <BarChart data={[{ name: item.name, value: item.value }]}>
                        <XAxis hide />
                        <YAxis hide domain={[0, maxValue]} />
                        <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                          <Cell fill={item.color} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>

                    {/* 해당 막대에 맞는 텍스트 */}
                    <p style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginTop: "10px",
                      fontFamily: "Paperlogy",
                      color: index === 0 ? "#0071E3" : "#333" // 왼쪽만 보라색 적용
                    }}>
                      {(item.value / 10000).toFixed(1)}만명
                    </p>
                    <p style={{
                      marginTop: "-6px",
                      fontSize: "14px",
                      fontFamily: "Paperlogy",
                      fontWeight: "500",
                      color: index === 0 ? "#0071E3" : "#666" // 왼쪽만 보라색 적용
                    }}>
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. 평균 도달 수 */}
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                예상 팔로워 서포트 평균
              </p>

              <p className="profile-analysis-sub-title" style={{ fontSize: "14px", textAlign: "right" }}>
                최근 게시물 24개 기준
              </p>
              <div className="flex-div">
                <div className="inline-block-div">
                  <p className="average-line-text">평균 도달 수</p>
                  <div className="flex-div">
                    <p className="average-line-big-text">2.1 <span className="average-line-text">만 명</span>
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width={250} height={200}>
                  <BarChart
                    data={recentSupportData}
                  >
                    {/* X축 숨기기 */}
                    <XAxis hide />
                    <YAxis hide domain={[0, maxValue]} />
                    <Tooltip
                      cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // 마우스 올릴 때 막대 크기에 딱 맞게 강조
                    />

                    {/* 막대 그래프 */}
                    <Bar
                      dataKey="value"
                      fill="#D9D9D9"
                      barSize={12} // 막대 폭 조정
                    />

                    {/* 평균선 */}
                    <ReferenceLine
                      y={averageSupport}
                      stroke="#0071E3"
                      strokeWidth={12} // 선 굵기 증가
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        { /*4. 구독자 성장률 */}
        <div className="profile-analysis-box-array">
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">구독자 성장률</p>
              <p className="profile-analysis-text">구독자가 30일 전 대비</p>


              <div style={{ textAlign: "center" }}>
                {/* 상단 텍스트 및 화살표 */}
                <div className="sub-growth-rate-text">
                  <span>2.2만 명</span>

                </div>

                {/* 꺾은선 그래프 */}
                <ResponsiveContainer width={330} height={200}>
                  <LineChart data={subData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} domain={["dataMin", "dataMax"]} />
                    <Tooltip formatter={(value) => `${(value / 10000).toFixed(1)}만`} />
                    <Line
                      type="liner" dataKey="subscribers" stroke="#0071E3" strokeWidth={3} dot={{ fill: "#7C7CFF", r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          { /* 5. 조회 성장률 */}
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">조회 성장률</p>
              <p className="average-line-text">
                조회 성장률이 <span style={{ color: "#0071E3" }}>{viewGrowthRate.toFixed(1)}%</span>
                으로<br />
                유사 그룹 평균과 <span style={{ color: "#0071E3" }}>비슷합니다</span>
              </p>

              {/* 성장률 막대 + 텍스트 중앙 정렬 */}
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-end", width: "100%" }}>
                {[
                  { name: influencerName, value: viewGrowthRate, color: "#0071E3" },
                  { name: "유사 그룹 평균", value: groupAverageGrowthRate, color: "#D9D9D9" }
                ].map((item, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    {/* 개별 막대 그래프 */}
                    <ResponsiveContainer width={180} height={150}>
                      <BarChart data={[{ name: item.name, value: item.value }]}>
                        <XAxis hide />
                        <YAxis hide domain={[0, Math.max(viewGrowthRate, groupAverageGrowthRate) * 1.2]} />
                        <Bar dataKey="value" radius={[8, 8, 8, 8]}>
                          <Cell fill={item.color} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>

                    {/* 해당 막대에 맞는 텍스트 */}
                    <p style={{
                      fontSize: "16px",
                      fontWeight: "500",
                      marginTop: "10px",
                      fontFamily: "Paperlogy",
                      color: index === 0 ? "#0071E3" : "#333" // 왼쪽만 보라색 적용
                    }}>
                      {item.value.toFixed(1)}%
                    </p>
                    <p style={{
                      marginTop: "-6px",
                      fontSize: "14px",
                      fontFamily: "Paperlogy",
                      fontWeight: "500",
                      color: index === 0 ? "#0071E3" : "#666" // 왼쪽만 보라색 적용
                    }}>
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. 컨텐츠 업로드 빈도 */}
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                컨텐츠 업로드 빈도
              </p>

              <p className="profile-analysis-sub-title" style={{ fontSize: "14px", textAlign: "right" }}>
                최근 게시물 24개 기준
              </p>
              <div className="flex-div">
                <div className="inline-block-div">
                  <p className="average-line-text">평균 도달 수</p>
                  <div className="flex-div">
                    <p className="average-line-big-text">3 <span className="average-line-text">일</span>
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width={250} height={200}>
                  <BarChart
                    data={recentSupportData}
                  >
                    {/* X축 숨기기 */}
                    <XAxis hide />
                    <YAxis hide domain={[0, maxValue]} />
                    <Tooltip
                      cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // 마우스 올릴 때 막대 크기에 딱 맞게 강조
                    />

                    {/* 막대 그래프 */}
                    <Bar
                      dataKey="value"
                      fill="#D9D9D9"
                      barSize={12} // 막대 폭 조정
                    />

                    {/* 평균선 */}
                    <ReferenceLine
                      y={averageSupport}
                      stroke="#0071E3"
                      strokeWidth={12} // 선 굵기 증가
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        <p id="engagement" className="profile-analysis-title2">인게이지먼트</p>
        <p className="profile-analysis-title3">전체 콘텐츠 상호작용 분석으로 인플루언서의 콘텐츠가 얼마나 효과적으로 오디언스와 상호작용하는지를 평가합니다.</p>

        <div className="profile-analysis-box-array">
          {/* 7. 좋아요 수 */}
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                좋아요 수
              </p>

              <p className="profile-analysis-sub-title" style={{ fontSize: "14px", textAlign: "right" }}>
                최근 게시물 7개 기준
              </p>
              <div className="flex-div">
                <div className="inline-block-div">
                  <p className="average-line-text">좋아요 수 평균</p>
                  <div className="flex-div">
                    <p className="average-line-big-text">3.2 <span className="average-line-text">만</span>
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width={250} height={200}>
                  <BarChart
                    data={recentSupportData}
                  >
                    {/* X축 숨기기 */}
                    <XAxis hide />
                    <YAxis hide domain={[0, maxValue]} />
                    <Tooltip
                      cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // 마우스 올릴 때 막대 크기에 딱 맞게 강조
                    />

                    {/* 막대 그래프 */}
                    <Bar
                      dataKey="value"
                      fill="#D9D9D9"
                      barSize={12} // 막대 폭 조정
                    />

                    {/* 평균선 */}
                    <ReferenceLine
                      y={averageSupport}
                      stroke="#0071E3"
                      strokeWidth={12} // 선 굵기 증가
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 8. 댓글글 수 */}
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                댓글 수
              </p>

              <p className="profile-analysis-sub-title" style={{ fontSize: "14px", textAlign: "right" }}>
                최근 게시물 7개 기준
              </p>
              <div className="flex-div">
                <div className="inline-block-div">
                  <p className="average-line-text">댓글 수 평균</p>
                  <div className="flex-div">
                    <p className="average-line-big-text">3.6 <span className="average-line-text">만</span>
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width={250} height={200}>
                  <BarChart
                    data={recentSupportData}
                  >
                    {/* X축 숨기기 */}
                    <XAxis hide />
                    <YAxis hide domain={[0, maxValue]} />
                    <Tooltip
                      cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // 마우스 올릴 때 막대 크기에 딱 맞게 강조
                    />

                    {/* 막대 그래프 */}
                    <Bar
                      dataKey="value"
                      fill="#D9D9D9"
                      barSize={12} // 막대 폭 조정
                    />

                    {/* 평균선 */}
                    <ReferenceLine
                      y={averageSupport}
                      stroke="#0071E3"
                      strokeWidth={12} // 선 굵기 증가
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 9. 공유 수 */}
          <div className="profile-analysis-box">
            <div className="inline-block-div">
              <p className="profile-analysis-sub-title">
                공유 수
              </p>

              <p className="profile-analysis-sub-title" style={{ fontSize: "14px", textAlign: "right" }}>
                최근 게시물 7개 기준
              </p>
              <div className="flex-div">
                <div className="inline-block-div">
                  <p className="average-line-text">평균 도달 수</p>
                  <div className="flex-div">
                    <p className="average-line-big-text">5.6 <span className="average-line-text">천</span>
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width={250} height={200}>
                  <BarChart
                    data={recentSupportData}
                  >
                    {/* X축 숨기기 */}
                    <XAxis hide />
                    <YAxis hide domain={[0, maxValue]} />
                    <Tooltip
                      cursor={{ fill: "rgba(0, 0, 0, 0.1)" }} // 마우스 올릴 때 막대 크기에 딱 맞게 강조
                    />

                    {/* 막대 그래프 */}
                    <Bar
                      dataKey="value"
                      fill="#D9D9D9"
                      barSize={12} // 막대 폭 조정
                    />

                    {/* 평균선 */}
                    <ReferenceLine
                      y={averageSupport}
                      stroke="#0071E3"
                      strokeWidth={12} // 선 굵기 증가
                    />
                  </BarChart>
                </ResponsiveContainer>
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
                <PieChart width={600} height={500}>
                  <Pie
                    data={EMOTION_DATA}
                    cx="50%"
                    cy="50%"
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

                <div style={{ marginLeft: "50px" }}>
                  <p className="account-text-bold">오디언스 주요 성향 정리</p>
                  <ul className="account-text-normal" style={{ listStyle: 'none', paddingLeft: 0 }}>
                    {sortedEmotionData.map((item, index) => {
                      const isTop3 = index < 3;

                      return (
                        <li
                          key={index}
                          style={{
                            marginBottom: '8px',
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

          <div className="profile-analysis-box" style={{ width: "350px", height: "700px" }}>
            <div className="inline-block-div" style={{paddingBottom: "150px"}}>
              <div className="normal-text" style={{width: "280px"}}>
                <p className="profile-analysis-sub-title" style={{marginBottom: "50px"}}>오디언스 언어 비율</p>
                {/* <p className="profile-analysis-sub-title" style={{ fontSize: "14px", textAlign: "right" }}>
                최근 게시물 7개 기준
              </p> */}
                <p>
                  계정의 주요 오디언스는 주로{" "} <br></br>
                  <span style={{ color: "#0071E3" }}>
                    {languageData[0].language} ({languageData[0].percent}%)
                  </span>{" "}
                  를 사용합니다.
                </p> <br /><br />

                {languageData.map((lang, index) => (
                  <LanguageBar
                    key={index}
                    language={lang.language}
                    percent={lang.percent}
                  />
                ))}

                {etcPercent > 0 && (
                  <LanguageBar language="기타" percent={etcPercent} color="#6C6C6C" />
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AccountContent;
