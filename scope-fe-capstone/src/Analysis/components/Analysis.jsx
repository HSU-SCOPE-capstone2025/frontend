import React, { useState, useEffect } from "react";
import "../css/analysis.css";
import { getProfileImage } from "../../utils/getProfileImage";
import instagramLogo from "../../assets/images/instagram_logo.png";
import youtubeLogo from "../../assets/images/youtube_logo.png";
import tiktokLogo from "../../assets/images/tiktok_logo.png";
import rotatelogo from "../../assets/images/rotate.png";
import filter from "../../assets/images/filter.png";
import under_arrow from "../../assets/images/under_arrow.png";
import { fetchAnalysisData } from "../../api/analysisApi";

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

const parseRange = (rangeStr) => {
  if (!rangeStr || rangeStr === "") return [0, Infinity];
  if (rangeStr === "100만 이상") return [1000000, Infinity];
  const unit = rangeStr.includes("만") ? 10000 : 1000;
  const [start, end] = rangeStr.replace("만", "").replace("개", "").split(" ~ ").map(v => parseFloat(v) * unit);
  return [start, end];
};

const Analysis = () => {
  const [selectedSNS, setSelectedSNS] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFollowers, setSelectedFollowers] = useState(["", ""]);
  const [selectedLikes, setSelectedLikes] = useState(["", ""]);
  const [selectedViews, setSelectedViews] = useState(["", ""]);
  const [originalList, setOriginalList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const apiData = await fetchAnalysisData();
        const formatted = apiData.map((item, index) => ({
          id: index + 1,
          name: item.name,
          followers: item.followers || 0,
          avgViews: item.averageViews || 0,
          avgLikes: item.averageLikes || 0,
          avgComments: item.averageComments || 0,
          sns: ["instagram", "youtube", "tiktok"].filter((_, i) => index % (i + 2) === 0),
          category: [["먹방"], ["뷰티"], ["패션"], ["여행"]][index % 4],
          tags: [["하이텐션"], ["감성"], ["정보"], ["전문가"]][index % 4],
          profileImage: getProfileImage(item.name)
        }));
        setOriginalList(formatted);
        setFilteredList(formatted);
      } catch (err) {
        console.error("API 호출 실패:", err);
      }
    };
    getData();
  }, []);

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
    setSelectedSNS([]);
    setSelectedCategories([]);
    setSelectedFollowers(["", ""]);
    setSelectedLikes(["", ""]);
    setSelectedViews(["", ""]);
    setFilteredList(originalList);
  };

  const handleDetailedAnalysis = () => {
    const [followerMin, followerMax] = parseRange(selectedFollowers.join(" ~ "));
    const [likesMin, likesMax] = parseRange(selectedLikes.join(" ~ "));
    const [viewsMin, viewsMax] = parseRange(selectedViews.join(" ~ "));

    const result = originalList.filter((inf) => {
      const snsMatch = selectedSNS.length === 0 || selectedSNS.some((sns) => inf.sns.includes(sns));
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.some((cat) => inf.category.includes(cat));
      const followersMatch = inf.followers >= followerMin && inf.followers <= followerMax;
      const likesMatch = inf.avgLikes >= likesMin && inf.avgLikes <= likesMax;
      const viewsMatch = inf.avgViews >= viewsMin && inf.avgViews <= viewsMax;
      return snsMatch && categoryMatch && followersMatch && likesMatch && viewsMatch;
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
