import React from 'react';
import styled from 'styled-components';
import Card from '../component/Card';
import { Button, Grid } from '../elements';
import Header from './../component/Header';

const Main = (props) => {

    const [filter, setFilter] = React.useState('trending')

    return (
        <>
            <Header/>
            <MainWrap>
                <HeaderBottomWrap filter={filter}>
                    <Grid flex>
                        <Button a className={filter==='trending' ? 'on' : ''} _onClick={()=>{setFilter('trending')}}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
                                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                            </svg>
                            트렌딩
                        </Button>

                        <Button a className={filter==='new' ? 'on' : ''} _onClick={()=>{setFilter('new')}}>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
                                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                            </svg>
                            최신
                        </Button>
                    </Grid>
                </HeaderBottomWrap>                                
                <div>
                    <main>
                        <div>
                            <Card thumbnailImageUrl=''/>
                            <Card/>
                            <Card/>
                            <Card/>
                            <Card/>
                            <Card thumbnailImageUrl='https://blog.kakaocdn.net/dn/1GjTI/btqDblsbL2r/GrpSdskpK7Lh2QjykAOlVK/img.jpg'/>
                            <Card/>
                            <Card/>
                            <Card/>
                            <Card/>
                            <Card/>
                            <Card/>
                            <Card/>
                            <Card/>
                            <Card/>
                        </div>
                    </main>
                </div>
            </MainWrap>
        </>
    );
};


const HeaderBottomWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1.5rem auto 0;
    box-sizing: border-box;

    > div > button {
        width: 7rem;
        height: 3rem;
        font-size: 1.125rem;
        display: flex;
        justify-content:center;
        align-items: center;
        position: relative;
        color: #868e96;
        
        &:first-of-type::before{
            content: '';
            display: block;
            width: 100%;
            border-bottom: 2px solid #212529;
            position: absolute;
            left: ${props => props.filter === 'trending' ? '0' : '100%'};
            bottom: 0;
            transition: 0.3s ease-in-out;
        }
    }
    
    > div > button.on {
        color: #212529;
        font-weight: bold;

    }
    
    > div > button > svg {
        font-size: 1.5rem;
        margin-right: 0.5rem;
    }
`

const MainWrap = styled.div`
    width: 1728px;
    margin: auto;

    @media (max-width: 1919px){
            width: 1376px;
    }
    
    > div:nth-of-type(2) {
        margin-top: 2rem;
    }

    main > div{
        display: flex;
        flex-wrap: wrap;
        margin: -1rem;
    }

    
`;


export default Main;