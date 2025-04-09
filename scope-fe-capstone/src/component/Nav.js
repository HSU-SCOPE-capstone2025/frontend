import { Link } from "react-router-dom";
import React from "react";
import './Nav.css';

function Nav() {
    return (
        <div>
            <div className="navbar">
                <Link className="navbarLogo" to={'/'}>SCOPE</Link>

                <div>
                <Link className="navbarMenu" to={'/'}>서비스 소개</Link>
                <Link className="navbarMenu" to={'/InfluencerRanking'}>인플루언서 순위</Link>
                <Link className="navbarMenu" to={'/Analysis'}>인플루언서 찾기</Link>
                <Link className="navbarMenu" to={'/DetailAnalysis'}>인플루언서 분석</Link>
                {/* <Link className="navbarMenu" to={'/SNSDetailAnalysis'}>sns상세분석</Link>
                <Link className="navbarMenu" to={'/ProfileDetailAnalysis'}>계정 분석</Link> */}
                <Link className="navbarMenu" to={'/Recommendation'}>맞춤 인플루언서 추천</Link>
                </div>

                <div className="navbarButtons">
                    <button className="loginButton">로그인</button>
                    <button className="contactButton">문의하기</button>
                </div>
            </div>
        </div>
    );
}

export default Nav;