import Immutable from 'immutable'



import {REQUEST_POSTS, RECEIVE_POSTS} from '../Action/Index'
import {REQUEST_DETIAL, RECEIVE_DETIAL} from '../Action/Index'
import {LOGIN_SUCCESS, LOGOUT_SUCCESS, UNDER_LOGIN} from '../Action/Index'
import {STORE_TOPIC} from '../Action/Index'

import {POST_DETIAL_DEGIN, POST_DETIAL_SUCCESS} from '../Action/Index'

// reducer

//const initialState = Immutable.fromJS({}) //=Immutable.Map({})

const defaultlState = Immutable.fromJS({data: {}, isFetching: false})
//首次渲染时获取数据
export const fetchData = (state = defaultlState , action = {}) => {
    switch(action.type){
        case REQUEST_POSTS:
            return state.set('isFetching',true);
        case RECEIVE_POSTS:
            return Immutable.Map({'data':action.json,'isFetching':false});//返回一个新的state
        default:
            return state
    }
}

export const topicDetialData = (state = defaultlState , action = {}) => {
    switch(action.type){
        case REQUEST_DETIAL:
            return state.set('isFetching',true);
        case RECEIVE_DETIAL:
            return Immutable.Map({'data':action.json,'isFetching':false});//返回一个新的state
        default:
            return state
    }
}

export const userLogData = (state = {} , action = {}) => {
    switch(action.type){
        case UNDER_LOGIN:
            return {'state':'under'}
        case LOGIN_SUCCESS:
            return {'state':'login', data:action.json}//返回一个新的state
        case LOGOUT_SUCCESS:
            return {'state':'logout'}//返回一个新的state
        default:
            return {'state':'logout'}
    }
}

export const topicData = (state = {} , action = {}) => {
	//console.log(action)
    switch(action.type){
        case STORE_TOPIC:
            return { 'title':action.title, 'content':action.content, 'tab':action.tab}
        default:
            return { 'title':'', 'content':'', 'tab':'' }
    }
}

export const postStateData = (state = {} , action = {}) => {
	//console.log(action)
    switch(action.type){
        case POST_DETIAL_DEGIN:
            return { 'state':'begin' }
        case POST_DETIAL_SUCCESS:
            return { 'state':'success' }
        default:
            return { 'state':'none' }
    }
}


