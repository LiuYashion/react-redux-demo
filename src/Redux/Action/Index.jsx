import fetch from 'isomorphic-fetch'
import {target} from '../../Config/Config'
import {Tool} from '../../Config/Tool'

export const SET_STATE = 'SET_STATE'								//	set_state
export const RECORD_STATE = 'RECORD_STATE'					//	record_state
export const SAVE_PRODUCT_LIST = 'SAVE_PRODUCT_LIST'//	save_produce_list
export const NEW_PRODUCT_DATA = 'NEW_PRODUCT_DATA'	//	new_product_data
export const DELETE_ITEM = 'DELETE_ITEM'						//	delete_item
export const REQUEST_POSTS = 'REQUEST_POSTS'				//	request_posts
export const RECEIVE_POSTS = 'RECEIVE_POSTS'				//	receive_posts
export const GET_DATA_START = 'GET_DATA_START'			//	get_data_start
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'	//	get_data_success
export const TEST_DISPATCH = 'TEST_DISPATCH'				//	test_dispatch


/**
 * 只定义操作对应的action
 * -  fetchPosts
 * -  getData
 * -  recordState
 * -  saveProductlist
 * -  newProductData
 * -  deleteItem
 *
 * -  requestPosts
 * -  receivePosts
 * -  getDataStart
 * -  getDataSuccess
 * -  testAction
 *
 * action中被暴露出来的方法,会返回一个包含type的对象,对象里有若干参数
 * 如果没有,则会返回一个dispatch(fun(args)),该fun会返回一个包含type的对象
 */

export const fetchPosts = (path, postData) => {

    let url = target + path + Tool.paramType(postData);
    return dispatch => {
        console.log("~~~~~~~~~~~~");
        dispatch(requestPosts(postData));
        return fetch(url,{
            mode: 'cors',
            "Content-Type": "application/json",
        }).then(response => {

            if(response.ok){
              response.json().then(json => {
                console.log("------------");
              	dispatch(receivePosts(path, json))
              })
            }else{
              console.log("status: ", response.status);
            }

        }).catch(error => console.log(error))
    }
}

export const getData = (path, postData, success, name) => {
	//手动调用获取数据的aciton
  let url = target + path + Tool.paramType(postData);
  return dispatch => {
      dispatch(getDataStart(postData))
      return fetch(url,{
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          mode: 'cors'
      })
      .then(response => response.json())
      .then(json => dispatch(getDataSuccess(path, json, success, name)))
      .catch(error => console.log(error))
  }
}

const requestPosts = path => {
	//开始获取数据,url
  return {
    type: REQUEST_POSTS,
    path
  }
}

const receivePosts = (path, json) => {
	//获取数据成功
  return {
    type: RECEIVE_POSTS,
    path ,
    json
  }
}

export const recordState = (id,chooseState,num,index) => {
	//记录单个商品列表状态
  return{
      type:RECORD_STATE,
      id,
      chooseState,
      num,
      index
  }
}

export const saveProductlist = productList => {
	//将商品列表保存在store中，组件再次渲染时调用
  return{
      type:SAVE_PRODUCT_LIST,
      productList
  }
}

export const newProductData = productData => {
	//保存商品列表也获取到的数据
  return {
      type:NEW_PRODUCT_DATA,
      productData
  }
}

export const deleteItem = index => {
	//销售列表页删除单个item
  return {
      type:DELETE_ITEM,
      index
  }
}

const getDataStart = path => {
	//开始获取数据
  return {
    type: GET_DATA_START,
    path
  }
}

const getDataSuccess = (path, json, success, name) => {
	//获取数据成功
  return {
    type: GET_DATA_SUCCESS,
    path ,
    json ,
    success ,
    name
  }
}

export const testAction = (data) => {
  //记录单个商品列表状态
  return{
      type:TEST_DISPATCH,
      data
  }
}
