import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "../css/DetailAnalysis.css"
import { Line } from "react-chartjs-2";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import dummyData from "../../data/dummy.json"; // 데이터는 별도 파일로

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { fetchSNSData } from "../../api/DetailApi.js";

import img1 from "../../assets/images/main2.png";
import img2 from "../../assets/images/main2.png";
import img3 from "../../assets/images/main2.png";
import img4 from "../../assets/images/main2.png";
import img5 from "../../assets/images/main2.png";
import img6 from "../../assets/images/main2.png";
import influencer from "../../assets/images/influencer.png";
import heart from "../../assets/images/heart.png";
import personWhite from "../../assets/images/person.png";
import personGray from "../../assets/images/grayPerson.png";
import good from "../../assets/images/good.png";
import whitegood from "../../assets/images/whitegood.png";
import commentgray from "../../assets/images/commentgray.png";

import comment from "../../assets/images/comment.png";
import dataComment from "../../assets/images/data_comment.png";
import instagramLogo from "../../assets/images/instagram_logo.png";
import youtubeLogo from "../../assets/images/youtube_logo.png";
import tiktokLogo from "../../assets/images/tiktok_logo.png";
import instagramlink from "../../assets/images/link.png";
import InstaReels from "../../assets/images/insta_reels.png";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SNSContent = () => {
    const { id } = useParams(); //연동 관련 변수 추가
    const [snsData, setSnsData] = useState(null); //연동 관련 변수 추가
    const [activeTab, setActiveTab] = useState("followers");
    const [activePage, setActivePage] = useState("analysis");
    const [activeSNS, setActiveSNS] = useState("youtube");
    const [currentPage, setCurrentPage] = useState(1);
    const instaId = snsData?.instaId || id;

    const images = [img1, img2, img3, img4, img5, img6];
    const imagesPerPage = 5;
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
    const totalPages = Math.ceil(images.length / imagesPerPage);

    const instaFollower = [2.4];
    const youtubeFollower = [2.4];
    const tiktokFollower = [2.4];
    // const analysisTags = ["#다정한  #귀여운  #부드러운"];
    const analysisTags = snsData && snsData.tags
    ? snsData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => !/^\d{4}$/.test(tag)) // 숫자 4자리(년도 등) 제거
        .map(tag => `#${tag}`)
    : [];
  

    const instaPost = [1042];

    


    useEffect(() => {
        return () => {
            Object.values(ChartJS.instances).forEach((chart) => chart.destroy());
        };
    }, []);

    //여기 새로 연동 추가-useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSNSData(id);
                setSnsData(data);
            } catch (error) {
                console.error("sns 분석 데이터 불러오기 실패:", error);
            }
        };

        fetchData();
    }, [id]);

    let sponsorships = [];
if (snsData?.instaId && dummyData[snsData.instaId]) {
  sponsorships = dummyData[snsData.instaId]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);
}


    const navigate = useNavigate();

    if (!snsData) {
        return <div>데이터 로딩 중...</div>;
    }

    // const summaryData = {
    //     instagram: {
    //         posts: "10002",
    //         followers: "105.8",
    //         likes: "1.2만",
    //         comments: "450개",
    //         avgLikes: "10000",
    //         avgComments: "100"
    //     },
    //     youtube: {
    //         posts: "20002",
    //         followers: "57.3",
    //         likes: "2.4만",
    //         comments: "1200개",
    //         avgLikes: "23000",
    //         avgComments: "200"

    //     },
    //     tiktok: {
    //         posts: "30002",
    //         followers: "16",
    //         likes: "8000개",
    //         comments: "300개",
    //         avgLikes: "33000",
    //         avgComments: "500"

    //     }
    // };

    // const graphDataSet = {
    //     instagram: {

    //         followers: [15000, 30000, 45000, 70000, 110000, 100600, 210000, 300000, 300000, 400000, 200100, 300000, 300000, 400000, 400500, 400005, 300000, 400000, 450000, 400005, 300000],
    //         likes: [8000, 10050, 20050, 35000, 50000, 70000, 90000, 80000, 15000, 25000, 3500, 5000, 7000, 9000, 800, 1500, 2500, 35000, 5000, 7000, 9000],
    //         comments: [10, 25, 50, 80, 1000, 1030, 160, 1000, 130, 1060, 1000, 1300, 160, 1000, 1300, 160, 100, 130, 160, 100, 130],
    //     },
    //     youtube: {
    //         followers: [20000, 50000, 80000, 120000, 160000, 180000, 200000, 220000, 240000, 260000, 280000, 300000, 320000, 340000, 360000, 380000, 400000, 420000, 440000, 460000, 480000],
    //         likes: [5000, 6000, 8000, 12000, 15000, 17000, 19000, 21000, 23000, 25000, 27000, 29000, 31000, 33000, 35000, 37000, 39000, 41000, 43000, 45000, 47000],
    //         comments: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100],
    //     },
    //     tiktok: {
    //         followers: [10000, 20000, 25000, 30000, 35000, 40000, 45000, 47000, 49000, 51000, 53000, 55000, 57000, 59000, 61000, 63000, 65000, 67000, 69000, 71000, 73000],
    //         likes: [2000, 3000, 4000, 5000, 6000, 6500, 7000, 7200, 7400, 7600, 7800, 8000, 8200, 8400, 8600, 8800, 9000, 9200, 9400, 9600, 9800],
    //         comments: [50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410, 430, 450],
    //     }
    // };


    const summaryData = {
        instagram: {
          posts: snsData.sns.instagram.dailyStats.length,
          followers: (snsData.sns.instagram.followers / 10000).toFixed(1),
          likes: `${Math.round(snsData.sns.instagram.averageLikes)}개`,
          comments: `${Math.round(snsData.sns.instagram.averageComments)}개`,
          avgLikes: snsData.sns.instagram.averageLikes,
          avgComments: snsData.sns.instagram.averageComments,
        },
        youtube: {
          posts: snsData.sns.youtube.dailyStats.length,
          followers: (snsData.sns.youtube.followers / 10000).toFixed(1),
          likes: `${Math.round(snsData.sns.youtube.averageLikes)}개`,
          comments: `${Math.round(snsData.sns.youtube.averageComments)}개`,
          avgLikes: snsData.sns.youtube.averageLikes,
          avgComments: snsData.sns.youtube.averageComments,
        },
        tiktok: {
          posts: snsData.sns.tiktok.dailyStats.length,
          followers: (snsData.sns.tiktok.followers / 10000).toFixed(1),
          likes: `${Math.round(snsData.sns.tiktok.averageLikes)}개`,
          comments: `${Math.round(snsData.sns.tiktok.averageComments)}개`,
          avgLikes: snsData.sns.tiktok.averageLikes,
          avgComments: snsData.sns.tiktok.averageComments,
        }
      };
      
    //   const graphDataSet = {

    //     instagram: {
    //       followers: snsData.followers.instafollowers.map(d => d.followers).reverse(),
    //       likes: snsData.sns.instagram.dailyStats.map(d => d.likes).reverse(),
    //       comments: snsData.sns.instagram.dailyStats.map(d => d.comments).reverse(),
    //     },
    //     youtube: {
    //       followers: snsData.followers.youtubefollowers.map(d => d.followers).reverse(),
    //       likes: snsData.sns.youtube.dailyStats.map(d => d.likes).reverse(),
    //       comments: snsData.sns.youtube.dailyStats.map(d => d.comments).reverse(),
    //     },
    //     tiktok: {
    //       followers: snsData.followers.tiktokfollowers.map(d => d.followers).reverse(),
    //       likes: snsData.sns.tiktok.dailyStats.map(d => d.likes).reverse(),
    //       comments: snsData.sns.tiktok.dailyStats.map(d => d.comments).reverse(),
    //     }
    //   };

    const graphDataSet = {
        instagram: {
            followers: snsData.followers.instafollowers
            .filter(d => d && d.date && d.followers !== undefined) 
            .map(d => d.followers)
            .reverse(),
          
          likes: snsData.sns.instagram.dailyStats
            .filter(d => d && d.date && d.likes !== undefined)
            .map(d => d.likes)
            .reverse(),
          comments: snsData.sns.instagram.dailyStats
            .filter(d => d && d.date && d.comments !== undefined)
            .map(d => d.comments)
            .reverse(),
        },
        youtube: {
          followers: snsData.followers.youtubefollowers
            .filter(d => d && d.date && d.followers !== undefined)
            .map(d => d.followers)
            .reverse(),
          likes: snsData.sns.youtube.dailyStats
            .filter(d => d && d.date && d.likes !== undefined)
            .map(d => d.likes)
            .reverse(),
          comments: snsData.sns.youtube.dailyStats
            .filter(d => d && d.date && d.comments !== undefined)
            .map(d => d.comments)
            .reverse(),
        },
        tiktok: {
          followers: snsData.followers.tiktokfollowers
            .filter(d => d && d.date && d.followers !== undefined)
            .map(d => d.followers)
            .reverse(),
          likes: snsData.sns.tiktok.dailyStats
            .filter(d => d && d.date && d.likes !== undefined)
            .map(d => d.likes)
            .reverse(),
          comments: snsData.sns.tiktok.dailyStats
            .filter(d => d && d.date && d.comments !== undefined)
            .map(d => d.comments)
            .reverse(),
        }
      };
      
      console.log("✅ 인스타그램 followers", snsData.followers.instafollowers);
        console.log("✅ 필터 후 followers", graphDataSet.instagram.followers);

        const followerKeyMap = {
            instagram: "instafollowers",
            youtube: "youtubefollowers",
            tiktok: "tiktokfollowers"
          };
          
          const followerKey = followerKeyMap[activeSNS];
          const followersData = snsData.followers?.[followerKey] || [];
   // 그래프 데이터
   const graphData = {
    labels:
      activeTab === "followers"
        ? followersData
            .filter(d => typeof d.date === "string")
            .map(d => d.date)
            .reverse()
        : snsData.sns?.[activeSNS]?.dailyStats
            ?.filter(d => typeof d.date === "string")
            .map(d => d.date)
            .reverse() || [],
    datasets: [
      {
        label: activeTab,
        data: graphDataSet[activeSNS]?.[activeTab] || [],
        borderColor: "#0071E3",
        pointBackgroundColor: "#0071E3",
        pointBorderColor: "#0071E3",
        tension: 0,
        borderWidth: 4,
      },
    ],
  };
  
  console.log("✅ activeSNS:", activeSNS);
console.log("✅ activeTab:", activeTab);
console.log("✅ graphData.labels:", graphData.labels);
console.log("✅ graphData.datasets[0].data:", graphData.datasets[0].data);

    const getContentTitle = () => {
        if (activeSNS === "instagram") return "인스타그램";
        if (activeSNS === "youtube") return "유튜브";
        if (activeSNS === "tiktok") return "틱톡";
        return "컨텐츠";
    };
    const getContentSubTitle = () => {
        if (activeSNS === "instagram") return "릴스";
        if (activeSNS === "youtube") return "영상 컨텐츠";
        if (activeSNS === "tiktok") return "틱톡";
        return "컨텐츠";
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 800 / 245,
        plugins: {
            legend: { display: false },
            title: { display: false },
            tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "#333",
                titleColor: "#fff",
                bodyColor: "#fff",
                borderWidth: 1,
                borderColor: "#999",
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: "#000",
                    font: { size: 9, family: "Paperlogy", weight: 600 },
                },
            },
            y: {
                grid: {
                    drawBorder: false,
                    drawOnChartArea: true,
                    color: "#CECECE",
                    borderDash: [4, 4],
                },
                ticks: {
                    color: "#000",
                    font: { size: 9, family: "Paperlogy", weight: 600 },
                    maxTicksLimit: 6,
                },
            },
        },
        elements: {
            point: {
                radius: 3,
                backgroundColor: "#0071E3",
            },
            line: {
                borderWidth: 4,
                borderColor: "#0071E3",
            },
        },
    };

    const thumbnailsPerPage = 5;
    const youtubeThumbnails = snsData?.sns?.youtube?.youtubeThumbnails?.filter(t => t.url) || [];
    const totalThumbnailPages = Math.ceil(youtubeThumbnails.length / thumbnailsPerPage);
    const indexOfLastThumb = currentPage * thumbnailsPerPage;
    const indexOfFirstThumb = indexOfLastThumb - thumbnailsPerPage;
    const currentThumbnails = youtubeThumbnails.slice(indexOfFirstThumb, indexOfLastThumb);



    const totalStats = (() => {
        const stats = snsData?.sns?.[activeSNS]?.dailyStats;
        if (!stats || stats.length === 0) return { likes: 0, comments: 0 };
      
        const totalLikes = stats.reduce((sum, entry) => sum + (entry.likes || 0), 0);
        const totalComments = stats.reduce((sum, entry) => sum + (entry.comments || 0), 0);
      
        return { likes: totalLikes, comments: totalComments };
      })();

      const avgStats = {
        likes: snsData?.sns?.[activeSNS]?.averageLikes || 0,
        comments: snsData?.sns?.[activeSNS]?.averageComments || 0
      };
      

      
    return (
        <div>
            <div>
                <div>
                    <div className="sns-buttons">
                    <button
                            className={`youtube-btn ${activeSNS === "youtube" ? "active" : ""}`}
                            onClick={() =>
                                setActiveSNS(activeSNS === "youtube" ? null : "youtube")
                            }
                        >
                            유튜브
                        </button>
                        <button
                            className={`instagram-btn ${activeSNS === "instagram" ? "active" : ""}`}
                            onClick={() =>
                                setActiveSNS(activeSNS === "instagram" ? null : "instagram")
                            }
                        >
                            인스타그램
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
                                    {/* <div className="tab-buttons">
                                        <button
                                            className={`tab-button ${activeTab === "followers" ? "active" : ""}`}
                                            onClick={() => setActiveTab("followers")}
                                        >
                                            <div className="tab-content">
                                                <div className="tab-title">팔로워</div>
                                                <div className="tab-value">
                                                <span className="tab-number">
                                                    {Number(summaryData[activeSNS].followers).toLocaleString()}
                                                    </span>

                                                    <span className="tab-unit">만</span>
                                                </div>

                                            </div>
                                            <img src={person} alt="person" className="person-icon" />




                                        </button>

                                        <button
                                            className={`tab-button ${activeTab === "likes" ? "active" : ""}`}
                                            onClick={() => setActiveTab("likes")}
                                        >
                                            <div className="tab-content">

                                                <div className="tab-title">평균 좋아요</div>
                                                <div className="tab-value">
                                                    <span className="tab-number">{summaryData[activeSNS].avgLikes}</span>
                                                </div>
                                            </div>
                                            <img src={good} alt="good" className="person-icon" />

                                        </button>

                                        <button
                                            className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
                                            onClick={() => setActiveTab("comments")}
                                        >
                                            <div className="tab-content">

                                                <div className="tab-title">평균 댓글</div>
                                                <div className="tab-value">
                                                <span className="tab-number">
                                                    {Number(summaryData?.[activeSNS]?.avgComments || 0).toLocaleString()}
                                                    </span>


                                                </div>
                                            </div>
                                            <img src={comment} alt="" className="person-icon" />

                                        </button>
                                    </div> */}
                                    <div className="tab-buttons">
  {/* 팔로워 */}
  <button
    className={`tab-button ${activeTab === "followers" ? "active" : ""}`}
    onClick={() => setActiveTab("followers")}
  >
    <div className="tab-content">
      <div className="tab-title">팔로워</div>
      <div className="tab-value">
        <span className="tab-number">
          {Number(summaryData[activeSNS].followers).toFixed(1)}
        </span>
        <span className="tab-unit">만</span>
      </div>
    </div>
            <img
        src={activeTab === "followers" ? personWhite : personGray}
        alt="person"
        className="person-icon"
        />
  </button>

  {/* 평균 좋아요 */}
  <button
    className={`tab-button ${activeTab === "likes" ? "active" : ""}`}
    onClick={() => setActiveTab("likes")}
  >
    <div className="tab-content">
      <div className="tab-title">평균 좋아요</div>
      <div className="tab-value">
        <span className="tab-number">
          {Number(summaryData[activeSNS].avgLikes).toLocaleString()}
        </span>
      </div>
    </div>
    <img
    src={activeTab === "likes" ? whitegood : good}
    alt="good"
    className="person-icon"
  />  </button>

  {/* 평균 댓글 */}
  <button
    className={`tab-button ${activeTab === "comments" ? "active" : ""}`}
    onClick={() => setActiveTab("comments")}
  >
    <div className="tab-content">
      <div className="tab-title">평균 댓글</div>
      <div className="tab-value">
        <span className="tab-number">
          {Number(summaryData[activeSNS].avgComments).toLocaleString()}
        </span>
      </div>
    </div>
        <img
        src={activeTab === "comments" ? commentgray : comment }
        alt="comment"
        className="person-icon"
    />  </button>
</div>


                                    <Line data={graphData} options={options} className="chart" />
                                </div>

                                <div className="sns-possession">
                                    <div className="sns-possession-title">보유 SNS</div>
                                    <div className="instagram-box-container">
                                        <div className="box-content-container">
                                            <div className="insta-box-title">인스타그램</div>
                                            <div className="insta-people">팔로워
                                                {summaryData.instagram.followers}
                                                만</div>
                                        </div>

                                        <img src={instagramLogo} alt="Instagram" className="sns-detail-icon" />


                                    </div>


                                    <div className="youtube-box-container">
                                        <div className="box-content-container">
                                            <div className="youtube-box-title">유튜브</div>
                                            <div className="youtube-people">구독자
                                                {summaryData.youtube.followers}
                                                만</div>
                                        </div>
                                        <img src={youtubeLogo} alt="YouTube" className="sns-detail-icon" />
                                    </div>
                                    <div className="tiktok-box-container">
                                        <div className="box-content-container">
                                            <div className="tiktok-box-title">틱톡</div>
                                     
                                     
                                     
                                            <div className="tiktok-people">팔로워
                                                {summaryData.tiktok.followers}

                                                만</div>
                                        </div>
                                        <img src={tiktokLogo} alt="TikTok" className="sns-detail-icon" />

                                    </div>
                                    {/* <div className="sponsership-container">
                                        <div className="sponsership-title">SCOPE 협찬 경력</div>
                                        <button
                                            className="sponsership-more-button"
                                            onClick={() => navigate(`/sponsorships/${snsData.instaId}`)}
                                            >
                                            더보기
                                            </button>
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

                                    </div> */}

<div className="sponsership-container">
  <div className="sponsership-title">SCOPE 협찬 경력</div>

  {/* instaId가 존재할 때만 "더보기" 버튼 표시 */}
  {snsData?.instaId && (
  <button
    className="sponsership-more-button"
    onClick={() => navigate(`/sponsorships/${snsData.instaId}`)}
  >
    더보기
  </button>
)}


  {/* sponsorships가 존재할 경우 최근 2개만 표시 */}
  {Array.isArray(sponsorships) && sponsorships.length > 0 ? (
    sponsorships
      .slice(-2) // ✨ 최근 2개만 표시
      .map((item, index) => (
        <div key={index} className="sponsership-content-container">
          <div className="sponsership-sns">{item.sns}</div>
          <div className="sponsership-content-title">{item.title}</div>
          <div className="sponsership-date">{item.date}</div>
          <div
            className={`sponsership-tag ${
              item.category === "식품"
                ? "pink-tag"
                : item.category === "음식"
                ? "orange-tag"
                : ""
            }`}
          >
            {item.category}
          </div>
        </div>
      ))
  ) : (
    <div className="sponsership-content-container">
      <div className="sponsership-content-title">협찬 이력이 없습니다</div>
    </div>
  )}
</div>


                                </div>
                            </div>

                            <div className="end-section">
                                <div className="instagram-content">

                                    <div className="contents-section-title">{getContentTitle()} 컨텐츠</div>
                                    <div className="contents-section-sub-title-container">
                                        <img src={InstaReels} alt="InstaReels" className="insta-reels-icon" />
                                        <div className="contents-section-sub-title">{getContentSubTitle()}</div>

                                    </div>
                                    {activeSNS === "youtube" && (
                                        <div className="image-grid-container">
                                            {/* <div className="image-grid-title">{getContentSubTitle()} </div> */}

                                            <div className="image-grid">
                                            {currentThumbnails.length > 0 ? (
                                                currentThumbnails.map((thumb, index) => (
                                                <div
                                                    key={index}
                                                    className="sns-content-img"
                                                    style={{ backgroundImage: `url(${thumb.url})` }}
                                                />
                                                ))
                                            ) : (
                                                <div className="no-images-message">이미지가 없습니다</div>
                                            )}
                                            </div>

                                            <div className="pagination">
                                            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>&lt;</button>
                                            {[...Array(totalThumbnailPages)].map((_, index) => (
                                                <button
                                                key={index}
                                                className={currentPage === index + 1 ? "active" : ""}
                                                onClick={() => setCurrentPage(index + 1)}
                                                >
                                                {index + 1}
                                                </button>
                                            ))}
                                            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalThumbnailPages))}>&gt;</button>
                                            </div>
                                        </div>
                                        )}





                                    {/* <div className="statistics">
                                        <div className="stat-box">
                                            <p className="stat-label">총합 데이터</p>
                                            <div className="stat-containers">
                                                <div className="stat-value-container">
                                                    <img src={heart} alt="heart" className="data-heart-icon" />

                                                    <p className="stat-value">좋아요</p>
                                                    <p className="stat-good-value">  {summaryData[activeSNS].likes}
                                                    </p>
                                                </div>
                                                <div className="stat-value-container">

                                                    <img src={dataComment} alt="dataComment" className="data-comment-icon" />

                                                    <p className="stat-value">댓글</p>
                                                    <p className="stat-comment-value">
                                                        {summaryData[activeSNS].comments}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="stat-box">
                                            <p className="stat-label">평균 데이터</p>
                                            <div className="stat-containers">
                                                <div className="stat-value-container">
                                                    <img src={heart} alt="heart" className="data-heart-icon" />

                                                    <p className="stat-value">좋아요</p>
                                                    <p className="stat-good-value"> {summaryData[activeSNS].avgLikes}개</p>
                                                </div>
                                                <div className="stat-value-container">

                                                    <img src={dataComment} alt="dataComment" className="data-comment-icon" />

                                                    <p className="stat-value">댓글</p>
                                                    <p className="stat-comment-value">{summaryData[activeSNS].avgComments}개
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div> */}

                                    <div className="statistics">
                                    <div className="stat-box">
                                        <p className="stat-label">총합 데이터</p>
                                        <div className="stat-containers">
                                        <div className="stat-value-container">
                                            <img src={heart} alt="heart" className="data-heart-icon" />
                                            <p className="stat-value">좋아요</p>
                                            <p className="stat-good-value">{totalStats.likes.toLocaleString()}개</p>
                                        </div>
                                        <div className="stat-value-container">
                                            <img src={dataComment} alt="comment" className="data-comment-icon" />
                                            <p className="stat-value">댓글</p>
                                            <p className="stat-comment-value">{totalStats.comments.toLocaleString()}개</p>
                                        </div>
                                        </div>
                                    </div>

                                    <div className="stat-box">
                                        <p className="stat-label">평균 데이터</p>
                                        <div className="stat-containers">
                                        <div className="stat-value-container">
                                            <img src={heart} alt="heart" className="data-heart-icon" />
                                            <p className="stat-value">좋아요</p>
                                            <p className="stat-good-value">{Math.round(avgStats.likes).toLocaleString()}개</p>
                                        </div>
                                        <div className="stat-value-container">
                                            <img src={dataComment} alt="comment" className="data-comment-icon" />
                                            <p className="stat-value">댓글</p>
                                            <p className="stat-comment-value">{Math.round(avgStats.comments).toLocaleString()}개</p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    <div className="stat-box-tag">
                                        <div className="stat-box-titles">
                                            <div className="stat-box-tag-title">태그</div>
                                            <div className="stat-box-tag-subtitle">인플루언서 분석 기반 태그</div>
                                        </div>
                                        {/* <div className="stat-box-tags">
                                        {analysisTags.map((tag, index) => (
                                            <span key={index} className="tag-item">
                                            {tag}
                                            </span>
                                        ))}
                                        </div> */}

<div className="stat-box-tags">
  {analysisTags.map((tag, index) => (
    <span key={index} className="tag-item">
      {tag}
    </span>
  ))}
</div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SNSContent;
