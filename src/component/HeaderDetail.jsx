import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

const Head=(props)=> {

    return(
        <React.Fragment>
          <Wrap>
            <IconContainer>
              <LogoContainer>
                <Logo>
                  <svg width="29" height="29" viewBox="0 0 192 192" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 0H168C181.255 0 192 10.7451 192 24V168C192 181.255 181.255 192 168 192H24C10.7451 192 0 181.255 0 168V24C0 10.7451 10.7451 0 24 0ZM49 57.9199V65.48H67L80.6799 142.52L98.5 141.26C116.02 119.06 127.84 102.44 133.96 91.3999C140.2 80.24 143.32 70.9399 143.32 63.5C143.32 59.0601 142 55.7 139.36 53.4199C136.84 51.1399 133.66 50 129.82 50C122.62 50 116.62 53.0601 111.82 59.1799C116.5 62.3 119.68 64.8799 121.36 66.9199C123.16 68.8401 124.06 71.4199 124.06 74.6599C124.06 80.0601 122.44 86.1799 119.2 93.02C116.08 99.8601 112.66 105.92 108.94 111.2C106.54 114.56 103.48 118.7 99.76 123.62L88.0601 57.2C87.1001 52.3999 84.1001 50 79.0601 50C76.78 50 72.3999 50.96 65.9199 52.8799C59.4399 54.6799 53.8 56.3601 49 57.9199Z" fill="currentColor"/>
                  </svg>
                </Logo>
                <Userlogo>
                  <a style={{ textDecoration: "none", color: "black" }} className="user-logo" href="/">
                    {props.userId}
                  </a>
                </Userlogo>
              </LogoContainer>
              <ProfileContainer>
                <FirstIconContainer>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"></path>
                  </svg>
                </FirstIconContainer>
                <SecondIconContainer>
                  <svg width="17" height="17" viewBox="0 0 17 17">
                    <path fillRule="evenodd" d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z" clipRule="evenodd" fill="currentColor"/>
                  </svg>
                </SecondIconContainer>
                <PostBtnContainer>
                  <PostBtn onClick={() => {}}>새 글 작성</PostBtn>
                </PostBtnContainer>
                <Profile>
                  <img src="https://media.vlpt.us/images/chickenrun/profile/c5b45986-7369-423b-bfa5-f6f96704370e/coding baby.jpg?w=120" alt='user-profile'/>
                </Profile>
              </ProfileContainer>
            </IconContainer>
          </Wrap>
        </React.Fragment>
    );
}


const Wrap= styled.div`
  width: 100%;
  height: 4rem;
  display: block;
  box-sizing: inherit;
`;

const IconContainer = styled.div`
  width: 1728px;
  height: 100%;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;

  @media (max-width: 1919px){
    width: 1376px;
  }

`;

const LogoContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-weight: bold;
  color: black;
  text-decoration: none;
  font-family: "Fira Mono", monospace;
  box-sizing: inherit;
`;

const ProfileContainer = styled.div`
    width:27%;
    height:100%;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    position: relative;
    box-sizing: inherit;
    color: var(--text1);
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", '나눔고딕', "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
`;

const FirstIconContainer = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  -webkit-box-align: center;
  justify-content: center;
  top: 50%;
  left: 15%;
  width: 2.5rem;
  height: 2.5rem;
  transform: translate(-50%, -50%);
  box-sizing: inherit;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-family: inherit;
  &:hover {
    background-color: #e9ecef;
  }
`;
const SecondIconContainer = styled.div`
  display: flex;
  position: absolute;
  left: 20%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  outline: none;
  border-radius: 50%;
  color: var(--text1);
  cursor: pointer;
  margin-left: 0.4rem;
  &:hover {
    background-color: #e9ecef;
  }
`;
const PostBtnContainer = styled.div`
  display: flex;
  position: absolute;
  left: 33%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  width: 7.5rem;
  height: 2.5rem;
  outline: none;
`;

const PostBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  border-radius: 1rem;
  outline: none;
  font-weight: bold;
  word-break: keep-all;
  border: 1px solid black;
  color: var(--bg-element5);
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: black;
  }
`;
const Profile = styled.div`
  display: flex;
  position: absolute;
  right: 19%;
  align-items: center;
  -webkit-box-align: center;
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  justify-content: center;
  cursor: pointer;
`;

const Logo = styled.div`
  box-sizing: inherit;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  font-weight: bold;
  color: var(--text1);
  font-size: 1.3125rem;
  text-decoration: none;
  font-family: "Fira Mono", monospace;
  cursor: pointer;
`;

const Userlogo = styled.div`
  display: block;
  max-width: calc(100vw - 200px);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-decoration: none;
  font-family: "Fira Mono", monospace;
  font-size: 1.125rem;
  font-weight: bold;
  margin-left: 10px;
  box-sizing: inherit;
  cursor: pointer;
  color: black;
`;
export default Head;