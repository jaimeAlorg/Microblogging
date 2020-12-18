import * as api from  "../api/index.js";

//Action Creators == Functions which return actions
//Action is an object which returns the type and the payload
//Payload the data where we store our post
//Redux-thunk additional error function and fetching post is an asynchronous task

export const getPosts = () => async(dispatch) =>{
    try{
        const { data } = await api.fetchPosts();
        dispatch({ type: 'FETCH_ALL', payload: data });
    }catch(error){
        console.log(error.message);

    }
}

export const createPost = (post) => async (dispatch) => {
    try {
      const { data } = await api.createPost(post);
      dispatch({type: 'CREATE', payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: 'UPDATE', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const deletePost = (id) => async (dispatch) => {
  try{
    await api.deletePost(id);
    dispatch({ type: 'DELETE', payload: id });
  }catch (error){
    console.log(error.message);
  }
}