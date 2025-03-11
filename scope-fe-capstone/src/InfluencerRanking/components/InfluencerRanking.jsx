import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/InfluencerRanking.css';

//image
import instagramLogo from "../../assets/images/instagram_logo.png";

function InfluencerRanking() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="gradBackground">
        <div className="whiteBox">
          <div className="titleText">
            인플루언서 순위
          </div>
          <div className="grayLine"></div>
          
        </div>
      </div>
    </div>
  );
}

export default InfluencerRanking;
