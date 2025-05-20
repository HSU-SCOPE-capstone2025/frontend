
import React from "react";

const BarGraph = ({ score, maxScore = 10, width = 130, height = 10, color = "#007bff" }) => {
  const percentage = Math.min(score / maxScore, 1); // 최대 1.0 (100%)
  return (
    <div style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: '#e0e0e0',
      borderRadius: '5px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${percentage * width}px`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '5px',
        transition: 'width 0.3s ease'
      }}></div>
    </div>
  );
};

export default BarGraph;
