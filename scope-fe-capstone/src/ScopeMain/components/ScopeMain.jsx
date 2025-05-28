// src/ScopeMain/components/ScopeMain.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../css/ScopeMain.css';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

//image
import main_image from "../../assets/images/mainpage/main_image.png";
import ranking from "../../assets/images/mainpage/ranking.png";
import struct from "../../assets/images/mainpage/struct.png";
import struct2 from "../../assets/images/mainpage/struct2.png";
import scope_graph from "../../assets/images/mainpage/scope_graph.png";
import scope_platform from "../../assets/images/mainpage/scope_platform.png";
import emotionNtendency from "../../assets/images/mainpage/emotionNtendency.png";
import topic from "../../assets/images/mainpage/topic.png";



const ScopeMain = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    <div>
      <div>
        <div className="maingradBackground" data-aos="fade-up">
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
              <img src={main_image} alt="mainpage" style={{ marginTop: "180px", width: "1000px", height: "800px" }} />
            </div>
          </div>
        </div>

        <div className="flex-container">
          <div>
            <div className="white-background">
              <div className="flex-container">
                <div className="inline-div">
                  <div data-aos="zoom-in">
                    <p className="title-text">
                      당신이 궁금했던 그 숫자, 인플루언서의 영향력을 ‘SCOPE 점수’로 확인하세요
                    </p>
                    <img src={ranking} alt="ranking" style={{ marginTop: "0px", width: "1500px", height: "800px" }} />
                  </div>
                  <div className="flex-container">
                    <div style={{ marginTop: "300px" }} data-aos="fade-up">
                      <p className="title-text">
                        구조는 다음과 같이 구성되어 있어요
                      </p>
                      <img src={struct} alt="struct" style={{ marginTop: "100px", marginBottom: "200px", width: "1400px", height: "900px" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skyblue-background" data-aos="fade-up" id="scope-detail">
              <div className="flex-container">
                <div className="inline-div" style={{ paddingTop: "150px", paddingBottom: "150px" }}>
                  <p className="title-text" >
                    SCOPE 점수는 <br /> 이러한 과정을 통해서 도출됩니다
                  </p>
                  <img src={struct2} alt="ranking" style={{ marginTop: "80px", width: "700px", height: "1000px" }} />
                </div>
              </div>
            </div>

            <div className="white-background">
              <div className="flex-container">
                <div className="inline-div" style={{ paddingTop: "150px", paddingBottom: "150px" }}>
                  <p className="title-text" style={{ marginBottom: "100px" }} data-aos="fade-up">
                    이런 과정을 통해서<br />
                    다음과 같은 결과를 도출할 수 있어요
                  </p>

                  <div data-aos="fade-up">
                    <p className="description-title" >SCOPE 점수 변화</p>
                    <img src={scope_graph} alt="ranking" />
                  </div>

                  <div data-aos="fade-up">
                    <p className="description-title">핵심지지층 예상 비율</p>
                    <p className="description-text">SCOPE 점수를 토대로 인플루언서를 지지하는 핵심 지지층이 어느정도의 비율인지 알 수 있습니다.</p>
                    <img src={scope_platform} alt="scopeplatform" />
                  </div>

                  <div data-aos="fade-up">
                    <p className="description-title">감정/성향 군집화</p>
                    <p className="description-text">팔로워들의 댓글을 분석해 팔로워들의 주 감정과 성향을 알 수 있습니다.</p>
                    <img src={emotionNtendency} alt="emotionNtendency" />
                  </div>

                  <div data-aos="fade-up">
                    <p className="description-title">팔로워들의 주요 관심사</p>
                    <p className="description-text">댓글들이 주로 어떤 주제로 말하고 있는지, 주제 비율과 실제 댓글 데이터를 알 수 있습니다.</p>
                    <img src={topic} alt="topic" />
                  </div>
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
