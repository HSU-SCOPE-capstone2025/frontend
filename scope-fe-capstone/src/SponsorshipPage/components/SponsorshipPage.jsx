import React from "react";
import { useParams } from "react-router-dom";
import "../css/sponsorshippage.css";
import dummyData from "../../data/dummy.json"; // 데이터는 별도 파일로




const SponsorshipPage = () => {
  const { id } = useParams();
  const data = dummyData[id] || [];

  return (
    <div className="sponsorship-page-container">
      <h2 className="sponsorship-title">{id}님의 협찬 이력</h2>
      {data.length > 0 ? (
        <div className="sponsorship-card-container">
          {data.map((item, index) => (
            <div key={index} className="sponsorship-card">
              <div className="sponsorship-info">
                <div className="sponsorship-sns-type">{item.sns}</div>
                <div className="sponsorship-product">{item.title}</div>
                <div className="sponsorship-date">{item.date}</div>
                <div
                  className={`sponsorship-category ${
                    item.category === "음식" ? "orange" : ""
                  }`}
                >
                  {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="sponsorship-empty">협찬 이력이 없습니다.</p>
      )}
    </div>
  );
};

export default SponsorshipPage;
