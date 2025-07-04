import axios from 'axios';

export const fetchInfluencerData = async () => {
  const response = await axios.get('http://3.34.90.217:8080/api/influencers/ranking');


  console.log(response.data);
  
  return response.data;
};