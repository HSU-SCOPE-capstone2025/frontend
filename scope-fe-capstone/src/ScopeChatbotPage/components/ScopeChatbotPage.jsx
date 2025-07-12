import React, { useState, useRef, useEffect } from "react";
import { fetchChat } from "../../api/chatApi";
import '../css/ScopeChatbotPage.css';
import TypingLine from "./TypingLine";

//이미지
import ScopeChatbot from "../../assets/images/chatbot/ScopeChatbot.png";

const ScopeChatbotPage = () => {
  const [query, setQuery] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const exampleCommands = [
    { label: "전체 인플루언서 통계 보기", command: "전체 인플루언서 통계를 보여줘" },
    { label: "특정일자 통계 보기", command: "[특정 인플루언서]의 [n월 m일] 통계를 보여줘" },
    { label: "최고 반응일 통계 보기", command: "[특정 인플루언서]의 최고성과일 통계보여줘" },
    { label: "최근 평균 통계 보기", command: "[특정 인플루언서]의 최근 평균 통계보여줘" },
    { label: "인플루언서 비교", command: "[인플루언서1]과 [인플루언서2]의 통계를 비교해줘" },
    { label: "칭찬 댓글 보기", command: "[특정 인플루언서]의 칭찬 댓글 분석해줘" },
    { label: "콘텐츠 방향 추천", command: "[특정 인플루언서]의 컨텐츠 방향성 제시해줘" },
    { label: "영상 목록 보기", command: "[특정 인플루언서]의 영상 URL 목록 보여줘" },
    { label: "SCOPE란?", command: "SCOPE 설명해줘" },
    { label: "통계 가능한 날짜 보기", command: "[특정 인플루언서]의 통계자료 중 사용가능한 날짜 보여줘" },
  ];

  const bottomRef = useRef(null);

  // const handleSubmit = async () => {
  //   if (!query.trim() || isLoading) return;

  //   setIsLoading(true);

  //   try {
  //     const response = await fetchChat(query, true);

  //     const newEntry = {
  //       question: query,
  //       functionCall: response.function_call,
  //       result: response.result,
  //       gptSummary: response.gpt_summary,
  //     };

  //     setChatLog((prev) => [...prev, newEntry]);
  //     setQuery(""); // 입력창 초기화
  //   } catch (error) {
  //     console.error("챗봇 응답 실패:", error);
  //   } finally {
  //     setIsLoading(false); // 응답 끝난 후 다시 활성화
  //   }
  // };

  const handleSubmit = async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);

    // 우선 질문만 넣은 새 항목 추가
    const newEntry = {
      question: query,
      functionCall: null,
      result: null,
      gptSummary: null,
    };

    // chatLog에 임시로 추가하고 해당 인덱스 기억
    setChatLog((prev) => [...prev, newEntry]);
    const currentIndex = chatLog.length;
    setQuery(""); // 입력창 초기화

    try {
      const response = await fetchChat(query, true);

      const updatedEntry = {
        question: query,
        functionCall: response.function_call,
        result: response.result,
        gptSummary: response.gpt_summary,
      };

      // GPT 응답을 기존 항목에 덮어쓰기
      setChatLog((prev) => {
        const updatedLog = [...prev];
        updatedLog[currentIndex] = updatedEntry;
        return updatedLog;
      });

    } catch (error) {
      console.error("챗봇 응답 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // 새 대화 추가 시 자동 스크롤
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div className="gradBackground">
      <div className="ChatbotWhiteBox">
        <div className="chatbotTitle">
          SCOPE AI챗봇
        </div>

        <div className="ChatbotMessageArea">
          {/* 안내 문구 (대화 없을 때만 표시) */}
          {chatLog.length === 0 && !isLoading && (
            <div className="chatbot-empty-guide">
              <p className="empty-guide-main">무엇이든 물어보세요</p>
              <p className="empty-guide-sub">아래의 예시 질문들을 참고해보세요. []안의 인플루언서의 이름을 넣어보세요.</p>
            </div>
          )}

          {chatLog.map((entry, idx) => (
            <div key={idx}>
              {/* 사용자 질문 (오른쪽) */}
              <div className="user-message">
                <div className="user-bubble">{entry.question}</div>
              </div>

              {/* GPT 요약 (왼쪽) */}
              {entry.gptSummary && (
                <div className="bot-message">
                  <img src={ScopeChatbot} className="bot-avatar" alt="챗봇" />
                  <div className="bot-bubble">
                    {/* <p>📊 통계 결과</p>
                    <TypingLine text={entry.result} />
                    <p>🧠 지피티 분석</p> */}
                    <TypingLine text={entry.gptSummary} />
                  </div>
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="bot-message">
              <img src={ScopeChatbot} className="bot-avatar" alt="챗봇" />
              <div className="bot-bubble">
                <TypingLine text="분석 중입니다..." />
                <span className="spinner" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* 하단 고정 영역: 예시 버튼 + 입력창 */}
        <div className="ChatbotFixedFooter">
          {/* <div className="chatbot-divider" /> */}
          <div className="example-buttons">
            {exampleCommands.map((ex, idx) => (
              <button key={idx} onClick={() => setQuery(ex.command)}>
                {ex.label}
              </button>
            ))}
          </div>

          <div className="chatbot-input-area">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isLoading) handleSubmit();
              }}
              placeholder="무엇이든 물어보세요"
              disabled={isLoading}  // 입력창도 잠금
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={isLoading ? "loading-button" : ""}
            >
              {isLoading ? "분석 중..." : "➤"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScopeChatbotPage;
