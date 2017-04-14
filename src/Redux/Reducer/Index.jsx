import Immutable from 'immutable'

import {SET_STATE, REQUEST_POSTS, RECEIVE_POSTS} from '../Action/Index'
//	set_state request_posts receive_posts

import {RECORD_STATE, SAVE_PRODUCT_LIST, NEW_PRODUCT_DATA} from '../Action/Index'
//	record_state save_produce_list new_product_data

import {DELETE_ITEM} from '../Action/Index'
//	delete_item

import {GET_DATA_START , GET_DATA_SUCCESS, TEST_DISPATCH} from '../Action/Index'
//	get_data_start get_data_success test_dispatch


/**
 * 实现方法所返回的action,改变action的方法称之为reducer
 * -  fetchData
 * -  requestData
 * -  testData
 * -  producRecord
 * -  saleRecord
 * 根据types,返回不同的state
 */

/**
 * 对于reducer的分配:
 * 给每一层数据都建一个单独的Reducer,他的state只是当前active的数据.
 * 比如打开了某个stackoverflow的问题详情页面, store保存的answers状态就是当前对应这个问题的所有answers.
 * 要是打开其他问题的详情页面, 这样answers的状态就被替换成了新打开的问题的答案.
 * 这样做的缺点就是不可能维护所有数据, 只能维护当前一小部分数据.
 */


/**
 * 
 */

const defaultlState = Immutable.fromJS({data: {}, isFetching: false})

export const fetchData = (state = defaultlState , action = {}) => {
  //首次渲染时获取数据
  	switch(action.type){
    	case REQUEST_POSTS:
      		return Immutable.Map({'isFetching':true});
    	case RECEIVE_POSTS:  	
    		var state_ = Immutable.Map({'data':action.json,'isFetching':false})
      		return state_;
    	default:
        	return state
  	}
}

export const requestData = (state = {}, action = {}) => {
  	//手动获取数据
  	switch(action.type){
      	case GET_DATA_START:
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
          	state[action.name] = action.json;
          	return state;
      	default:
          	return state;
  	}
}

export const testData = (state = {}, action = {}) => {
  	switch(action.type){
    	case TEST_DISPATCH:
      		return Object.assign({},state,action);
    	default:
      		return state;
  	}
}

export const producRecord = (state = {}, action = {}) => {
  //记录商品列表页数据状态
  switch(action.type){
    case RECORD_STATE:
      return Object.assign({},state,action);
    case SAVE_PRODUCT_LIST:
      state['productList'] = [...action.productList];
      return state;       //记录商品列表数据，但是不触发组件更新
    case NEW_PRODUCT_DATA:
      state['productData'] = [...action.productData];
      return state;
    default:
      return state
  }
}

export const saleRecord = (state = Immutable.fromJS({}) , action = {}) => {
  //销售记录页面数据
  switch(action.type){
    case DELETE_ITEM:
      return Immutable.Map({index:action.index})
    default:
      return state;
  }
}
