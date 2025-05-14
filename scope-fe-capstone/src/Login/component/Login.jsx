import React, { useState } from "react";
import '../css/login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
        alert("로그인 시도!");
    };

    return (
        <div className="login-page-background">
            <div className="login-container">
                <h2 className="login-title">로그인</h2>
                <p className="login-subtitle">다시 만나서 반가워요 👋</p>
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="email"
                        placeholder="이메일"
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
