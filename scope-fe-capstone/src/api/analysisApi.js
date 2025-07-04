import axios from 'axios';

export const fetchAnalysisData = async () => {
  const response = await axios.get('http://3.34.90.217:8080/api/influencers/search');
  return response.data;
};
