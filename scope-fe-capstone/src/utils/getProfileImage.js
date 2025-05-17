import ralral from "../assets/images/profile/ralral.jpg";
import hxxax from "../assets/images/profile/hxxax.jpg";
import chimchakman from "../assets/images/profile/chimchakman.jpg";
import enjoycouple from "../assets/images/profile/enjoycouple.jpg";
import easycookgod from "../assets/images/profile/easycookgod.jpg";
import trytoeat from "../assets/images/profile/trytoeat.jpg";
import woowakgood from "../assets/images/profile/woowakgood.jpg";
import heebab from "../assets/images/profile/heebab.jpg";
import malwang from "../assets/images/profile/malwang.jpg";
import hobbycookman from "../assets/images/profile/hobbycookman.jpg";
import joodoongyi from "../assets/images/profile/joodoongyi.jpg";
import meatsman from "../assets/images/profile/meatsman.jpg";
import lifeisrecording from "../assets/images/profile/lifeisrecording.jpg";
import underworld from "../assets/images/profile/underworld.jpg";
import haesooin from "../assets/images/profile/haesooin.jpg";
import dudley from "../assets/images/profile/dudley.jpg";
import dwaekki from "../assets/images/profile/dwaekki.jpg";
import beondeo from "../assets/images/profile/beondeo.jpg";
import entranceexam from "../assets/images/profile/entranceexam.jpg";
import minsco from "../assets/images/profile/minsco.jpg";
import kimmeju from "../assets/images/profile/kimmeju.jpg";
import silverSpoon from "../assets/images/profile/silver-spoon.jpg";
import jyeonunnie from "../assets/images/profile/jyeonunnie.jpg";
import salimnam from "../assets/images/profile/salimnam.jpg";
import ppyoyongnyong from "../assets/images/profile/ppyoyongnyong.jpg";
import parkesther from "../assets/images/profile/parkesther.jpg";
import jihan from "../assets/images/profile/jihan.jpg";
import daldaltour from "../assets/images/profile/daldaltour.jpg";
import bossmincook from "../assets/images/profile/bossmincook.jpg";
import gmovie from "../assets/images/profile/gmovie.jpg";

import defaultImage from "../assets/images/profile/default.png"; // 기본 이미지 추가해두기!

const profileImages = {
  "랄랄": ralral,
  "혜안": hxxax,
  "침착맨": chimchakman,
  "엔조이커플": enjoycouple,
  "자취요리신": easycookgod,
  "먹어볼래 TryToEat": trytoeat,
  "우왁굳": woowakgood,
  "히밥": heebab,
  "말왕": malwang,
  "취미로 요리하는 남자": hobbycookman,
  "주둥이방송": joodoongyi,
  "육식맨": meatsman,
  "인생 녹음 중": lifeisrecording,
  "언더월드": underworld,
  "해수인": haesooin,
  "더들리": dudley,
  "돼끼": dwaekki,
  "뻔더": beondeo,
  "입시덕후": entranceexam,
  "민스코": minsco,
  "김메주와 고양이들": kimmeju,
  "은수저": silverSpoon,
  "젼언니": jyeonunnie,
  "살림남": salimnam,
  "뽀용뇽": ppyoyongnyong,
  "박에스더": parkesther,
  "지한": jihan,
  "달달투어": daldaltour,
  "요리하는 민사장": bossmincook,
  "지무비": gmovie,
  // 이름 더 추가 가능
};

export const getProfileImage = (name) => {
  return profileImages[name] || defaultImage;
};