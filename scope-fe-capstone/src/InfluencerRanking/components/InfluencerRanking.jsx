import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import '../css/InfluencerRanking.css';
import influencers from "../../data/influencers";
import snsIcons from "../../data/snsIcons";
//import { fetchInfluencerRanking } from '../../api/influencersApi';

// 필터 옵션 리스트
const categories = [
  "일상 / Vlog", "패션", "뷰티", "먹방", "엔터테인먼트", "IT / 전자기기",
  "스포츠", "교육", "키즈", "음악", "인테리어", "펫 / 동물",
  "여행", "게임", "그림", "영화 / 드라마", "요리", "자동차 / 바이크"
];

const feature = [
  "유머 / 예능", "감성 / 힐링", "강의 / 설명", "시네마틱 / 예술", "하이텐션 / 에너지넘침",
  "카리스마 있음", "친근함", "소통 잘함", "전문가 느낌", "다양한 콘텐츠"
];

function InfluencerRanking() {
  //const [influencers, setInfluencers] = useState([]);
  //const [totCnt, setTotCnt] = useState(0);
  //const [loading, setLoading] = useState(true);

  //const navigate = useNavigate();
  //const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [platformViewMode, setPlatformViewMode] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]); //선택한 카테고리
  const [selectedFeatures, setSelectedFeatures] = useState([]); //선택한 특징 태그
  const [selectedSNS, setSelectedSNS] = useState([]); //선택한 sns 태그

  const [filteredInfluencers, setFilteredInfluencers] = useState(influencers); // 필터링된 리스트


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

  // SNS 필터 선택 토글 함수
  const toggleSNSFilter = (sns) => {
    setSelectedSNS((prev) => {
      const newSNS = prev.includes(sns) ? prev.filter((s) => s !== sns) : [...prev, sns];
      applyFilters(selectedCategories, selectedFeatures, newSNS); //기존 필터와 함께 적용
      return newSNS;
    });
  };

  const snsMapping = {
    "인스타그램": "instagram",
    "유튜브": "youtube",
    "틱톡": "tiktok",
  };

  // 필터 적용 함수
  const applyFilters = () => {
    const filtered = influencers.filter((influencer) => {
      // 배열 여부 확인 및 필터링
      const influencerCategories = Array.isArray(influencer.categories) ? influencer.categories : [];
      const influencerTags = Array.isArray(influencer.tags) ? influencer.tags : [];
      const influencerSns = Array.isArray(influencer.sns) ? influencer.sns : [];

      // 필터 적용: 카테고리, 태그, SNS
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some((cat) => influencerCategories.includes(cat));
      const featureMatch = selectedFeatures.length === 0 || selectedFeatures.some((feat) => influencerTags.includes(feat));
      const snsMatch = selectedSNS.length === 0 || selectedSNS.some((sns) => influencerSns.includes(sns));

      return categoryMatch && featureMatch && snsMatch;
    });

    setFilteredInfluencers(filtered);
    setShowFilters(false); // 필터 창 닫기
  };

  const [selectedSort, setSelectedSort] = useState(""); // 정렬 기본선택

  // 팔로워 순 정렬 함수
  const sortByFollowers = () => {
    const sorted = [...filteredInfluencers].sort((a, b) => b.followers - a.followers);
    setFilteredInfluencers(sorted);
    setSelectedSort('followers');
  };

  // SCOPE 점수 순 정렬 함수
  const sortByScope = () => {
    const sorted = [...filteredInfluencers].sort((a, b) => b.scopeScore - a.scopeScore);
    setFilteredInfluencers(sorted);
    setSelectedSort('scope');
  };

  // 좋아요 순 정렬 함수
  const sortByLikes = () => {
    const sorted = [...filteredInfluencers].sort((a, b) => b.averageLikes - a.averageLikes);
    setFilteredInfluencers(sorted);
    setSelectedSort('likes');
  };

  // 조회수 순 정렬 함수
  const sortByViews = () => {
    const sorted = [...filteredInfluencers].sort((a, b) => b.averageViews - a.averageViews);
    setFilteredInfluencers(sorted);
    setSelectedSort('views');
  };

  const formatFollowers = (num) => {
    if (num < 10000) return num.toLocaleString(); // 1만 미만이면 그대로 출력
    return (Math.floor(num / 1000) / 10) + "만명"; // 1만 이상이면 변환
  };

  // 상태가 변경될 때마다 필터 적용
  useEffect(() => {
    applyFilters(selectedSNS);
  }, [selectedSNS]);

  // useEffect(() => {
  //   fetchInfluencerRanking(1, 10)
  //     .then((data) => {
  //       if (data.is_succese) {
  //         setInfluencers(data.result || []); // 실제 응답 구조에 따라 key 이름 확인
  //         setTotCnt(data.totCnt);
  //       } else {
  //         console.error('API 응답 실패:', data.requestlog);
  //       }
  //     })
  //     .catch(console.error)
  //     .finally(() => setLoading(false));
  // }, []);

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
              {["인스타그램", "유튜브", "틱톡"].map((option, index) => (
                <button
                  key={index}
                  className={`ranking-sns-filter-button ${selectedSNS.includes(snsMapping[option]) ? "selected" : ""}`}
                  onClick={() => {
                    setPlatformViewMode(false); //플랫폼 버튼 해제
                    toggleSNSFilter(snsMapping[option]);
                  }}
                >
                  {option}
                </button>
              ))}

              <div className="grayLine-length" style={{ marginLeft: "10px", marginRight: "10px", height: "40px" }}></div>

              <button
                className={`ranking-sns-filter-button ${platformViewMode ? "selected" : ""}`}
                onClick={() => {
                  setPlatformViewMode(true);         // 플랫폼 모드 ON
                  setSelectedSNS([]);                // 기존 SNS 필터 해제
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
                      </tr>
                    </thead>
                    <tbody>
                      {["instagram", "youtube", "tiktok"].map((platform) => {
                        // 필터 + 정렬 + 상위 3명 추출
                        const top3 = filteredInfluencers
                          .filter((inf) => inf.sns.includes(platform))
                          .sort((a, b) => {
                            if (selectedSort === "followers") return b.followers - a.followers;
                            if (selectedSort === "likes") return b.averageLikes - a.averageLikes;
                            if (selectedSort === "scope") return b.scopeScore - a.scopeScore;
                            return 0;
                          })
                          .slice(0, 3);

                        return (
                          <React.Fragment key={platform}>
                            <tr className={`platform-section-header ${platform}`} key={platform}>
                              <td colSpan="8">
                                <div className="platform-title-container">
                                  <img
                                    src={snsIcons[platform]} // 아이콘경로
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
                                    <img src={influencer.profileImage} alt={influencer.name} className="ranking-profile-img" />
                                    <div className="account-details">
                                      <div className="account-name" style={{ marginBottom: "5px" }}>{influencer.name}</div>
                                      <div className="account-description" style={{ color: "#AFAFAF" }}>{influencer.description}</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="ranking-sns-container">
                                    {influencer.sns.map((sns, idx) => (
                                      <img key={idx} src={snsIcons[sns]} alt={sns} className="ranking-sns-icon" />
                                    ))}
                                  </div>
                                </td>
                                <td>
                                  {influencer.categories.map((cat, i) => (
                                    <span key={i} className="ranking-category-box">{cat}</span>
                                  ))}
                                </td>
                                <td>
                                  {influencer.tags.map((tag, i) => (
                                    <span key={i} className="ranking-tag-box">{tag}</span>
                                  ))}
                                </td>
                                <td>{influencer.scopeScore}</td>
                                <td>{formatFollowers(influencer.followers)}</td>
                                <td>{influencer.averageLikes}</td>
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
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredInfluencers.map((influencer, index) => (
                        <tr key={index}>
                          <td style={{ fontWeight: "600", fontSize: "14px" }}>{index + 1}</td> {/* 순위 */}

                          <td> {/* 채널명 (이미지+채널명) */}
                            <div className="ranking-account-info-container">
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
                              {influencer.sns.map((sns, idx) => (
                                <img key={idx} src={snsIcons[sns]} alt={sns} className="ranking-sns-icon" />
                              ))}
                            </div>
                          </td>

                          <td>
                            <div className="ranking-category-container">
                              {influencer.categories.map((cat, index) => (
                                <span key={index} className="ranking-category-box">{cat}</span>
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
                            {influencer.scopeScore}
                          </td>

                          <td>{formatFollowers(influencer.followers)}</td> {/* 변환된 값 출력 */}

                          <td>
                            {influencer.averageLikes}
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
