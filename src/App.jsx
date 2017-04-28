import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';

/*
 * 引入路由配置
 * 引入Store
 * 引入默认配置
 */
import route from './Router/Route'; 		
import store from './Redux/Store/Store';	

import './Config/Config.js';				

import './Style/common.scss';
import './Style/head.scss';
import './Style/index.scss';

import './Style/userLogin.scss';
import './Style/topicDetial.scss';
import './Style/PostTopic.scss';


store.subscribe(() => { 
    //console.log(store.getState())
});

render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);

/*
 * 
	Store {
		fetchData: 		Map, 
		requestData: 	Object, 
		testData: 		Object, 
		producRecord: 	Object, 
		saleRecord: 	Map
	}
 * 
 */
