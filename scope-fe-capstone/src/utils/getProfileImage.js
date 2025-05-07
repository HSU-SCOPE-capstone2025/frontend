import ralral from "../assets/images/profile/ralral.png";
import hxxax from "../assets/images/profile/hxxax.jpg";
import defaultImage from "../assets/images/profile/default.png"; // 기본 이미지 추가해두기!

const profileImages = {
  "_ralral_": ralral,
  "hxxax": hxxax,
  // 이름 더 추가 가능
};

export const getProfileImage = (name) => {
  return profileImages[name] || defaultImage;
};