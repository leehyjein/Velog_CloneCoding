import React from 'react';
import styled from 'styled-components';
import { dateView } from './../shared/time';
import { history } from '../redux/configureStore';

const Card = (props) => {
    
    return (
        <>
            <CardWrap thumbnailImageUrl={props.thumbnailImageUrl}>
                <div onClick={()=>{history.push(`/PostDetail/${props.boardId}`); window.scrollTo(0,0)}}/>
                <div>
                    <div className='desc_wrapper' onClick={()=>{history.push(`/PostDetail/${props.boardId}`); window.scrollTo(0,0)}}>
                        <h4>{props.title}</h4>
                        <div>
                            <p>{props.contentSummary}</p>
                        </div>
                    </div>
                    <div className='sub_info'>
                        {dateView(props.createdAt)} · {props.commentCount}개의 댓글
                    </div>
                </div>
                <div>
                    <div className='user_info' onClick={()=>{history.push(`/PostDetail/${props.boardId}`); window.scrollTo(0,0)}}>
                        <img src={`/static/${props.profileNum}.jpg`} alt="유저 프로필 이미지" />
                        <span>by <b>{props.userId}</b></span>
                    </div>
                    <div className='likes'>
                        <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"/>
                        </svg>
                        {props.likeCount} 
                    </div>
                </div>
            </CardWrap>
        </>
    );
};

Card.defaultProps = {
    thumbnailImageUrl: 'https://i.ytimg.com/vi/LfnBwdzXo88/mqdefault.jpg',
    title: '앗! 즐겁다! 클론코딩!',
    contentSummary: '사실 잘 모르겠어요',
    createdAt: '2020-02-19 01:00:00',
    commentCount: 5,
    userId: 'ricky0813',
    profileNum: 5,
    likeCount: 10,

}

const CardWrap = styled.div`
    display: flex;
    width: 20rem;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
    transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
    margin: 1rem;
    overflow: hidden;
    flex-direction: column;

    &:hover{
        transform: translateY(-8px);
        box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
    }

    > div:first-of-type {
        width: 100%;
        padding-top: ${props => props.thumbnailImageUrl ? '52.19206680584551%' : ''};
        position: relative;
        background-image: url(${props => props.thumbnailImageUrl});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        cursor: pointer;
    }

    > div:nth-of-type(2) {
        padding: 1rem;
        display: flex;
        flex: 1 1 0%;
        flex-direction: column;

        .desc_wrapper {
            cursor: pointer;
            > h4 {
               font-size: 1rem;
               margin: 0px 0px 0.25rem;
               line-height: 1.5;
               word-break: break-word;
               text-overflow: ellipsis;
               white-space: nowrap;
               overflow: hidden;
               color: #212529;
           }

            > div > p {
                margin: 0px 0px 1.5rem;
                word-break: break-word;
                overflow-wrap: break-word;
                font-size: 0.875rem;
                line-height: 1.5;
                height: 3.9375rem;
                display: -webkit-box;
                -webkit-line-clamp: ${props => props.thumbnailImageUrl ? '3' : '6'};
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .sub_info {
            font-size: 0.75rem;
            line-height: 1.5;
            color: #868e96;
        }
    }

    > div:last-of-type{
        display: flex;
        padding: 0.625rem 1rem;
        border-top: 1px solid #f1f3f5;
        font-size: 0.75rem;
        line-height: 1.5;
        -webkit-box-pack: justify;
        justify-content: space-between;

        .user_info {
            display: flex;
            align-items: center;
            cursor: pointer;

            img {
                object-fit: cover;
                border-radius: 50%;
                width: 1.5rem;
                height: 1.5rem;
                display: block;
                margin-right: 0.5rem;
            }

            span {
                color: #868e96;
                b{
                    color: #212529;
                }
            }

        }

        .likes {
            display: flex;
            align-items: center;

            > svg {
                width: 0.75rem;
                height: 0.75rem;
                margin-right: 0.5rem;
            }           
        }
    }
`

export default Card;