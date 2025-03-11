import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/recommedation.css";

const Recommendation = () => {
  const categories = [
    "뷰티", "패션", "일상 / Vlog", "먹방", "엔터테인먼트", "IT / 전자기기",
    "스포츠", "교육", "키즈", "음악", "펫 / 동물", "인테리어",
    "여행", "게임", "그림", "요리", "자동차 / 바이크", "기타"
  ];

  // 선택된 카테고리를 관리하는 state
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 버튼 클릭 시 선택 / 해제 기능
  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="recommendation-container">
      {/* 메인 컨텐츠 박스 */}
      <div className="recommedation-box">
        {/* 왼쪽 설명 영역 */}
        <div className="left-section">
          <p>
            <div className="big-text">
              원하는 분위기의 인플루언서를
              <br />
              추천받아 보세요
            </div>
          </p>
          <p>
            <div className="small-text">
              SCOPE만의 특징 태그를 이용해 원하는 인플루언서를 추천받아보세요.
              <br />
              AI가 분석한 인플루언서를 추천해드려요.
            </div>
          </p>
        </div>
        {/* 오른쪽 컬러 배경 */}
        <div className="right-section"></div>
      </div>

      {/* 추천 문구 */}
      <div className="want-a-influencer">
        원하는 분위기의 인플루언서를 추천받아 보세요
      </div>

      {/* 마케팅 제품 카테고리 선택 박스 */}
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
    </div>
  );
};

export default Recommendation;
