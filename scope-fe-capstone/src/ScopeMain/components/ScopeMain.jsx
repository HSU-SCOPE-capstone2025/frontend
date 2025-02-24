// src/ScopeMain/components/ScopeMain.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ScopeMain = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1>Scope Main Page</h1>
      <p>아래 버튼을 클릭하면 원하는 페이지로 이동할 수 있습니다.</p>
      
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/Analysis")}>분석</button>
        <button style={styles.button} onClick={() => navigate("/InfluencerRanking")}>인플루언서 랭킹</button>
        <button style={styles.button} onClick={() => navigate("/ProfileDetailAnalysis")}>프로필 상세 분석</button>
        <button style={styles.button} onClick={() => navigate("/SNSDetailAnalysis")}>SNS 상세 분석</button>
        <button style={styles.button} onClick={() => navigate("/Recommendation")}>추천</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  buttonContainer: {
    marginTop: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
  },
};

export default ScopeMain;
