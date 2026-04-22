# 💻 SCOPE
**Sentiment & Comment Opinion Prediction Engine**
>인플루언서 콘텐츠를 멀티모달로 분석하여 지지층을 예측하는 콘텐츠 반응 분석 서비스

## 📽️ 소개 영상
[👉 웹페이지 소개 영상 보러가기 ](https://youtu.be/zJDZx5RFibE)  
>프로젝트 시연 및 핵심 기능을 영상으로 소개합니다.

## 💡 작품 개요
'SCOPE'는 SNS 인플루언서 콘텐츠에 대한 **사용자 반응을 정밀하게 해석**하고, **정성적 데이터를 정량화하여 인기도를 예측**하는 멀티모달 분석 시스템이다.

기존의 조회수, 좋아요 등의 지표는 감정이나 맥락을 반영하지 못해 한계가 있으며, 'SCOPE'는 이를 극복하기 위해 **텍스트, 음성, 표정 데이터를 통합 분석**한다. 댓글로부터 **감정, 주제, 사용자 군집 정보를 추출**하고, **콘텐츠 내 감정 흐름과의 정합성을 비교**하여 **사용자의 실제 반응을 수치화**한다. 핵심은 “댓글은 어떤 감정 흐름을 참조하고 있으며, 그 반응은 주제적으로 **타당하고 신뢰할 수 있는가”라는 질문을 정량적으로 해석**하는 데 있으며, 이를 기반으로 **채널 및 인물 단위의 인기도 변화를 예측**한다. 

'SCOPE'는 단순 수치를 넘어 **콘텐츠 맥락과 사용자 감정의 상호작용을 분석**함으로써, **인플루언서 마케팅, 개인화 추천, 사회현상 해석에 실질적인 인사이트를 제공**한다.

## 🧩 구조도
![scope구조도](https://github.com/user-attachments/assets/9e00cc09-2732-4743-8148-d281a7bbbd99)

## 🛠️ 적용 기술 및 구조
**개발 환경**: Windows, Mac OS, Ubuntu<br>
**개발 도구**: Visual Studio Code, IntelliJ, MySQL workbench, Docker<br>
**개발 언어**: Javascript, Java, Python, SQL<br>
**주요 기술**: React, Spring Boot, Flask, GPT-4, FastText, KcBERT, KoBERT, HuBERT, ViT, Pyannote, MediaPipe, opencv haar cascade, STT, MultiModal Attention Fusion

## 📊 기능 및 화면 소개
SCOPE는 인플루언서 콘텐츠를 다각도로 분석하고, 사용자의 목적에 맞는 인플루언서를 추천하는 서비스입니다.  
아래는 실제 구현된 화면과 함께 주요 기능을 소개합니다.

### 📌 1. 서비스 소개
- SCOPE 프로젝트 개요 및 핵심 기능 요약  
- 멀티모달 분석 기반의 핵심 지지층 예측 시스템 안내
 ![서비스소개1](https://github.com/user-attachments/assets/285752e0-59cb-4fa4-9e31-5a22a37d4abc)

### 🏆 2. 인플루언서 순위 
- 인플루언서의 영향력 기반 랭킹 제공  
- SCOPE 점수, 팔로워 수, 좋아요 수 등 다양한 기준으로 정렬 가능 
 ![순위](https://github.com/user-attachments/assets/e1182d63-336c-4679-b756-f4283635360d)

### 🔍 3. 인플루언서 찾기
- 카테고리, 태그, 팔로워 수, 좋아요 수 기반의 고급 검색 기능  
- 다중 필터 조합을 통한 세분화된 검색 지원
  ![찾기검색](https://github.com/user-attachments/assets/742b0c5d-6e19-4f11-ac5e-a68fd37ec7bd)

### 📱 4. SNS 상세 분석
- YouTube, Instagram, TikTok 플랫폼별 콘텐츠 및 반응 분석  
- 팔로워 수, 좋아요 수, 댓글 수의 시간 흐름에 따른 변화 시각화  
- 최근 활동 썸네일과 주요 콘텐츠 확인

 <p align="center">
  <img src="https://github.com/user-attachments/assets/9c3e562c-30e3-4938-8053-4d7c463d2f47" height="300"/>
  <img src="https://github.com/user-attachments/assets/2679ede5-d15f-4a88-ac77-57c6be056e42" height="300"/>
</p>

### 👤 5. 계정 상세 분석
- 플랫폼별 SCOPE 점수 변화 및 핵심 지지층 비율 시각화  
- 팔로워의 감정 및 성향 군집화 결과 제공  
- 댓글 주제 분석 및 실제 댓글 데이터 시각화  
- 인플루언서 콘텐츠의 감정 변화 추이 제공

> ※ 모든 분석은 YouTube, Instagram, TikTok 세 가지 플랫폼에 대해 통합 제공됩니다.

 <p align="center">
  <img src="https://github.com/user-attachments/assets/33b11858-6cce-49a3-98f0-efb63f7daa54" height="400"/>
  <img src="https://github.com/user-attachments/assets/ee04b730-f2f0-470e-9821-a420b285c880" height="400"/>
</p>
 <p align="center">
  <img src="https://github.com/user-attachments/assets/fdacfb7d-f05b-4f39-8bd0-04a51eb26754" height="300"/>
 </p>

### 🎯 6. 맞춤 인플루언서 추천
- 사용자의 관심사 및 조건 입력 기반 추천 기능  
- 팔로워 군집을 기반으로 한 필터 조합 가능  
- 상세 필터를 통한 목적별 정밀 추천 지원
 ![추천](https://github.com/user-attachments/assets/b2828313-5057-4df4-8a91-c301e04bf846)

## 🚀 기대 효과

1. **SNS메타데이터 분석 및 콘텐츠 피드백**  
   인플루언서는 SCOPE를 통해 자신의 콘텐츠가 유발하는 감정과 주제별 반응을 분석함으로써, SNS상의 메타데이터를 기반으로 본인 채널의 유의미한 구독자 및 정보를 확인하고 충성적인 구독자들의 이탈을 방지하는 전략을 수립할 수 있다.<br>콘텐츠 기획 과정에 데이터 기반 피드백을 반영함으로써 더 정밀한 창작 방향 설정이 가능해진다.

2. **마케팅 실효성**  
   브랜드와 기업은 SCOPE점수 지표를 활용하여 실사용자 반응에 기반한 인플루언서를 선별하고, 소비자 선호 주제를 파악해 개인화된 마케팅 전략과 콘텐츠 추천 시스템을 구축할 수 있다. <br>이는 기존의 단순 조회수 기반 평가 방식보다 효율성과 신뢰도를 높인다.

3. **멀티모달 통합성**  
   본 프로젝트는 음성·표정·텍스트를 통합한 멀티모달 감정 분석을 통해 사용자 반응의 맥락을 정밀하게 해석할 수 있는 분석 방향을 제시하며, 향후 다양한 AI 기반 사회현상 분석이나 커뮤니케이션 연구로 확장될 수 있는 학문적·실용적 가치를 동시에 지닌다.

## 🎨 전시용 판넬
![SCOPE_판넬](https://github.com/user-attachments/assets/d9e4e53f-930c-43e9-a288-c004cdb3df9f)

## 출처
SNS 영상 및 댓글 데이터
- YouTube 인플루언서 채널 기반 영상 및 댓글 수집, Python 크롤러 기반 자동 수집
- YouTube Data API v3 /  YouTube TOS

감정 분석 (텍스트)
한국어 댓글 감정 분석: 
- KcBERT 사전학습 모델 활용학습/ 검증 데이터셋: AI Hub 감성대화 말뭉치
- KcBERT GitHub / AI Hub 감성대화/  Google STT
  
감정 분석 (음성)
- Google Speech-to-Text로 STT 처리 후,  HuBERT 모델 기반 감정 분류 수행화자 분리: pyannote-audio 적용
- HuBERT (Hsu et al., 2021) /  pyannote-audio GitHub
  
감정 분석 (얼굴)
- 인물 얼굴 감정 분석: DeepFace 및 ArcFace 기반 CNN/FaceNet 모델로 표정 감정 추정
- DeepFace GitHub /  ArcFace: Deng et al., 2019 /  Vision Transformer

사이버불링 지수 계산
- 댓글 감정 분류(KcBERT) 및 클러스터링(KMeans) 결과로부터 공격성/혐오 클러스터 비율 추출 → 수치화
- 자체 구현 /  기반 모델: KcBERT / Clustering by scikit-learn

에코체임버 지수 계산
- Shannon Diversity Index 공식 사용의견 다양성 수치화로 편향도 추정공식
- Shannon, C.E. (1948), A Mathematical Theory of Communication, Bell System Technical Journal

멀티모달 Fusion 기술
- 텍스트(GloVe), 음성(COVAREP), 얼굴(FACET) 임베딩 통합Attention Fusion 및 NAS 기반 구조로 감정 분류CMU SDK 기반 MOSEI, MELD 실험 적용
- 자체 연구 논문 사용(1st round review completed) /  CMU SDK GitHub  / MELD

사용자 인터페이스 및 챗봇
- OpenAI GPT-4 API를 통한 리포트 요약 및 Follow Support Score 해설 기능 제공
- OpenAI GPT-4
  
<img width="525" height="414" alt="image" src="https://github.com/user-attachments/assets/711239a0-f2f3-4254-b031-06067647b355" />


## 👥 팀원 소개
| 김정훈 | 성유빈 | 심규보 | 이주현 | 임예은 |
|:------:|:------:|:------:|:------:|:------:|
| <img src="https://github.com/thuygom.png" width="120"/> | <img src="https://github.com/mimolulu.png" width="120"/> | <img src="https://github.com/Qbooo.png" width="120"/> | <img src="https://github.com/hana03030.png" width="120"/> | <img src="https://github.com/ye-eun-min201.png" width="120"/> |
| [@thuygom](https://github.com/thuygom) | [@mimolulu](https://github.com/mimolulu) | [@Kyubo Sim](https://github.com/Qbooo) | [@juhyun](https://github.com/hana03030) | [@yeeunmin](https://github.com/ye-eun-min201) |

## 📄 논문 투고
<img width="280" height="395" alt="image" src="https://github.com/user-attachments/assets/b0db717c-b1bf-4015-a2ff-0f07feeabc62" />

- [IJIBC 8월호 투고, accept]
-  [AICOMPS 2024] Undergraduate Session  
 - Title: *SCOPE – Sentiment & Comment Opinion Prediction Engine* (논문 투고)
 
-  [KIPS ASK 2025] Undergraduate Session  
 - Title: *AURA – Attention-Fused User Response Analysis* (논문 투고)
