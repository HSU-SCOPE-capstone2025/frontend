import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/InfluencerRanking.css';
import influencers from "../../data/influencers";
import snsIcons from "../../data/snsIcons";

// SNS 로고 이미지 import
import instagramLogo from "../../assets/images/instagram_logo.png";
import youtubeLogo from "../../assets/images/youtube_logo.png";
import tiktokLogo from "../../assets/images/tiktok_logo.png";

// 필터 옵션 리스트
const categories = [
  "일상 / Vlog", "패션", "뷰티", "먹방", "엔터테인먼트", "IT / 전자기기",
  "스포츠", "교육", "키즈", "음악", "인테리어", "펫 / 동물",
  "여행", "게임", "그림", "영화 / 드라마", "요리", "자동차 / 바이크"
];

const feature = [
  "유머 / 예능", "감성 / 힐링", "강의 / 설명", "시네마틱 / 예술", "하이텐션 / 에너지넘침"
];

function InfluencerRanking() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState([]);
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(60);


  // 카테고리 필터 선택 (다중 선택)
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category) // 이미 선택된 경우 제거
        : [...prev, category] // 선택되지 않은 경우 추가
    );
  };

  const formatFollowers = (num) => {
    if (num < 10000) return num.toLocaleString(); // 1만 미만이면 그대로 출력
    return (Math.floor(num / 1000) / 10) + "만명"; // 1만 이상이면 변환
  };

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

                      {/*주요 팔로워 성별*/} 
                      <div className="ranking-filter-audience-gender">
                        <div className="ranking-filter-title">주요 팔로워 성별</div>
                        <div className="gender-radio-group">
                          {["전체", "여자", "남자"].map((option, index) => (
                            <label key={index} className={`gender-radio-label ${selected === option ? "selected" : ""}`}>
                              <input
                                type="radio"
                                name="custom-radio"
                                value={option}
                                checked={selected === option}
                                onChange={() => setSelected(option)}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-div">
                      {/* 특징 태그 필터 */}
                      <div className="filter-category-container">
                        <div className="ranking-filter-title">특징 태그</div>
                        <div className="filter-category-buttons">
                          {feature.map((category) => (
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

                      {/* 주요 팔로워 나이대 */}
                      <div className="filter-follower-age-container">
                        <div className="ranking-filter-title">주요 팔로워 나이</div>

                        <div className="range-slider">
                          <input
                            type="range"
                            min="10"
                            max="60"
                            step="10"
                            value={minValue}
                            onChange={(e) => setMinValue(Number(e.target.value))}
                            className="thumb thumb-left"
                          />
                          <input
                            type="range"
                            min="10"
                            max="60"
                            step="10"
                            value={maxValue}
                            onChange={(e) => setMaxValue(Number(e.target.value))}
                            className="thumb thumb-right"
                          />
                          <div
                            className="slider-track"
                            style={{
                              left: `${((minValue - 10) / 50) * 100}%`,
                              right: `${100 - ((maxValue - 10) / 50) * 100}%`,
                            }}
                          ></div>
                        </div>

                        <div className="slider-values">
                          <span>10</span>
                          <span>20</span>
                          <span>30</span>
                          <span>40</span>
                          <span>50</span>
                          <span>최대</span>
                        </div>
                      </div>
                    </div>

                    <div className="ranking-filter-apply-button-container">
                      {/* 필터 적용 버튼*/}
                      <button className="ranking-filter-apply-button" onClick={() => setShowFilters(!showFilters)}>
                        필터 적용
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grayLine-length" style={{ height: "40px", marginTop: "20px" }}></div>

            <div className="radio-group">
              {["인스타그램", "유튜브", "틱톡", "플랫폼 별로 한눈에 보기"].map((option, index) => (
                <label key={index} className={`radio-label ${selected === option ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="custom-radio"
                    value={option}
                    checked={selected === option}
                    onChange={() => setSelected(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="grayLine"></div>

          <div className="flex-div" style={{ height: "80%" }}>
            <div className="standard-container">
              <div className="standard-title" >기준</div>
              <div className="standard-radio-group">
                {["팔로워 순", "좋아요 순", "조회수 순", "SCOPE 점수 순", "팔로워 증가 순", "조회수 증가순"].map((option, index) => (
                  <label key={index} className={`radio-label ${selected === option ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="custom-radio"
                      value={option}
                      checked={selected === option}
                      onChange={() => setSelected(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            <div className="grayLine-length" style={{ height: "100%" }}></div>

            <div className="ranking-table-div">
              <table className="ranking-table">
                <thead>
                  <tr>
                    <th>순위</th>
                    <th style={{textAlign: "left", paddingLeft: "10px"}}>채널명</th>
                    <th>보유 SNS</th>
                    <th>카테고리</th>
                    <th>태그</th>
                    <th>SCOPE 점수</th>
                    <th>팔로워</th>
                    <th>팔로워 특징</th>
                  </tr>
                </thead>
                <tbody>
                  {influencers.length > 0 ? (
                    influencers.map((influencer, index) => (
                    <tr key={index}>
                      <td style={{fontWeight: "600", fontSize: "14px"}}>{index + 1}</td> {/* 순위 */}

                      <td> {/* 채널명 (이미지+채널명) */}
                        <div className="ranking-account-info-container">
                          <img
                            src={influencer.profileImage}
                            alt={influencer.name}
                            className="ranking-profile-img"
                          />
                          <div className="account-details">
                            <div className="account-name" style={{marginBottom: "5px"}}>{influencer.name}</div>
                            <div className="account-description" style={{color: "#AFAFAF"}}>{influencer.description}</div>
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
                  <p> 데이터를 불러오는 중 ...</p>
                )}
                </tbody>
              </table>
            </div>

          </div> {/* flex-div */}

        </div>
      </div >
    </div >
  );
}

export default InfluencerRanking;
