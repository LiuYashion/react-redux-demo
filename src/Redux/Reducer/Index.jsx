import Immutable from 'immutable'

import {SET_STATE, REQUEST_POSTS, RECEIVE_POSTS} from '../Action/Index'
//	set_state request_posts receive_posts

import {RECORD_STATE, SAVE_PRODUCT_LIST, NEW_PRODUCT_DATA} from '../Action/Index'
//	record_state save_produce_list new_product_data

import {DELETE_ITEM} from '../Action/Index'
//	delete_item

import {GET_DATA_START , GET_DATA_SUCCESS, TEST_DISPATCH} from '../Action/Index'
//	get_data_start get_data_success test_dispatch


const defaultlState = Immutable.fromJS({data: {}, isFetching: false})


//首次渲染时获取数据
export const fetchData = (state = defaultlState , action = {}) => {
    switch(action.type){
        case REQUEST_POSTS:
        	//requestPosts
            return state.set('isFetching',true);
        case RECEIVE_POSTS:
        	//receivePosts,返回一个新的state
            return Immutable.Map({'data':action.json,'isFetching':false});
        default:
            return state
    }
}

//手动获取数据
export const requestData = (state = {}, action = {}) => {
    switch(action.type){
        case GET_DATA_START:
        	//getDataStart
            return state;
        case GET_DATA_SUCCESS:
        	//action(path, json, success, name)
        	/*
        	 * {
        	 * 	/shopro/data/record.json
        	 * 	http_code: 200, data: Object
        	 * 	true
        	 * 	changeType
        	 * }
        	 */
            action.success(action.json);
            
            console.log( action.json )
            
            state[action.name] = action.json;
            return state;
        default:
            return state;
    }
}

export const testData = (state = {}, action = {}) => {
    switch(action.type){
        case TEST_DISPATCH:
        	//testDispatch
            return Object.assign({},state,action);
        default:
            return state;
    }
}

//记录商品列表页数据状态
export const producRecord = (state = {}, action = {}) => {
    switch(action.type){
        case RECORD_STATE:
        	//recordState
            return Object.assign({},state,action);
        case SAVE_PRODUCT_LIST:
        	//saveProduceList
            state['productList'] = [...action.productList];
            return state;       //记录商品列表数据，但是不触发组件更新
        case NEW_PRODUCT_DATA:
        	//newProductData
            state['productData'] = [...action.productData];
            return state;
        default:
            return state 
    }
}

//销售记录页面数据
export const saleRecord = (state = Immutable.fromJS({}) , action = {}) => {
    switch(action.type){
        case DELETE_ITEM:
        	//deleteItem
            return Immutable.Map({index:action.index})
        default:
            return state;
    }
}


