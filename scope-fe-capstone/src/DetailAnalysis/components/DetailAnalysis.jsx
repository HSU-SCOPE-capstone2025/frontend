import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SNSContent from "./SNSContent";
import AccountContent from "./AccountContent";
import "../css/DetailAnalysis.css";
// import { fetchInfluencerInfo, fetchSNSData, fetchAccountData } from "../../api/DetailApi";

import influencer from "../../assets/images/influencer.png";
import instagramlink from "../../assets/images/link.png";

const DetailAnalysis = () => {
    // const { id } = useParams(); // 이 id가 바로 insta_id임
    // const [influencerData, setInfluencerData] = useState(null);
    const [activeTab, setActiveTab] = useState("sns");
    const [activeSNS, setActiveSNS] = useState("instagram");
    //     const [influencerData, setInfluencerData] = useState(null);
    // const [snsData, setSnsData] = useState(null);
    // const [accountData, setAccountData] = useState(null);

    // useEffect(() => {
    //   const fetchAll = async () => {
    //     try {
    //       const influencer = await fetchInfluencerInfo(id);      // id 사용
    //       const sns = await fetchSNSData(id);
    //       const account = await fetchAccountData(id);

    //       setInfluencerData(influencer);
    //       setSnsData(sns);
    //       setAccountData(account);
    //     } catch (err) {
    //       console.error("데이터 불러오기 실패:", err);
    //     }
    //   };

    //   fetchAll();
    // }, [id]);

    const summaryData = {
        instagram: {
            posts: "10002",
            followers: "105.8",
            likes: "1.2만",
            comments: "450개",
            avgLikes: "10000",
            avgComments: "100"
        },
        youtube: {
            posts: "20002",
            followers: "57.3",
            likes: "2.4만",
            comments: "1200개",
            avgLikes: "23000",
            avgComments: "200"

        },
        tiktok: {
            posts: "30002",
            followers: "16",
            likes: "8000개",
            comments: "300개",
            avgLikes: "33000",
            avgComments: "500"

        }
    };

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
                        <img src={influencer} alt="influencer" className="snsdetail-profile-img" />
                        <div className="detail-information">
                            <div className="sponsership-category-tags">
                                <div className="sponsership-tag category-tag">패션</div>
                                <div className="sponsership-tag category-tag">뷰티</div>
                            </div>
                            <div className="detail-profile-container">

                                <div className="detail-profile-name">risabae_art</div>
                                <div className="detail-korea-name">이사배</div>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                    <img src={instagramlink} alt="instagramlink" className="instagram-link" />
                                </a>

                            </div>

                            <div className="detail-profile-information">
                                메이크업 아티스트 이사배
                            </div>
                            <div className="detail-profile-numbers">
                                <div className="post-container">
                                    {summaryData[activeSNS].posts}
                                    <div className="post-title">
                                        게시물
                                    </div>

                                </div>
                                <div className="follower-container">
                                    {summaryData[activeSNS].followers}
                                    <div className="follower-title">
                                        팔로워
                                    </div>

                                </div>
                                <div className="comment-container">
                                    {summaryData[activeSNS].comments}
                                    <div className="comment-title">
                                        댓글
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
                    </div>
                </div>

                {/* 탭에 따른 콘텐츠 */}
                <div>
                    {activeTab === "sns" && <SNSContent />}
                    {activeTab === "analysis" && <AccountContent />}
                    {/* {activeTab === "sns" && <SNSContent snsData={snsData} />}
                    {activeTab === "analysis" && <AccountContent accountData={accountData} />} */}
                </div>
            </div>
        </div>
    );
};

export default DetailAnalysis;