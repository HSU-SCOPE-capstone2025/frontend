import influencer from "../../assets/images/influencer.png";
import img1 from "../../assets/images/main2.png";
import img2 from "../../assets/images/main2.png";
import img3 from "../../assets/images/main2.png";
import img4 from "../../assets/images/main2.png";
import img5 from "../../assets/images/main2.png";
import img6 from "../../assets/images/main2.png";

const dummyInfluencerData = {
  profileImage: influencer,
  nickname: "risabae_art",
  name: "이사배",
  description: "메이크업 아티스트 이사배",
  categories: ["패션", "뷰티"],
  snsAccounts: ["instagram", "youtube", "tiktok"],
  followers: {
    instagram: "105.8",
    youtube: "57.3",
    tiktok: "16",
  },
  posts: {
    instagram: "10002",
    youtube: "20002",
    tiktok: "30002",
  },
  totalLikes: {
    instagram: "1.2만",
    youtube: "2.4만",
    tiktok: "8000개",
  },
  totalComments: {
    instagram: "450개",
    youtube: "1200개",
    tiktok: "300개",
  },
  avgLikes: {
    instagram: "10000",
    youtube: "23000",
    tiktok: "33000",
  },
  avgComments: {
    instagram: "100",
    youtube: "200",
    tiktok: "500",
  },
  sponsorships: [
    {
      title: "꼬북칩",
      snsType: "릴스",
      date: "2025.01",
      category: "식품",
    },
    {
      title: "꼬북칩",
      snsType: "릴스",
      date: "2025.01",
      category: "음식",
    },
  ],
  analysisTags: ["#다정한", "#귀여운", "#부드러운"],
  graphDataSet: {
    instagram: {
      followers: [15000, 30000, 45000, 70000, 110000],
      likes: [8000, 10050, 20050, 35000, 50000],
      comments: [10, 25, 50, 80, 1000],
    },
    youtube: {
      followers: [20000, 50000, 80000, 120000, 160000],
      likes: [5000, 6000, 8000, 12000, 15000],
      comments: [100, 150, 200, 250, 300],
    },
    tiktok: {
      followers: [10000, 20000, 25000, 30000, 35000],
      likes: [2000, 3000, 4000, 5000, 6000],
      comments: [50, 70, 90, 110, 130],
    },
  },
  images: [img1, img2, img3, img4, img5, img6],
};

export default dummyInfluencerData;
