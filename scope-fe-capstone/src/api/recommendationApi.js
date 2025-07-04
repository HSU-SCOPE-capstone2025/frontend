// src/api/recommendationApi.js
import axios from "axios";

export const fetchFilteredInfluencers = async (params) => {
  try {
    const response = await axios.get("http://3.34.90.217:8080/api/influencers/search", {
      params: params,
    });
    return response.data; // { influencers: [...], total_influencer_num: N }
  } catch (error) {
    console.error("검색 API 호출 실패:", error);
    throw error;
  }
};
