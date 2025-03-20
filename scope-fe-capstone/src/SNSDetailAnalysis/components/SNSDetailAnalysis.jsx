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


// 차트 모듈 등록
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SNSDetailAnalysis = () => {
  const [activeTab, setActiveTab] = useState("followers");
  const [activePage, setActivePage] = useState("analysis");
  const images = [img1, img2, img3, img4, img5, img6];

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
          <img src="https://via.placeholder.com/150" alt="Influencer" className="profile-img" />
          <div>
            <h2 className="profile-name">fake_influencer</h2>
            <p className="profile-tag">여행 • 라이프스타일</p>
          </div>
        </div>

        <div className="sns-buttons">
          <button className="instagram-btn" onClick={() => setActivePage("instagram")}> 
            <FaInstagram className="icon" /> 인스타그램
          </button>
          <button className="youtube-btn" onClick={() => setActivePage("youtube")}> 
            <FaYoutube className="icon" /> 유튜브
          </button>
          <button className="tiktok-btn" onClick={() => setActivePage("tiktok")}> 
            <FaTiktok className="icon" /> 틱톡
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
                팔로워
              </button>
              <button className={activeTab === "likes" ? "active" : ""} onClick={() => setActiveTab("likes")}>
                평균 좋아요
              </button>
              <button className={activeTab === "comments" ? "active" : ""} onClick={() => setActiveTab("comments")}>
                평균 댓글
              </button>
            </div>
            <Line data={graphData} className="chart" />
          </div>

          <div className="sns-possession">
            <div className="sns-possession-title">보유 SNS</div>
            <div className="instagram-box-container"></div>
            <div className="youtube-box-container"></div>
            <div className="tiktok-box-container"></div>
            <div className="sponsership-container">
              <div className="sponsership-title">SCOPE 협찬 경력</div>
              <button className="sponsership-more-button">더보기</button>
              <div className="sponsership-content-container">
                
                <div className="sponsership-sns">[릴스]</div>
                <div className="sponsership-content-title">꼬북칩</div>
                <div className="sponsership-date">2025.01</div>
                <div className="sponsership-tag">식품</div>
                </div>
              <div className="sponsership-content-container">
                
              <div className="sponsership-sns">[릴스]</div>
              <div className="sponsership-content-title">꼬북칩</div>
              <div className="sponsership-date">2025.01</div>
              <div className="sponsership-tag">식품</div>
              </div>

            </div>
            </div>
</div>

          <div className="end-section">
          <div className="instagram-content">
          <div className="contents-section-title">인스타그램 컨텐츠</div>
          <div className="contents-section-sub-title">릴스</div>
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
          </div>
        </div>

        <div className="statistics">
          <div className="stat-box">
            <p className="stat-label">총합 데이터</p>
            <p className="stat-value">❤️ 18,765 개</p>
          </div>
          <div className="stat-box">
            <p className="stat-label">평균 데이터</p>
            <p className="stat-value">❤️ 2,890 개</p>
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