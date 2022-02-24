import instance from "./axios";

export const apis = {
    loginCheck: () => instance({
        method: 'post',
        url: '/islogin',
        headers: {
            "Authorization": localStorage.getItem('token')
          }
    }),
    addPost: (doc) => instance({
        method: 'post',
        url: '/board/posting',
        data: doc,
        headers: {
            "Authorization": localStorage.getItem('token')
          }
    }),
    editPost: (postId, doc) => instance({
        method: 'put',
        url: `/board/update/${postId}`,
        data: doc,
        headers: {
            "Authorization": localStorage.getItem('token')
          }
    }),
    deletePost: (postId) => instance({
        method: 'delete',
        url: `/board/delete/${postId}`,
        headers: {
            "Authorization": localStorage.getItem('token')
          }
    }),
    getLike: (postId) => instance({
        method: 'get',
        url: `/board/like/${postId}`,
        headers: {
            "Authorization": localStorage.getItem('token')
          }
    }),
    changeLike: (postId) => instance({
        method: 'post',
        url: `/board/like/${postId}`,
        headers: {
            "Authorization": localStorage.getItem('token')
          }
    }),

}