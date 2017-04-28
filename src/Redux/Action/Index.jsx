import fetch from 'isomorphic-fetch'
import {target} from '../../Config/Config'
import {Tool} from '../../Config/Tool'


export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_DETIAL = 'REQUEST_DETIAL'
export const RECEIVE_DETIAL = 'RECEIVE_DETIAL'

export const LOGIN_SUCCESS  = 'LOGIN_SUCCESS'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const UNDER_LOGIN    = 'UNDER_LOGIN'

export const STORE_TOPIC    = 'STORE_TOPIC'

export const POST_DETIAL_DEGIN    = 'POST_DETIAL_DEGIN'
export const POST_DETIAL_SUCCESS  = 'POST_DETIAL_SUCCESS'

export const REPLY_DEGIN    = 'REPLY_DEGIN'
export const REPLY_SUCCESS  = 'REPLY_SUCCESS'


const underlogin  = () => {
	return {
    type: UNDER_LOGIN
  }
}
const loginCNode  = (json) => {
	return {
    type: LOGIN_SUCCESS,
    json
  }
}
export const logoutPost = () => {
	return {
    type: LOGOUT_SUCCESS
  }
}

export const loginPost = (path, postData) => {
    let url = target + path
    return dispatch => {
	    dispatch( underlogin() );
	    return fetch(url,{
	        mode: 'cors',
	        method: "POST",
	        body:JSON.stringify({accesstoken:postData}),
	        headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    }
	    })
	    .then(response => {
	        if(response.ok) {
	            response.json().then( json=>{
	            	json.token = postData
	            	dispatch( loginCNode(json) )
	            } )
	        }else{
	            console.log("status", response.status);
	        }
	    })
	    .catch(error => console.log(error))
    }
}


//开始获取数据
const requestPosts = path => {
  return {
    type: REQUEST_POSTS,
    path
  }
}
//获取数据成功
const receivePosts = (path, json) => {
  return {
    type: RECEIVE_POSTS,
    path ,
    json 
	}
}
// 页面初次渲染时获取数据
export const fetchPosts = (path, postData) => {
    let url = target + path + Tool.paramType(postData);
    return dispatch => {
	    dispatch(requestPosts(postData));
	    return fetch(url,{
	        mode: 'cors',
	        "Content-Type": "application/json",
	    })
	    .then(response => {
	        if (response.ok) {
	            response.json().then(json => dispatch(receivePosts(path, json)))
	        } else {
	            console.log("status", response.status);
	        }
	    })
	    .catch(error => console.log(error))
    }
}




//开始获取数据
const requestTopicDetial = path => {
  return {
    type: REQUEST_DETIAL,
    path
  }
}
//获取数据成功
const receiveTopicDetial = (path, json) => {
	return {
	    type: RECEIVE_DETIAL,
	    path ,
	    json 
	}
}
// 页面初次渲染时获取数据
export const queryTopicDetial = (path) => {
    let url = target + path;
    return dispatch => {
	    dispatch(requestTopicDetial());
	    return fetch(url,{
	        mode: 'cors',
	        "Content-Type": "application/json",
	    })
	    .then(response => {
	        if (response.ok) {
	            response.json().then(json => dispatch(receiveTopicDetial(path, json)))
	        } else {
	            console.log("status", response.status);
	        }
	    })
	    .catch(error => console.log(error))
    }
}



const topicData = (title, content, tab, accesstoken, url) => {
  return {
    type: STORE_TOPIC,
    title, 
    content,
    tab,
    accesstoken,
    url
  }
}
export const storeTopicDetial = (title, content, tab, accesstoken, url) => {

	return dispatch => {
    dispatch( topicData(title, content, tab, accesstoken, url) );
	}
  
}



const postBegin = (title, content, tab, accesstoken, url) => {
  return {
    type: POST_DETIAL_DEGIN
  }
}
const postSuccess = (title, content, tab, accesstoken, url) => {
  return {
    type: POST_DETIAL_SUCCESS
  }
}
export const postTopicDetial = (title, content, tab, accesstoken, url) => {

	return dispatch => {
    dispatch( postBegin(title, content, tab, accesstoken, url) );
    return fetch(url,{
        mode: 'cors',
        method: "POST",
        body:JSON.stringify({
        	accesstoken:accesstoken,
        	title:title,
        	tab:tab,
        	content:content
        }),
        headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    }
    })
    .then(response => {
        if(response.ok) {
            response.json().then( json=>{ dispatch(postSuccess(json)) } )
        }else{
            console.log("status", response.status);
        }
    })
    .catch(error => console.log(error))
	}
  
}



const replyBegin = () => {
  return {
    type: REPLY_DEGIN
  }
}
const replySuccess = () => {
  return {
    type: REPLY_SUCCESS
  }
}
export const postTopicReply = (id, content, accesstoken) => {

	return dispatch => {
    dispatch( replyBegin() );
    
	}
  
}