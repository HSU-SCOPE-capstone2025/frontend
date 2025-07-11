// // import React, { useState } from "react";
// // import { Link,useNavigate } from "react-router-dom";
// // import '../css/login.css';

// // function Login() {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const navigate = useNavigate();

// //     // const handleSubmit = (e) => {
// //     //     e.preventDefault();

// //     //     // 관리자 계정 조건
// //     //     if (email === "hansung1234" && password === "hansung1234!") {
// //     //         navigate("/"); // ScopeMain.jsx로 이동
// //     //     } else {
// //     //         const storedPassword = localStorage.getItem(email);
// //     //         if (storedPassword === password) {
// //     //                    localStorage.setItem("user", JSON.stringify({ email }));
// //     //         } else {
// //     //             alert("이메일 또는 비밀번호가 올바르지 않습니다.");
// //     //         }
// //     //     }
// //     // };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
    
// //         // 관리자 계정 조건
// //         if (email === "hansung1234" && password === "hansung1234!") {
// //             localStorage.setItem("user", JSON.stringify({ email, isAdmin: true })); // ✅ 관리자 표시
// //             navigate("/");
// //         } else {
// //             const storedPassword = localStorage.getItem(email);
// //             if (storedPassword === password) {
// //                 localStorage.setItem("user", JSON.stringify({ email, isAdmin: false })); // 일반 사용자
// //                 navigate("/user");
// //             } else {
// //                 alert("이메일 또는 비밀번호가 올바르지 않습니다.");
// //             }
// //         }
        
// //     };
    
// //     return (
// //         <div className="login-page-background">
// //             <div className="login-container">
// //                 <h2 className="login-title">로그인</h2>
// //                 <p className="login-subtitle">다시 만나서 반가워요 👋</p>
// //                 <form onSubmit={handleSubmit} className="login-form">
// //                     <input
// //                         type="text"
// //                         placeholder="아이디"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                     />
// //                     <input
// //                         type="password"
// //                         placeholder="비밀번호"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                     <button type="submit">로그인</button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }

// // export default Login;


// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import "../css/login.css";
// import { UserContext } from "../../contexts/UserContext"; // ✅ Context 불러오기

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const { setUser } = useContext(UserContext); // ✅ 전역 사용자 상태 갱신용

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // 관리자 계정 예시
//         if (email === "hansung1234" && password === "hansung1234!") {
//             const adminUser = { email, isAdmin: true };
//             localStorage.setItem("user", JSON.stringify(adminUser));
//             setUser(adminUser); // 🔥 전역 상태 반영
//             navigate("/"); // 홈으로 이동
//         } else {
//             const storedPassword = localStorage.getItem(email);
//             if (storedPassword === password) {
//                 const normalUser = { email, isAdmin: false };
//                 localStorage.setItem("user", JSON.stringify(normalUser));
//                 setUser(normalUser); // 🔥 전역 상태 반영
//                 navigate("/user"); // 사용자 페이지로 이동
//             } else {
//                 alert("이메일 또는 비밀번호가 올바르지 않습니다.");
//             }
//         }
//     };

//     return (
//         <div className="login-page-background">
//             <div className="login-container">
//                 <h2 className="login-title">로그인</h2>
//                 <p className="login-subtitle">다시 만나서 반가워요 👋</p>
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <input
//                         type="text"
//                         placeholder="아이디"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="비밀번호"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button type="submit">로그인</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import { UserContext } from "../../contexts/UserContext";
import { getProfileImage } from "../../utils/getProfileImage";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const users = [
        { email: "__ralral__", password: "hansung1234!", name: "랄랄", influencerId: "__ralral__" },
        { email: "horseking123", password: "hansung1234!", name: "말왕", influencerId: "horseking123" },
        { email: "joodoong_e", password: "hansung1234!", name: "주둥이방송", influencerId: "joodoong_e" },
        { email: "chimchakman_official", password: "hansung1234!", name: "침착맨 전문인스타팀", influencerId: "chimchakman_official" },
        { email: "trytoeat222", password: "hansung1234!", name: "먹어볼래 TryToEat", influencerId: "trytoeat222" },
        { email: "under_world_b1", password: "hansung1234!", name: "언더월드", influencerId: "under_world_b1" },
        { email: "hee__bab", password: "hansung1234!", name: "히밥", influencerId: "hee__bab" },
        { email: "cherry__0705", password: "hansung1234!", name: "지하니", influencerId: "cherry__0705" },
        { email: "yellow_aquarium", password: "hansung1234!", name: "해수인tv", influencerId: "yellow_aquarium" },
        { email: "esther__park", password: "hansung1234!", name: "박에스더", influencerId: "esther__park" },
        { email: "very_simplecooking", password: "hansung1234!", name: "자취요리신", influencerId: "very_simplecooking" },
        { email: "minsco_", password: "hansung1234!", name: "민스코 Minsco", influencerId: "minsco_" },
        { email: "instawakgood", password: "hansung1234!", name: "우왁굳", influencerId: "instawakgood" },
        { email: "yooxicman", password: "hansung1234!", name: "육식맨 YOOXICMAN", influencerId: "yooxicman" },
        { email: "dudely_08", password: "hansung1234!", name: "더들리", influencerId: "dudely_08" },
        { email: "fundamental_kr", password: "hansung1234!", name: "뻔더 FUNDAMENTAL", influencerId: "fundamental_kr" },
        { email: "jesusujeo", password: "hansung1234!", name: "sujeo", influencerId: "jesusujeo" },
        { email: "tikitakabooboo", password: "hansung1234!", name: "인생 녹음 중", influencerId: "tikitakabooboo" },
        { email: "yonamism", password: "hansung1234!", name: "취미로 요리하는 남자", influencerId: "yonamism" },
        { email: "mejooandcats", password: "hansung1234!", name: "김메주와 고양이들", influencerId: "mejooandcats" },
        { email: "jeon_unni_", password: "hansung1234!", name: "젼언니", influencerId: "jeon_unni_" },
        { email: "bboyongnyong", password: "hansung1234!", name: "10초컷 뷰티 가이드 l 뽀용뇽", influencerId: "bboyongnyong" },
        { email: "salim_nam_official", password: "hansung1234!", name: "살림남 The Life", influencerId: "salim_nam_official" },
        { email: "minsajang_", password: "hansung1234!", name: "요리하는 민사장", influencerId: "minsajang_" },
        { email: "enjoycouple", password: "hansung1234!", name: "엔조이커플", influencerId: "enjoycouple" },
        { email: "hxxax_", password: "hansung1234!", name: "혜안", influencerId: "hxxax_" },
        { email: "g_movie__", password: "hansung1234!", name: "지무비", influencerId: "g_movie__" },
        { email: "hugbears", password: "hansung1234!", name: "애견모델 다견가정 인형소굴 달달시스타즈", influencerId: "hugbears" },
        { email: "ipduck_official", password: "hansung1234!", name: "입시덕후", influencerId: "ipduck_official" },
        { email: "baby_pig.rabbit", password: "hansung1234!", name: "돼끼 babypigrabbit", influencerId: "baby_pig.rabbit" },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email === "hansung1234" && password === "hansung1234!") {
            const adminUser = {
                email,
                name: "관리자",
                isAdmin: true,
                influencerId: null,
                profileImage: getProfileImage("default")
            };
            localStorage.setItem("user", JSON.stringify(adminUser));
            setUser(adminUser);
            navigate("/");
            return;
        }

        const matchedUser = users.find(
            (user) => user.email === email && user.password === password
        );

        if (matchedUser) {
            const normalUser = {
                email: matchedUser.email,
                name: matchedUser.name,
                isAdmin: false,
                influencerId: matchedUser.influencerId,
                profileImage: getProfileImage(matchedUser.name)
            };
            localStorage.setItem("user", JSON.stringify(normalUser));
            setUser(normalUser);
            navigate(`/${matchedUser.influencerId}`); // URL 경로 ex)~/{인스타그램 ID}
        } else {
            alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="login-page-background">
            <div className="login-container">
                <h2 className="login-title">로그인</h2>
                <p className="login-subtitle">다시 만나서 반가워요 👋</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        placeholder="아이디"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
