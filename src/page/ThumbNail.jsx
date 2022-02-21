import React from "react";
import styled from "styled-components";

const ThumbNail=()=>{

    return(
     <Wrap>
        <Container>
            
            <Title>
          <h3>포스트 미리보기</h3>
            </Title>
        <Image/>
    
        <Input placeholder="당신의 포스트를 짧게 소개해보세요"
       /> 
       <TextNumber>
         <span>0/150</span>
         </TextNumber>

         <BtnContainer>
         <DeleteBtn><span>취소</span></DeleteBtn>
           <PublishBtn><span>출간하기</span></PublishBtn>
           </BtnContainer>
       </Container>
         </Wrap>
    );
}


const Wrap = styled.div`
position:fixed;
width: 100vw;
height:100vh;
background-color:#F8F9FA;
`;

const Container = styled.div`
width:100vw;
height:100vh;
margin-top:2%;
position:fixed;
`;

const Title= styled.div`
width:30vw;
margin: auto;
text-align:left;
display:block;
font-size: 1.17em;
`

const Image=styled.div`
margin:auto;
width:30%;
height:40%;

text-align:center;
border: none;
background-color: #E9ECEF;
`;



const Input = styled.div`
width:30%;
height:25%;
margin: 1.5rem auto 0;
border:none;
background-color:white;
`;

const TextNumber =styled.div`
width:30%;
text-align:right;
margin: 0.25rem auto; 
font-size: 0.75rem;
color:#868e96
`;

const BtnContainer =styled.div`
width:30%;
height:5%;
margin:auto;
box-sizing: inherit;
display: flex;
justify-content: center;
align-items:center;
`;

const DeleteBtn= styled.div`
width:4%;
height:2.5rem;
margin-top: 0.25rem;
position:fixed;
right:40%;
display:flex;
justify-content: center;
align-items:center;
margin-right:1%;
color:#12b886;
background-color:#F8F9FA;
border:none;
border-radius:4px;
cursor: pointer;
&:hover{
  background-color: #E9ECEF;
}
`;

const PublishBtn = styled.div`
width:5%;
height:2.5rem;
position:fixed;
display:flex;
justify-content: center;  //display후 center로 주니 글자가 (가로기준)가운데로 정렬
align-items: center;  //display후 center로 주니 글자가(세로기준)가운데로 정렬
margin-top: 0.25rem;
right:35%;
color:white;
text-align:center;
background-color:#12b886;
border:none;
border-radius:4px;
cursor: pointer;
`;
export default ThumbNail;