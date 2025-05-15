import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/recommedation.css";
import influencers from "../../data/influencers";
import snsIcons from "../../data/snsIcons";
import BarGraph from "../../component/BarGraph";

//image
import rightSectionImage from "../../assets/images/recommand_right_section.png";
import emotionIconImage1 from "../../assets/images/supportive.png";
import emotionIconImage2 from "../../assets/images/Informative.png";
import emotionIconImage3 from "../../assets/images/Cheerful.png";
import emotionIconImage4 from "../../assets/images/Aggressive.png";
import emotionIconImage5 from "../../assets/images/Analytical.png";
import emotionIconImage6 from "../../assets/images/Neutral.png";
import InstaLogo from "../../assets/images/instagram_logo.png";
import youtubeLogo from "../../assets/images/youtube_logo.png";
import tiktokLogo from "../../assets/images/tiktok_logo.png";

const categories = [
  "뷰티",
  "패션",
  "일상 / Vlog",
  "먹방",
  "엔터테인먼트",
  "IT / 전자기기",
  "스포츠",
  "교육",
  "키즈",
  "음악",
  "펫 / 동물",
  "인테리어",
  "여행",
  "게임",
  "그림",
  "요리",
  "자동차 / 바이크",
  "기타",
];

const featureTag = [
  "유머 / 예능",
  "감성 / 힐링",
  "강의 / 설명",
  "카리스마 있음",
  "하이텐션 / 에너지 넘침",
  "친근함",
  "소통 잘함",
  "그 외",
];

const followerRanges = [
  { label: "1천 ~ 1만", min: "1,000", max: "10,000" },
  { label: "1만 ~ 10만", min: "10,000", max: "100,000" },
  { label: "10만 ~ 100만", min: "100,000", max: "1,000,000" },
  { label: "100만 이상", min: "1,000,000", max: "∞" },
];

const audienceTones = [
  { label: "지지적", value: "Supportive", icon: emotionIconImage1 },
  { label: "정보제공형", value: "Informative", icon: emotionIconImage2 },
  { label: "유쾌함", value: "Cheerful", icon: emotionIconImage3 },
  { label: "공격적인", value: "Aggressive", icon: emotionIconImage4 },
  { label: "분석적", value: "Analytical", icon: emotionIconImage5 },
  { label: "중립적", value: "Neutral", icon: emotionIconImage6 },
];

const Recommendation = () => {
  // 필터 선택
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRange, setSelectedRange] = useState(null); // 범위는 하나만 선택
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);

  //선택된 필터
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    tags: [],
    followers: "",
  });

  const [selectedGender, setSelectedGender] = useState("전체");
  const [ageRange, setAgeRange] = useState([10, 20]); // 기본값: 10세 ~ 20세


  const [selectedAudienceTone, setSelectedAudienceTone] = useState(null);



  // 카테고리 버튼 선택/해제 기능
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleRangeSelection = (range) => {
    // 선택한 범위가 이미 선택된 범위라면 해제 (토글 기능 추가)
    if (selectedRange === range) {
      setSelectedRange(null);
    } else {
      setSelectedRange(range);
    }
  };

  // 선택된 범위를 정렬하여 인풋창에 반영
  const minValue = selectedRange?.min || "";
  const maxValue = selectedRange?.max || "";

  //팔로워 특징 관련 함수
  const genderOptions = ["전체", "여성", "남성"];
  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
  };
  const handleAgeChange = (event, index) => {
    const newRange = [...ageRange];
    newRange[index] = Number(event.target.value);

    // 두 핸들이 겹치지 않도록 제한
    if (index === 0 && newRange[0] >= newRange[1]) {
      newRange[0] = newRange[1] - 10; // 최소값이 최대값과 같거나 크면 조정
    }
    if (index === 1 && newRange[1] <= newRange[0]) {
      newRange[1] = newRange[0] + 10; // 최대값이 최소값과 같거나 작으면 조정
    }

    setAgeRange(newRange);
  };


 
  
  // const [selectedRange, setSelectedRange] = useState({ min: "", max: "" });

  // 검색 함수
  // const handleSearch = () => {
  //   const minFollowers = selectedRange
  //     ? Number(selectedRange.min.toString().replace(/,/g, ""))
  //     : 0;
  //   const maxFollowers = selectedRange
  //     ? selectedRange.max === "∞"
  //       ? Infinity
  //       : Number(selectedRange.max.toString().replace(/,/g, ""))
  //     : Infinity;



  //   setSelectedFilters({
  //     categories: selectedCategories,
  //     tags: selectedTags,
  //     followers: selectedRange
  //       ? `${selectedRange.min} ~ ${selectedRange.max}`
  //       : "",
  //     audienceTone: selectedAudienceTone || "",
  //     sns: selectedSns || "",
  //   });
    

  //   // 팔로워 범위를 변경하면 기존 필터를 초기화
  //   if (!selectedRange) {
  //     setFilteredInfluencers(influencers);
  //     return;


  //   }

  //   const filteredByCategoryAndTag = influencers.filter((influencer) => {
  //     const hasCategory =
  //       selectedCategories.length === 0 ||
  //       influencer.categories.some((cat) => selectedCategories.includes(cat));

  //     const hasTag =
  //       selectedTags.length === 0 ||
  //       influencer.tags.some((tag) => selectedTags.includes(tag));

  //     // 카테고리 & 태그 필터는 그대로 유지
  //     if (selectedCategories.length > 0 && selectedTags.length > 0) {
  //       return hasCategory && hasTag;
  //     }

  //     if (selectedCategories.length > 0) {
  //       return hasCategory;
  //     }

  //     if (selectedTags.length > 0) {
  //       return hasTag;
  //     }

  //     // 카테고리 & 태그가 선택되지 않아도 필터를 통과하도록 수정
  //     return true;


  //   });



  //   const finalFilteredList = filteredByCategoryAndTag
  //   .filter((influencer) => {
  //     const followerCount = influencer.followers;
  //     return followerCount >= minFollowers && followerCount <= maxFollowers;
  //   })
  //   .filter((influencer) => {
  //     if (!selectedAudienceTone) return true;
  //     return influencer.audienceTone === selectedAudienceTone;
  //   })
  //   .filter((influencer) => {
  //     if (!selectedSns) return true;
  //     return influencer.sns.includes(selectedSns);
  //   })
  //   .filter((influencer) => {
  //     if (!selectedAdCostRange) return true;
  //     const cost = influencer.estimatedAdCost || 0;
  //     return cost >= selectedAdCostRange.min && cost <= selectedAdCostRange.max;
  //   }); 
  


    
  //   setFilteredInfluencers(finalFilteredList);
  // };


  const handleSearch = () => {
    // followers 계산: 가장 큰 SNS 팔로워 수로 설정
    influencers.forEach((inf) => {
      inf.followers = Math.max(
        inf.insta_followers || 0,
        inf.you_followers || 0,
        inf.tik_followers || 0
      );
    });
  
    // 팔로워 범위 파싱
    const minFollowers = selectedRange
      ? Number(selectedRange.min.toString().replace(/,/g, ""))
      : 0;
    const maxFollowers = selectedRange
      ? selectedRange.max === "∞"
        ? Infinity
        : Number(selectedRange.max.toString().replace(/,/g, ""))
      : Infinity;
  
    // 필터 값 저장
    setSelectedFilters({
      categories: selectedCategories,
      tags: selectedTags,
      followers: selectedRange
        ? `${selectedRange.min} ~ ${selectedRange.max}`
        : "",
      audienceTone: selectedAudienceTone || "",
      sns: selectedSns || "",
    });
  
    // 필터링 (간단한 조건)
    const result = influencers
      .filter((inf) => {
        return inf.followers >= minFollowers && inf.followers <= maxFollowers;
      })
      .filter((inf) => {
        if (!selectedSns) return true;
        return inf.sns.includes(selectedSns);
      });
  
    setFilteredInfluencers(result);
  };
  
  
  const formatFollowers = (num) => {
    if (num < 10000) return num.toLocaleString(); // 1만 미만이면 그대로 출력
    return Math.floor(num / 1000) / 10 + "만명"; // 1만 이상이면 변환
  };

  const getEmotionIcon = (tone) => {
    switch (tone) {
      case "Supportive":
        return emotionIconImage1;
      case "Informative":
        return emotionIconImage2;
      case "Cheerful":
        return emotionIconImage3;
      case "Aggressive":
        return emotionIconImage4;
      case "Analytical":
        return emotionIconImage5;
      case "Neutral":
        return emotionIconImage6;
      default:
        return null;
    }
  };

  const getPlainKoreanLabel = (tone) => {
    switch (tone) {
      case "Supportive":
        return "지지적";
      case "Informative":
        return "정보제공형";
      case "Cheerful":
        return "유쾌함";
      case "Aggressive":
        return "공격적인";
      case "Analytical":
        return "분석적";
      case "Neutral":
        return "중립적";
      default:
        return tone;
    }
  };
  

  const getKoreanLabel = (tone) => {
    switch (tone) {
      case "Supportive":
        return "지지적 🥰";
      case "Informative":
        return "정보제공형 💬";
      case "Cheerful":
        return "유쾌함 😄";
      case "Aggressive":
        return "공격적인 😡";
      case "Analytical":
        return "분석적 🧐";
      case "Neutral":
        return "중립적 😐";
      default:
        return tone;
    }
  };

  const MAX_CATEGORIES_DISPLAY = 2;
  const [showAllCategories, setShowAllCategories] = useState(false);

  const visibleCategories = showAllCategories
    ? selectedFilters.categories
    : selectedFilters.categories.slice(0, MAX_CATEGORIES_DISPLAY);

  const hiddenCategoryCount =
    selectedFilters.categories.length - MAX_CATEGORIES_DISPLAY;


  const MAX_TAGS_DISPLAY = 2;
  const [showAllTags, setShowAllTags] = useState(false);
  
  const visibleTags = showAllTags
    ? selectedFilters.tags
    : selectedFilters.tags.slice(0, MAX_TAGS_DISPLAY);
  
  const hiddenTagCount = selectedFilters.tags.length - MAX_TAGS_DISPLAY;
    
  const [selectedSns, setSelectedSns] = useState(""); // 하나만 선택

  const handleSnsSelection = (snsKey) => {
    setSelectedSns((prev) => (prev === snsKey ? "" : snsKey)); // 이미 선택된 항목 다시 누르면 해제
  };
  
  const adCostRanges = [
    { label: "~ 50만", min: 0, max: 500000 },
    { label: "50만 ~ 100만", min: 500000, max: 1000000 },
    { label: "100만 ~ 500만", min: 1000000, max: 5000000 },
    { label: "500만 이상", min: 5000000, max: Infinity },
  ];
  const [selectedAdCostRange, setSelectedAdCostRange] = useState(null);
  const handleAdCostRangeSelection = (range) => {
    if (selectedAdCostRange === range) {
      setSelectedAdCostRange(null); // 토글 해제
    } else {
      setSelectedAdCostRange(range);
    }
  };
    
  
  return (
    <div className="recommendation-container">
      {/* 메인 컨텐츠 박스 */}
      <div className="recommendation-box">
        {/* 왼쪽 설명 영역 */}
        <div className="left-section">
          <p className="big-text">
            원하는 분위기의 인플루언서를
            <br />
            추천받아 보세요
          </p>
          <p className="small-text">
            SCOPE만의 특징 태그를 이용해 원하는 인플루언서를 추천받아보세요.
            <br />
            AI가 분석한 인플루언서를 추천해드려요.
          </p>
        </div>
        {/* 오른쪽 컬러 배경 */}
        <div className="right-section">
          <div className="right-section-text">
            2025
            <br></br>
            원하는 인플루언서 추천 받기
            <img
              src={rightSectionImage}
              alt="image"
              className="right-section-image"
            />
          </div>
        </div>
      </div>

      {/* 추천 문구 */}
      <div className="want-a-influencer">
        원하는 분위기의 인플루언서를 추천받아 보세요
      </div>

     {/* sns 선택 */}
      <div className="zero-box">
        <div className="zero-box-container">
          <div className="zero-box-title">SNS 선택</div>
          <div className="zero-box-content">
          원하시는 SNS를 선택해 주세요
           </div>
        </div>
    

        <div className="zero-sns-container">
          {[
            { key: "instagram", logo: InstaLogo, label: "인스타그램" },
            { key: "youtube", logo: youtubeLogo, label: "유튜브" },
            { key: "tiktok", logo: tiktokLogo, label: "틱톡" },
          ].map((sns) => (
            <button
              key={sns.key}
              className={`zero-sns-box ${selectedSns === sns.key ? "selected" : ""}`}
              onClick={() => handleSnsSelection(sns.key)}
            >
              <img src={sns.logo} alt={sns.label} className="zero-sns-icon" />
              <div className="zero-sns-title">{sns.label}</div>
            </button>
          ))}
        </div>


      
      </div>

      {/* ✅ 첫 번째 박스 (마케팅 제품 카테고리 선택) */}
      <div className="first-box">
        <div className="first-box-container">
          <div className="first-box-title">마케팅 제품 카테고리</div>
          <div className="first-box-content">
            마케팅 할 제품의 카테고리를 정해주세요
          </div>
        </div>

        {/* 카테고리 버튼 목록 */}
        <div className="category-buttons">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-button ${
                selectedCategories.includes(category) ? "selected" : ""
              }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="second-box">
        <div className="second-box-container">
          <div className="second-box-title">팔로워 수</div>
          <div className="second-box-content">
            인플루언서의 팔로워 수를 정해주세요
          </div>
        </div>
        <div className="second-box-right">
          {/* 버튼 선택 (2개씩 2줄 배치) */}
          <div className="second-filter-range-buttons">
            {followerRanges.map((range, index) => (
              <button
                key={range.label}
                className={`second-filter-button ${
                  selectedRange === range ? "selected" : ""
                }`}
                onClick={() => handleRangeSelection(range)}
              >
                {range.label}
              </button>
            ))}
          </div>
          {/* 숫자 입력 필드 (읽기 전용) */}
          <div className="recommendation-range-inputs">
            <input type="text" value={minValue} readOnly placeholder="부터" />
            <span className="range-divider">~</span>
            <input type="text" value={maxValue} readOnly placeholder="까지" />
          </div>
        </div>
      </div>
      {/*  세 번째 박스 (특징 태그 선택) */}
      <div className="third-box">
        <div className="third-box-container">
          <div className="third-box-title">특징 태그</div>
          <div className="third-box-content">
            인플루언서에게 원하는 특징을 정해주세요
          </div>
        </div>

        <div className="category-buttons">
          {featureTag.map((tag, index) => (
            <button
              key={index}
              className={`category-button ${
                selectedTags.includes(tag) ? "selected" : ""
              }`}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="fourth-box">
        <div className="fourth-box-container">
          <div className="fourth-box-title">타켓 오디언스 성향</div>
          <div className="fourth-box-content">
            인플루언서의 주요 오디언스 성향을 정해주세요
          </div>
        </div>

        <div className="fourth-box-right">
          {audienceTones.map((tone, index) => (
            <div
              key={index}
              className={`fourth-small-box ${
                selectedAudienceTone === tone.value ? "selected" : ""
              }`}
              onClick={() => setSelectedAudienceTone(tone.value)}
            >
              <img src={tone.icon} alt={tone.label} className="emotion-icon-image" />
              <div className="fourth-small-box-title">{tone.label}</div>
            </div>
          ))}
        </div>



      </div>

{/* 예상 광고 단가  */}
    {/* ✅ 5번째 박스 - 예상 광고 단가 */}
<div className="fifth-box">
  <div className="fifth-box-container">
    <div className="fifth-box-title">예상 광고 단가</div>
    <div className="fifth-box-content">
      인플루언서의 예상 광고 단가를 정해주세요
    </div>
  </div>
  <div className="fifth-box-right">
    {/* 버튼 선택 */}
    <div className="fifth-filter-range-buttons">
      {adCostRanges.map((range, index) => (
        <button
          key={index}
          className={`fifth-filter-button ${
            selectedAdCostRange === range ? "selected" : ""
          }`}
          onClick={() => handleAdCostRangeSelection(range)}
        >
          {range.label}
        </button>
      ))}
    </div>

    {/* 수치 입력 */}
    <div className="recommendation-range-inputs">
      <input
        type="text"
        value={selectedAdCostRange?.min?.toLocaleString() || ""}
        readOnly
        placeholder="부터"
      />
      <span className="range-divider">~</span>
      <input
        type="text"
        value={
          selectedAdCostRange?.max !== Infinity
            ? selectedAdCostRange?.max?.toLocaleString()
            : ""
        }
        readOnly
        placeholder="까지"
      />
    </div>
  </div>
</div>

      {/* 검색 버튼 */}
      <button className="recommendation-search-button" onClick={handleSearch}>
        검색하기
      </button>

      <div className="recommend-result-box">
        <div className="recommend-text">
          선택하신 조건은 다음과 같아요
        </div>

        <div className="selected-filters-container">

        <div className="selected-filters-row">

        <div className="selected-filters-box" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  SNS:
  {selectedFilters.sns ? (
    <img
      src={
        selectedFilters.sns === "instagram"
          ? InstaLogo
          : selectedFilters.sns === "youtube"
          ? youtubeLogo
          : tiktokLogo
      }
      alt={selectedFilters.sns}
      className="selected-sns-icon"
      style={{ width: "30px", height: "30px" }}
    />
  ) : (
    <span className="selected-filter">설정 안됨</span>
  )}
</div>


          <div className="selected-filters-box">
            카테고리:
            {selectedFilters.categories.map((category, index) => (
              <div key={index} className="selected-filter">{category}</div>
            ))}
          </div>

          <div className="selected-filters-box">
            팔로워 수:{" "}
            <span className="selected-filter">
              {selectedFilters.followers || "설정 안됨"}
            </span>
          </div>

          </div>
    
          <div className="selected-filters-row">

          <div className="selected-filters-box">
            태그:
            {selectedFilters.tags.map((tag, index) => (
              <div key={index} className="selected-filter">{tag}</div>
            ))}
          </div>


          <div className="selected-filters-box" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>주요 오디언스 성향:</span>
            {selectedFilters.audienceTone ? (
              <div style={{ display: "flex",flexDirection: "column", alignItems: "center", gap: "6px" }}>
                        <span className="selected-audience-filter">

                <img
                  src={getEmotionIcon(selectedFilters.audienceTone)}
                  alt={selectedFilters.audienceTone}
                  style={{ width: "40px", height: "40px" ,marginBottom:"6px"}}
                />
                  {getPlainKoreanLabel(selectedFilters.audienceTone)}
                </span>
              </div>
            ) : (
              <span className="selected-audience-filter">설정 안됨</span>
            )}
          </div>


        </div>
</div>
        {/* 검색 결과 표시 */}
        <div className="recommend-table-div">
          <div className="recommend-table-title">
            SCOPE가 조건을 토대로 추천 리스트를 만들어봤어요!
          </div>
          <div className="divider" />
          <table className="recommend-ranking-table">
          <thead>
            <tr>
              <th style={{ width: "10%" }}>채널명</th>
              <th style={{ width: "10%" }}>카테고리</th>
              <th style={{ width: "22%" }}>태그</th>
              <th style={{ width: "11%" }}>SCOPE 점수</th>
              <th style={{ width: "7%" }}>팔로워</th>
              <th style={{ width: "10%" }}>주요 오디언스 성향</th>
              <th style={{ width: "15%" }}>예상 광고 단가</th>

            </tr>
          </thead>


            <tbody>
              {filteredInfluencers.length > 0 ? (
                filteredInfluencers.map((influencer, index) => (
                  <tr key={index}>
                    <td>
                      {" "}
                      {/* 채널명 (이미지+채널명) */}
                      <div className="ranking-account-info-container">
                        <img
                          src={influencer.profileImage}
                          alt={influencer.name}
                          className="ranking-profile-img"
                        />
                        <div className="account-details">
                          <div
                            className="account-name"
                            style={{ marginBottom: "5px" }}
                          >
                            {influencer.name}
                          </div>
                          <div
                            className="account-description"
                            style={{ color: "#AFAFAF" }}
                          >
                            {influencer.description}
                          </div>
                        </div>
                      </div>
                    </td>
                  
                    <td>
                      {/* 카테고리 */}
                      <div className="ranking-category-container">
                        {influencer.categories.map((cat, index) => (
                          <span key={index} className="ranking-category-box">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      {/* 태그 */}
                      <div className="ranking-tag-container">
                        {influencer.tags.map((tag, index) => (
                          <span key={index} className="ranking-tag-box">
                            {tag}
                          </span>
                        ))}
                      </div>

                    </td>
                    {/* SCOPE 점수 */}

                    <td>
                      <BarGraph score={influencer.scopeScore} />
                    </td>
                    {/* 팔로워 수 */}
                    <td>{formatFollowers(influencer.followers)}</td>


  {/* ✅ 주요 오디언스 성향 */}
  <td>{influencer.audienceTone ? getKoreanLabel(influencer.audienceTone) : "정보 없음"}</td>

  {/* ✅ 예상 광고 단가 */}
  <td>
    {influencer.estimatedAdCost
      ? `${influencer.estimatedAdCost.toLocaleString()}`
      : "비공개"}
  </td>
                    {/* 변환된 값 출력 */}
                  </tr>
                ))
              ) : (
                <div className="exception-content">
                  선택한 필터에 맞는 인플루언서가 없습니다.
                </div>
              )}
            </tbody>
            
          </table>
          
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
