import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import { apis } from './../../shared/apis';
import { actionCreators as postActions } from "./post";

const GET_LIKE = 'GET_LIKE';
// const DOWN_LIKE = 'DOWN_LIKE';
// const UP_LIKE = 'UP_LIKE';

const getLike = createAction(GET_LIKE,(post_id, like)=>({post_id, like}));

const initialState={
    post_id: '',
    post_like: false
}

const getLikeDB = (postId) => {
    return async function(dispatch, getState, {history}){

        try{
            const like = await apis.getLike(postId);
            dispatch(getLike(postId, like.data.result));

        } catch(err){
            alert('좋아요 여부를 불러오지 못했습니다!');
            console.log(err);
        }

    }
}

const changeLikeDB = (postId) => {
    return async function(dispatch, getState, {history}){

        try{
            const like = await apis.changeLike(postId);
            
            dispatch(postActions.editLikeCnt(like.data.likesNum));
            dispatch(getLike(postId, like.data.result));
        }catch(err){
            alert('좋아요에 실패했습니다!');
            console.log(err);
        }
    }
}

export default handleActions({
    [GET_LIKE] : (state, action) => produce(state, (draft)=>{
        draft.post_like = action.payload.like;
        draft.post_id = action.payload.post_id;
    })
}, initialState);

const actionCreators = {
    getLike,
    getLikeDB,
    changeLikeDB,
};

export {actionCreators};