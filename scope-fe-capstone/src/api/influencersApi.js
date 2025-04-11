import axios from 'axios';

const BASE_URL = 'https://your-api-server.com/api';

export const fetchInfluencerRanking = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${BASE_URL}/influencers/ranking`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching influencer ranking:', error);
    throw error;
  }
};