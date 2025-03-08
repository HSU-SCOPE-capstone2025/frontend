import React, { useState } from "react";
import "../css/analysis.css";

// SNS 로고 이미지 import
import instagramLogo from "../../assets/images/instagram_logo.png";
import youtubeLogo from "../../assets/images/youtube_logo.png"; 
import tiktokLogo from "../../assets/images/tiktok_logo.png"; 

//고급 필터 설정 이미지 
import filter from "../../assets/images/filter.png"; 
import under_arrow from "../../assets/images/under_arrow.png"; 
// 프로필 이미지 import
import risabaeProfile from "../../assets/images/risabae_profile.png";


// 필터 옵션 리스트
const categories = [
  "일상 / Vlog", "패션", "뷰티", "먹방", "엔터테인먼트", "IT / 전자기기",
  "스포츠", "교육", "키즈", "음악", "인테리어", "펫 / 동물",
  "여행", "게임", "그림", "영화 / 드라마", "요리", "자동차 / 바이크"
];

const followerRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];
const likesRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];
const viewsRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];

<hr />

const Analysis = () => {
    // 필터 상태
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFollowers, setSelectedFollowers] = useState(["", ""]);
    const [selectedLikes, setSelectedLikes] = useState(["", ""]);
    const [selectedViews, setSelectedViews] = useState(["", ""]);

    // 필터 버튼 토글 (고급 필터 창 열고 닫기)
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };


   // 인플루언서 리스트 데이터
   const [influencers, setInfluencers] = useState([
    {
      id: 1,
      profileImage: risabaeProfile, // import한 이미지 사용
      name: "risabae_art",
      category: ["패션", "뷰티"],
      tags: ["패션", "뷰티"],
      followers: "7.9만명",
      avgViews: "20.3만",
      avgLikes: "15.6만",
      avgComments: "10.1만",
    },
    
  ]);

    // 카테고리 필터 선택 (다중 선택)
    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category) // 이미 선택된 경우 제거
                : [...prev, category] // 선택되지 않은 경우 추가
        );
    };

    // 버튼 클릭 시 첫 번째 클릭한 값은 '부터', 두 번째 클릭한 값은 '까지'로 설정
    const handleRangeSelection = (type, value) => {
        if (type === "followers") {
            setSelectedFollowers((prev) => prev[0] === "" ? [value, ""] : [prev[0], value]);
        } else if (type === "likes") {
            setSelectedLikes((prev) => prev[0] === "" ? [value, ""] : [prev[0], value]);
        } else if (type === "views") {
            setSelectedViews((prev) => prev[0] === "" ? [value, ""] : [prev[0], value]);
        }
    };

    // 필터 초기화
    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedFollowers(["", ""]);
        setSelectedLikes(["", ""]);
        setSelectedViews(["", ""]);
    };

    return (
        <div className="container">
            <div className="analysis-container">
            <div className="title-container">
                <div className="analysis-title">인플루언서 찾기</div>
            </div>
            <hr />

            {/* SNS 버튼 */}
            <div className="sns-container">
                <button className="instagram-button">
                    <img src={instagramLogo} alt="Instagram" className="sns-icon" />
                    인스타그램
                </button>
                <button className="youtube-button">
                    <img src={youtubeLogo} alt="YouTube" className="sns-icon" />
                    유튜브
                </button>
                <button className="tiktok-button">
                    <img src={tiktokLogo} alt="TikTok" className="sns-icon" />
                    틱톡
                </button>
            </div>
            <hr />

        
            {/* 고급 필터 버튼 */}
            <div className="advanced-filter-settings-container">
                <button className="advanced-filter-settings" onClick={toggleFilter}>
                <div className="advanced-filter-settings-contents">

                <img src={filter} alt="filter" className="filter-icon" />
                    고급필터 설정
                <img src={under_arrow} alt="filter-arrow" className="filter-arrow-icon" />
                </div>

                </button>
                <div className="advanced-filter-content">
                원하는 조건을 설정하고 맞춤 인플루언서를 찾아보세요.
                </div>
            </div>
            <hr/>

            {/* 고급 필터 창 */}
            {isFilterOpen && (
                <div className="filter-container active">
                    <div className="tag-container">
                        

                        {/* 팔로워 수, 좋아요 수, 조회 수를 한 줄로 정렬 */}
                        <div className="tag-group">
                            {/* 카테고리 필터 */}
                        <div className="tag1">
                            <div className="category-title">카테고리</div>
                            <div className="filter-category-buttons">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`filter-button ${selectedCategories.includes(category) ? "selected" : ""}`}
                                        onClick={() => toggleCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                            {/* 팔로워 수 */}
                            <div className="tag2">
                                <div className="category-title">팔로워 수</div>
                                <div className="filter-range-buttons">
                                    {followerRanges.map((range) => (
                                        <button
                                            key={range}
                                            className={`filter-button-ver2 ${selectedFollowers.includes(range) ? "selected" : ""}`}
                                            onClick={() => handleRangeSelection("followers", range)}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                                <div className="range-inputs">
                                    <input type="text" value={selectedFollowers[0]} readOnly placeholder="부터" />
                                    <input type="text" value={selectedFollowers[1]} readOnly placeholder="까지" />
                                </div>
                            </div>

                            {/* 평균 좋아요 수 */}
                            <div className="tag3">
                                <div className="category-title">평균 좋아요 수</div>
                                <div className="filter-range-buttons">
                                    {likesRanges.map((range) => (
                                        <button
                                            key={range}
                                            className={`filter-button-ver2 ${selectedLikes.includes(range) ? "selected" : ""}`}
                                            onClick={() => handleRangeSelection("likes", range)}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                                <div className="range-inputs">
                                    <input type="text" value={selectedLikes[0]} readOnly placeholder="부터" />
                                    <input type="text" value={selectedLikes[1]} readOnly placeholder="까지" />
                                </div>
                            </div>

                            {/* 평균 동영상 조회 수 */}
                            <div className="tag4">
                                <div className="category-title">평균 동영상 조회 수</div>
                                <div className="filter-range-buttons">
                                    {viewsRanges.map((range) => (
                                        <button
                                            key={range}
                                            className={`filter-button-ver2 ${selectedViews.includes(range) ? "selected" : ""}`}
                                            onClick={() => handleRangeSelection("views", range)}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                                <div className="range-inputs">
                                    <input type="text" value={selectedViews[0]} readOnly placeholder="부터" />
                                    <input type="text" value={selectedViews[1]} readOnly placeholder="까지" />
                                </div>
                            </div>
                        </div>

                        {/* 필터 초기화 및 적용 버튼 */}
                        <div className="filter-actions">
                            <button className="filter-reset" onClick={resetFilters}>필터 초기화</button>
                            <button className="filter-apply">필터 적용</button>
                        </div>

                        
                    </div>
                </div>
            )}

<div className="table-container">
                <table className="influencer-table">
                    <thead>
                        <tr>
                            <th>프로필</th>
                            <th>카테고리</th>
                            <th>태그</th>
                            <th>팔로워 수</th>
                            <th>평균 조회수</th>
                            <th>평균 좋아요 수</th>
                            <th>평균 댓글 수</th>
                        </tr>
                    </thead>
                   

<tbody>
  {influencers.map((influencer) => (
    <tr key={influencer.id}>
      <td>
        <div className="account-info-container">
          <img
            src={influencer.profileImage}
            alt={influencer.name}
            className="profile-img"
          />
          <div className="account-details">
            <div className="account-name">{influencer.name}</div>
            <div className="account-description">메이크업아티스트 이사배</div>
          </div>
        </div>
      </td>
      <td>{influencer.category.join(", ")}</td>
      <td>{influencer.tags.join(", ")}</td>
      <td>{influencer.followers}</td>
      <td>{influencer.avgViews}</td>
      <td>{influencer.avgLikes}</td>
      <td>{influencer.avgComments}</td>
    </tr>
  ))}
</tbody>

                </table>
            </div>
            
        </div>
        </div>

        
    );
};

export default Analysis;
