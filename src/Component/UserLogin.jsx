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
            <div className="loading-wrap forlogin">              
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
        	value:'29c3d376-975a-43b0-ab2c-54c0093b0613'
        }
        this.handleInput = (event) => {
        	this.setState({value: event.target.value});
        }
        this.onKeyup = (event) => {
		    event.keyCode === 13 && this.handler()
		}
        this.handler = () => {
        	this.props.loginPost('/api/v1/accesstoken', this.state.value)
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.userLogData)
    }
	componentDidMount() {//获取数据
		
    }
    componentWillUpdate(nextProps, nextState) {

    }

    componentWillUnmount() {
       
    }
    
    render() {
    	
		
		let value = this.state.value;
        let { userLogData } = this.props
        
        console.log(userLogData)
        
        return (
            <div className="container">              
                <HeadNav needHeadNav title={ '登录' }/> 
				{
					userLogData.state == 'login' ? '' : <input type='text' className='login-input' value={value} placeholder="输入accesstoken" onKeyUp={this.onKeyup} onInput={this.handleInput}/>
				}
				{
					userLogData.state == 'login' ? <div>{'欢迎登录'}</div> : ''
				}
				<div className='login-tips'>
					<p>{'登录https://cnodejs.org/'}</p>
					<p>{'在设置底部获取你的accesstoken'}</p>
				</div>
				{ userLogData.state == 'under' ? <Loading/> : '' }
            </div>
        );
    }
    
}

export default Container({
    id: 'saleRecord',  //应用关联使用的redux
    component: Main //接收数据的组件入口
});
