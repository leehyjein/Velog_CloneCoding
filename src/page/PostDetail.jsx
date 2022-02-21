import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "./PostDetail.css";
import LikeBar from './../component/LikeBar';
import Head from "../component/Head";
import Tag from "../component/Tag";
import Comment from "../component/Comment";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

// import { actionCreators as postActions } from "../redux/modules/post";

// const PostDetail = (props) => {
//   const dispatch = useDispatch();
//   const post_list = useSelector((state) => state.post.list);

//   const { username } = props;

//   React.useEffect(() => {
//     if (!post_list[username]) {
//       dispatch(postActions.getPostFB(username));
//     }
//   }, []);

//   if (!post_list[username] || !username) {
//     return null;
//   }

//   PostDetail.defaultProps = {
//     post_id: null,
//   };

//   export default PostDetail;

  const PostDetail = (props) => {
    return (
      <React.Fragment>
        <Wrap>
          <Head />
          <TitleContainer>
            <TitleWrapper>
              <Title>
                <h1>타이틀</h1>
              </Title>
            </TitleWrapper>
          </TitleContainer>
          <UserIdContainer>
            <Information>
              <div className="nickname">
                <span>
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href="/@chickenrun"
                  >
                    chickenrun
                  </a>
                </span>
              </div>
              <div className="date">
                <span>2022년 1월 18일</span>
              </div>
              <BtnContainer>
                <EditBtn onClick={() => {}}>수정</EditBtn>
                <DeleteBtn onClick={() => {}}>삭제</DeleteBtn>
              </BtnContainer>
            </Information>
          </UserIdContainer>
          <Tag />
          <LikeBar />
          <SeriesBox>
            <Series>
              <a
                style={{ textDecoration: "none", color: "black" }}
                href="/@chickenrun/series/Algorithm-Archive"
              >
                Algorithm Archive
              </a>
              <Check>
                <div className="check">
                  <svg
                    color="#12b886"
                    width="32"
                    height="48"
                    fill="currentColor"
                    viewBox="0 0 32 48"
                    class="series-corner-image"
                  >
                    <path
                      fill="currentColor"
                      d="M32 0H0v48h.163l16-16L32 47.836V0z"
                    ></path>
                  </svg>
                </div>
              </Check>
            </Series>
          </SeriesBox>
          <ContentBox>
            <Img>
              <img
                className="img"
                src="https://media.vlpt.us/images/chickenrun/post/e00188bb-02a2-4074-87f4-a1e290ab40b7/%EC%98%88%EC%8B%9C.PNG"
              />
            </Img>
            <Viewer></Viewer>
          </ContentBox>
          <ProfileBox>
            <ProfileContainer
              src="https://media.vlpt.us/images/chickenrun/profile/c5b45986-7369-423b-bfa5-f6f96704370e/coding baby.jpg?w=240"
              alt="profile"
            />
            <UserInfo>
              <Name>
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href="/@chickenrun"
                >
                  만분의 일
                </a>
              </Name>
              <Description>1/10000 이 1이 될 때 까지</Description>
            </UserInfo>
          </ProfileBox>
          <Line />
          <Comment />
        </Wrap>
      </React.Fragment>
    );
  };


// PostItem.defaultProps = {
//     user_profile: "",
//     user_name: "hj",
//     user_id: "",
//     post_id: 1,
//     contents: "귀여운 고양이네요!",
//     insert_dt: "2022-02-06 19:00:00",
//   };

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: initial;
  //   background-color: #f8f9fa;
`;

const TitleContainer = styled.div`
  width: 785px;
  margin-top: 3.4rem;
  margin-left: auto;
  margin-right: auto;
  height: 18vh;
  display: block;
  box-sizing: inherit;
`;
const TitleWrapper = styled.div`
  width: 785px;
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  height: 18vh;
  display: block;
  box-sizing: inherit;
`;

const Title = styled.div`
  display: flex;
  position: absolute;
  max-width: 1024px;
  width: 100vw;
  height: 18vh;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 0px;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  line-height: 1.5;
  letter-spacing: -0.004em;
  font-weight: 800;
  box-sizing: inherit;
`;

const UserIdContainer = styled.div`
  display: flex;
  width: 785px;
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
  width: 785px;
  background-color: #f8f9fa;
  height: 9.5rem;
  margin-left:auto;
  margin-right:auto;
`;

const Series = styled.div`
  display: flex;
  text-decoration: none;
  color: inherit;
  margin-left: 5px;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 80px;
  &:hover {
    text-decoration: underline;
  }
`;

const Check = styled.div`
  justify-content: space-between;
  position: flex;
  margin-left: 65%;
`;

const ContentBox = styled.div`
  width: 785px;
  objectfit: cover;
  overflow-wrap: break-word;
  height: auto;
  margin: 3rem auto;
  box-sizing: inherit;
`;
const Img = styled.div`
  width: 785px;
  height: auto;
  objectfit: cover;
`;

const Viewer = styled.div`
  width: 785px;
  height: auto;
  border: 1px none grey;
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
