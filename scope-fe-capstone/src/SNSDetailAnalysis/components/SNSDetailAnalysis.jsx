import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import "../css/snsdetailanalysis.css"; // CSS 파일 추가
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

//img파일 import 
import img1 from "../../assets/images/main2.png";
import img2 from "../../assets/images/main2.png";
import img3 from "../../assets/images/main2.png";
import img4 from "../../assets/images/main2.png";
import img5 from "../../assets/images/main2.png";
import img6 from "../../assets/images/main2.png";
import influencer from "../../assets/images/influencer.png";
// SNS 로고 이미지 import
import instagramLogo from "../../assets/images/instagram_logo.png";
import youtubeLogo from "../../assets/images/youtube_logo.png"; 
import tiktokLogo from "../../assets/images/tiktok_logo.png"; 


import instagramlink from "../../assets/images/link.png";
import InstaReels from "../../assets/images/insta_reels.png"; 
// 차트 모듈 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SNSDetailAnalysis = () => {
  const [activeTab, setActiveTab] = useState("followers");
  const [activePage, setActivePage] = useState("analysis");
  const images = [img1, img2, img3, img4, img5, img6];
  const instaFollower=[2.4];
  const youtubeFollower=[2.4];
  const tiktokFollower=[2.4];
  const analysisTags=["#다정한  #귀여운  #부드러운"]
  const [activeSNS, setActiveSNS] = useState(null);
  const instaPost=[1042];
  // 더미 데이터
  const data = {
    followers: [150, 300, 450, 700, 1100, 1600, 2100,3000,3000,4000,2100,3000,3000,4000,4500,4005,3000,4000,4500,4005,3000,4000,4500,4005],
    likes: [80, 150, 250, 350, 500, 700, 900,80, 150, 250, 350, 500, 700, 900,80, 150, 250, 350, 500, 700, 900,80, 150, 250, 350, 500, 700, 900],
    comments: [10, 25, 50, 80, 100, 130, 160, 100, 130, 160, 100, 130, 160, 100, 130, 160, 100, 130, 160, 100, 130, 160, 100, 130, 160],
  };

  const graphData = {
    labels: ["3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7","3/8","3/9","3/10","3/11","3/12","3/13","3/14","3/15","3/16","3/17","3/18",
      "3/19","3/20","3/21"
    ],

    
    datasets: [
      {
        label: activeTab,
        data: data[activeTab],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.5,
      },
    ],
  };

  useEffect(() => {
    return () => {
      Object.values(ChartJS.instances).forEach(chart => chart.destroy());
    };
  }, []);

  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-info">
          <div className="profile-info-title">
            인플루언서 분석
          </div>
          <hr/>
          
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
        {instaPost}
        <div className="post-title">
          게시물 
        </div>
        
        </div>
        <div className="follower-container">
        {instaPost}
        <div className="follower-title">
          팔로워  
        </div>
        
        </div>
        <div className="comment-container">
        {instaPost}
        <div className="comment-title">
          댓글 
        </div>

        </div>
        </div>
       
       

          </div>
          
          
          </div>
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

        <div className="sns-buttons">
          <button
            className={`instagram-btn ${activeSNS === "instagram" ? "active" : ""}`}
            onClick={() =>
              setActiveSNS(activeSNS === "instagram" ? null : "instagram")
            }
          >
            인스타그램
          </button>
          <button
            className={`youtube-btn ${activeSNS === "youtube" ? "active" : ""}`}
            onClick={() =>
              setActiveSNS(activeSNS === "youtube" ? null : "youtube")
            }
          >
            유튜브 
          </button>
          <button
            className={`tiktok-btn ${activeSNS === "tiktok" ? "active" : ""}`}
            onClick={() =>
              setActiveSNS(activeSNS === "tiktok" ? null : "tiktok")
            }
          >
            틱톡  
          </button>

  
      
        </div>

        {activePage === "analysis" && (
          <div className="sns-analysis-container">
          <div className="middle-section">

          <div className="analysis-section">
            
            <div className="section-title">분석 리포트</div>
            <div className="section-sub-title">최근 활동 추이</div>
            <div className="tab-buttons">
              <button className={activeTab === "followers" ? "active" : ""} onClick={() => setActiveTab("followers")}>
                <div className="total-people-number">팔로워</div>

                <div className="detail-tab-button-container">
                  <span className="detail-numbering">32.4</span><span className="detail-unit">만</span>

                  </div>


              </button>
              <button className={activeTab === "likes" ? "active" : ""} onClick={() => setActiveTab("likes")}>
              <div className="average-likes-number">평균 좋아요</div>
              <span className="detail-numbering">32.4</span><span className="detail-unit">만</span>


              </button>
              <button className={activeTab === "comments" ? "active" : ""} onClick={() => setActiveTab("comments")}>
              <div className="average-comment-number">평균 댓글</div>
              <span className="detail-numbering">32.4</span><span className="detail-unit">만</span>

              </button>
            </div>
            <Line data={graphData} className="chart" />
          </div>

          <div className="sns-possession">
            <div className="sns-possession-title">보유 SNS</div>
            <div className="instagram-box-container">
              <div className="box-content-container">
              <div className="insta-box-title">인스타그램</div>
              <div className="insta-people">팔로워 {instaFollower}만</div>
              </div>

              <img src={instagramLogo} alt="Instagram" className="sns-detail-icon" />


            </div>


            <div className="youtube-box-container">
              <div className="box-content-container">
            <div className="youtube-box-title">유튜브</div>
              <div className="youtube-people">구독자 {instaFollower}만</div>
              </div>
              <img src={youtubeLogo} alt="YouTube" className="sns-detail-icon" />
            </div>
            <div className="tiktok-box-container">
              <div className="box-content-container">
            <div className="tiktok-box-title">틱톡</div>
              <div className="tiktok-people">팔로워 {instaFollower}만</div>
              </div>
              <img src={tiktokLogo} alt="TikTok" className="sns-detail-icon" />

            </div>
            <div className="sponsership-container">
              <div className="sponsership-title">SCOPE 협찬 경력</div>
              <button className="sponsership-more-button">더보기</button>
              <div className="sponsership-content-container">
                <div className="sponsership-sns">[릴스]</div>
                <div className="sponsership-content-title">꼬북칩</div>
                <div className="sponsership-date">2025.01</div>
                <div className={`sponsership-tag ${"식품" === "식품" ? "pink-tag" : "식품" === "음식" ? "orange-tag" : ""}`}>
                식품
              </div>
             </div>
              <div className="sponsership-content-container">
                
              <div className="sponsership-sns">[릴스]</div>
              <div className="sponsership-content-title">꼬북칩</div>
              <div className="sponsership-date">2025.01</div>
              <div className={`sponsership-tag ${"음식" === "식품" ? "pink-tag" : "음식" === "음식" ? "orange-tag" : ""}`}>
  음식
</div>
              </div>

            </div>
            </div>
</div>

          <div className="end-section">
          <div className="instagram-content">

          <div className="contents-section-title">인스타그램 컨텐츠</div>
          <div className="contents-section-sub-title-container">
          <img src={InstaReels} alt="InstaReels" className="insta-reels-icon" />
          <div className="contents-section-sub-title">릴스</div>

          </div>
          <div className="image-grid-container">


          <div className="image-grid-title">릴스 이미지</div>
          <div className="image-grid">
      {images.map((image, index) => (
        <div 
          key={index} 
          className="sns-content-img" 
          style={{ backgroundImage: `url(${image})` }} 
        />
      ))}
         </div>
         <button className="more-shorts-image"> 더보기</button>
          </div>
          <div className="statistics">
          <div className="stat-box">
            <p className="stat-label">총합 데이터</p>
            <p className="stat-value">좋아요 ❤️ 18,765 개</p>
          </div>
          <div className="stat-box">
            <p className="stat-label">평균 댓글</p>
            <p className="stat-value">댓글 ❤️ 2,890 개</p>
          </div>
          </div>
          <div className="stat-box-tag">
            <div className="stat-box-titles">
          <div className="stat-box-tag-title">태그</div>
          <div className="stat-box-tag-subtitle">인플루언서 분석 기반 태그</div>
          </div>
          <div className="stat-box-tags">{analysisTags}</div>

        </div>
       
        </div>

       
        </div>
        
          </div>
        )}

       
      </div>
    </div>
  );
};

export default SNSDetailAnalysis;