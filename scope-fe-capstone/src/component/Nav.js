import { Link } from "react-router-dom";
import React from "react";
import './Nav.css';

function Nav() {
    return (
        <div>
            <div className="navbar">
                <div className="navbarLogo">SCOPE</div>

                <Link className="navbarMenu" to={'/'}>서비스 소개</Link>
                <Link className="navbarMenu" to={'/InfluencerRanking'}>인플루언서 순위</Link>
                <Link className="navbarMenu" to={'/Analysis'}>인플루언서 분석</Link>
                <Link className="navbarMenu" to={'/Recommendation'}>맞춤 인플루언서 추천</Link>

                <div className="navbarButtons">
                    <button>로그인</button>
                    <button>문의하기</button>
                </div>
            </div>
        </div>
    );
}

export default Nav;