import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "./PostDetail.css";
import LikeBar from './../component/LikeBar';
import Tag from "../component/Tag";
import Comment from "../component/Comment";
import PostView from "../component/PostView";
import { useParams } from "react-router-dom";
import { actionCreators as postActions } from "../redux/modules/post";
import { dateView } from "../shared/time";
import Header from './../component/Header';
import { history } from "../redux/configureStore";


  const PostDetail = (props) => {
    const dispatch = useDispatch();
    const postId = +(useParams().postId);

    const likeRef = React.useRef();

    const [roll, setRoll] = React.useState(false);

    React.useEffect(()=>{
      dispatch(postActions.setOnePostDB(postId))

      window.addEventListener('scroll', ()=>{
          if(window.scrollY > 106){
            setRoll(true)
          } else if(window.scrollY <= 106){
            setRoll(false)
          }
      })
    },[])
    
    const post = useSelector(state => state.post.post_detail);
    const user_info = useSelector(state => state.user.user);
    console.log(post);
    
    const deletePost = () => {
      const confirm = window.confirm('정말 포스트를 삭제하시겠습니까?')
      if(confirm){
        dispatch(postActions.deletePostDB(postId));
      }
    }


    
    return (
      <React.Fragment>
        <Wrap>
          <Header detail {...post}/>
          <TitleContainer>
            <Title>
              <h1>{post?.title}</h1>
            </Title>
            <UserIdContainer>
              <Information>
                <div className="nickname">
                  <span>
                    <a style={{ textDecoration: "none", color: "black" }} href="/" onClick={(e)=>{e.preventDefault()}}>
                      {post?.userId}
                    </a>
                  </span>
                </div>
                <span className="separator">·</span>
                <div className="date">
                  <span>{dateView(post?.createdAt)}</span>
                </div>
                {(user_info?.userIde === post?.userId) && (
                  <BtnContainer>
                    <EditBtn onClick={() => {history.push(`/Postwrite/${postId}`)}}>수정</EditBtn>
                    <DeleteBtn onClick={deletePost}>삭제</DeleteBtn>
                  </BtnContainer>
                )}
              </Information>
            </UserIdContainer>
            <div className="tag-box">
              <Tag/>
              <Tag text='알고리즘'/>
              <Tag text='항해99 5기'/>  
            </div>
            <LikeBar _ref={likeRef} count={post?.likeCount} postId={postId} _class={roll ? 'roll' : ''}/>
            <SeriesBox>
              <Series>
                  {post?.contentSummary}
              </Series>
                <Check>
                  <div className="check">
                    <svg color="#12b886" width="32" height="48" fill="currentColor" viewBox="0 0 32 48" className="series-corner-image">
                      <path fill="currentColor" d="M32 0H0v48h.163l16-16L32 47.836V0z"/>
                    </svg>
                  </div>
                </Check>
            </SeriesBox>
            <div className="thumbnail">
              {post?.thumbnailImageUrl && (
                <img src={post?.thumbnailImageUrl} alt="thumbnail"/>
              )}
            </div>
          </TitleContainer>
          <ContentBox>
            <PostView postId={postId}/>
          </ContentBox>
          <ProfileBox>
            <ProfileContainer
              src={`/static/${post?.profileNum}.jpg`}
              alt="profile"
            />
            <UserInfo>
              <Name>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="/@chickenrun"
                >
                  {post?.nickname}
                </a>
              </Name>
              <Description>{post?.introduce}</Description>
            </UserInfo>
          </ProfileBox>
          <Line/>
          <Comment post={post}/>
        </Wrap>
      </React.Fragment>
    );
  };


const Wrap = styled.div`
  width: 100%;
  
`;

const TitleContainer = styled.div`
  width: 768px;
  margin-top: 5.5rem;
  margin-left: auto;
  margin-right: auto;
  display: block;
  box-sizing: inherit;
  position: relative;

  .tag-box{
    margin-top: 0.875rem;
    display: flex;
    justify-content: flex-start;
  }

  .thumbnail{
    width: 100%;
    img{
      object-fit: contain;
      max-width: 100%;
      max-height: 100vh;
      width: auto;
      margin: 2rem auto 0px;
      height: auto;
      display: block;
    }
  }
`;

const Title = styled.div`
  width: 100%;
  margin-top: 0px;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  font-weight: 800;
  box-sizing: inherit;

    h1{
      margin: 0;
      font-size: 3rem;
      line-height: 1.5;
      letter-spacing: -0.004em;
      margin-top: 0px;
      font-weight: 800;
      color: #212529;
      margin-bottom: 2rem;
      word-break: keep-all;
    }
`;

const UserIdContainer = styled.div`
  display: flex;
  width: 100%;
  // max-width: 1024px;
  height: 5%;
  -webkit-box-pack: end;
  justify-content: flex-end;
  box-sizing: inherit;
  margin-left: auto;
  margin-right: auto;
`;

const Information = styled.div`
  box-sizing: inherit;
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;

  .nickname {
    font-weight: bold;
    font-size: 1rem;

  }
  .separator{
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    font-size: 1rem;
    color: #495057;
  }

  .date {
    font-size: 1rem;
    color: #495057;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;
  margin-left: 87%;
`;

const EditBtn = styled.div`
  width: 50px;
  padding: 0px;
  outline: none;
  border: none;
  background: none;
  font-size: inherit;
  cursor: pointer;
  text-align: center;
  color: grey;
  &:hover {
    color: black;
  }
`;

const DeleteBtn = styled.div`
  width: 50px;
  padding: 0px;
  outline: none;
  border: none;
  background: none;
  font-size: inherit;
  cursor: pointer;
  text-align: center;
  margin-left: 2px;
  color: grey;
  &:hover {
    color: black;
  }
`;

const SeriesBox = styled.div`
    margin-top: 1.3rem;
    padding: 2rem 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
    box-shadow: rgb(0 0 0 / 6%) 0px 0px 4px 0px;
    position: relative;
`;

const Series = styled.div`
  text-decoration: none;
  color: #495057;
  font-weight: bold;
  font-size: 1.5rem;
  height: 104px;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Check = styled.div`
    position: absolute;
    right: 1.5rem;
    top: 0px;
`;

const ContentBox = styled.div`
  width: 768px;
  margin: 5rem auto 0px;
  overflow-wrap: break-word;
  height: auto;
  margin: 3rem auto;
  box-sizing: inherit;
`;

const ProfileBox = styled.div`
  width: 785px;
  margin: 16rem auto 6rem auto;
  display: flex;
  align-items: center;
`;

const ProfileContainer = styled.img`
  position: relative;
  border-radius: 50%;
  width: 8rem;
  height: 8rem;
  object-fit: cover;
  cursor: pointer;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

const Name = styled.div`
  color: black;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const Description = styled.div`
  white-space: pre-wrap;
  font-size: 1.125rem;
  line-height: 1.5;
  margin-top: 0.25rem;
  letter-spacing: -0.004em;
  box-sizing: inherit;
  display: block;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕,
    "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum,
    Tahoma, Geneva, sans-serif;
`;

const Line = styled.div`
  width: 785px;
  display: block;
  background-color: #e9ecef;
  height: 1px;
  margin: -4rem auto;
`;

export default PostDetail;
