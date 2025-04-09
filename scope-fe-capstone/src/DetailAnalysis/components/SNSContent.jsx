import React, { useState, useEffect } from "react";
import "../css/DetailAnalysis.css"
import { Line } from "react-chartjs-2";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
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

import img1 from "../../assets/images/main2.png";
import img2 from "../../assets/images/main2.png";
import img3 from "../../assets/images/main2.png";
import img4 from "../../assets/images/main2.png";
import img5 from "../../assets/images/main2.png";
import img6 from "../../assets/images/main2.png";
import influencer from "../../assets/images/influencer.png";
import heart from "../../assets/images/heart.png";
import person from "../../assets/images/person.png";
import good from "../../assets/images/good.png";
import comment from "../../assets/images/comment.png";
import dataComment from "../../assets/images/data_comment.png";
import instagramLogo from "../../assets/images/instagram_logo.png";
import youtubeLogo from "../../assets/images/youtube_logo.png";
import tiktokLogo from "../../assets/images/tiktok_logo.png";
import instagramlink from "../../assets/images/link.png";
import InstaReels from "../../assets/images/insta_reels.png";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SNSContent = () => {
    const [activeTab, setActiveTab] = useState("followers");
    const [activePage, setActivePage] = useState("analysis");
    const [activeSNS, setActiveSNS] = useState("instagram");
    const [currentPage, setCurrentPage] = useState(1);

    const images = [img1, img2, img3, img4, img5, img6];
    const imagesPerPage = 5;
    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
    const totalPages = Math.ceil(images.length / imagesPerPage);

    const instaFollower = [2.4];
    const youtubeFollower = [2.4];
    const tiktokFollower = [2.4];
    const analysisTags = ["#다정한  #귀여운  #부드러운"];
    const instaPost = [1042];

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

    const graphDataSet = {
        instagram: {

            followers: [15000, 30000, 45000, 70000, 110000, 100600, 210000, 300000, 300000, 400000, 200100, 300000, 300000, 400000, 400500, 400005, 300000, 400000, 450000, 400005, 300000],
            likes: [8000, 10050, 20050, 35000, 50000, 70000, 90000, 80000, 15000, 25000, 3500, 5000, 7000, 9000, 800, 1500, 2500, 35000, 5000, 7000, 9000],
            comments: [10, 25, 50, 80, 1000, 1030, 160, 1000, 130, 1060, 1000, 1300, 160, 1000, 1300, 160, 100, 130, 160, 100, 130],
        },
        youtube: {
            followers: [20000, 50000, 80000, 120000, 160000, 180000, 200000, 220000, 240000, 260000, 280000, 300000, 320000, 340000, 360000, 380000, 400000, 420000, 440000, 460000, 480000],
            likes: [5000, 6000, 8000, 12000, 15000, 17000, 19000, 21000, 23000, 25000, 27000, 29000, 31000, 33000, 35000, 37000, 39000, 41000, 43000, 45000, 47000],
            comments: [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1050, 1100],
        },
        tiktok: {
            followers: [10000, 20000, 25000, 30000, 35000, 40000, 45000, 47000, 49000, 51000, 53000, 55000, 57000, 59000, 61000, 63000, 65000, 67000, 69000, 71000, 73000],
            likes: [2000, 3000, 4000, 5000, 6000, 6500, 7000, 7200, 7400, 7600, 7800, 8000, 8200, 8400, 8600, 8800, 9000, 9200, 9400, 9600, 9800],
            comments: [50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410, 430, 450],
        }
    };

    const graphData = {
        labels: [
            "3/1", "3/2", "3/3", "3/4", "3/5", "3/6", "3/7",
            "3/8", "3/9", "3/10", "3/11", "3/12", "3/13",
            "3/14", "3/15", "3/16", "3/17", "3/18", "3/19",
            "3/20", "3/21"
        ],
        datasets: [
            {
                label: activeTab,
                data: graphDataSet[activeSNS][activeTab],
                borderColor: "#9757FE",
                pointBackgroundColor: "#9757FE",
                pointBorderColor: "#9757FE",
                tension: 0,
                borderWidth: 4,
            },
        ],
    };


    const getContentTitle = () => {
        if (activeSNS === "instagram") return "인스타그램";
        if (activeSNS === "youtube") return "유튜브";
        if (activeSNS === "tiktok") return "틱톡";
        return "컨텐츠";
    };
    const getContentSubTitle = () => {
        if (activeSNS === "instagram") return "릴스";
        if (activeSNS === "youtube") return "쇼츠";
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
                backgroundColor: "#9757FE",
            },
            line: {
                borderWidth: 4,
                borderColor: "#9757FE",
            },
        },
    };

    useEffect(() => {
        return () => {
            Object.values(ChartJS.instances).forEach((chart) => chart.destroy());
        };
    }, []);

    return (
        <div>
            <div>
                <div>
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
                                        <button
                                            className={`tab-button ${activeTab === "followers" ? "active" : ""}`}
                                            onClick={() => setActiveTab("followers")}
                                        >
                                            <div className="tab-content">
                                                <div className="tab-title">팔로워</div>
                                                <div className="tab-value">
                                                    <span className="tab-number">  {summaryData[activeSNS].followers}
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
                                                    <span className="tab-number">{summaryData[activeSNS].avgComments}</span>
                                                </div>
                                            </div>
                                            <img src={comment} alt="" className="person-icon" />

                                        </button>
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

                                    <div className="contents-section-title">{getContentTitle()} 컨텐츠</div>
                                    <div className="contents-section-sub-title-container">
                                        <img src={InstaReels} alt="InstaReels" className="insta-reels-icon" />
                                        <div className="contents-section-sub-title">{getContentSubTitle()}</div>

                                    </div>
                                    <div className="image-grid-container">


                                        <div className="image-grid-title">{getContentSubTitle()} 이미지</div>
                                        {/* <div className="image-grid">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="sns-content-img" 
              style={{ backgroundImage: `url(${image})` }} 
            />
          ))}
             </div> */}

                                        <div className="image-grid">
                                            {currentImages.map((image, index) => ( // 기존 images.map → currentImages.map
                                                <div
                                                    key={index}
                                                    className="sns-content-img"
                                                    style={{ backgroundImage: `url(${image})` }}
                                                />
                                            ))}
                                        </div>
                                        <div className="pagination">
                                            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>&lt;</button>
                                            {[...Array(totalPages)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={currentPage === index + 1 ? "active" : ""}
                                                    onClick={() => setCurrentPage(index + 1)}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>&gt;</button>
                                        </div>
                                    </div>



                                    <div className="statistics">
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
        </div>
    );
};

export default SNSContent;
