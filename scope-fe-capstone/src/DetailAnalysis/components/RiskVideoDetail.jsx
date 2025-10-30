import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../css/RiskVideoDetail.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RiskVideoDetail = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const mockData = {
      influencer: "주둥이방송",
      title: "MZ 미친 인터뷰 논란",
      analysis_period: "2025-03-03 ~ 2025-03-10",
      emotion_ratio: {
        놀람: 0.357,
        공포: 0.214,
        혐오: 0.179,
        행복: 0.107,
        슬픔: 0.107,
        분노: 0.036,
      },
      topic_ratio: {
        "사건 / 논란": 0.286,
        "기타 / 미분류": 0.25,
        "공감 / 감정 공유": 0.214,
        "유머 / 드립": 0.143,
        "질문 / 피드백": 0.071,
        "콘텐츠 평가": 0.036,
      },
      cluster_ratio: {
        "Neutral Informative": 0.393,
        Aggressive: 0.321,
        "Sarcastic/Playful": 0.143,
        Empathetic: 0.071,
        Supportive: 0.036,
        Analytical: 0.036,
      },
      keywords: [
        "michin",
        "그냥",
        "두번째는",
        "말을",
        "여보세요",
        "영혼",
        "올라가는",
        "이건좀",
        "이러면서",
        "이미지",
        "인터넷에서",
        "일단",
        "일은",
        "있기",
        "있으면",
        "자극적인",
        "자랑인것마냥",
        "잘하는데",
        "첫번째는",
        "하는",
      ],
      summary:
        "2025-03-03~2025-03-10 동안 CB Score가 평균보다 높거나 급등했습니다. 주요 감정은 '놀람', 주제는 '사건 / 논란', 댓글 유형은 'Neutral Informative'가 많았습니다.",
      aggr_comments: [
        {
          comment_date: "2025-03-02",
          emotion: "분노",
          topic: "사건 / 논란",
          comment: "미친놈들 집합소ㄷ",
        },
        {
          comment_date: "2025-03-02",
          emotion: "혐오",
          topic: "사건 / 논란",
          comment: "두번째는 성희롱 하고 당당하게 말하네",
        },
        {
          comment_date: "2025-03-02",
          emotion: "혐오",
          topic: "사건 / 논란",
          comment: "오기 싫은곳에 입대하고 저런애들은 계속 발견되니 머리가 어지럽네요😅",
        },
        {
          comment_date: "2025-03-05",
          emotion: "혐오",
          topic: "사건 / 논란",
          comment:
            "첫번째는 실제 나도 겪은 사람인데 그냥 몹시 피곤함. 대체 말을 왜 저렇게 하는지 모르겠고 본인 일은 잘하는데 말하는걸로 이미지 다 까먹을 타입....두번째는 그냥 같이 있으면 영혼 나갈거같아서 같은 공간에 있기 싫어짐...",
        },
        {
          comment_date: "2025-03-05",
          emotion: "혐오",
          topic: "사건 / 논란",
          comment: "저거 첫번쨔는 첨에 여보세요//?? 이러면서 톤 올라가는 거부터가 말 안 통하는 새끼임",
        },
        {
          comment_date: "2025-03-05",
          emotion: "공포",
          topic: "사건 / 논란",
          comment: "마지막은.. 일단 진지하게 정신과 상담을 받아보심이..",
        },
        {
          comment_date: "2025-03-05",
          emotion: "혐오",
          topic: "사건 / 논란",
          comment: "하ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ진짜 이상한 애들 ㅈㄴ 많다",
        },
        {
          comment_date: "2025-03-05",
          emotion: "혐오",
          topic: "사건 / 논란",
          comment: "첫번째는 뭔가 중2병 쎄게 온 어린애같고, 두번째는.... 병원부터 가라. 정신심리문제다...",
        },
        {
          comment_date: "2025-03-06",
          emotion: "혐오",
          topic: "사건 / 논란",
          comment:
            "두번째는 자극적인 주제로 관종짓 하는듯. 솔직히 친구끼리는 수위 높게 장난삼아 대화하는게 흔함 근데 그걸 인터넷에서 자랑인것마냥 성희롱 하는 사람은 진짜 한심하고 답없어 보임…",
        },
        {
          comment_date: "2025-03-10",
          emotion: "공포",
          topic: "사건 / 논란",
          comment: "이건좀..",
        },
        {
          comment_date: "2025-03-10",
          emotion: "분노",
          topic: "기타 / 미분류",
          comment: "mz가 언제부터 michin zashik 약자였냐",
        },
        {
          comment_date: "2025-03-10",
          emotion: "공포",
          topic: "사건 / 논란",
          comment: "첫번째는 그냥 정신건강이 좀 안좋은상태인듯 ;;;",
        },
      ],
    };

    setData(mockData);
  }, []);

  if (!data) return <p>데이터 로딩 중...</p>;

  // 그래프 구성 함수
  const makeBarData = (obj, label) => ({
    labels: Object.keys(obj),
    datasets: [
      {
        label,
        data: Object.values(obj),
        backgroundColor: "rgba(250,128,114,0.7)",
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, max: 1 } },
  };

  return (
    <div className="d-risk-detail-container">
      <div className="d-risk-detail-header">
        <h2 className="d-risk-detail-title">
          🎬 {data.influencer} — {data.title}
        </h2>
        <p className="d-risk-detail-period">분석 기간: {data.analysis_period}</p>
      </div>

      {/* 그래프 3개 */}
      <div className="d-risk-chart-grid">
        <div className="d-risk-chart-card">
          <h4>😊 감정 분포</h4>
          <Bar data={makeBarData(data.emotion_ratio, "감정 비율")} options={chartOptions} />
        </div>
        <div className="d-risk-chart-card">
          <h4>💬 주제 분포</h4>
          <Bar data={makeBarData(data.topic_ratio, "주제 비율")} options={chartOptions} />
        </div>
        <div className="d-risk-chart-card">
          <h4>🧩 클러스터 분포</h4>
          <Bar data={makeBarData(data.cluster_ratio, "클러스터 비율")} options={chartOptions} />
        </div>
      </div>

      {/* 주요 키워드 */}
      <div className="d-risk-keyword-box">
        <h3>🗝️ 주요 키워드</h3>
        <p>{data.keywords.join(", ")}</p>
      </div>

      {/* 요약 */}
      <div className="d-risk-summary-box">
        <h3>📊 분석 요약</h3>
        <p>{data.summary}</p>
      </div>

      {/* 댓글 */}
      <div className="d-risk-comment-section">
        <h3>🗣️ 관련 댓글 ({data.aggr_comments.length}개)</h3>
        {data.aggr_comments.map((c, idx) => (
          <div key={idx} className="d-risk-comment-item">
            <p>
              <b>[{c.comment_date}]</b> ({c.emotion} / {c.topic}) — {c.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskVideoDetail;
