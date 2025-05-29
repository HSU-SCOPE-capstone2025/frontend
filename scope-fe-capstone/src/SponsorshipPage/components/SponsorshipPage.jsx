import React from "react";
import { useParams } from "react-router-dom";
import "../css/sponsorshippage.css";
import dummyData from "../../data/dummy.json"; // 데이터는 별도 파일로




const SponsorshipPage = () => {
  const { id } = useParams();
  const data = dummyData[id] || [];
  const nameMap = {
    "__ralral__": "랄랄",
    "horseking123": "말왕",
    "joodoong_e": "주둥이방송",
    "chimchakman_official": "침착맨",
    "trytoeat222": "먹어볼래 TryToEat",
    "under_world_b1": "언더월드",
    "hee__bab": "히밥",
    "cherry__0705": "지한",
    "yellow_aquarium": "해수인",
    "esther__park": "박에스더",
    "very_simplecooking": "자취요리신",
    "minsco_": "민스코",
    "instawakgood": "우왁굳",
    "yooxicman": "육식맨",
    "dudely_08": "더들리",
    "fundamental_kr": "뻔더",
    "jesusujeo": "은수저",
    "tikitakabooboo": "인생 녹음 중",
    "yonamism": "취미로 요리하는 남자",
    "mejooandcats": "김메주와 고양이들",
    "jeon_unni_": "젼언니",
    "bboyongnyong": "뽀용뇽",
    "salim_nam_official": "살림남",
    "minsajang_": "요리하는 민사장",
    "enjoycouple": "엔조이커플",
    "hxxax_": "혜안",
    "g_movie__": "지무비",
    "hugbears": "달달투어",
    "ipduck_official": "입시덕후",
    "baby_pig.rabbit": "돼끼"
  };

  const displayName = nameMap[id] || id;
  return (
    <div className="sponsorship-page-container">
      <h2 className="sponsorship-title">{displayName}님의 협찬 이력</h2>
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
