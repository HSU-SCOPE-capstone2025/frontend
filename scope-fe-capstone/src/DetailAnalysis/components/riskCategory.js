// riskCategory.js 
export const getRiskCategory = (cb, ec) => {
    let level = "low";
    if (cb >= 12 || ec >= 80) level = "critical";
    else if (cb >= 9 || ec >= 65) level = "high";
    else if (cb >= 6 || ec >= 50) level = "medium";
    else level = "low";
    return level;
  };
  
  export const getRiskAdvice = (cb, ec, trend) => {
    const level = getRiskCategory(cb, ec);
  
    // 📢 리스크 요약
    let summary = "";
    // 💡 대응 조언
    let advice = "";
  
    switch (level) {
      case "critical":
        summary = "심각한 수준의 리스크가 감지되었습니다.";
        advice = "댓글 관리 및 커뮤니티 대응을 즉시 강화하세요. 논란 중심의 콘텐츠는 잠시 중단하고 사과문이나 해명 영상으로 신뢰 회복을 우선하세요.";
        break;
  
      case "high":
        summary = "높은 수준의 공격성 또는 편향적 반응이 나타납니다.";
        advice = "댓글 모니터링을 강화하고, 긍정적 참여를 유도할 수 있는 Q&A나 커뮤니티 포스트를 활용하세요.";
        break;
  
      case "medium":
        summary = "일부 공격적이거나 반복된 반응이 관찰됩니다.";
        advice = "논란성 발언 또는 오해 소지가 있는 표현을 점검하고, 콘텐츠 설명을 명확히 보완하세요.";
        break;
  
      default:
        summary = "현재는 안정적인 상태입니다.";
        advice = "댓글 피드백을 꾸준히 모니터링하고, 공감형 소통을 유지하세요.";
    }
  
    // 변화 추세 보정
    if (trend === "급등" && level !== "low") {
      summary += " 최근 점수가 급격히 상승했습니다.";
      advice += " 다음 업로드 전, 댓글 반응 추이를 반드시 확인하세요.";
    }
  
    return { level, summary, advice };
  };
  