import React from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { actionCreators as imgActions } from "../redux/modules/image";
import { useSelector } from 'react-redux';

const ThumbNail=(props)=>{

  const text_data = document.querySelector('.toastui-editor-contents').firstChild;
  const [img, setImg] = React.useState(false)
  const [summary, setSummary] = React.useState(text_data?.textContent ?? '')
 
  const thumb = React.useRef()

  const fadeout = () =>{
    thumb.current.classList.add('thumb-out');
    setTimeout(()=>{
      thumb.current.classList.remove('thumb-out');
      props.thumbOn(false);
    },250)
  }
  const dispatch = useDispatch();
  const fileInput = React.useRef();
  const preview = useSelector(state => state.image.preview);

  const selectFile = (e) => {

    // FileReader 객체 생성
    const reader = new FileReader();
    // ref로 받아온 파일
    const file = fileInput.current.files[0];
    // 파일을 URL데이터로 읽어온다.
    reader.readAsDataURL(file);
    // 읽어오기가 끝나면 읽어온 결과를 setPreview 미들웨어로 dispatch 해준다.
    reader.onloadend = () => {
        dispatch(imgActions.setPreview(reader.result));
    }
  }

  const changeSummary = (e) => {
    if(summary.length < 150){
      setSummary(e.target.value);
    }
  }

  React.useEffect(()=>{
    if(props.edit){
      dispatch(imgActions.setPreview(props.post.thumbnailImageUrl))
    }
    if(!props.edit){
      dispatch(imgActions.setPreview(null))
    }
  },[])


  return(
   <WrapThumb ref={thumb}>
      <Container>     
        <h3>포스트 미리보기</h3>
        <ContainerInner>
          {preview && (
            <div className="re-up-box">
              <div>
                <input type="file" onChange={selectFile} ref={fileInput} id='thumb-reup'/>
                <label htmlFor="thumb-reup">재업로드</label>
                <div className="middledot"></div>
                <button onClick={()=>{dispatch(imgActions.setPreview(null))}}>제거</button>
              </div>
            </div>
          )}
          <div className="thumb-image">
            <div>
              {preview ? (
                <div className="up-image">
                  <img src={preview} alt="썸네일 이미지" />
                </div>  
              ) : (
                <div className="default-image">
                  <svg width="107" height="85" fill="none" viewBox="0 0 107 85">
                    <path fill="#868E96" d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"></path><path fill="#868E96" d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"/>
                  </svg>
                  <input type="file" onChange={selectFile} ref={fileInput} id='thumb-up'/>
                  <label htmlFor='thumb-up'>
                    <div>썸네일 업로드</div>
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className='summary-box'>
            <h4>{props.title}</h4>
            <textarea placeholder="당신의 포스트를 짧게 소개해보세요" onChange={changeSummary} value={summary}></textarea>
            <div>
              <span>{summary.length}</span>
              /150
            </div>
          </div>
        </ContainerInner>
        <BtnContainer>
          <DeleteBtn onClick={()=>{fadeout()}}><span>취소</span></DeleteBtn>
          <PublishBtn onClick={()=>{props.posting(summary, preview)}}><span>출간하기</span></PublishBtn>
        </BtnContainer>
      </Container>
    </WrapThumb>
  );
}


const WrapThumb = styled.div`
  position:fixed;
  top: 0;
  left: 0;
  z-index: 15;
  width: 100%;
  height:100%;
  background-color:#f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;

  animation: 250ms ease 0ms 1 normal forwards running thumbIn;

  @keyframes thumbIn {
      0%{
          transform: translateY(100%)
      }
      100%{
          transform: translateY(0)
      }
  }

  &.thumb-out{
    animation: 250ms ease 0ms 1 normal forwards running thumbOut;

    @keyframes thumbOut {
        0%{
            transform: translateY(0)
        }
        100%{
            transform: translateY(100%)
        }
    }
  }
`;

const Container = styled.div`
  width: 21.9688rem;;

  h3 {
    font-size: 1.3125rem;
    color: #212529;
    line-height: 1.5;
    margin-bottom: 0.5rem;
    margin-top: 0px;
  }

`;

const ContainerInner = styled.div`
  .re-up-box{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;

    > div{
        display: flex;
        align-items: center;
      
      > input {
        display: none;
      }

      > label {
        background: none;
        outline: none;
        border: none;
        font-size: 1rem;
        color: #868e96;
        cursor: pointer;
        padding: 0px;
        text-decoration: underline;
      }

      > button{
        background: none;
        outline: none;
        border: none;
        font-size: 1rem;
        color: #868e96;
        cursor: pointer;
        padding: 0px;
        text-decoration: underline;
      }
      > div.middledot{
        margin-left: 0.5rem;
        margin-right: 0.5rem;
        display: block;
        width: 2px;
        height: 2px;
        border-radius: 1px;
        background: #ced4da;
      }
    }
  }

  .thumb-image{
    width: 100%;
    padding-top: 55.11%;
    position: relative;
      > div {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;

          > div {
            background: #e9ecef;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
              >input{
                display: none;
              }
              >label > div {
                margin-top: 1rem;
                padding: 0.25rem 2rem;
                background: #fff;
                border-radius: 4px;
                box-shadow: rgb(0 0 0 / 2%) 0px 0px 4px;
                font-size: 1rem;
                line-height: 1.5;
                color: #20c997;
                outline: none;
                border: none;
                cursor: pointer;
                transition: all 0.125s ease-in 0s;
                font-weight: bold;

                &:hover{
                  opacity: 0.7;
                }
              }
          }
      }

      .up-image{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0px;
        top: 0px;
        box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;

        >img{
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }
  }


  .summary-box{
    margin-top: 1.5rem;

    h4{
      line-height: 1.5;
      margin: 0px;
      display: block;
      font-size: 1.125rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    textarea{
      resize: none;
      width: 100%;
      border: none;
      outline: none;
      box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
      background: #fff;
      color: #212529;
      line-height: 1.5;
      font-size: 0.875rem;
      height: 7.375rem;
      padding: 0.75rem 1rem;
      margin-top: 0.5rem;
      box-sizing: border-box;
      &::placeholder{
        color: #757575;
      }
    }

    >div{
      text-align: right;
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: #868e96;
    }
  }
`

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1.25rem 0;
`;

const DeleteBtn= styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
  color: #12b886;
  border-radius: 4px;
  padding: 0px 1.125rem;
  height: 2.5rem;
  font-size: 1.125rem;
`;

const PublishBtn = styled.button`
  margin-left: 0.875rem;
  display: inline-flex;
  justify-content: center;  //display후 center로 주니 글자가 (가로기준)가운데로 정렬
  align-items: center;  //display후 center로 주니 글자가(세로기준)가운데로 정렬
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  background: #12b886;
  color: #fff;
  border-radius: 4px;
  padding: 0px 1.125rem;
  height: 2.5rem;
  font-size: 1.125rem;
  &:hover{
    background-color: #20c997;
  }
`;

export default ThumbNail;