// Analysis.jsx 개선 버전 - SNS + 상세 분석 필터 + 고급 필터 UI 포함
import React, { useState, useEffect } from "react";
import "../css/analysis.css";

import instagramLogo from "../../assets/images/instagram_logo.png";
import youtubeLogo from "../../assets/images/youtube_logo.png";
import tiktokLogo from "../../assets/images/tiktok_logo.png";
import rotatelogo from "../../assets/images/rotate.png";
import filter from "../../assets/images/filter.png";
import under_arrow from "../../assets/images/under_arrow.png";

const snsOptions = [
  { name: "인스타그램", key: "instagram", logo: instagramLogo },
  { name: "유튜브", key: "youtube", logo: youtubeLogo },
  { name: "틱톡", key: "tiktok", logo: tiktokLogo },
];

const categories = [
  "일상 / Vlog", "패션", "뷰티", "먹방", "엔터테인먼트", "IT / 전자기기",
  "스포츠", "교육", "키즈", "음악", "인테리어", "펫 / 동물",
  "여행", "게임", "그림", "영화 / 드라마", "요리", "자동차 / 바이크"
];

const followerRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];
const likesRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];
const viewsRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];

const dummyInfluencers = [
  {
    id: 1,
    name: "랄랄",
    sns: ["youtube", "instagram", "tiktok"],
    profileImage: instagramLogo,
    category: ["먹방", "예능"],
    tags: ["하이텐션", "친근함"],
    followers: "52.3만명",
    avgViews: "35만",
    avgLikes: "25만",
    avgComments: "1.2만",
  },
  {
    id: 2,
    name: "이사배",
    sns: ["instagram", "youtube"],
    profileImage: instagramLogo,
    category: ["뷰티"],
    tags: ["전문가 느낌"],
    followers: "120만명",
    avgViews: "50만",
    avgLikes: "30만",
    avgComments: "2만",
  },
  {
    id: 3,
    name: "룩북요정",
    sns: ["instagram"],
    profileImage: instagramLogo,
    category: ["패션"],
    tags: ["감성", "힐링"],
    followers: "20만명",
    avgViews: "10만",
    avgLikes: "8만",
    avgComments: "0.5만",
  },
  {
    id: 4,
    name: "여행수첩",
    sns: ["youtube"],
    profileImage: youtubeLogo,
    category: ["여행"],
    tags: ["시네마틱", "브이로그"],
    followers: "70.1만명",
    avgViews: "45만",
    avgLikes: "20만",
    avgComments: "1.8만",
  },
  {
    id: 5,
    name: "댄스짱",
    sns: ["tiktok"],
    profileImage: tiktokLogo,
    category: ["음악", "댄스"],
    tags: ["에너지넘침"],
    followers: "33만명",
    avgViews: "60만",
    avgLikes: "40만",
    avgComments: "3만",
  },
];

const Analysis = () => {
  const [selectedSNS, setSelectedSNS] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFollowers, setSelectedFollowers] = useState(["", ""]);
  const [selectedLikes, setSelectedLikes] = useState(["", ""]);
  const [selectedViews, setSelectedViews] = useState(["", ""]);
  const [filteredList, setFilteredList] = useState(dummyInfluencers);

  useEffect(() => {
    handleDetailedAnalysis();
  }, [selectedSNS, selectedCategories, selectedFollowers, selectedLikes, selectedViews]);

  const toggleSNS = (snsKey) => {
    setSelectedSNS((prev) =>
      prev.includes(snsKey) ? prev.filter((s) => s !== snsKey) : [...prev, snsKey]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleRangeSelection = (type, range) => {
    const [start, end] = range.split(" ~ ");
    const setSelected = {
      followers: setSelectedFollowers,
      likes: setSelectedLikes,
      views: setSelectedViews,
    }[type];
    setSelected((prev) => (prev[0] === start && prev[1] === end ? ["", ""] : [start, end]));
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedFollowers(["", ""]);
    setSelectedLikes(["", ""]);
    setSelectedViews(["", ""]);
    setFilteredList(dummyInfluencers);
  };

  const handleDetailedAnalysis = () => {
    const result = dummyInfluencers.filter((inf) => {
      const snsMatch = selectedSNS.length === 0 || selectedSNS.some((sns) => inf.sns.includes(sns));
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some((cat) => inf.category.includes(cat));
      return snsMatch && categoryMatch;
    });
    setFilteredList(result);
  };

  return (
    <div className="container">
      <div className="analysis-container">
        <div className="title-container">
          <div className="analysis-title">인플루언서 찾기</div>
        </div>
        <hr />

        <div className="sns-container">
          {snsOptions.map((sns) => (
            <button
              key={sns.key}
              className={`instagram-button ${selectedSNS.includes(sns.key) ? "selected" : ""}`}
              onClick={() => toggleSNS(sns.key)}
            >
              <img src={sns.logo} alt={sns.name} className="sns-icon" />
              {sns.name}
            </button>
          ))}
        </div>
        <hr />

        <div className="advanced-filter-settings-container">
          <button className="advanced-filter-settings" onClick={toggleFilter}>
            <div className="advanced-filter-settings-contents">
              <img src={filter} alt="filter" className="filter-icon" />
              고급필터 설정
              <img src={under_arrow} alt="filter-arrow" className="filter-arrow-icon" />
            </div>
          </button>
          <div className="advanced-filter-content">원하는 조건을 설정하고 맞춤 인플루언서를 찾아보세요.</div>
        </div>

        {isFilterOpen && (
          <div className="filter-container active">
            <div className="tag-container">
              <div className="tag-group">
                <div className="tag1">
                  <div className="tag1-category-title">카테고리</div>
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

                {[{ type: "followers", title: "팔로워 수", ranges: followerRanges, state: selectedFollowers },
                  { type: "likes", title: "평균 좋아요 수", ranges: likesRanges, state: selectedLikes },
                  { type: "views", title: "평균 동영상 조회 수", ranges: viewsRanges, state: selectedViews }].map(({ type, title, ranges, state }, idx) => (
                  <div className={`tag${idx + 2}`} key={type}>
                    <div className="category-title">{title}</div>
                    <div className="analysis-second-filter-range-buttons">
                      {ranges.map((range) => {
                        const [start, end] = range.split(" ~ ");
                        return (
                          <button
                            key={range}
                            className={`filter-button-ver2 ${state[0] === start && state[1] === end ? "selected" : ""}`}
                            onClick={() => handleRangeSelection(type, range)}
                          >
                            {range}
                          </button>
                        );
                      })}
                    </div>
                    <div className="range-inputs">
                      <input type="text" value={state[0]} readOnly placeholder="부터" />
                      <input type="text" value={state[1]} readOnly placeholder="까지" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-actions">
              <button className="filter-reset" onClick={resetFilters}>
                <img src={rotatelogo} alt="rotateLogo" className="sns-icon" /> 필터 초기화
              </button>
              <button className="filter-apply-button" onClick={handleDetailedAnalysis}>필터 적용</button>
            </div>
          </div>
        )}

        <hr />
        <div className="table-container">
          <table className="influencer-table">
            <thead>
              <tr>
                <th>계정</th>
                <th>카테고리</th>
                <th>태그</th>
                <th>팔로워 수</th>
                <th>평균 조회수</th>
                <th>평균 좋아요 수</th>
                <th>평균 댓글 수</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((influencer) => (
                  <tr key={influencer.id}>
                    <td>
                      <div className="account-info-container">
                        <img src={influencer.profileImage} alt={influencer.name} className="profile-img" />
                        <div className="account-details">
                          <div className="account-name">{influencer.name}</div>
                          <div className="account-description">인플루언서 설명</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="category-container">
                        {influencer.category.map((cat, idx) => (
                          <span key={idx} className="category-box">{cat}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="tag-container">
                        {influencer.tags.map((tag, idx) => (
                          <span key={idx} className="tag-box">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td>{influencer.followers}</td>
                    <td>{influencer.avgViews}</td>
                    <td>{influencer.avgLikes}</td>
                    <td>{influencer.avgComments}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>찾으시는 인플루언서가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analysis;