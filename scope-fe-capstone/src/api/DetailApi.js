import axios from 'axios';

//기존 코드드
// export const fetchInfluencerInfo = (id) => {
//   return axios.get(`http://15.164.251.135:8080/api/influencers/detail/${id}`).then(res => res.data);
// };

// export const fetchSNSData = (id) => {
//   return axios.get(`http://15.164.251.135:8080/api/influencers/detail/${id}/sns`).then(res => res.data);
// };

// export const fetchAccountData = (id) => {
//   return axios.get(`http://15.164.251.135:8080/api/influencers/detail/${id}/analysis`).then(res => res.data);
// };



export const fetchInfluencerInfo = (id) => {
    return axios.get(`http://3.34.90.217:8080/api/influencers/detail/${id}`).then(res => res.data);
};

export const fetchSNSData = (id) => {
  return axios.get(`http://3.34.90.217:8080/api/influencers/detail/${id}/sns`).then(res => res.data);
};

export const fetchAccountData = (id) => {
  return axios.get(`http://3.34.90.217:8080/api/influencers/detail/${id}/analysis`).then(res => res.data);
};
