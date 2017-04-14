import React, {Component, PropTypes} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Provider} from 'react-redux';

/**
 *
 * { 1.route}
 *
 * { 2.store}
 *
 * { 3.config}
 *
 */
import route from './Router/Route'; //路由配置
import store from './Redux/Store/Store';
import './Config/Config.js';//引入默认配置

import './Style/common.scss';
import './Style/header.scss';
import './Style/homePage.scss';
import './Style/topic.scss';

//import './Style/index.scss';
//import './Style/chooseProducts.scss';
//import './Style/helpCenter.less';
//import './Style/saleRecord.less';
//import './Style/allDeposit.less';
//import './Style/applyDeposit.less';
//import './Style/applyRecord.less';


store.subscribe(() => { //监听state变化
    //console.log(store.getState())
});



render(
    <Provider store={store}>
        {route}
    </Provider>,
    document.body.appendChild(document.createElement('div'))
);
