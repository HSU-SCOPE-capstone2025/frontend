import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/analysis.css";
import { getProfileImage } from "../../utils/getProfileImage";
import instagramLogo from "../../assets/images/logo/instagram_logo.png";
import youtubeLogo from "../../assets/images/logo/youtube_logo.png";
import tiktokLogo from "../../assets/images/logo/tiktok_logo.png";
import rotatelogo from "../../assets/images/rotate.png";
import filter from "../../assets/images/filter.png";
import under_arrow from "../../assets/images/under_arrow.png";
import { fetchAnalysisData } from "../../api/analysisApi";

import AOS from 'aos';
import 'aos/dist/aos.css';

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

const categoryMap = {
  "Lifestyle_(sociology)": "일상 / Vlog",
  "Fashion": "패션",
  "Beauty": "뷰티",
  "Food": "먹방",
  "Entertainment": "엔터테인먼트",
  "IT": "IT / 전자기기",
  "Sports": "스포츠",
  "Education": "교육",
  "Kids": "키즈",
  "Music": "음악",
  "Interior": "인테리어",
  "Pet": "펫 / 동물",
  "Travel": "여행",
  "Game": "게임",
  "Art": "그림",
  "Movie_Drama": "영화 / 드라마",
  "Cooking": "요리",
  "Vehicle": "자동차 / 바이크"
};

const followerRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];
const likesRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];
const viewsRanges = ["1천 ~ 1만", "1만 ~ 10만", "10만 ~ 100만", "100만 이상"];

// const parseRange = (rangeStr) => {
//   if (!rangeStr || rangeStr.trim() === "") return [0, Infinity]; // 🔹 whitespace 방어

//   const cleaned = rangeStr.replace(/개|만/g, "").trim(); // 🔹 정규식으로 더 유연하게 처리

//   if (rangeStr.includes("이상")) {
//     const num = parseFloat(cleaned.replace("이상", ""));
//     const unit = rangeStr.includes("만") ? 10000 : 1000;
//     return isNaN(num) ? [0, Infinity] : [num * unit, Infinity];
//   }

//   const [startStr, endStr] = cleaned.split("~").map(str => str.trim());
//   const unit = rangeStr.includes("만") ? 10000 : 1000;

//   const start = parseFloat(startStr) * unit;
//   const end = parseFloat(endStr) * unit;

//   // 🔹 안전한 fallback
//   if (isNaN(start) || isNaN(end)) return [0, Infinity];

//   return [start, end];
// };

const parseRange = (rangeStr) => {
  if (!rangeStr || rangeStr === "") return [0, Infinity];

  // "100만 이상" 처리
  if (rangeStr.includes("이상")) {
    const str = rangeStr.replace("개", "").replace("이상", "");
    const num = str.includes("만")
      ? parseFloat(str.replace("만", "")) * 10000
      : str.includes("천")
        ? parseFloat(str.replace("천", "")) * 1000
        : parseFloat(str);
    return [num, Infinity];
  }

  // "1천 ~ 1만" 처리
  const [startRaw, endRaw] = rangeStr.replace("개", "").split(" ~ ");
  const start =
    startRaw.includes("만")
      ? parseFloat(startRaw.replace("만", "")) * 10000
      : startRaw.includes("천")
        ? parseFloat(startRaw.replace("천", "")) * 1000
        : parseFloat(startRaw);

  const end =
    endRaw.includes("만")
      ? parseFloat(endRaw.replace("만", "")) * 10000
      : endRaw.includes("천")
        ? parseFloat(endRaw.replace("천", "")) * 1000
        : parseFloat(endRaw);

  return [start, end];
};



const Analysis = () => {
  const navigate = useNavigate();
  const [selectedSNS, setSelectedSNS] = useState("instagram");
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
        const apiResponse = await fetchAnalysisData();
        const apiData = apiResponse.influencers || [];

        const formatted = apiData.map((item, index) => {
          const sns = [];
          if (item.instaFollowers > 0) sns.push("instagram");
          if (item.youFollowers > 0) sns.push("youtube");
          if (item.tikFollowers > 0) sns.push("tiktok");

          const mappedCategory = categoryMap[item.categories] || "기타";

          return {
            id: index + 1,
            name: item.name,
            insta_id: item.instaName,
            profileImage: getProfileImage(item.name),
            category: [mappedCategory],
            tags: item.tags ? item.tags.split(",") : [],
            sns: sns,
            snsData: {
              instagram: item.instaFollowers ? {
                followers: item.instaFollowers,
                avgViews: item.instaAverageViews || 0,
                avgLikes: item.instaAverageLikes || 0,
                avgComments: 0,
              } : null,
              youtube: item.youFollowers ? {
                followers: item.youFollowers,
                avgViews: item.youAverageViews || 0,
                avgLikes: item.youAverageLikes || 0,
                avgComments: 0,
              } : null,
              tiktok: item.tikFollowers ? {
                followers: item.tikFollowers,
                avgViews: item.tikAverageViews || 0,
                avgLikes: item.tikAverageLikes || 0,
                avgComments: 0,
              } : null,
            }
          };
        });

        setOriginalList(formatted);
        setFilteredList(formatted);
      } catch (err) {
        console.error("API 호출 실패:", err);
      }
    };
    getData();
  }, []);

  const toggleSNS = (snsKey) => {
    setSelectedSNS(snsKey);
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
    setFilteredList(originalList);
  };

  // const handleDetailedAnalysis = () => {
  //   const [followerMin, followerMax] = parseRange(selectedFollowers.join(" ~ "));
  //   const [likesMin, likesMax] = parseRange(selectedLikes.join(" ~ "));
  //   const [viewsMin, viewsMax] = parseRange(selectedViews.join(" ~ "));
  //   console.log("👀 Followers Range:", followerMin, followerMax);


  //   // const result = originalList.filter((inf) => {
  //   //   const snsData = inf.snsData[selectedSNS];
  //   //   if (!snsData) return false;

  //   //   const categoryMatch = selectedCategories.length === 0 || selectedCategories.some((cat) => inf.category.includes(cat));
  //   //   const followersMatch = selectedFollowers[0] === "" || (snsData.followers >= followerMin && snsData.followers <= followerMax);
  //   //   const likesMatch = selectedLikes[0] === "" || (snsData.avgLikes >= likesMin && snsData.avgLikes <= likesMax);
  //   //   const viewsMatch = selectedViews[0] === "" || (snsData.avgViews === 0 ? true : (snsData.avgViews >= viewsMin && snsData.avgViews <= viewsMax));

  //   //   return categoryMatch && followersMatch && likesMatch && viewsMatch;
  //   // });
  //   const result = originalList.filter((inf) => {
  //     const snsData = inf.snsData[selectedSNS];
  //     if (!snsData) return false;

  //     const hasAnyValidData = Object.values(inf.snsData).some(
  //       (sns) => sns && (sns.followers > 0 || sns.avgLikes > 0 || sns.avgViews > 0)
  //     );
  //     if (!hasAnyValidData) return false;

  //     const categoryMatch =
  //       selectedCategories.length === 0 ||
  //       selectedCategories.some((cat) => inf.category.includes(cat));
  //     const followersMatch =
  //       selectedFollowers[0] === "" ||
  //       (snsData.followers >= followerMin && snsData.followers <= followerMax);
  //     const likesMatch =
  //       selectedLikes[0] === "" ||
  //       (snsData.avgLikes >= likesMin && snsData.avgLikes <= likesMax);
  //     const viewsMatch =
  //       selectedViews[0] === "" ||
  //       (snsData.avgViews >= viewsMin && snsData.avgViews <= viewsMax);

  //     return categoryMatch && followersMatch && likesMatch && viewsMatch;
  //   });

  //   setFilteredList(result);
  // };

  const handleDetailedAnalysis = () => {
    const [followerMin, followerMax] = parseRange(selectedFollowers.join(" ~ "));
    const [likesMin, likesMax] = parseRange(selectedLikes.join(" ~ "));
    const [viewsMin, viewsMax] = parseRange(selectedViews.join(" ~ "));

    console.log("팔로워 범위:", followerMin, followerMax);
    console.log("좋아요 범위:", likesMin, likesMax);
    console.log("조회수 범위:", viewsMin, viewsMax);

    const result = originalList.filter((inf) => {
      const snsData = inf.snsData[selectedSNS];
      if (!snsData) return false;

      // 디버깅 로그
      console.log(`🔍 ${inf.name} (${selectedSNS})`);
      console.log("  팔로워:", snsData.followers);
      console.log("  평균 좋아요:", snsData.avgLikes);
      console.log("  평균 조회수:", snsData.avgViews);

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => inf.category.includes(cat));

      const followersMatch =
        selectedFollowers[0] === "" ||
        (snsData.followers >= followerMin && snsData.followers <= followerMax);

      const likesMatch =
        selectedLikes[0] === "" ||
        (snsData.avgLikes >= likesMin && snsData.avgLikes <= likesMax);

      const viewsMatch =
        selectedViews[0] === "" ||
        (snsData.avgViews === 0 ? true : (snsData.avgViews >= viewsMin && snsData.avgViews <= viewsMax));

      console.log("  ✅ 조건 일치 여부:", {
        categoryMatch,
        followersMatch,
        likesMatch,
        viewsMatch,
      });

      return categoryMatch && followersMatch && likesMatch && viewsMatch;
    });

    console.log("📌 최종 결과 개수:", result.length);
    setFilteredList(result);
  };

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // 스크롤 이동은 AOS 초기화 이후에 약간 딜레이를 주고 실행
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500); // AOS 초기화 시간 고려해서 500ms 정도 지연
      }
    }
  }, [location]);


  return (
    <div className="container">
      <div className="analysis-container" data-aos="fade-up">
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
                <img src={rotatelogo} alt="rotateLogo" className="filter-analysis-sns-icon" /> 필터 초기화
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
              {filteredList.length > 0 ? filteredList.map((inf) => {
                const snsData = inf.snsData[selectedSNS];
                if (!snsData) return null;
                return (
                  <tr key={inf.id}
                    onClick={() => navigate(`/DetailAnalysis/${inf.insta_id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <div className="account-info-container">
                        <img src={inf.profileImage} alt={inf.name} className="profile-img" />
                        <div className="account-details">
                          <div className="account-name">{inf.name}</div>
                          <div className="account-description">인플루언서 설명</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="category-container">
                        {inf.category.map((cat, idx) => (
                          <span key={idx} className="category-box">{cat}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="tag-container">
                        {inf.tags.map((tag, idx) => (
                          <span key={idx} className="tag-box">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td>{snsData.followers.toLocaleString()}</td>
                    <td>{snsData.avgViews.toLocaleString()}</td>
                    <td>{snsData.avgLikes.toLocaleString()}</td>
                    <td>{snsData.avgComments}</td>
                  </tr>
                );
              }) : (
                <tr><td colSpan="7" className="no-result">조건에 맞는 인플루언서가 없습니다.</td></tr>
              )}
            </tbody>
          </table>
          {/* <div className="table-container"> 
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
          </table> */}


        </div>
      </div>

    </div>
  );
};

export default Analysis;