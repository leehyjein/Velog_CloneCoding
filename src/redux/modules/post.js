import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';
import axios from 'axios';
import { apis } from './../../shared/apis';
import { storage } from "../../shared/firebase";
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

const ADD_POST = 'ADD_POST';
const SET_POST_LIKE = 'SET_POST_LIKE';
const SET_POST_TIME = 'SET_POST_TIME';
const SET_POST_ONE = 'SET_POST_ONE';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST ='DELETE_POST';
const EDIT_LIKE_CNT = 'EDIT_LIKE_CNT';

const addPost = createAction(ADD_POST,(post)=>({post}));
const setPostLike = createAction(SET_POST_LIKE,(post_list)=>({post_list}));
const setPostTime = createAction(SET_POST_TIME,(post_list)=>({post_list}));
const setPostOne = createAction(SET_POST_ONE,(post)=>({post}));
const editPost = createAction(EDIT_POST,(post_id, post)=>({post_id, post}));
const deletePost = createAction(DELETE_POST,(post_id)=>({post_id}));
const editLikeCnt = createAction(EDIT_LIKE_CNT,(like_cnt)=>({like_cnt}));

const initialState = {
    list_like:[],
    list_time:[],
    post_detail:{},
};

const initialPost = {
    title: '애국가',
    // tags: ['애국가', '몇절까지', '외우니'],
    content: `# 동해물과 백두산이
    ## 동해물과 백두산이
    ### 동해물과 백두산이`,
    thumbnailImageUrl: 'https://compote.slate.com/images/697b023b-64a5-49a0-8059-27b963453fb1.gif',
    contentSummary: '내용이 아닐지도',
}

const addPostDB = (title, content, summary, imgUrl) => {
    return async function(dispatch, getState, { history }){
        try{
            const user_info = getState().user.user
            if(imgUrl){
                const _upload = ref(storage, `images/${user_info.userId}_${new Date().getTime()}`);
                const snapshot = await uploadString(_upload, imgUrl, "data_url");
                const url = await getDownloadURL(snapshot.ref);

                const doc = {
                    title: title,
                    content: content,
                    thumbnailImageUrl: url,
                    contentSummary: summary,
                }
                const add = await apis.addPost(doc);
    
                const new_doc = {
                    ...doc,
                    postId: add.data.boardId,
                    uid: user_info.id,
                    userId: user_info.userId,
                    nickname: user_info.nickname,
                    introduce: user_info.introduce,
                    profileNum: user_info.profileNum,
                    createdAt: add.data.createdAt,
                    likeCount: 0,
                    commentCount: 0,          
                }
                dispatch(addPost(new_doc));
                alert('포스팅 되었습니다!')
                history.replace(`/Postdetail/${add.data.boardId}`);
                window.scrollTo(0,0);
    
            } else if(!imgUrl){
                const doc = {
                    title: title,
                    content: content,
                    thumbnailImageUrl: '',
                    contentSummary: summary,
                }
                const add = await apis.addPost(doc);
    
                const new_doc = {
                    ...doc,
                    postId: add.data.boardId,
                    uid: user_info.id,
                    userId: user_info.userId,
                    nickname: user_info.nickname,
                    introduce: user_info.introduce,
                    profileNum: user_info.profileNum,
                    createdAt: add.data.createdAt,
                    likeCount: 0,
                    commentCount: 0,          
                }
                dispatch(addPost(new_doc));
                alert('포스팅 되었습니다!')
                history.replace(`/Postdetail/${add.data.boardId}`);
                window.scrollTo(0,0);            
            }
            
        }catch(err){
            alert('포스트를 출간하지 못했습니다!')
            console.log(err);
        }
        
    }
}

const setPostLikeDB = () => {
    return async function(dispatch, getState, {history}){
        try{
            const get = await axios.get('http://54.180.95.115/boards/likes')
            console.log(get.data);
            dispatch(setPostLike(get.data));

        } catch(err){
            alert('포스트 목록을 불러오지 못했습니다!');
            console.log(err)
        }
    }
}


const setPostTimeDB = () => {
    return async function(dispatch, getState, {history}){
        try{
            const get = await axios.get('http://54.180.95.115/boards/recent')
            console.log(get.data);
            dispatch(setPostTime(get.data));
            
        } catch(err){
            alert('포스트 목록을 불러오지 못했습니다!');
            console.log(err)
        }
    }
}

const setOnePostDB = (postId) => {
    return async function(dispatch, getState, {history}){
        try{
            const get_one = await axios.get(`http://54.180.95.115/board/detail/${postId}`)

            console.log(get_one.data)
            
            dispatch(setPostOne(get_one.data));

        } catch(err){
            alert('포스트를 불러오지 못했습니다!');
            console.log(err)
        }
    }
}

const editPostDB = (postId, title, content, summary, imgUrl=null) => {
    return async function(dispatch, getState, {history}){
        try{

            if(!imgUrl){
                const doc = {
                    title: title,
                    content: content,
                    thumbnailImageUrl: '',
                    contentSummary: summary,
                }
        
                const edit = await apis.editPost(postId, doc);
    
                dispatch(setPostOne(doc));
                dispatch(editPost(postId,doc));
                alert('포스트가 수정되었습니다!')
                history.replace(`/Postdetail/${postId}`);
                window.scrollTo(0,0);

            } 
            if(imgUrl){
                const prevImg = getState().post.post_detail.thumbnailImageUrl
                if(imgUrl === prevImg){
                    const doc = {
                        title: title,
                        content: content,
                        thumbnailImageUrl: prevImg,
                        contentSummary: summary,
                    }
            
                    const edit = await apis.editPost(postId, doc);
        
                    dispatch(setPostOne(doc));
                    dispatch(editPost(postId,doc));
                    alert('포스트가 수정되었습니다!')
                    history.replace(`/Postdetail/${postId}`);
                    window.scrollTo(0,0);
                } else if(imgUrl !== prevImg){
                    const user_info = getState().user.user
                    const _upload = ref(storage, `images/${user_info.userId}_${new Date().getTime()}`);
                    const snapshot = await uploadString(_upload, imgUrl, "data_url");
                    const url = await getDownloadURL(snapshot.ref);

                    console.log(url)

                    const doc = {
                        title: title,
                        content: content,
                        thumbnailImageUrl: url,
                        contentSummary: summary,
                    }
            
                    const edit = await apis.editPost(postId, doc);
        
                    dispatch(setPostOne(doc));
                    dispatch(editPost(postId,doc));
                    alert('포스트가 수정되었습니다!')
                    history.replace(`/Postdetail/${postId}`);
                    window.scrollTo(0,0);
                }
            }

        } catch(err){
            alert('포스트를 수정하지 못했습니다!');
            console.log(err)
        }       
    }
}

const deletePostDB = (postId) => {
    return async function(dispatch, getState, {history}){
        try{
            const delete_post = await apis.deletePost(postId);
            dispatch(deletePost(postId))
            alert('포스트가 삭제되었습니다!');
            history.replace('/');
            window.scrollTo(0,0);

        }catch(err){
            alert('포스트를 삭제하지 못했습니다!');
            console.log(err)
        }
    }
}


export default handleActions({
    [ADD_POST]:(state, action) => produce(state,(draft)=>{
        draft.list_like.push(action.payload.post);
        draft.list_like.sort((a,b)=>{
            if(a.likeCount !== b.likeCount){
                return b.likeCount - a.likeCount
            } else if(a.likeCount === b.likeCount){
                return new Date(b.createdAt).getTime - new Date(a.createdAt).getTime
            }
        })
        draft.list_time.unshift(action.payload.post);
    }),
    [SET_POST_LIKE]:(state, action) => produce(state,(draft)=>{
        draft.list_like = action.payload.post_list
    }),
    [SET_POST_TIME]:(state, action) => produce(state,(draft)=>{
        draft.list_time = action.payload.post_list
    }),
    [SET_POST_ONE]:(state, action) => produce(state,(draft)=>{
        draft.post_detail = action.payload.post
    }),
    [EDIT_POST]:(state, action) => produce(state,(draft)=>{
        draft.post_detail = {...draft.post_detail, ...action.payload.post};
        draft.list_like = draft.list_like.map(a => {
            if (a.postId == action.payload.post_id){
                return {...a, ...action.payload.post}
            } else {
                return a
            }
        })
        draft.list_time = draft.list_like.map(a => {
            if (a.postId == action.payload.post_id){
                return {...a, ...action.payload.post}
            } else {
                return a
            }
        })
    }),
    [DELETE_POST]:(state, action) => produce(state,(draft)=>{
        draft.list_like = draft.list_like.filter(a => a.postId !== action.payload.post_id);
        draft.list_time = draft.list_time.filter(a => a.postId !== action.payload.post_id);
        draft.post_detail = draft.post_detail.postId === action.payload.post_id ? null : draft.post_detail;

    }),
    [EDIT_LIKE_CNT]:(state, action) => produce(state, (draft)=>{
        draft.post_detail.likeCount = action.payload.like_cnt;
    })
},initialState)

const actionCreators = {
    addPost,
    setPostLike,
    setPostTime,
    setPostOne,
    editPost,
    deletePost,
    editLikeCnt,
    addPostDB,
    setPostLikeDB,
    setPostTimeDB,
    setOnePostDB,
    editPostDB,
    deletePostDB,
}

export {actionCreators};