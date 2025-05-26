// src/ScopeMain/components/ScopeMain.js
import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/ScopeMain.css';

//image
import main_image from "../../assets/images/mainpage/main_image.png";
import ranking from "../../assets/images/mainpage/ranking.png";
import struct from "../../assets/images/mainpage/struct.png";
import struct2 from "../../assets/images/mainpage/struct2.png";


const ScopeMain = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="maingradBackground">
          <div style={{ display: "flex", justifyContent: "center", gap: "70px" }}>
            <div>
              <p className="maingradText">
                인플루언서 마케팅,
                <br></br>
                데이터로 정교하게
              </p>
              <p className="grayText1">
                인플루언서 검색부터 맞춤 추천까지, 효과적인 인플루언서 마케팅을 경험하세요.
              </p>
            </div>
            <div>
              <img src={main_image} alt="mainpage" style={{ marginTop: "180px" }} />
            </div>
          </div>
        </div>

        <div className="flex-container">
          <div>
            <div className="white-background">
              <div className="flex-container">
                <div className="inline-div">
                  <div>
                    <p className="title-text">
                      당신이 궁금했던 그 숫자, 인플루언서의 영향력을 ‘SCOPE 점수’로 확인하세요
                    </p>
                    <img src={ranking} alt="ranking" style={{ marginTop: "0px" }} />
                  </div>
                  <div style={{ marginTop: "300px" }}>
                    <p className="title-text">
                      구조는 다음과 같이 구성되어 있어요
                    </p>
                    <img src={struct} alt="struct" style={{ marginTop: "0px" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="skyblue-background">
              <div className="flex-container">
                <div className="inline-div">
                  <p className="title-text">
                    SCOPE 점수는 <br/> 이러한 과정을 통해서 도출됩니다
                  </p>
                  <img src={struct2} alt="ranking" style={{ marginTop: "0px", width: "1000px", height: "1400px" }} />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default ScopeMain;
