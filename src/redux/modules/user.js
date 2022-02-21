import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import { axios } from 'axios';

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
                email: email,
                password: pwd,
                username: username,
                userId: userId,
                introduce: introduce,
            };
            const login = await axios.post('',doc);

            if(login.data.statusHttp === 'OK'){
                alert(`회원가입되었습니다! 환영합니다, ${username}님!`);
                history.replace('/')
            } else if(login.data.statusHttp === 'NG'){
                alert(login.data.errorMessage);
            }

        } catch(err){
            console.log(err);
        }
    }
}

const loginDB = (email, pwd) => {
    return async function(dispatch, getState, {history}) {
        try{
            const login = await axios.post('',{
                email: email,
                password: pwd,
            })
            

        } catch(err){

        }
    }  
}

export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft)=>{
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [OUT_USER]: (state, action) => produce(state, (draft)=>{
        draft.user = null;
        draft.is_login = false;
    })
},inintialState)