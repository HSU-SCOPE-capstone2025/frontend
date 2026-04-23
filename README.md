# 💻 SCOPE
**Sentiment & Comment Opinion Prediction Engine**
>인플루언서 콘텐츠를 멀티모달로 분석하여 지지층을 예측하는 콘텐츠 반응 분석 서비스

## 📽️ 소개 영상
[👉 웹페이지 소개 영상 보러가기 ](https://youtu.be/zJDZx5RFibE)  
>프로젝트 시연 및 핵심 기능을 영상으로 소개합니다.

## 💡 작품 개요
**'SCOPE'는 SNS 인플루언서 콘텐츠에 대한 사용자 반응을 정밀하게 해석하고, 정성적 데이터를 정량화하여 인기도를 예측하는 멀티모달 분석 시스템이다.**

기존의 조회수, 좋아요 등의 지표는 감정이나 맥락을 반영하지 못해 한계가 있으며, 'SCOPE'는 이를 극복하기 위해 텍스트, 음성, 표정 데이터를 통합 분석한다. 댓글로부터 감정, 주제, 사용자 군집 정보를 추출하고, 콘텐츠 내 감정 흐름과의 정합성을 비교하여 사용자의 실제 반응을 수치화한다. 핵심은 “댓글은 어떤 감정 흐름을 참조하고 있으며, 그 반응은 주제적으로 타당하고 신뢰할 수 있는가”라는 질문을 정량적으로 해석하는 데 있으며, 이를 기반으로 채널 및 인물 단위의 인기도 변화를 예측한다. 

'SCOPE'는 단순 수치를 넘어 콘텐츠 맥락과 사용자 감정의 상호작용을 분석함으로써, 인플루언서 마케팅, 개인화 추천, 사회현상 해석에 실질적인 인사이트를 제공한다.

## 🧩 구조도
![scope구조도](https://github.com/user-attachments/assets/9e00cc09-2732-4743-8148-d281a7bbbd99)

## 🛠️ 적용 기술 및 구조
**개발 환경**: Windows, Mac OS, Ubuntu<br>
**개발 도구**: Visual Studio Code, IntelliJ, MySQL workbench, Docker<br>
**개발 언어**: Javascript, Java, Python, SQL<br>
**주요 기술**: React, Spring Boot, Flask, GPT-4, FastText, KcBERT, KoBERT, HuBERT, ViT, Pyannote, MediaPipe, opencv haar cascade, STT, MultiModal Attention Fusion


## 👥 팀원 소개
| 김정훈 | 성유빈 | 심규보 | 이주현 | 임예은 |
|:------:|:------:|:------:|:------:|:------:|
| <img src="https://github.com/thuygom.png" width="100%"/> | <img src="https://github.com/mimolulu.png" width="100%"/> | <img src="https://github.com/Qbooo.png" width="100%"/> | <img src="https://github.com/hana03030.png" width="100%"/> | <img src="https://github.com/ye-eun-min201.png" width="100%"/> |
| [@thuygom](https://github.com/thuygom) | [@mimolulu](https://github.com/mimolulu) | [@Kyubo Sim](https://github.com/Qbooo) | [@juhyun](https://github.com/hana03030) | [@yeeunmin](https://github.com/ye-eun-min201) |

- 김정훈(AI 모듈): 음성·표정 분석 AI모델 파인튜닝, 멀티모달리티 분석 모델 파인튜닝

- 성유빈(백엔드): SNS 메타데이터 수집, KcBERT모델 파인튜닝 및 Text감성분석, MySQL DB 스키마 설계, DB 연동 및 데이터 적재 자동화 로직 설계·구현

- 심규보(백엔드): DB설계 및 구축, Rest-API 서버 개발, AWS Infrastructure 구축, Docker CI/CD 파이프라인 구축

- 임예은(프론트엔드): UI/UX 설계 및 구현, 인플루언서 검색·분석·추천 기능 개발, API 기반 실시간 데이터 처리 및 클라이언트 데이터 바인딩 로직 구현

- 이주현(프론트엔드): 화면 흐름 설계 및 UI/UX개발, 인플루언서 데이터 기반 소개·순위·분석·추천·챗봇·대시보드 구현, 데이터 가공 기반 REST API연동 및 인터페이스 구현


## 📊 기능 및 화면 소개
> 🔗 **[프로젝트 상세 설명 및 개발 기록 (Notion)](https://www.notion.so/K-Route-34b31f3dc85d8028bc7ddd83d2df2489?source=copy_link)**
> 
> 💡 *프로젝트 설명과 개발 과정의 기록을 담고 있습니다.*
> 

## 📄 논문 투고
<img width="60%" alt="image" src="https://github.com/user-attachments/assets/b0db717c-b1bf-4015-a2ff-0f07feeabc62" />

- [IJIBC 8월호 투고, accept]
-  [AICOMPS 2024] Undergraduate Session  
 - Title: *SCOPE – Sentiment & Comment Opinion Prediction Engine* (논문 투고)
 
-  [KIPS ASK 2025] Undergraduate Session  
 - Title: *AURA – Attention-Fused User Response Analysis* (논문 투고)

-  [KIPS ACK 2025] Undergraduate Session  
 - Title: *Operationalizing Affective Risk Metrics for Creator Protection on Social Platforms* (논문 투고-은상 수상🏆 / 우수논문 선정)

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
