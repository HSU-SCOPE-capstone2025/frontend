// // // import React, { useEffect, useState } from "react";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import './Nav.css';
// // // import Profile from "../assets/images/profile.png"; // 프로필 이미지

// // // function Nav() {
// // //     const navigate = useNavigate();
// // //     const [isAdmin, setIsAdmin] = useState(false);

// // //     useEffect(() => {
// // //         const storedUser = localStorage.getItem("user");
// // //         if (storedUser) {
// // //             const user = JSON.parse(storedUser);
// // //             if (user.isAdmin) {
// // //                 setIsAdmin(true); // ✅ 관리자일 때만 true
// // //             }
// // //         }
// // //     }, []);

// // //     const handleLoginClick = () => navigate('/Login');
// // //     const handleRegisterClick = () => navigate('/Register');
// // //     const handleLogout = () => {
// // //         localStorage.removeItem("user");
// // //         setIsAdmin(false);
// // //         navigate('/');
// // //     };

// // //     return (
// // //         <div>
// // //             <div className="navbar">
// // //                 <Link className="navbarLogo" to="/">SCOPE</Link>

// // //                 <div>
// // //                     <Link className="navbarMenu" to="/">서비스 소개</Link>
// // //                     <Link className="navbarMenu" to="/InfluencerRanking">인플루언서 순위</Link>
// // //                     <Link className="navbarMenu" to="/Analysis">인플루언서 찾기</Link>
// // //                     <Link className="navbarMenu" to="/Recommendation">맞춤 인플루언서 추천</Link>
// // //                 </div>

// // //                 <div className="navbarButtons">
// // //                     <button className="loginButton" onClick={handleLoginClick}>로그인</button>
// // //                     <button className="contactButton" onClick={handleRegisterClick}>회원가입</button>

// // //                     {isAdmin && (
// // //                         <div className="userProfileContainer">
// // //                             <img
// // //                                 src={Profile}
// // //                                 alt="프로필"
// // //                                 className="userProfileImage"
// // //                                 onClick={handleLogout}
// // //                                 title="관리자 프로필 (클릭 시 로그아웃)"
// // //                             />
// // //                         </div>
// // //                     )}
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // // export default Nav;


// // import React, { useEffect, useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import './Nav.css';
// // import Profile from "../assets/images/profile.png"; // 프로필 이미지

// // function Nav() {
// //     const navigate = useNavigate();
// //     const [isAdmin, setIsAdmin] = useState(false);

// //     useEffect(() => {
// //         const storedUser = localStorage.getItem("user");
// //         if (storedUser) {
// //             try {
// //                 const parsedUser = JSON.parse(storedUser);
// //                 console.log("parsedUser:", parsedUser); // 🔍 콘솔 확인용
// //                 if (parsedUser.isAdmin === true) {
// //                     setIsAdmin(true); // 관리자일 때만 true
// //                 }
// //             } catch (err) {
// //                 console.error("user JSON 파싱 오류:", err);
// //             }
// //         }
// //     }, []);

// //     const handleLoginClick = () => navigate('/Login');
// //     const handleRegisterClick = () => navigate('/Register');
// //     const handleLogout = () => {
// //         localStorage.removeItem("user");
// //         setIsAdmin(false);
// //         navigate('/');
// //     };

// //     return (
// //         <div>
// //             <div className="navbar">
// //                 <Link className="navbarLogo" to="/">SCOPE</Link>

// //                 <div>
// //                     <Link className="navbarMenu" to="/">서비스 소개</Link>
// //                     <Link className="navbarMenu" to="/InfluencerRanking">인플루언서 순위</Link>
// //                     <Link className="navbarMenu" to="/Analysis">인플루언서 찾기</Link>
// //                     <Link className="navbarMenu" to="/Recommendation">맞춤 인플루언서 추천</Link>
// //                 </div>

// //                 <div className="navbarButtons">
// //                     <button className="loginButton" onClick={handleLoginClick}>로그인</button>
// //                     <button className="contactButton" onClick={handleRegisterClick}>회원가입</button>

                   
// //                 </div>
// //                 {isAdmin && (
// //                         <div className="userProfileContainer">
// //                             <img
// //                                 src={Profile}
// //                                 alt="프로필"
// //                                 className="userProfileImage"
// //                                 onClick={handleLogout}
// //                                 title="관리자 프로필 (클릭 시 로그아웃)"
// //                             />
// //                         </div>
// //                     )}
// //             </div>
// //         </div>
// //     );
// // }

// // export default Nav;


// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import './Nav.css';
// import Profile from "../assets/images/profile.png"; // 프로필 이미지

// function Nav() {
//     const navigate = useNavigate();
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     useEffect(() => {
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//             try {
//                 JSON.parse(storedUser); // 필요시 닉네임 등 저장 가능
//                 setIsLoggedIn(true);
//             } catch (err) {
//                 console.error("user JSON 파싱 오류:", err);
//             }
//         }
//     }, []);

//     const handleLoginClick = () => navigate('/Login');
//     const handleRegisterClick = () => navigate('/Register');
//     const handleLogout = () => {
//         localStorage.removeItem("user");
//         setIsLoggedIn(false);
//         navigate('/');
//     };

//     return (
//         <div className="navbar">
//             <Link className="navbarLogo" to="/">SCOPE</Link>

//             <div>
//                 <Link className="navbarMenu" to="/">서비스 소개</Link>
//                 <Link className="navbarMenu" to="/InfluencerRanking">인플루언서 순위</Link>
//                 <Link className="navbarMenu" to="/Analysis">인플루언서 찾기</Link>
//                 <Link className="navbarMenu" to="/Recommendation">맞춤 인플루언서 추천</Link>
//             </div>

//             <div className="navbarButtons">
//                 {isLoggedIn ? (
//                     <div className="navUserInfo" onClick={handleLogout}>
//                         <img
//                             src={Profile}
//                             alt="프로필"
//                             className="userProfileImage"
//                             title="클릭 시 로그아웃"
//                         />
//                         <span className="welcomeText">상상부기 님 환영합니다.</span>
//                     </div>
//                 ) : (
//                     <>
//                         <button className="loginButton" onClick={handleLoginClick}>로그인</button>
//                         <button className="contactButton" onClick={handleRegisterClick}>회원가입</button>
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Nav;


import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Nav.css';
import Profile from "../assets/images/profile.png";
import { UserContext } from "../contexts/UserContext"; // ✅

function Nav() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext); // ✅

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate('/');
    };

    return (
        <div className="navbar">
            <Link className="navbarLogo" to="/">SCOPE</Link>

            <div>
                <Link className="navbarMenu" to="/">서비스 소개</Link>
                <Link className="navbarMenu" to="/InfluencerRanking">인플루언서 순위</Link>
                <Link className="navbarMenu" to="/Analysis">인플루언서 찾기</Link>
                <Link className="navbarMenu" to="/Recommendation">맞춤 인플루언서 추천</Link>
            </div>

            <div className="navbarButtons">
                {user ? (
                    <div className="navUserInfo" onClick={handleLogout}>
                        <img
                            src={Profile}
                            alt="프로필"
                            className="userProfileImage"
                            title="클릭 시 로그아웃"
                        />
                        <span className="welcomeText">상상부기 님 환영합니다.</span>
                    </div>
                ) : (
                    <>
                        <button className="loginButton" onClick={() => navigate('/Login')}>로그인</button>
                        <button className="contactButton" onClick={() => navigate('/Register')}>회원가입</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Nav;

