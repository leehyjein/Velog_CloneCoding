import React from "react";
import styled from "styled-components";

const Tag =(props)=> {

    return (
        <React.Fragment>
            <TagContainer>
            <Text>
            <a 
            onClick={props._onClick}
            style={{ textDecoration: "none", color: "#12b886" }} 
            href="/">{props.text}</a>
            </Text>
        </TagContainer>
        </React.Fragment>
    );
}

Tag.defaultProps = {
  text: '프로그래머스',
  _onClick: ()=>{},
}

const TagContainer=styled.div`
  width: max-content;
  height:2rem;
  margin: 0 0.75rem 0.75rem 0;
    min-height: 0.875rem;
  display:flex;
`;

const Text = styled.div`
  width:12;
  height:2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  margin:auto 0;
  align-items:center;
  margin-bottom: 0.875rem;
  background-color:#f8f9fa;
  font-size: 1rem;
  cursor: pointer;
  border:none;
  box-sizing: inherit;
  border-radius: 1rem;
  font-family: apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
`;
export default Tag;