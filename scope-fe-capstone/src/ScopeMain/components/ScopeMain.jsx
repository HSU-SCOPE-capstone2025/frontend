// src/ScopeMain/components/ScopeMain.js
import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/ScopeMain.css';

//image
import mainpage from "../../assets/images/mainpage/mainpage_image.png";

const ScopeMain = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="maingradBackground">
        <div className="maingradText">
          인플루언서 마케팅,
          <br></br>
          데이터로 정교하게
        </div>

        <div className="grayText1">
          인플루언서 검색부터 맞춤 추천까지, 효과적인 인플루언서 마케팅을 경험하세요.
        </div>

        <div className="mainpage-image">
          <img src={mainpage} alt="mainpage" style={{width: "1260px", height: "717px"}}/>
        </div>
      </div>

    </div>
  );
};

export default ScopeMain;
