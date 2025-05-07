import axios from 'axios';

export const fetchInfluencerData = async () => {
  const response = await axios.get('http://localhost:8080/api/influencers/ranking');
  return response.data;
};