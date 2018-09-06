const URL = "http://localhost:3001";
const headers = {
    headers: { Authorization: "whatever-you-want" }
};
const POSTheaders = {
    headers: {
        Authorization: "whatever-you-want",
        "Content-Type": "application/json"
    },
    method: "POST"
};
const PUTheaders = {
    headers: {
        Authorization: "whatever-you-want",
        "Content-Type": "application/json"
    },
    method: "PUT"
};
const DELETEheaders = {
    headers: {
        Authorization: "whatever-you-want"
    },
    method: "DELETE"
};

export const upVOTE = {
    option: "upVote"
};

export const downVOTE = {
    option: "downVote"
};

export const getCategories = async () => {
    const response = await fetch(`${URL}/categories`, headers);
    const data = await response.json();
    // console.log(data);
    return data.categories; // categories ARRAY
};

export const getCategoryPost = async category => {
    const response = await fetch(`${URL}/${category}/posts`, headers);
    const data = await response.json();
    // console.log(data);
    return data;
};

export const getPosts = async () => {
    const response = await fetch(`${URL}/posts`, headers);
    const data = await response.json();
    // console.log(data);
    return data;
};

// const testPost = {
//     id: "1000",
//     timestamp: Date.now(),
//     title: "justaTitle",
//     body: "body here",
//     author: "John Doe",
//     category: "react"
// };

export const setPost = async postObj => {
    const response = await fetch(`${URL}/posts`, {
        ...POSTheaders,
        body: JSON.stringify(postObj)
    });
    const data = await response.json();
    // console.log(data);
    return data; // {id: "1000", timestamp: 1535927964995, title: "justaTitle", body: "body here", author: "John Doe", …}
};

export const getPost = async postId => {
    const response = await fetch(`${URL}/posts/${postId}`, POSTheaders);
    const data = await response.json();
    // console.log(data);
    return data;
};

// const optionUp = {
//     option: "upVote"
// };

export const votePost = async (postId, voteObj) => {
    const response = await fetch(`${URL}/posts/${postId}`, {
        ...POSTheaders,
        body: JSON.stringify(voteObj)
    });
    const data = await response.json();
    // console.log(data);
    return data;
};
export const votePostUP = async postId => {
    return await votePost(postId, upVOTE);
};
export const votePostDOWN = async postId => {
    return await votePost(postId, downVOTE);
};

// const editOption = {
//     title: "NEW SUPER TITLE",
//     body: "NEW NEW NEW SUPER BODY"
// };

export const editPost = async (postId, editObj) => {
    const response = await fetch(`${URL}/posts/${postId}`, {
        ...PUTheaders,
        body: JSON.stringify(editObj)
    });
    const data = await response.json();
    // console.log(data);
    return data;
};

export const deletePost = async postId => {
    const response = await fetch(`${URL}/posts/${postId}`, DELETEheaders);
    const data = response.json();
    // console.log(data);
    return data;
};

export const getCommentsOfPost = async postId => {
    const response = await fetch(`${URL}/posts/${postId}/comments`, headers);
    const data = await response.json();
    // console.log(data);
    return data;
};

// const commentObjx = {
//     id: 12345,
//     timestamp: Date.now(),
//     body: "SOME COMMENT IN BODY",
//     author: "Joey",
//     parentId: "8xf0y6ziyjabvozdd253nd"
// };
export const addCommentToPost = async commentObj => {
    const response = await fetch(`${URL}/comments`, {
        ...POSTheaders,
        body: JSON.stringify(commentObj)
    });
    const data = await response.json();
    // console.log(data);
    return data;
};

export const getComment = async postId => {
    const response = await fetch(`${URL}/comments/${postId}`, headers);
    const data = await response.json();
    // console.log(data);
    return data;
};

export const voteComment = async (postId, voteObj) => {
    const response = await fetch(`${URL}/comments/${postId}`, {
        ...POSTheaders,
        body: JSON.stringify(voteObj)
    });
    const data = await response.json();
    // console.log(data);
    return data;
};

export const voteCommentUp = async postId => {
    return await voteComment(postId, upVOTE);
};
export const voteCommentDown = async postId => {
    return await voteComment(postId, downVOTE)
}

// const putObj = {
//     timestamp: 12345678,
//     body: "SOME STRANGE BODY IN COMMENT"
// };

export const editComment = async (postId, commentObj) => {
    const response = await fetch(`${URL}/comments/${postId}`, {
        ...PUTheaders,
        body: JSON.stringify(commentObj)
    });
    const data = response.json();
    // console.log(data);
    return data;
};

export const deleteComment = async postid => {
    const response = await fetch(`${URL}/comments/${postid}`, DELETEheaders);
    const data = await response.json();
    // console.log(data);
    return data;
};
