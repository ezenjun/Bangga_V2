import React from 'react'
import { Link } from "react-router-dom";
import "./loginsignupPage.css";
import Styled from 'styled-components';
import Kakaoimg from '../../assets/kakao_signin_button/kakao_login_medium_wide.png'
import logo from '../../assets/Logo/WhiteLogo.png'
// import { GoogleLogin } from "react-google-login";

const KaKaoButton = Styled.div`
  background-image: url(${Kakaoimg});
  background-repeat: no-repeat;
  margin: 0;  color: transparent;
  width: 300px;
  height: 45px;
`;

// const GoogleButton = Styled.div`
//   display: flex;
//   align-items:center;
//   margin: 0;  color: transparent;
//   width: 300px;
//   height:45px;
// `;

const LoginSignupPage = () => {
    const CLIENT_ID = "129285b3cded2847920ed4ddcb701f94";
    const REDIRECT_URI = "http://localhost:5000/auth2/kakao";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return (
        <div className="container">
            <div className="loginCard">
                <div className="logoText">
                    <p>반가워! 우리들만의 소셜 살롱</p>
                    <img src={logo} width='350' alt="" />
                </div>
                <div className="buttons">
                    {/* <Link to="/naver"><button>카카오로 로그인/회원가입</button></Link> */}
                    {/* <p>sns 계정으로 간편 로그인/회원가입</p> */}
                    <div className="buttonContainer">
                        <div className="kakaoButton">
                            <a href={KAKAO_AUTH_URL}><KaKaoButton></KaKaoButton></a>
                        </div>
                        <div className="google">
                            <Link to="/login/google">
                                <div id="customBtn" class="customGPlusSignIn">
                                    <span class="icon"></span>
                                    <span class="buttonText">구글로 시작하기</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default LoginSignupPage
