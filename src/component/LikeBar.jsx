import React from "react";
import styled from "styled-components";
import "./../page/PostDetail.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { actionCreators as likeActions } from "../redux/modules/like";

const LikeBar = (props) => {
  const dispatch = useDispatch()

  const is_login = useSelector(state => state.user.is_login);
  
  React.useEffect(()=>{
    if(is_login){
      dispatch(likeActions.getLikeDB(props.postId));
    }
  },[])

  const like_did = useSelector(state => state.like.post_like);

  const pushLike = () => {
    if(!is_login){
      alert('로그인 후 이용해주세요.');
      return;
    }
    dispatch(likeActions.changeLikeDB(props.postId));
  }

  return (
    <React.Fragment>
      <div className="wrap">
      <Bar>
        <div className="heartcontainer" onClick={pushLike}>
          <svg className="heartIcon" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
            ></path>
          </svg>
          {like_did && (
            <div className="heart-on" onClick={pushLike}>
              <svg className="heartIcon-on" width="24" height="24" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"
                ></path>
              </svg>
            </div>
          )}
        </div>
        <p>{props.count}</p>
      </Bar>
      </div>
    </React.Fragment>
  );
};


const Bar = styled.div`
  height: 136px;
  width: 64px;
  position: absolute;
  display: flex;
  left: -112px;
  top: 12.8125rem;
  background-color: #f8f9fa;
  color: #868e96;
  border: .0625rem solid #f1f3f5;
  border-radius: 32px;
  flex-direction: column;
  align-items: center;
  -webkit-box-align: center;
  box-sizing: inherit;
  text-align:center;
  p{
    margin-top: -0.3rem;
    color: #495057;
    line-height: 1;
    font-size: 0.75rem;
    margin-bottom: 1rem;
    font-weight: bold;
  } 
  
 .heartcontainer {
    width: 2.8rem;
    height: 2.8rem;
    border: 1px solid #f1f3f5;
    border-radius: 50%;
    background-color: #fff;
    margin: 10px auto;
    cursor: pointer;
    position: relative;

    &:hover {
      border-color: #212529;
      color: #212529;
    }

    .heartIcon {
      display: block;
      margin: 10px auto;
      align-items: center;
    }

    .heart-on{
      background-color: #20c997;
      border: 2px solid #20c997;
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 50%;
      position: absolute;
      top: -2px;
      left: -2px;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover{
        background-color: #38d9a9;
        border-color: #38d9a9;
      }

      .heartIcon-on {
        color: #fff;
      }

    }
  }
`;
export default LikeBar;
