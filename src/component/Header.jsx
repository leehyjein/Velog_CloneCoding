import React from 'react';
import styled from 'styled-components';
import { Button, Grid } from '../elements';
import SignInUp from './SignInUp';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators as userActions } from '../redux/modules/user';
import { history } from './../redux/configureStore';

const Header = (props) => {

    const dispatch = useDispatch();

    const is_login = useSelector(state => state.user.is_login);
    const user_info = useSelector(state => state.user.user);

    const [login_modal, setLoginModal] = React.useState(false)
    const [fade_out, setFadeOut] = React.useState(false)
    const [user_nav, setUserNav] = React.useState(false)

    const openModal = () => {
        setFadeOut(false);
        document.body.style.overflow = 'hidden';
        setLoginModal(true);
    }

    const closeModal = () => {
        setFadeOut(true)
        document.body.style.overflow = 'unset'
        setTimeout(()=>{setLoginModal(false)},400)
        
    }

    return (
        <>
            <HeaderWrap>
                <div>
                    {props.detail ? (
                        <div className='detail-logo'>
                            <a href="/">
                                <svg width="29" height="29" viewBox="0 0 192 192" fill="currentColor">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M24 0H168C181.255 0 192 10.7451 192 24V168C192 181.255 181.255 192 168 192H24C10.7451 192 0 181.255 0 168V24C0 10.7451 10.7451 0 24 0ZM49 57.9199V65.48H67L80.6799 142.52L98.5 141.26C116.02 119.06 127.84 102.44 133.96 91.3999C140.2 80.24 143.32 70.9399 143.32 63.5C143.32 59.0601 142 55.7 139.36 53.4199C136.84 51.1399 133.66 50 129.82 50C122.62 50 116.62 53.0601 111.82 59.1799C116.5 62.3 119.68 64.8799 121.36 66.9199C123.16 68.8401 124.06 71.4199 124.06 74.6599C124.06 80.0601 122.44 86.1799 119.2 93.02C116.08 99.8601 112.66 105.92 108.94 111.2C106.54 114.56 103.48 118.7 99.76 123.62L88.0601 57.2C87.1001 52.3999 84.1001 50 79.0601 50C76.78 50 72.3999 50.96 65.9199 52.8799C59.4399 54.6799 53.8 56.3601 49 57.9199Z" fill="currentColor"/>
                                </svg>
                            </a> 
                            <a href="/">
                            {props.userId}.log
                            </a>
                        </div>
                    ) : (
                        <Grid flex width='max-content'>
                            <svg width="71" height="24" viewBox="0 0 71 24" fill="none" data-testid="velog-logo" style={{cursor: 'pointer'}}>
                                <path d="M12.248 5.328L7.76 18H4.64L0.152 5.328H3.056L6.248 15.768L9.488 5.328H12.248ZM17.7586 12.528C17.8386 13.76 18.1906 14.688 18.8146 15.312C19.4546 15.92 20.2546 16.224 21.2146 16.224C21.8066 16.224 22.3666 16.136 22.8946 15.96C23.4386 15.768 23.9906 15.488 24.5506 15.12L25.7026 16.752C25.1106 17.248 24.4146 17.632 23.6146 17.904C22.8146 18.176 21.9746 18.312 21.0946 18.312C19.1586 18.312 17.6546 17.712 16.5826 16.512C15.5106 15.296 14.9746 13.68 14.9746 11.664C14.9746 10.4 15.2066 9.264 15.6706 8.256C16.1346 7.232 16.8066 6.432 17.6866 5.856C18.5666 5.28 19.5906 4.992 20.7586 4.992C22.4386 4.992 23.7666 5.56 24.7426 6.696C25.7346 7.816 26.2306 9.36 26.2306 11.328C26.2306 11.808 26.2066 12.208 26.1586 12.528H17.7586ZM20.7826 6.984C19.9186 6.984 19.2146 7.296 18.6706 7.92C18.1266 8.544 17.8146 9.472 17.7346 10.704H23.6146C23.5826 9.504 23.3266 8.584 22.8466 7.944C22.3666 7.304 21.6786 6.984 20.7826 6.984ZM35.4853 14.544C35.4853 15.616 36.1253 16.152 37.4053 16.152C38.0453 16.152 38.7173 16.008 39.4213 15.72L40.0933 17.592C39.2133 18.072 38.1253 18.312 36.8293 18.312C35.5653 18.312 34.5733 17.96 33.8533 17.256C33.1493 16.536 32.7973 15.552 32.7973 14.304V2.208H28.9813V0.24H35.4853V14.544ZM49.3959 4.992C51.2199 4.992 52.6279 5.592 53.6199 6.792C54.6119 7.976 55.1079 9.592 55.1079 11.64C55.1079 13.688 54.6039 15.312 53.5959 16.512C52.5879 17.712 51.1799 18.312 49.3719 18.312C47.5479 18.312 46.1319 17.728 45.1239 16.56C44.1319 15.376 43.6359 13.744 43.6359 11.664C43.6359 9.648 44.1399 8.032 45.1479 6.816C46.1719 5.6 47.5879 4.992 49.3959 4.992ZM49.3959 7.08C48.4199 7.08 47.6839 7.456 47.1879 8.208C46.7079 8.96 46.4679 10.112 46.4679 11.664C46.4679 13.232 46.7079 14.392 47.1879 15.144C47.6679 15.88 48.3959 16.248 49.3719 16.248C50.3479 16.248 51.0759 15.872 51.5559 15.12C52.0359 14.368 52.2759 13.208 52.2759 11.64C52.2759 10.088 52.0359 8.944 51.5559 8.208C51.0759 7.456 50.3559 7.08 49.3959 7.08ZM70.0745 5.952C69.6105 6.112 69.0825 6.224 68.4905 6.288C67.9145 6.336 67.2185 6.36 66.4025 6.36C67.1705 6.712 67.7465 7.152 68.1305 7.68C68.5145 8.208 68.7065 8.848 68.7065 9.6C68.7065 10.432 68.4985 11.168 68.0825 11.808C67.6825 12.448 67.1065 12.952 66.3545 13.32C65.6025 13.688 64.7145 13.872 63.6905 13.872C62.9705 13.872 62.3945 13.8 61.9625 13.656C61.7865 13.784 61.6505 13.944 61.5545 14.136C61.4585 14.312 61.4105 14.504 61.4105 14.712C61.4105 15.352 61.9305 15.672 62.9705 15.672H65.1785C66.0745 15.672 66.8745 15.824 67.5785 16.128C68.2825 16.432 68.8265 16.856 69.2105 17.4C69.6105 17.928 69.8105 18.528 69.8105 19.2C69.8105 20.464 69.2665 21.44 68.1785 22.128C67.0905 22.832 65.5225 23.184 63.4745 23.184C62.0505 23.184 60.9225 23.032 60.0905 22.728C59.2745 22.44 58.6905 22.008 58.3385 21.432C58.0025 20.872 57.8345 20.144 57.8345 19.248H60.2345C60.2345 19.728 60.3225 20.104 60.4985 20.376C60.6905 20.664 61.0185 20.872 61.4825 21C61.9465 21.144 62.6185 21.216 63.4985 21.216C64.7785 21.216 65.6985 21.056 66.2585 20.736C66.8185 20.432 67.0985 19.976 67.0985 19.368C67.0985 18.856 66.8745 18.456 66.4265 18.168C65.9945 17.896 65.4025 17.76 64.6505 17.76H62.4665C61.3305 17.76 60.4665 17.528 59.8745 17.064C59.2985 16.6 59.0105 16.016 59.0105 15.312C59.0105 14.88 59.1305 14.464 59.3705 14.064C59.6105 13.664 59.9545 13.32 60.4025 13.032C59.6505 12.632 59.0985 12.152 58.7465 11.592C58.4105 11.016 58.2425 10.312 58.2425 9.48C58.2425 8.6 58.4665 7.824 58.9145 7.152C59.3625 6.464 59.9865 5.936 60.7865 5.568C61.5865 5.184 62.4985 4.992 63.5225 4.992C64.8985 5.008 65.9865 4.912 66.7865 4.704C67.6025 4.496 68.4665 4.168 69.3785 3.72L70.0745 5.952ZM63.5465 6.864C62.6985 6.864 62.0585 7.104 61.6265 7.584C61.1945 8.048 60.9785 8.68 60.9785 9.48C60.9785 10.296 61.1945 10.944 61.6265 11.424C62.0745 11.888 62.7225 12.12 63.5705 12.12C64.3705 12.12 64.9785 11.888 65.3945 11.424C65.8105 10.96 66.0185 10.296 66.0185 9.432C66.0185 7.72 65.1945 6.864 63.5465 6.864Z" fill="currentColor"/>
                            </svg>
                        </Grid> 
                    )}
                    {!is_login ? (
                        <Grid flex width='max-content'>
                            <Button header text='로그인' _onClick={openModal}/>
                        </Grid>
                    ) : (
                        <Grid flex align='center' ps='relative' width='max-content'>
                            <Button headerL _onClick={()=>{history.push('/PostWrite')}}>새 글 작성</Button>
                            <div className='user_info_now' onClick={()=>{!user_nav ? setUserNav(true) : setUserNav(false)}}>
                                <img src={`/static/${user_info.profileNum}.jpg`} alt="유저 프로필 이미지" />
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
                                    <path d="M7 10l5 5 5-5z"/>
                                </svg>
                            </div>
                            {user_nav && (
                                <UserInfoNav>
                                    <div>
                                        <Link to='#' onClick={() => {
                                            dispatch(userActions.outUser());
                                            setUserNav(false);
                                            }}>
                                            <div>로그아웃</div>
                                        </Link>
                                    </div>
                                </UserInfoNav>
                            )}
                        </Grid>            
                    ) }             

                </div>
            </HeaderWrap>
            {login_modal && (
                <>
                    <ModalBg login_modal={login_modal} className={fade_out ? 'fade_out' : '' }/>
                    <SignInUp _class={fade_out ? 'fade_out' : '' } close={closeModal}>
                        <Button X _onClick={closeModal}/>
                    </SignInUp>
                </>
            )}
        </>
    );
};

const HeaderWrap = styled.header`
    height: 4rem;

    > div {
        height: 100%;
        width: 1728px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media (max-width: 1919px){
            width: 1376px;
        }
    }

    .user_info_now {

        cursor: pointer;
        display: flex;
        align-items: center;

        > img {
            display: block;
            height: 2.5rem;
            width: 2.5rem;
            box-shadow: rgb(0 0 0 / 9%) 0px 0px 8px;
            border-radius: 50%;
            object-fit: cover;
            transition: all 0.125s ease-in 0s;
        }

        > svg {
            font-size: 1.5rem;
            margin-left: 0.25rem;
            color: #868e96;
            transition: all 0.125s ease-in 0s;
            margin-right: -0.4375rem;
        }

        &:hover{
            > svg {
                color: #212529;
            }
        }
    }

    .detail-logo{
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #212529;
        font-size: 1.3125rem;
        text-decoration: none;

        a{
            display: flex;
            align-items: center;
            color: inherit;
            text-decoration: none;
            font-family: "Fira Mono", monospace;
            >svg{
                color: inherit;
                margin-right: 1rem;
                width: 1.75rem;
                height: 1.75rem;
                display: block;
            }
        }
        
        a:last-of-type{
            display: block;
            max-width: calc(100vw - 200px);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
    `;
    
    const UserInfoNav = styled.div`
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 0.3125rem;

        > div {
            position: relative;
            z-index: 5;
            width: 12rem;
            background: #fff;
            box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px;

            > a {
                display: block;
                text-decoration: none;
                color: inherit;

                > div {
                    color: #212529;
                    padding: 0.75rem 1rem;
                    line-height: 1.5;
                    font-weight: 500;
                    cursor: pointer;

                    &:hover {
                        background: #f8f9fa;
                        color: #12b886;
                    }
                }
            }
        }
    `;

    const ModalBg = styled.div`
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(249,249,249,0.85);
        z-index: 10;
        opacity: 0;
        transition: all 0.125s ease-in 0s;
        animation: 250ms ease 0ms 1 normal forwards running opacityIn;

        @keyframes opacityIn {
            0%{
                opacity: 0;
            }
            100%{
                opacity: 1;
            }
        }

        &.fade_out{
            animation: 250ms ease 0ms 1 normal forwards running opacityOut; 
        }
        @keyframes opacityOut {
            0%{
                opacity: 1;
            }
            100%{
                opacity: 0;
            }
        }
    `

export default Header;