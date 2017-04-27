import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';

import { HeadNav, Container } from './common/HeadNav';

class Loading extends Component{
	
	constructor(props, context) {
        super(props, context);
    }
	render() {
	
        return (
            <div className="loading-wrap">              
				<div className="loading-1"></div>	
				<div className="loading-2"></div>	
            </div>
        )
    }
}

class Main extends Component {
	
    constructor(props,context) {
        super(props,context);
        
    }
    componentWillReceiveProps(nextProps){
        
    }
	componentDidMount() {//获取数据
		
    }
    componentWillUpdate(nextProps, nextState) {

    }

    componentWillUnmount() {
       
    }
    
    render() {

		console.log(this.props)
        return (
            <div className="container">              
                <HeadNav needHeadNav title={ '文章发布' }/> 
                
                <TopicTop className="topic-top"/>
                <TopicBody />
                <TopicBottom />
            </div>
        );
    }
    
}

export default Container({
    id: 'saleRecord',  //应用关联使用的redux
    component: Main //接收数据的组件入口
});
