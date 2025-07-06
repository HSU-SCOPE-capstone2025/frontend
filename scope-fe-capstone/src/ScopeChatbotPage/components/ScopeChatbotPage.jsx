// ScopeChatbotPage.jsx

import React from 'react';

export default function ScopeChatbotPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>SCOPE AI 챗봇</h1>
      <p style={styles.description}>
        이 페이지는 댓글을 분석하고, 감정 피드백을 제공하는 SCOPE AI 챗봇입니다.
      </p>
      <div style={styles.chatbox}>
        <p style={{ color: '#888' }}>[챗봇 응답 영역]</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  description: {
    fontSize: '1rem',
    marginBottom: '24px',
  },
  chatbox: {
    padding: '24px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    backgroundColor: '#fff',
  },
};
