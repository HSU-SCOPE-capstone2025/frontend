const influencerAccountData = {
    name: "랄랄",
    platformScores: {
        youtube: [
            { date: "2025-05-01", scopeScore: 12 },
            { date: "2025-05-02", scopeScore: 18 },
            { date: "2025-05-03", scopeScore: 25 },
            { date: "2025-05-04", scopeScore: 20 },
            { date: "2025-05-05", scopeScore: 15 },
            { date: "2025-05-06", scopeScore: 30 },
            { date: "2025-05-07", scopeScore: 22 },
            { date: "2025-05-08", scopeScore: 35 },
            { date: "2025-05-09", scopeScore: 40 },
            { date: "2025-05-10", scopeScore: 28 },
            { date: "2025-05-11", scopeScore: 26 },
            { date: "2025-05-12", scopeScore: 33 },
            { date: "2025-05-13", scopeScore: 38 },
            { date: "2025-05-14", scopeScore: 29 },
            { date: "2025-05-15", scopeScore: 24 },
            { date: "2025-05-16", scopeScore: 31 },
            { date: "2025-05-17", scopeScore: 27 },
            { date: "2025-05-18", scopeScore: 36 },
            { date: "2025-05-19", scopeScore: 42 },
            { date: "2025-05-20", scopeScore: 33 },
            { date: "2025-05-21", scopeScore: 30 },
            { date: "2025-05-22", scopeScore: 19 },
            { date: "2025-05-23", scopeScore: 15 },
            { date: "2025-05-24", scopeScore: 21 },
            { date: "2025-05-25", scopeScore: 26 },
            { date: "2025-05-26", scopeScore: 34 },
            { date: "2025-05-27", scopeScore: 37 },
            { date: "2025-05-28", scopeScore: 45 },
            { date: "2025-05-29", scopeScore: 39 },
            { date: "2025-05-30", scopeScore: 44 }
        ],
        instagram: [],
        tiktok: [
            { date: "2025-05-02", scopeScore: 40 }
        ]
    },

    instaFollowers: 2000000,
    instaHighScopeCount: 1300000,
    youFollowers: 2500000,
    youHighScopeCount: 2000000,
    tikFollowers: 1500000,
    tikHighScopeCount: 900000,

    platforms: {
        youtube: {
            tendency: [
                { name: "지지하는", value: 30 },
                { name: "정보제공형", value: 20 },
                { name: "공격적인", value: 5 },
                { name: "유쾌함", value: 15 },
                { name: "분석적", value: 10 },
                { name: "스팸", value: 10 },
                { name: "중립적", value: 10 }
            ],
            emotion: [
                { name: "행복", value: 30 },
                { name: "슬픔", value: 15 },
                { name: "중립", value: 20 },
                { name: "혐오", value: 10 },
                { name: "분노", value: 10 },
                { name: "놀람", value: 5 },
                { name: "공포", value: 10 }
            ],
            topic: [
                {
                    name: "사건/논란",
                    value: 15,
                    comments: [
                        "이런 논란이 또 생기다니...",
                        "솔직히 이번 사건은 실망이에요",
                        "이건 좀 선 넘었지...",
                        "또 시작이네 ㅋㅋ",
                        "진짜 실망임"
                    ]
                },
                {
                    name: "콘텐츠 평가",
                    value: 10,
                    comments: [
                        "이번 영상 진짜 재밌었어요!",
                        "편집이 더 깔끔해졌네요",
                        "배경음이 좋아요",
                        "컨텐츠 퀄리티 많이 올랐네요",
                        "오프닝 너무 좋았어요"
                    ]
                },
                {
                    name: "유튜버 개인",
                    value: 30,
                    comments: ["좋아요", "팬이에요", "사랑해요", "멋져요", "응원해요"]
                },
                {
                    name: "제품/아이템 리뷰",
                    value: 30,
                    comments: ["좋은 제품이네요", "리뷰 감사해요", "유용했어요", "살게요", "정보 감사합니다"]
                },
                {
                    name: "사회/시사 이슈",
                    value: 30,
                    comments: ["이슈 잘 봤어요", "공감합니다", "화나네요", "좋은 시선입니다", "생각할 거리네요"]
                },
                {
                    name: "공감/감정 공유",
                    value: 30,
                    comments: ["같이 울었어요", "감동이에요", "마음이 아프네요", "위로가 되네요", "고마워요"]
                },
                {
                    name: "정보/꿀팁",
                    value: 30,
                    comments: ["정말 꿀팁이에요", "좋은 정보 감사합니다", "유용해요", "메모해둡니다", "이런 정보 좋아요"]
                },
                {
                    name: "유머/드립",
                    value: 30,
                    comments: ["빵 터졌어요", "웃겨요", "드립 대박", "센스있네요", "웃음 참기 실패"]
                },
                {
                    name: "질문/피드백",
                    value: 30,
                    comments: ["이건 어떻게 하나요?", "여기서 이건 뭐죠?", "다음에 이건요?", "제안드려요", "이건 개선 필요해요"]
                },
                {
                    name: "기타/미분류",
                    value: 30,
                    comments: []
                }
            ]
        },
        instagram: {
            tendency: [/* 유튜브 텐던시 데이터 (생략 가능) */],
            emotion: [/* 유튜브 감정 데이터 */],
            topic: [/* 유튜브 토픽 데이터 */]
        },
        tiktok: {
            tendency: [/* 틱톡 텐던시 데이터 */],
            emotion: [/* 틱톡 감정 데이터 */],
            topic: [/* 틱톡 토픽 데이터 */]
        }
    }
};

export default influencerAccountData;
