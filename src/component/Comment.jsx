import React from "react";
import styled from "styled-components";

const Comment = (props) => {
  return (
    <React.Fragment>
      <CommentContainer>
        <CommentNumber>
          <h4>0개의 댓글</h4>
        </CommentNumber>
          <Input placeholder="댓글을 작성하세요" />  
          <Button onClick={() => {}}>댓글 작성</Button>
      </CommentContainer>
    </React.Fragment>
  );
};

const CommentContainer = styled.div`
box-sizing: border-box;
  width: 785px;
  height: 200px;
  margin: 4rem auto 3rem auto;
  display: flex;
  flex-direction: column;
  align-items: end;
`;

const CommentNumber = styled.div`
box-sizing: border-box;
max-width: 768px;
min-width: 452px;
width: 100%;
font-size: 1.125rem;
line-height: 1.5;
font-weight: 600;
color: #343a40;
display: block;
text-align: left;
margin: 0 auto 1rem auto;
`;


const Input = styled.input`
  padding: 0rem 1rem 2.5rem;
  outline: none;
  border: 1px solid #f1f3f5;
  margin-bottom: 1.5rem;
  width: 785px;
  box-sizing: inherit;
  border-radius: 4px;
  min-height: 6.125rem;
  font-size: 1rem;
  color: #212529;
  line-height: 1.75;
  word-break: break-all;
  &: placeholder {
    color: #adb5bd;
  }
`;

const Button = styled.div`
 
display: flex;
justify-content: center;
align-items: center;
font-weight: bold;
cursor: pointer;
border: none;
background: #12b886;
color: white;
border-radius: 4px;
padding: 0.625rem 1rem;
height: 2rem;
font-size: 1rem;
font-family: inherit;
box-sizing: inherit;
outline: none;
width: 105px;
&:hover {
  background-color: #45d1a7;
}
`;

export default Comment;
