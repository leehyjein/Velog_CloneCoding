import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Tag from "../component/Tag";
import Write from './../component/Write';
import { actionCreators as postActions } from "../redux/modules/post";  
import { ref, deleteObject } from 'firebase/storage';
import { storage } from "../shared/firebase";
import { useParams } from "react-router-dom";
import ThumbNail from "./ThumbNail";


const PostWrite = (props) => {

  const is_login = useSelector(state => state.user.is_login);
  const token = localStorage.getItem('token');

  const edit = useParams().postId;
  const post_data = useSelector(state => state.post.post_detail)
  
  // 타이틀 데이터
  const [title, setTitle] = React.useState(edit ? post_data.title : '');
  // 태그 목록 데이터
  const [tags, setTags] = React.useState([]);
  // 본문에 url로 첨부된 이미지의 파일명 
  const [images, setImages] = React.useState([]);
  // 썸네일 첨부 창
  const [thumb, setThumb] = React.useState(false);

  const {history} = props;

  const noti = React.useRef([]);

  
  React.useEffect(()=>{
    noti.current[0].addEventListener('focusin', () => {
      noti.current[1].style.display= 'block';
    });

    noti.current[0].addEventListener('focusout', () => {
      noti.current[1].classList.add('noti-fadeout');
      setTimeout(()=>{
        noti.current[1].style.display= 'none';
        noti.current[1].classList.remove('noti-fadeout');
      },250)
    });

    noti.current[0].addEventListener('keydown',(e)=>{
      if(e.key === ','){e.preventDefault();}

      if((e.key === 'Enter' || e.key === ',')&& e.target.value !== ''){
        e.preventDefault();
        // const arr = [...tags, e.target.value];
        // console.log(arr)
        setTags(tags => tags.concat(e.target.value));
        e.target.value = '';
      }
    });

    noti.current[0].addEventListener('keydown',(e)=>{
      if(e.key === 'Backspace' && e.target.value === ''){
        e.preventDefault();
        // setTags(arr2);
        setTags(tags => {
          let arr2 = [...tags];
          arr2.pop();
          return arr2
        })
      }     
    });



  },[])

  const tagDeleteClick = (e) => {
    e.preventDefault();
    const text = e.target.text;
    let arr = tags.filter(a => a !== text);
    setTags(arr);
  }

  const editorRef = React.useRef();

  const dispatch = useDispatch();

  

  const push = (item) => {
    setImages(images=>[...images,item]);
  }

  const posting = (summary, url) => {
    if(!is_login || !token){
      alert('글을 작성할 수 있는 권한이 없습니다!');
      return;
    }
    if(!title){
      alert('제목이 입력되지 않았습니다!');
      return;
    }
    const content = editorRef.current.getInstance().getMarkdown()
    dispatch(postActions.addPostDB(title, content, summary,url))
    for(let i=0; i<images.length; i++){
      if(!content.includes(images[i])){
        const deleteRef = ref(storage, `images/${images[i]}`);
        deleteObject(deleteRef);
      }
    }
  }

  const editing = (summary, url) => {
    console.log('작동')
    if(!is_login || !token){
      alert('글을 작성할 수 있는 권한이 없습니다!');
      return;
    }
    if(!title){
      alert('제목이 입력되지 않았습니다!');
      return;
    }
    const content = editorRef.current.getInstance().getMarkdown()
    dispatch(postActions.editPostDB(+edit, title, content, summary, url))

  }

  const exit = () => {
    for(let i=0; i<images.length; i++){
        const deleteRef = ref(storage, `images/${images[i]}`);
        deleteObject(deleteRef);
    }
    history.goBack();
  }

  return (
    <>
      <Wrap>
        <Head>
          <div className="head-inner">
            <Title
              type="title"
              placeholder="제목을 입력하세요"
              onChange={(e)=>{setTitle(e.target.value)}}
              defaultValue={edit ? post_data.title : ''}
            />
              <div className="tag-box">
                <div className="tag-box-inner">
                  {
                    tags?.map((a,i)=>{
                      return(
                        <Tag key={i} text={a} _onClick={tagDeleteClick}/>
                      )
                    })
                  }
                </div>
                <input placeholder="태그를 입력하세요" ref={e => noti.current[0] = e}/>
                <div className="tag-notice" ref={e => noti.current[1] = e}>
                    쉼표 혹은 엔터를 입력하여 태그를 등록할 수 있습니다.<br/>
                    등록된 태그를 클릭하면 삭제됩니다.
                </div>
              </div>
          </div>
          <div className="title-mirror">
            <p>{title}</p>
          </div>
        </Head>
        <Write _ref={editorRef} _push={push} default={edit ? post_data.content : ''}/>
        <Footer>
            <Btncontainer>
          <ExitBtn onClick={exit}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
            </svg>
            <span>나가기</span>
          </ExitBtn>
          <div>
            <SubmitBtn onClick={()=>{setThumb(true)}}><span>출간하기</span></SubmitBtn>
          </div>
          </Btncontainer>
        </Footer>
        {thumb && (
          <ThumbNail thumbOn={setThumb} title={title} posting={edit ? editing : posting} edit={edit} post={post_data} />
        )}
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: auto;
  border: 1px solid #d4d4d4;
  box-sizing: border-box;
`;

const Head = styled.div`
  display: flex;
  width: 100%;
  
  .head-inner{
    width: 50%;
    padding-top: 2rem;
    padding-left: 3rem;
    padding-right: 3rem;
    background-color: #fff;
    
    height: 190px;
    box-sizing: border-box;
  }

  .title-mirror{
    width: 50%;
    padding: 3rem 3.5rem 0 3.5rem;
    box-sizing: border-box;

      p{
        font-size: 2.5em;
        margin-bottom: 2.5rem;
        font-weight: 800;
      }
  }

  &::before{
      content:'';
      display: block;
      width: 64px;
      height: 6px;
      background-color: #495057;
      position: absolute;
      left: 3rem;
      top: 120px;
      z-index: 10;
    };

    .tag-box{
      margin-top: 45px;
      position: relative;
      display: flex;
      justify-content: flex-start;

      input {
        width: 202px;
        height: 34px;
        border-radius: 0;
        border: 0;
        outline: none;
        font-size: 1.125rem;
        &::placeholder{
          font-size: 1.125rem;
        }
      }

    }

    .tag-box-inner{
      display: flex;
      justify-content: flex-start;
    }
    .tag-notice {
      display: none;
      position: absolute;
      top: 43px;
      width: max-content;
      height: 60px;
      background-color: #343a40;
      color: #fff;
      font-size: 12px;
      box-sizing: border-box;
      padding: 0.7rem 1rem;
      line-height: 1.5;
      z-index: 10;

      animation: 250ms ease 0ms 1 normal forwards running noti_fadein;

      @keyframes noti_fadein {
        0%{
          opacity: 0;
          transform: translateY(-20px);
        }
        100%{
          opacity: 1;
          transform: translateY(0px);
        }
      }

      &.noti-fadeout {
        animation: 250ms ease 0ms 1 normal forwards running noti_fadeout;

        @keyframes noti_fadeout {
        0%{
          opacity: 1;
          transform: translateY(0px);
        }
        100%{
          opacity: 0;
          transform: translateY(-20px);
        }
      }
      }
    }
`;

const Title = styled.input`
  background-color: #fff;
  width: 100%;
  height: 66px;
  display: block;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-size: 2.75rem;
  font-weight: bold;
  color: #212529;
  box-sizing: border-box;
  position: relative;

    &::placeholder{
      color: #868e96;
    };

`;


const Footer = styled.div`
  background-color: #fff;
  position: fixed;
  width: 50%;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 64px;
  padding: 0 10px;
  box-shadow: 0 0 5px #dbdbdb;
  z-index: 5;
`;

const Btncontainer = styled.div`
width:100%;
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
width: 112px;
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
font-size: 1.125rem;
font-family: inherit;
box-sizing: border-box;
outline: none;
&:hover {
  background-color: #20C997;
}
`;

export default PostWrite;


