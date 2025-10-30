import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SNSContent from "./SNSContent";
import AccountContent from "./AccountContent";
import DashboardPage from "./DashboardPage";
import RiskAnalysis from "./RiskAnalysis";
import "../css/DetailAnalysis.css";
// import { fetchInfluencerInfo, fetchSNSData, fetchAccountData } from "../../api/DetailApi";
import { fetchInfluencerInfo } from "../../api/DetailApi";
import { getProfileImage } from "../../utils/getProfileImage";

import influencer from "../../assets/images/influencer.png";
import instagramlink from "../../assets/images/link.png";

const categoryMap = {
    "Lifestyle_(sociology)": "일상 / Vlog",
    "Fashion": "패션",
    "beauty": "뷰티",
    "Food": "먹방",
    "Entertainment": "엔터테인먼트",
    "it": "IT / 전자기기",
    "Physical_fitness": "운동 / 헬스",
    "education": "교육",
    "kids": "키즈",
    "Music": "음악",
    "interior": "인테리어",
    "Pet": "펫 / 동물",
    "travel": "여행",
    "Video_game_culture": "게임",
    "art": "그림",
    "film": "영화 / 드라마",
    "cooking": "요리",
    "car": "자동차 / 바이크",
};

const DetailAnalysis = () => {
    const { id } = useParams(); // 이 id가 바로 insta_id임
    const [activeTab, setActiveTab] = useState("sns");
    //const [activeSNS, setActiveSNS] = useState("instagram");
    const [influencerData, setInfluencerData] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const influencer = await fetchInfluencerInfo(id);      // id 사용
                setInfluencerData(influencer);
            } catch (err) {
                console.error("데이터 불러오기 실패:", err);
            }
        };

        fetchAll();
    }, [id]);


    return (
        <div className="detail-analysis-container">
            <div className="ivory-box">
                <div style={{
                    background: "#FFF",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px"
                }}>
                    <div className="titleText">
                        인플루언서 분석
                    </div>
                    <div className="grayLine"></div>

                    <div className="influencer-container">
                        <img
                            src={getProfileImage(influencerData?.name)}
                            alt="influencer"
                            className="snsdetail-profile-img"
                        />

                        <div className="detail-information">
                            <div className="detail-category-tags">
                                {influencerData?.category && (
                                    <div className="ranking-category-box" style={{ fontWeight: "500" }}>
                                        {categoryMap[influencerData.category] || influencerData.category}
                                    </div>
                                )}

                                {influencerData?.tags &&
                                    influencerData.tags.split(",").map((tag, index) => (
                                        <div key={index} className="ranking-tag-box" style={{ fontWeight: "500" }}>
                                            {tag.trim()}
                                        </div>
                                    ))}
                            </div>

                            <div className="detail-profile-container">
                                <div className="detail-profile-name">
                                    {influencerData?.name}
                                </div>
                                <div className="detail-profile-description">{influencerData?.youtubeDescription}</div>
                                <div className="detail-profile-link">
                                    <div className="platform-link">
                                        유튜브 <a href={influencerData?.youUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={instagramlink} alt="instagramlink" />
                                        </a>
                                    </div>

                                    <div className="platform-link">
                                        인스타그램 <a href={influencerData?.instaUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={instagramlink} alt="instagramlink" />
                                        </a>
                                    </div>

                                    <div className="platform-link">
                                        틱톡 <a href={influencerData?.tikUrl} target="_blank" rel="noopener noreferrer">
                                            <img src={instagramlink} alt="instagramlink" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* 탭 버튼 */}
                    <div className="category-button-container">
                        <button
                            className={`snsdetail-sns-button ${activeTab === "sns" ? "active" : ""}`}
                            onClick={() => setActiveTab("sns")}
                        >
                            SNS
                        </button>
                        <button
                            className={`snsdetail-accountanalysis-button ${activeTab === "analysis" ? "active" : ""}`}
                            onClick={() => setActiveTab("analysis")}
                        >
                            계정 분석
                        </button>
                        <button
                            className={`snsdetail-accountanalysis-button ${activeTab === "dashboard" ? "active" : ""}`}
                            onClick={() => setActiveTab("dashboard")}
                        >
                            대시보드
                        </button>

                        <button
                           className={`snsdetail-accountanalysis-button ${activeTab === "riskanalysis" ? "active" : ""}`}
                           onClick={() => setActiveTab("riskanalysis")}
                         >
                           위험도 분석
                         </button>
                    </div>
                </div>

                {/* 탭에 따른 콘텐츠 */}
                <div>
                    {/* {activeTab === "sns" && <SNSContent />} */}
                    {/* {activeTab === "analysis" && <AccountContent />} */}
                    {activeTab === "sns" && <SNSContent id={id} />}
                    {activeTab === "analysis" && <AccountContent id={id} />}
                    {activeTab === "dashboard" && <DashboardPage id={id} />}
                    {activeTab === "riskanalysis" && <RiskAnalysis id={id} />}
                </div>
            </div>
        </div>
    );
};

export default DetailAnalysis;