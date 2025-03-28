import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/recommedation.css";
import influencers from "../../data/influencers";
import snsIcons from "../../data/snsIcons";

const categories = [
  "뷰티", "패션", "일상 / Vlog", "먹방", "엔터테인먼트", "IT / 전자기기",
  "스포츠", "교육", "키즈", "음악", "펫 / 동물", "인테리어",
  "여행", "게임", "그림", "요리", "자동차 / 바이크", "기타"
];

const featureTag = [
  "유머 / 예능", "감성 / 힐링", "강의 / 설명", "카리스마 있음",
  "하이텐션 / 에너지 넘침", "친근함", "소통 잘함", "그 외"
];

const followerRanges = [
  { label: "1천 ~ 1만", min: "1,000", max: "10,000" },
  { label: "1만 ~ 10만", min: "10,000", max: "100,000" },
  { label: "10만 ~ 100만", min: "100,000", max: "1,000,000" },
  { label: "100만 이상", min: "1,000,000", max: "∞" }
];

const Recommendation = () => {
  // 필터 선택
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState([]);

  const [selectedGender, setSelectedGender] = useState("전체");
  const [ageRange, setAgeRange] = useState([10, 20]); // 기본값: 10세 ~ 20세

  // 카테고리 버튼 선택/해제 기능
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleRangeSelection = (range) => {
    setSelectedRanges((prev) => {
      // 이미 선택된 경우 제거
      if (prev.includes(range)) {
        return prev.filter((r) => r !== range);
      }
      // 최대 2개까지 선택 가능
      return prev.length < 2 ? [...prev, range] : prev;
    });
  };

  // 선택된 범위를 정렬하여 인풋창에 반영
  const sortedRanges = selectedRanges.sort((a, b) => parseInt(a.min) - parseInt(b.min));
  const minValue = sortedRanges[0]?.min || "";
  const maxValue = sortedRanges[1]?.max || "";

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
  //const [selectedRange, setSelectedRange] = useState({ min: "", max: "" });

  //검색 함수
  const handleSearch = () => {
    const minFollowers = selectedRanges[0]?.min ? parseInt(selectedRanges[0].min) : 0;
    const maxFollowers = selectedRanges[1]?.max ? parseInt(selectedRanges[1].max) : Infinity;

    // 카테고리 또는 태그 필터링
    const filteredByCategoryAndTag = influencers.filter((influencer) => {
      const hasCategory =
        selectedCategories.length === 0 ||
        influencer.categories.some((cat) => selectedCategories.includes(cat));

      const hasTag =
        selectedTags.length === 0 ||
        influencer.tags.some((tag) => selectedTags.includes(tag));

      // 카테고리 & 태그가 모두 선택된 경우 → 둘 다 하나씩 포함해야 함
      if (selectedCategories.length > 0 && selectedTags.length > 0) {
        return hasCategory && hasTag;
      }

      // 카테고리만 선택한 경우 → 해당 카테고리만 포함
      if (selectedCategories.length > 0) {
        return hasCategory;
      }

      // 태그만 선택한 경우 → 해당 태그만 포함
      if (selectedTags.length > 0) {
        return hasTag;
      }

      return false;
    });


    // 필터링된 리스트에서 팔로워 수 기준 추가 적용
    const finalFilteredList = filteredByCategoryAndTag.filter((influencer) => {
      const followerCount = influencer.followers;
      return followerCount >= minFollowers && followerCount <= maxFollowers;
    });

    setFilteredInfluencers(finalFilteredList);
  };


  const formatFollowers = (num) => {
    if (num < 10000) return num.toLocaleString(); // 1만 미만이면 그대로 출력
    return (Math.floor(num / 1000) / 10) + "만명"; // 1만 이상이면 변환
  };

  return (
    <div className="recommendation-container">
      {/* 메인 컨텐츠 박스 */}
      <div className="recommendation-box">
        {/* 왼쪽 설명 영역 */}
        <div className="left-section">
          <p className="big-text">원하는 분위기의 인플루언서를<br />추천받아 보세요</p>
          <p className="small-text">
            SCOPE만의 특징 태그를 이용해 원하는 인플루언서를 추천받아보세요.
            <br />
            AI가 분석한 인플루언서를 추천해드려요.
          </p>
        </div>
        {/* 오른쪽 컬러 배경 */}
        <div className="right-section"></div>
      </div>

      {/* 추천 문구 */}
      <div className="want-a-influencer">
        원하는 분위기의 인플루언서를 추천받아 보세요
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
              className={`category-button ${selectedCategories.includes(category) ? "selected" : ""}`}
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
          <div className="second-box-content">인플루언서의 팔로워 수를 정해주세요</div>
        </div>
        <div className="second-box-right">
          {/* 버튼 선택 (2개씩 2줄 배치) */}
          <div className="second-filter-range-buttons">
            {followerRanges.map((range, index) => (
              <button
                key={range.label}
                className={`second-filter-button ${selectedRanges.includes(range) ? "selected" : ""}`}
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
      {/* ✅ 세 번째 박스 (특징 태그 선택) */}
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
              className={`category-button ${selectedCategories.includes(tag) ? "selected" : ""}`}
              onClick={() => toggleCategory(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>


      <div className="fourth-box">
        <div className="fourth-box-container">
          <div className="fourth-box-title">타겟층</div>
          <div className="fourth-box-content">원하는 타겟층을 정해주세요</div>
        </div>

        <div className="fourth-box-right">
          {/* 성별 선택 버튼 */}
          <div className="gender-selection">
            <span className="gender-title">주요 타겟층 성별</span>
            <div className="gender-buttons">
              {genderOptions.map((gender) => (
                <button
                  key={gender}
                  className={`gender-button ${selectedGender === gender ? "selected" : ""}`}
                  onClick={() => handleGenderSelection(gender)}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          {/* 나이 선택 슬라이더 */}
          <div className="age-selection">
            <span className="age-title">주요 타겟층 나이</span>
            <div className="age-slider-container">
              {/* 나이 눈금 표시 */}
              <div className="age-values">
                {[10, 20, 30, 40, 50].map((age) => (
                  <span key={age}>{age}</span>
                ))}
                <span>최대</span>
              </div>
              {/* 보라색 채워진 범위 */}
              <div
                className="slider-track"
                style={{
                  left: `${((ageRange[0] - 10) / 50) * 100}%`,
                  width: `${((ageRange[1] - ageRange[0]) / 50) * 100}%`
                }}
              ></div>

              {/* 슬라이더 2개 */}
              <input
                type="range"
                min="10"
                max="60"
                step="10"
                value={ageRange[0]}
                onChange={(e) => handleAgeChange(e, 0)}
                className="age-slider"
              />
              <input
                type="range"
                min="10"
                max="60"
                step="10"
                value={ageRange[1]}
                onChange={(e) => handleAgeChange(e, 1)}
                className="age-slider"
              />
            </div>


          </div>
        </div>
      </div>
      {/* 검색 버튼 */}
      <button className="recommendation-search-button" onClick={handleSearch}>검색하기</button>


      <div className="recommend-result-box">

        {/* 검색 결과 표시 */}
        <div className="ranking-table-div">
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
                <th>팔로워 특징</th>
              </tr>
            </thead>
            <tbody>
              {filteredInfluencers.length > 0 ? (
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
                      {influencer.followersFeature}
                    </td>

                  </tr>
                ))
              ) : (
                <p>선택한 필터에 맞는 인플루언서가 없습니다.</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
