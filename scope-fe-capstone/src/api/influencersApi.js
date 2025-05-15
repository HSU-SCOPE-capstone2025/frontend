import axios from 'axios';

export const fetchInfluencerData = async () => {
  const response = await axios.get('http://15.164.251.135:8080/api/influencers/ranking');


  console.log(response.data);
  
  return response.data;
};