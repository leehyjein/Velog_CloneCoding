import React from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import styled from 'styled-components';
import { Viewer } from '@toast-ui/react-editor';
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import "prismjs/themes/prism.css";
import { useSelector } from 'react-redux';


const PostView = (props) => {
    console.log(typeof props.text)
    const post = useSelector(state => state.post.post_detail)

if(!post || post.boardId !== props.postId){
    return (
        <LoadingWrap>
            <div/>
        </LoadingWrap>
    )
    }
    return (
        <>
        <ViewerWrapper>
            <Viewer
                initialValue= {post?.content}
                plugins={[codeSyntaxHighlight]}
            />
        </ViewerWrapper>
        </>
    );
};

const LoadingWrap = styled.div`
    position: fixed;
    top: calc(50% - 5vw);
    left: calc(50% - 5vw);
    > div{
      background-image: url(/static/Spinner-1s-204px.gif);
      width: 10vw;
      height: 10vw;
      margin: auto;
    }
`

const ViewerWrapper = styled.div`
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
        code{
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
        ul {
            margin-block-end: 18px;
            margin-block-start: 18px;
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
        pre{
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
            }
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
`

export default PostView;