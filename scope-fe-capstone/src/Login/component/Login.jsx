// import React, { useState } from "react";
// import { Link,useNavigate } from "react-router-dom";
// import '../css/login.css';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     // const handleSubmit = (e) => {
//     //     e.preventDefault();

//     //     // 관리자 계정 조건
//     //     if (email === "hansung1234" && password === "hansung1234!") {
//     //         navigate("/"); // ScopeMain.jsx로 이동
//     //     } else {
//     //         const storedPassword = localStorage.getItem(email);
//     //         if (storedPassword === password) {
//     //                    localStorage.setItem("user", JSON.stringify({ email }));
//     //         } else {
//     //             alert("이메일 또는 비밀번호가 올바르지 않습니다.");
//     //         }
//     //     }
//     // };

//     const handleSubmit = (e) => {
//         e.preventDefault();
    
//         // 관리자 계정 조건
//         if (email === "hansung1234" && password === "hansung1234!") {
//             localStorage.setItem("user", JSON.stringify({ email, isAdmin: true })); // ✅ 관리자 표시
//             navigate("/");
//         } else {
//             const storedPassword = localStorage.getItem(email);
//             if (storedPassword === password) {
//                 localStorage.setItem("user", JSON.stringify({ email, isAdmin: false })); // 일반 사용자
//                 navigate("/user");
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
import { UserContext } from "../../contexts/UserContext"; // ✅ Context 불러오기

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext); // ✅ 전역 사용자 상태 갱신용

    const handleSubmit = (e) => {
        e.preventDefault();

        // 관리자 계정 예시
        if (email === "hansung1234" && password === "hansung1234!") {
            const adminUser = { email, isAdmin: true };
            localStorage.setItem("user", JSON.stringify(adminUser));
            setUser(adminUser); // 🔥 전역 상태 반영
            navigate("/"); // 홈으로 이동
        } else {
            const storedPassword = localStorage.getItem(email);
            if (storedPassword === password) {
                const normalUser = { email, isAdmin: false };
                localStorage.setItem("user", JSON.stringify(normalUser));
                setUser(normalUser); // 🔥 전역 상태 반영
                navigate("/user"); // 사용자 페이지로 이동
            } else {
                alert("이메일 또는 비밀번호가 올바르지 않습니다.");
            }
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
