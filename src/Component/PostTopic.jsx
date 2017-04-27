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
        this.state = {
        	value:''
        }
        this.handleInput = (event) => {
        	this.setState({value: event.target.value});
        }
        this.onKeyup = (event) => {
		    event.keyCode === 13 && this.handler()
		}
        this.handler = () => {
        	this.props.loginCNode(this.state.value)
        }
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

		let value = this.state.value;
        
        return (
            <div className="container">              
                <HeadNav needHeadNav title={ '文章发布' }/> 
            </div>
        );
    }
    
}

export default Container({
    id: 'saleRecord',  //应用关联使用的redux
    component: Main //接收数据的组件入口
});
