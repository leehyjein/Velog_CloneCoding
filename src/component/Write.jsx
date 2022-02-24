import React, { useEffect } from 'react';
import styled from 'styled-components';
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import "prismjs/themes/prism.css";

import { storage } from '../shared/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useSelector } from 'react-redux';


const Write = (props) => {

    const editorRef = props._ref 

    const user_info = useSelector(state => state.user.user);
    // const content = useSelector(state => state.post.post_detail).content;
    // console.log(content);
    // console.log(props.default);

    const push = props._push;

    useEffect(()=>{
        if(editorRef.current){
            // 기존의 베이스 64로 이미지를 인코딩하던 hook을 제거
            editorRef.current.getInstance().removeHook('addImageBlobHook');

            editorRef.current.getInstance().addHook('addImageBlobHook',(blob, callback) => {
                (async () => {
                    const name = `${user_info.id}_${new Date().getTime()}`
                    const _upload = ref(storage, `images/${name}`);
                    push(name);
                    const snapshot = await uploadBytes(_upload, blob)
                    
                    const url = await getDownloadURL(snapshot.ref);
                
                      callback(url, "image");
                    })();
          
                    return false;
                  });
        }
        return () => {};    
    },[editorRef])

    return (
        <>
            <Body>
                <Editor
                    placeholder="당신의 이야기를 적어보세요..."
                    previewStyle="vertical"
                    previewHighlight={false}
                    usageStatistics={false}
                    height='calc(100vh - 192px)'
                    width="100vw"
                    ref={props._ref}
                    plugins={[codeSyntaxHighlight]}
                    initialValue={props.default ?? ''}
                />
            </Body>
        </>
    );
};

const Body = styled.div`
  width: 100%;

  .ProseMirror{
    background-color: #fff;
  }
  .toastui-editor-toolbar{
    background-color: #fff;
  }
  .toastui-editor-defaultUI-toolbar{
    background-color: #fff;
    border: 0;

      button{
        border: 0;
        border-radius: 0;
        color: #868e96;
        &:hover{
          color: #212529;
          border: 0;
          background-color: #f8f9fa;
        }
      }
  }
  .toastui-editor-toolbar-item-wrapper{
    display: none!important;
  }
  .toastui-editor-defaultUI-toolbar{
    padding: 0 3rem;
  }
  .toastui-editor-defaultUI{
    border: 0!important;
    
  }
  .placeholder {
    font-family: "Fira Mono", monospace;
    font-style: italic;
    color: #868e96;
    font-size: 18px;
  }
  .toastui-editor{
    background-color: #fff;
  }
  .toastui-editor-md-splitter{
    width: 0;
  }
  .ProseMirror{
    font-family: "Fira Mono", monospace;
    font-size: 18px;
    color: rgb(33, 37, 42);
    padding: 1rem 3.5rem;
    box-sizing: border-box;
    width: 100%;
    max-height: calc(100% - 63px);
    &::-webkit-scrollbar{
        width: 5px;
    }
    &::-webkit-scrollbar-thumb{
        width: 5px;
        background-color: #212529;
    }
  }
  
  .toastui-editor-md-preview{
    padding: 0 3.5rem;
    box-sizing: border-box;
    width: 50%;
    min-height: 5px;
    position: absolute;
    right: 0;
    top: -60px;
    z-index: 1;
    background-color: #f8f9fa;
    height: 100vh;
    overflow-y: auto;
    max-height: calc(100% + 60px);
    &::-webkit-scrollbar{
        background-color: #eff2f3;
        width: 5px;
    }
    &::-webkit-scrollbar-thumb{
        width: 5px;
        background-color: #212529;
    }
  }
  .toastui-editor-contents{
    font-size: 18px;
    line-height: 1.5;

    h1, h2 {
      border-bottom: 0;
      line-height: 1.5;
    }
    h1{
      font-size: 2.5rem;
    }
    h2{
      font-size: 2rem;
    }
    h3{
      font-size: 1.5rem;
      line-height: 1.5;
    }
    h4{
      font-size: 1.3125rem;
      line-height: 1.5;
    }
    p>code{
      background: #e9ecef;
      color: #212529;
      padding: 0.2em 0.4em;
      font-size: 85%;
      border-radius: 3px;
    }
    blockquote{
      margin: 2rem 0px;
      border-left: 4px solid #20c997;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      background: #f8f9fa;
      padding: 1rem 1rem 1rem 2rem;
      color: #212529;
      > p{
        color: #212529;
      }
    }
    li::before {
      display: none;
    }
    ul > li{
        list-style-type: disc;

        > ul > li{
        list-style-type: circle;

        > ul > li{
          list-style-type: square;
        }

      }

    }
    /* pre{
      background: #fbfcfd;
      font-family: "Fira Mono", source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
      font-size: 0.875rem;
      padding: 1rem;
      border-radius: 4px;
      line-height: 1.5;
      overflow-x: auto;
      letter-spacing: 0px;

      > code{
        color: #24292e;
        background: none;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        overflow-wrap: normal;
        tab-size: 4;
        hyphens: none;
        font-size: 100%;
      }
    } */
    del{
        color: #24292e;
    }
    table{
        font-size: 0.875rem;
        th{
            font-weight: bold;
        }
    }
  }
  .toastui-editor-md-heading1{
    font-size: 2.5rem;
  }
  .toastui-editor-md-heading2 {
    font-size: 2rem;
  }
  .toastui-editor-md-heading3 {
    font-size: 1.5rem;
  }
  .toastui-editor-md-heading4 {
    font-size: 1.3125rem;
  }
  .toastui-editor-md-delimiter{
      font-family: "Fira Mono", monospace;
      color: rgb(33, 37, 42);
  }
  .toastui-editor-mode-switch{
    display: none!important;
  }

  .toastui-editor-toolbar-group:nth-of-type(3){
    display: none;
  }
  .toastui-editor-md-list-item-style.toastui-editor-md-list-item-odd {
    color: #21252a;
  }
  .toastui-editor-md-list-item-style.toastui-editor-md-list-item-even {
    color: #21252a;
}
`;

export default Write;