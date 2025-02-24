import React from "react";
import { useNavigate } from "react-router-dom";

function InfluencerRanking() {
    const navigate = useNavigate();

  return (
    <div>
      <h1>랭킹 페이지</h1>
      <p>여기는 랭킹 페이지입니다.</p>
      <button onClick={() => navigate("/")}>메인 페이지로 이동</button>

    </div>
  );
}

export default InfluencerRanking;
