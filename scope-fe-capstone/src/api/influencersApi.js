export async function fetchInfluencers() {
  try {
    const response = await fetch('http://localhost:8080/api/influencers/ranking');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return []; // 오류 시 빈 배열 반환
  }
}