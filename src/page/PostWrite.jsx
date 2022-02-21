import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";

const PostWrite = () => {
 
  const [title, setTitle] = useState("");

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };


  return (
    <>
      <Wrap>
        <Head>
          <Title
            type="title"
            placeholder="제목을 입력하세요"
            onChange={changeTitle}
          />
        </Head>
        <Body>
          <Editor
            placeholder="당신의 이야기를 적어보세요..."
            previewStyle="vertical"
            previewHighlight={false}
            usageStatistics={false}
            height="80vh"
            width="100vw"
          />
        </Body>
        <Footer>
            <Btncontainer>
          <ExitBtn>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
            <span>나가기</span>
          </ExitBtn>
          <div>
            <SubmitBtn><span>출간 하기</span></SubmitBtn>
          </div>
          </Btncontainer>
        </Footer>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100vw;
  height: 92vh;
  margin: auto;
  border: 1px solid #d4d4d4;
`;

const Head = styled.div`
  width: 100vw;
  height: 156.056px;
//   padding-top: 2rem;
//   padding-left: 3rem;
//   padding-right: 3rem;
`;

const Title = styled.input`
  background-color: #f8f9fa;
  width: 100vw;
  height: 156.056px;
  padding: 10px 5px;
  display: block;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-size: 2.75rem;
  font-weight: bold;
  color: black;
  box-sizing: border-box;
`;

const Body = styled.div`
  width: 100vw;
`;

const Footer = styled.div`
  background-color: #fff;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 70px;
  padding: 0 10px;
  box-shadow: 0 0 5px #dbdbdb;
`;

const Btncontainer = styled.div`
width:50%;
display:flex;
justify-content: space-between;
align-items: center;    //나가기, 출간하기 버튼의 세로간격이 맞춰졌다
`

const ExitBtn = styled.div`
 margin-left:10px;
 cursor: pointer;
 font-size: 1.125rem;
`;

const SubmitBtn = styled.div`
width: 82.257px;
height: 40px;
display:flex;
padding: 0 20px;
margin-right: 10px;
justify-content: center;
align-items: center;
font-weight: bold;
cursor: pointer;
border: none;
background: #12b886;;
color: white;
border-radius: 4px;
font-size: 1rem;
font-family: inherit;
box-sizing: inherit;
outline: none;
&:hover {
  background-color: #20C997;
}
`;




export default PostWrite;
