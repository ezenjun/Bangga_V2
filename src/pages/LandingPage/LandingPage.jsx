import React from 'react'
import { useEffect, useRef, useState } from "react"
import Dots from './Dots';
import "./landingPage.css";
import { Link } from "react-router-dom";
import logo from '../../assets/Logo/Logo.png'
import whitelogo from '../../assets/Logo/WhiteLogo.png'
import logoIcon from '../../assets/Logo/OfficialIcon.png'
import logoText from '../../assets/Logo/TextLogo.png'
import Styled from 'styled-components';


const DIVIDER_HEIGHT = 5;

const LandingPage = () => {
    const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, down");
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(3);
        }
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          console.log("현재 1페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          console.log("현재 2페이지, up");
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(1);
        } else {
          // 현재 3페이지
          console.log("현재 3페이지, up");
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);

    const Button = Styled.button`
    color: #00BBFF;
    font-size: 1.25rem;
    font-weight: bold;
    background: transparent;
    text-align: center;
    justify-content: center;
    border: 2px solid #00BBFF;
    border-radius: 8px;
    padding: 0.25em 1em;
    margin: 0;
    cursor: pointer;
    &:hover {
        background-color: #00BBFF;
        color: white;
        transform: scale(1.02);
    }
    `;
    const HostButton = Styled.button`
    color: #00BBFF;
    font-size: 1rem;
    font-weight: bold;
    background: transparent;
    text-align: center;
    justify-content: center;
    border: 2px solid #00BBFF;
    border-radius: 8px;
    padding: 0.25em 1em;
    margin: 0;
    cursor: pointer;
    &:hover {
        background-color: #00BBFF;
        color: white;
        transform: scale(1.02);
    }
    `;

    return (
        <div className='Landing' style={{backgroundColor: scrollIndex === 2 ? "#080083" : "transparent", transitionDuration: 500,transition: "background-color 1s",}}>
            <div ref={outerDivRef} className="outer" >
                <Dots scrollIndex={scrollIndex} />
                <div className="inner" style={{backgroundColor: scrollIndex === 2 ? 'white' : 'white', transitionDuration: 500,transition: "background-color 1s",}}>
                    <div className="header" >
                        {scrollIndex === 2 ? <img src={whitelogo} width='150' alt="" /> : <img src={logo} width='150' alt="" />}
                        
                        <Link to="/dashboard"><HostButton >대시보드 이동</HostButton></Link>
                    </div>
                    <div className="welcomeText">
                        <p>반가워! 우리들만의 소셜 살롱</p>
                        <img src={logoText} width='250' alt="" />
                        <div className="startButton">
                            <Link to="/login"><Button>지금 시작하기</Button></Link>
                        </div>
                    </div>
                    <div className="scrollText" >
                        <p style={{color:scrollIndex === 2 ?'white':"#00BBFF"}}>스크롤해서 방가를 확인해 보세요!</p>
                    </div>
                </div>
                <div className="divider" style={{backgroundColor: scrollIndex === 2 ? "#080083" : "transparent", transitionDuration: 500,transition: "background-color 1s",}}></div>
                <div className="inner" style={{backgroundColor: scrollIndex === 2 ? "#080083" : 'white', transitionDuration: 500,transition: "background-color 1s",}}>
                    <div className="second" >
                        <p className='whiteText'>모임 주최부터 공간예약을 한번에!</p>
                        <img src={whitelogo} width='400' alt="" />
                    </div>
                </div>
                <div className="divider" style={{backgroundColor: scrollIndex === 2 ? "#080083" : "white", transitionDuration: 500,transition: "background-color 1s",}}></div>
                <div className="inner" style={{backgroundColor: scrollIndex === 2 ? "#080083" : 'white', transitionDuration: 500,transition: "background-color 1s",}}>
                    <div className="third">
                        <img src={logoIcon} width='200' alt="" />
                        <div className="lofoInfoText">
                            <p>banga의 심볼마크는 공유할 수 있는 공간을 표현하여</p> 
                            <p>관심과 취미가 겹치는 사람들이 </p>
                            <p>소통할 수 있는공간의 의미를 담고 있습니다</p>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage
