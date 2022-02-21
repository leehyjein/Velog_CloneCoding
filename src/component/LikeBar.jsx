import React from "react";
import styled from "styled-components";
import "./../page/PostDetail.css";

const LikeBar = (props) => {
  return (
    <React.Fragment>
      <div  className="wrap">
      <Bar >
        <div className="heartcontainer">
          <svg className="heartIcon" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
            ></path>
          </svg>
          <p>1</p>
        </div>
      </Bar>
      </div>
    </React.Fragment>
  );
};

// const LikeBarContainer = styled.div`
// height:100vh;
// width: 3.5rem;
// left:20rem;
// border:1px solid #F1F3F5;
// `;

const Bar = styled.div`
  height: 8.5rem;
  width: 4rem;
  position: fixed;
  display:flex;
  left:calc(50%-10rem);
  background-color: #f8f9fa;
  color: #868e96;
  border: 1px solid #f1f3f5;
  border-radius: 2rem;
  flex-direction: column;
  align-items: center;
  -webkit-box-align: center;
  box-sizing: inherit;
  text-align:center;
  p{
    color:black;
  }
 &:hover{
 color:black;  
  
}
`;
export default LikeBar;
