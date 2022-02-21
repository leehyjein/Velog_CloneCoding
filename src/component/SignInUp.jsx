import React from 'react';
import styled from 'styled-components';
import { Button } from '../elements';
import { emailCheck, pwdCheck } from '../shared/common';
import _ from 'lodash';

const SignInUp = (props) => {

    const [sign_up, setSignUp] = React.useState(false)
    const [email, setEmail ] = React.useState('')
    const [pwd, setPwd ] = React.useState('')

    const target_in = React.useRef([]);

    const target_up = React.useRef([]);

    const changeEmail = _.debounce((e) => {
        setEmail(e.target.value);
    },300) 

    const changePwd = _.debounce((e) => {
        setPwd(e.target.value);
    },300) 

    const signUp = () => {
        if(!emailCheck(email)){
            alert('이메일이 형식에 맞지 않습니다!');
            return;
        }

        if(!pwdCheck(pwd)){
            alert('비밀번호가 형식에 맞지 않습니다!');
            return;
        }

        if(pwd !== target_up.current[0].value){
            alert('두 번째 입력한 비밀번호가 일치하지 않습니다!');
            return;
        }

        if(email === '' || pwd === '' || target_up.current[0].value === '' || target_up.current[1].value === '' || target_up.current[2].value === '' || target_up.current[3].value === ''){
            alert('입력하지 않은 칸이 있습니다!');
            return;
        }

        const arr = [];
        for(let i=0; i<target_up.current.length; i++){
            arr.push(target_up.current[i].value);
        }

        console.log(
            `email: ${email}
            pwd: ${pwd}
            pwd_check: ${arr[0]}
            name: ${arr[1]}
            id: ${arr[2]}
            intro: ${arr[3]}
            ` 
        )
    }


    return (
        <>
            <ModalBox sign_up={sign_up}>
                <div className={props._class}>
                    {props.children}
                    <div className='gray_block'>
                        <div>
                            <img src="/static/welcome.svg" alt="환영합니다" />
                            <div className='welcome'>환영합니다!</div>
                        </div>
                    </div>
                    <div className='white_block'>
                        <div>
                            <div className='upper_wrapper'>
                                <h2>{!sign_up ? '로그인' : '회원가입'}</h2>
                                {!sign_up && (
                                    <div className='login_form'>
                                        <input type="email" placeholder='이메일을 입력하세요.' ref={e => target_in.current[0] = e}/>
                                        <input type="password" placeholder='비밀번호를 입력하세요.' ref={e => target_in.current[1] = e}/>
                                        <Button greenB text='로그인' _onClick={()=>{console.log(target_in.current)}}/>
                                    </div>
                                )}
                                {sign_up && (
                                    <div className='signup_form'>
                                        <input type="email" placeholder='이메일을 입력하세요.' onChange={changeEmail}/>
                                        {emailCheck(email) ? (
                                            <p style={{color: '#12b886'}}>* 이메일 형식에 맞게 입력해주세요.</p>

                                        ) : (
                                            <p>* 이메일 형식에 맞게 입력해주세요.</p>
                                        )}
                                        <input type="password" placeholder='비밀번호를 입력하세요.' onChange={changePwd}/>
                                        {pwdCheck(pwd) ? (
                                            <p style={{color: '#12b886'}}>* 8자 이상, 문자, 숫자 및 특수 문자를 포함해주세요.</p>
                                        ) : (
                                            <p>* 8자 이상, 문자, 숫자 및 특수 문자를 포함해주세요.</p>
                                        )}
                                        <input type="password" placeholder='비밀번호를 한번 더 입력하세요.' ref={e => target_up.current[0] = e}/>

                                        <input type="text" placeholder='이름을 입력하세요.' ref={e => target_up.current[1] = e}/>
                                        <input type="text" placeholder='아이디를 입력하세요.' ref={e => target_up.current[2] = e}/>
                                        <input type="text" placeholder='간단한 소개를 해주세요.' ref={e => target_up.current[3] = e}/>
                                        <Button greenB text='회원가입' _onClick={signUp}/>
                                    </div>
                                )}
                            </div>
                            <div className='foot'>
                                <span>{!sign_up ? '아직 회원이 아니신가요? ' : '계정이 이미 있으신가요? '}</span>
                                <div onClick={()=>{!sign_up ? setSignUp(true) : setSignUp(false)}}>{!sign_up ? '회원가입' : '로그인'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBox>
        </>
    );
};

const ModalBox = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    
    > div {
        position: relative;
        transition: 0.3s;
        width: 606px;
        height: ${props => props.sign_up? '700px' : '480px'};
        animation: 400ms ease-in-out 0ms 1 normal forwards running modalIn;
        box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
        display: flex;
        
        @keyframes modalIn {
            0%{
                transform: translateY(600px);
                opacity: 0;
            }  
            100%{
                transform: translateY(0px);
                opacity: 1;
            }
        }
        
    }
    > div.fade_out{
        animation: 400ms ease-in-out 0ms 1 normal forwards running modalOut;
        
        @keyframes modalOut {
            0%{
                transform: translateY(0px);
                opacity: 1;
            }  
            100%{
                transform: translateY(600px);
                opacity: 0;
            }
        }

    }
    
    .gray_block {
        width: 216px;
        background: #f8f9fa;
        padding: 1.5rem;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: auto;
            display: block;
        }

        .welcome {
            font-size: 1.75rem;
            margin-top: 1.5rem;
            color: #495057;
            text-align: center;
            font-weight: 600;
        }
    }

    .white_block {
        background: #fff;
        padding: 1.5rem;
        flex: 1 1 0%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        > div {
            flex: ${props => props.sign_up? '0 1 94%' : '0 1 86.15%'};
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            line-height: 1.5;
            
            .upper_wrapper{
                h2{
                    margin: 0;
                    font-size: 1.3125rem;
                    color: #212529;
                }

                .login_form{
                    margin-top: 1rem;
                    text-align: right;
                    input {
                        width: 100%;
                        height: 3rem;
                        font-size: 1rem;
                        margin-top: 1rem;
                        color: #212529;
                        border: 1px solid rgb(222, 226, 230);
                        flex: 1 1 0%;
                        box-sizing: border-box;
                        padding: 1rem;
                        background: #fff;
                        outline: none;
                            
                        &:focus {
                            border: 1px solid #12b886;
                        }
                    }

                    button {
                        margin-top: 2rem;
                    }
                }

                .signup_form{
                    margin-top: 1rem;
                    text-align: right;
                    input {
                        width: 100%;
                        height: 3rem;
                        font-size: .875rem;
                        margin-top: .625rem;
                        color: #212529;
                        border: 1px solid rgb(222, 226, 230);
                        flex: 1 1 0%;
                        box-sizing: border-box;
                        padding: 0.75rem;
                        background: #fff;
                        outline: none;
                            
                        &:focus {
                            border: 1px solid #12b886;
                        }

                        &:nth-of-type(4){
                            margin-top: 1.8rem;
                        }
                    }

                    p {
                        color: #212529;
                        text-align: left;
                        font-size: .75rem;
                        margin: 0;
                        margin-bottom: -0.3rem;
                        margin-left: 2px;
                    }

                    button {
                        margin-top: 2rem;
                    }
                }
            }


            .foot{
                text-align: right;

                div {
                    display: inline-block;
                    font-weight: bold;
                    color: #12b886;
                    cursor: pointer;
                }
            }
        }
    }

`

export default SignInUp;