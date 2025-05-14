import React, { useState } from "react";
import '../css/register.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 회원가입 로직 추가 가능
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
        alert("회원가입 완료!");
    };

    return (
        <div className="register-page-background">
            <div className="register-container">
                <h2 className="regis-title">회원가입</h2>
                <p className="regis-subtitle">SCOPE에 오신 것을 환영합니다</p>
                <form onSubmit={handleSubmit} className="register-form">
                    <input type="text" placeholder="사용자 이름" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="register-submit">가입하기</button>
                </form>
            </div>
        </div>
    );
    
}

export default Register;
