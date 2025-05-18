import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../css/InfluencerRanking.css';
//import influencers from "../../data/influencers";
import snsIcons from "../../data/snsIcons";
import { fetchInfluencerData } from "../../api/influencersApi";
import { getProfileImage } from "../../utils/getProfileImage";

import rotatelogo from "../../assets/images/rotate.png";

const snsPrefixMapping = {
  instagram: "insta",
  youtube: "you",
  tiktok: "tik",
};

// 필터 옵션 리스트
const categories = [
  "일상 / Vlog", "패션", "뷰티", "먹방", "엔터테인먼트", "IT / 전자기기",
  "운동 / 헬스", "교육", "키즈", "음악", "인테리어", "펫 / 동물",
  "여행", "게임", "그림", "영화 / 드라마", "요리", "자동차 / 바이크"
];

const feature = [
  "유머 / 예능", "감성 / 힐링", "강의 / 설명", "시네마틱 / 예술", "하이텐션 / 에너지넘침",
  "카리스마 있음", "친근함", "소통 잘함", "전문가 느낌", "다양한 콘텐츠"
];

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

function InfluencerRanking() {

  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchInfluencerData();

        const transformed = result.map((item) => ({
          name: item.name,
          categories: Array.isArray(item.categories)
            ? item.categories
            : item.categories
              ? [item.categories]
              : [],
          description: '-',
          tags: Array.isArray(item.tags)
            ? item.tags
            : item.tags
              ? [item.tags]
              : [],
          profileImage: getProfileImage(item.name),


          // SNS별 값들 - prefix를 붙여 저장
          insta_followers: item.instaFollowers,
          insta_averageLikes: item.instaAverageLikes,
          insta_averageViews: item.instaAverageViews,
          insta_scopeScore: item.instaFss,

          you_followers: item.youFollowers,
          you_averageLikes: item.youAverageLikes,
          you_averageViews: item.youAverageViews,
          you_scopeScore: item.youFss,

          tik_followers: item.tikFollowers,
          tik_averageLikes: item.tikAverageLikes,
          tik_averageViews: item.tikAverageViews,
          tik_scopeScore: item.tikFss,
        }));

        setInfluencers(transformed);
        setFilteredInfluencers(transformed);
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };

    getData();
  }, []);




  const navigate = useNavigate();
  //const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [platformViewMode, setPlatformViewMode] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]); //선택한 카테고리
  const [selectedFeatures, setSelectedFeatures] = useState([]); //선택한 특징 태그
  const [selectedSNS, setSelectedSNS] = useState("youtube"); //선택한 sns 태그

  const [selectedSort, setSelectedSort] = useState("followers"); // 정렬 기본선택
  const [filteredInfluencers, setFilteredInfluencers] = useState([]); // 필터링된 리스트

  useEffect(() => {
    if (influencers.length > 0) {
      const sorted = [...influencers].sort(
        (a, b) => getSNSValue(b, "followers") - getSNSValue(a, "followers")
      );
      setFilteredInfluencers(sorted);
    }
  }, [influencers]);

  const prefix = snsPrefixMapping[selectedSNS];

  // 이후 getSNSValue 함수나 사용 코드가 여기에 와야 함
  const getSNSValue = (influencer, field) => {
    const prefix = snsPrefixMapping[selectedSNS];
    return influencer[`${prefix}_${field}`];
  };


  // 카테고리 선택 토글
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  // 특징 태그 선택 토글
  const toggleFeature = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  // SNS 필터 선택 (단일 선택)
  const handleSNSFilterChange = (snsKor) => {
    const sns = snsMapping[snsKor];
    setSelectedSNS(sns);
  };

  const snsMapping = {
    "인스타그램": "instagram",
    "유튜브": "youtube",
    "틱톡": "tiktok",
  };

  // 필터 적용 함수
  const applyFilters = () => {
    const filtered = influencers.filter((influencer) => {
      const rawCategories = Array.isArray(influencer.categories) ? influencer.categories : [];
      const translatedCategories = rawCategories.map((cat) => categoryMap[cat] || cat); // 한글 변환

      const influencerTags = Array.isArray(influencer.tags) ? influencer.tags : [];

      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.some((cat) => translatedCategories.includes(cat));
      const featureMatch =
        selectedFeatures.length === 0 || selectedFeatures.some((feat) => influencerTags.includes(feat));

      return categoryMatch && featureMatch;
    });

    setFilteredInfluencers(filtered);
    setShowFilters(false);
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedFeatures([]);
  };

  // 팔로워 순 정렬 함수
  const sortByFollowers = () => {
    const sorted = [...filteredInfluencers].sort(
      (a, b) => getSNSValue(b, "followers") - getSNSValue(a, "followers")
    );
    setFilteredInfluencers(sorted);
    setSelectedSort("followers");
  };

  // SCOPE 점수 순 정렬 함수
  const sortByScope = () => {
    const sorted = [...filteredInfluencers].sort(
      (a, b) => getSNSValue(b, "scopeScore") - getSNSValue(a, "scopeScore")
    );
    setFilteredInfluencers(sorted);
    setSelectedSort('scope');
  };

  // 좋아요 순 정렬 함수
  const sortByLikes = () => {
    const sorted = [...filteredInfluencers].sort(
      (a, b) => getSNSValue(b, "averageLikes") - getSNSValue(a, "averageLikes")
    );
    setFilteredInfluencers(sorted);
    setSelectedSort("likes");
  };

  // 조회수 순 정렬 함수
  const sortByViews = () => {
    const sorted = [...filteredInfluencers].sort(
      (a, b) => getSNSValue(b, "averageViews") - getSNSValue(a, "averageViews")
    );
    setFilteredInfluencers(sorted);
    setSelectedSort('views');
  };

  const formatFollowers = (num) => {
    if (num < 10000) return Math.floor(num).toLocaleString(); // 1만 미만은 정수로 자르고 천 단위 콤마
    return (Math.floor(num / 1000) / 10) + "만"; // 1만 이상은 기존 방식 유지
  };

  // 상태가 변경될 때마다 필터 적용
  useEffect(() => {
    applyFilters(selectedSNS);
  }, [selectedSNS]);

  useEffect(() => {
    if (!platformViewMode) {
      sortByFollowers();
    }
  }, [selectedSNS]);

  return (
    <div>
      <div className="gradBackground">
        <div className="whiteBox">
          <div className="titleText">
            인플루언서 순위
          </div>
          <div className="grayLine"></div>

          <div className="flex-div">

            <div className="ranking-filter-container">
              <button className="ranking-filter-button" onClick={() => setShowFilters(!showFilters)}>
                필터 설정
              </button>

              {showFilters && (
                <div className="ranking-filter-popup">
                  <div className="ranking-filter-content">
                    <div className="flex-div">
                      {/* 카테고리 필터 */}
                      <div className="filter-category-container">
                        <div className="ranking-filter-title">카테고리</div>
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

                      {/* 특징 태그 필터 */}
                      <div className="filter-category-container">
                        <div className="ranking-filter-title">특징 태그</div>
                        <div className="filter-category-buttons">
                          {feature.map((feature) => (
                            <button
                              key={feature}
                              className={`filter-button ${selectedFeatures.includes(feature) ? "selected" : ""}`}
                              onClick={() => toggleFeature(feature)}
                            >
                              {feature}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ranking-filter-apply-button-container">
                      {/* 필터 적용 버튼*/}
                      <button
                        className="filter-reset"
                        onClick={resetFilters}
                        style={{
                          marginRight: "5px",
                          marginTop: "9px",
                          height: "38px"
                        }}
                      >
                        <img src={rotatelogo} alt="rotateLogo" className="filter-analysis-sns-icon"
                          style={{ marginRight: "5px" }} />
                        필터 초기화
                      </button>
                      <button className="ranking-filter-apply-button" onClick={applyFilters}>
                        필터 적용
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grayLine-length" style={{ height: "40px", marginTop: "20px" }}></div>

            {/* SNS 필터 */}
            <div className="ranking-sns-filter-button-container">
              {["유튜브", "인스타그램", "틱톡"].map((option, index) => (
                <button
                  key={index}
                  className={`ranking-sns-filter-button ${selectedSNS === snsMapping[option] && !platformViewMode ? "selected" : ""}`}
                  onClick={() => {
                    setPlatformViewMode(false); // 플랫폼 모드 해제
                    setSelectedSNS(snsMapping[option]); // 선택한 SNS로 설정
                    setSelectedSort("followers"); // 선택된 정렬 상태도 '팔로워'로 변경
                    sortByFollowers(); // 필터링도 '팔로워 순'으로 정렬
                  }}
                >
                  {option}
                </button>
              ))}

              <div className="grayLine-length" style={{ marginLeft: "10px", marginRight: "10px", height: "40px" }}></div>

              <button
                className={`ranking-sns-filter-button ${platformViewMode ? "selected" : ""}`}
                onClick={() => {
                  setPlatformViewMode(true);     // 플랫폼 보기 모드 ON
                  setSelectedSNS("");            // SNS 필터 해제
                }}
              >
                플랫폼 별로 보기
              </button>
            </div>
          </div>

          <div className="grayLine"></div>

          <div className="flex-div" style={{ height: "80%" }}>
            <div className="standard-container">
              <div className="standard-title" >기준</div>
              <div className="standard-button-group">
                <button
                  onClick={sortByFollowers}
                  className={`ranking-standard-button ${selectedSort === 'followers' ? 'selected' : ''}`}
                >
                  팔로워 순
                </button>
                <button
                  onClick={sortByScope}
                  className={`ranking-standard-button ${selectedSort === 'scope' ? 'selected' : ''}`}
                >
                  SCOPE 점수 순
                </button>
                <button
                  onClick={sortByLikes}
                  className={`ranking-standard-button ${selectedSort === 'likes' ? 'selected' : ''}`}
                >
                  좋아요 순
                </button>
                <button
                  onClick={sortByViews}
                  className={`ranking-standard-button ${selectedSort === 'views' ? 'selected' : ''}`}
                >
                  조회수 순
                </button>
              </div>
            </div>
            {/*selected 관련해서 나중에 추적 경로를 해야함*/}

            <div className="grayLine-length" style={{ height: "auto" }}></div>
            <div className="ranking-table-div">

              {platformViewMode ? (
                <div>
                  <table className="ranking-table">
                    <thead>
                      <tr>
                        <th>순위</th>
                        <th style={{ textAlign: "left", paddingLeft: "10px" }}>채널명</th>
                        <th>보유 SNS</th>
                        <th>카테고리</th>
                        <th>태그</th>
                        <th>SCOPE 점수</th>
                        <th>팔로워</th>
                        <th>평균 좋아요</th>
                        <th>평균 조회수</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["youtube", "instagram", "tiktok"].map((platform) => {
                        const prefixMap = {
                          instagram: "insta",
                          youtube: "you",
                          tiktok: "tik"
                        };
                        const prefix = prefixMap[platform];

                        const sortKeyMap = {
                          followers: `${prefix}_followers`,
                          likes: `${prefix}_averageLikes`,
                          views: `${prefix}_averageViews`,
                          scope: `${prefix}_scopeScore`
                        };

                        const sortField = sortKeyMap[selectedSort];

                        const top3 = filteredInfluencers
                          .filter((inf) => inf[sortField] > 0)
                          .sort((a, b) => b[sortField] - a[sortField])
                          .slice(0, 3);

                        return (
                          <React.Fragment key={platform}>
                            <tr className={`platform-section-header ${platform}`}>
                              <td colSpan="9">
                                <div className="platform-title-container">
                                  <img
                                    src={snsIcons[platform]}
                                    alt={`${platform} 아이콘`}
                                    className="platform-icon"
                                  />
                                  {platform === "instagram" && "인스타그램"}
                                  {platform === "youtube" && "유튜브"}
                                  {platform === "tiktok" && "틱톡"}
                                </div>
                              </td>
                            </tr>
                            {top3.map((influencer, index) => (
                              <tr key={influencer.name + platform}>
                                <td>{index + 1}</td>
                                <td>
                                  <div className="ranking-account-info-container">
                                    <img
                                      src={influencer.profileImage}
                                      alt={influencer.name}
                                      className="ranking-profile-img"
                                    />
                                    <div className="account-details">
                                      <div className="account-name" style={{ marginBottom: "5px" }}>
                                        {influencer.name}
                                      </div>
                                      <div className="account-description" style={{ color: "#AFAFAF" }}>
                                        {influencer.description}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="ranking-sns-container">
                                    {["instagram", "youtube", "tiktok"].map((sns) => (
                                      <img
                                        src={snsIcons[sns]}
                                        alt={sns}
                                        key={sns}
                                        className="ranking-sns-icon"
                                      />
                                    ))}
                                  </div>
                                </td>
                                <td>
                                  {influencer.categories.map((cat, i) => (
                                    <span key={i} className="ranking-category-box">
                                      {categoryMap[cat] || cat /* 매핑 없으면 영어 그대로 표시 */}
                                    </span>
                                  ))}
                                </td>
                                <td>
                                  {influencer.tags.map((tag, i) => (
                                    <span key={i} className="ranking-tag-box">
                                      {tag}
                                    </span>
                                  ))}
                                </td>
                                <td>
                                  <div
                                    style={{
                                      width: "130px",
                                      height: "10px",
                                      backgroundColor: "#e0e0e0",
                                      borderRadius: "5px"
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: `${((influencer[`${prefix}_scopeScore`] ?? 0) / 10) * 130
                                          }px`,
                                        height: "10px",
                                        backgroundColor: "#007bff",
                                        borderRadius: "5px"
                                      }}
                                    ></div>
                                  </div>
                                </td>
                                <td>{formatFollowers(influencer[`${prefix}_followers`])}</td>
                                <td>{formatFollowers(influencer[`${prefix}_averageLikes`])}</td>
                                <td>{formatFollowers(influencer[`${prefix}_averageViews`])}</td>
                              </tr>
                            ))}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : filteredInfluencers.length > 0 ? (
                <table className="ranking-table">
                  <thead className="sticky-header">
                    <tr>
                      <th>순위</th>
                      <th style={{ textAlign: "left", paddingLeft: "10px" }}>채널명</th>
                      <th>보유 SNS</th>
                      <th>카테고리</th>
                      <th>태그</th>
                      <th>SCOPE 점수</th>
                      <th>팔로워</th>
                      <th>평균 좋아요</th>
                      <th>평균 조회수</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredInfluencers.map((influencer, index) => (
                        <tr key={index}>
                          <td style={{ fontWeight: "600", fontSize: "14px" }}>{index + 1}</td> {/* 순위 */}

                          <td> {/* 채널명 (이미지+채널명) */}
                            <div className="ranking-account-info-container"
                              // onClick={() => navigate(`/DetailAnalysis/${influencer.you_id}`)}
                              style={{ cursor: "pointer" }}
                            >
                              <img
                                src={influencer.profileImage}
                                alt={influencer.name}
                                className="ranking-profile-img"
                              />
                              <div className="account-details">
                                <div className="account-name" style={{ marginBottom: "5px" }}>{influencer.name}</div>
                                <div className="account-description" style={{ color: "#AFAFAF" }}>{influencer.description}</div>
                              </div>
                            </div>
                          </td>

                          <td>
                            <div className="ranking-sns-container">
                              {['instagram', 'youtube', 'tiktok'].map((platform) => (
                                <img src={snsIcons[platform]} alt={platform} key={platform} className="ranking-sns-icon" />
                              ))}
                            </div>
                          </td>

                          <td>
                            <div className="ranking-category-container">
                              {influencer.categories.map((cat, index) => (
                                <span key={index} className="ranking-category-box">
                                  {categoryMap[cat] || cat /* 매핑 없으면 영어 그대로 표시 */}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td>
                            <div className="ranking-tag-container">
                              {influencer.tags.map((tag, index) => (
                                <span key={index} className="ranking-tag-box">{tag}</span>
                              ))}
                            </div>
                          </td>

                          <td>
                            <div style={{ width: '130px', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
                              <div
                                style={{
                                  width: `${(getSNSValue(influencer, "scopeScore") / 10) * 130}px`,
                                  height: '10px',
                                  backgroundColor: '#007bff',
                                  borderRadius: '5px',
                                }}
                              ></div>
                            </div>
                          </td>

                          <td>{formatFollowers(getSNSValue(influencer, "followers"))}</td> {/* 변환된 값 출력 */}

                          <td>
                            {formatFollowers(getSNSValue(influencer, "averageLikes"))}
                          </td>

                          <td>
                            {formatFollowers(getSNSValue(influencer, "averageViews"))}
                          </td>

                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <p>선택한 필터에 맞는 인플루언서가 없습니다.</p>
              )}

            </div>

          </div> {/* flex-div */}

        </div>
      </div >
    </div >
  );
}

export default InfluencerRanking;
