import axios from 'axios';

export const fetchAnalysisData = async () => {
  const response = await axios.get('http://15.164.251.135:8080/api/influencers/search');
  return response.data;
};
