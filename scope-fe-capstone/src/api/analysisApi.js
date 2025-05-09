import axios from 'axios';

export const fetchAnalysisData = async () => {
  const response = await axios.get('http://localhost:8080/api/influencers/search');
  return response.data;
};
