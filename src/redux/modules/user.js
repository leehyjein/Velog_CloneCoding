import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import axios from 'axios';
import { apis } from './../../shared/apis';

const SET_USER = 'SET_USER';
const OUT_USER = 'OUT_USER';

const inintialState = {
    user:{
        uid: null,
        email: '',
        userId: '',
        username: '',
        password: '',
        introduce: '',
        profileNum: '',
    },
    is_login: false,
};

const setUser = createAction(SET_USER, (user) => ({user}));
const outUser = createAction(OUT_USER, () => ({}));

const signupDB = (email, pwd, username, userId, introduce) => {
    return async function(dispatch, getState, {history}){
        try {
            const doc = {
                username: email,
                password: pwd,
                nickname: username,
                userId: userId,
                introduce: introduce,
            };
            const signup = await axios.post('http://54.180.95.115/user/signup',doc);

            console.log(signup.data)

            if(signup.data.statusHttp === 'OK'){
                alert(`회원가입되었습니다! 환영합니다, ${username}님!`);
                history.replace('/')
                return 'OK';
            } else if(signup.data.statusHttp === 'NG'){
                alert(signup.data.errorMessage);
            }

            

        } catch(err){
            console.log(err);
        }
    }
}

const loginDB = (email, pwd) => {
    return async function(dispatch, getState, {history}) {
        try{
            const login = await axios.post('http://54.180.95.115/user/login',{
                username: email,
                password: pwd,
            })
            console.log(login.headers.authorization);
            const check = await axios({
                method: 'post',
                url: 'http://54.180.95.115/islogin',
                headers: {
                    Authorization: `${login.headers.authorization}`
                }
            });

            localStorage.setItem('token', login.headers.authorization)

            dispatch(setUser(check.data));

            return 'ok'
                     
        } catch(err){
            alert('아이디와 비밀번호를 다시 확인해주세요!')
        }
    }  
}

const loginCheckDB = () => {
    return async function(dispatch, getState, {history}){
        try{
            const check = await apis.loginCheck();
            console.log(check.data);
            dispatch(setUser(check.data));

        } catch(err){
            console.log(err)
            dispatch(outUser());
            history.replace('/');
        }
    }
}

export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft)=>{
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [OUT_USER]: (state, action) => produce(state, (draft)=>{
        localStorage.removeItem('token')
        draft.user = null;
        draft.is_login = false;
    })
},inintialState);

const actionCreators = {
    setUser,
    outUser,
    signupDB,
    loginDB,
    loginCheckDB,
}

export {actionCreators};
