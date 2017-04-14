import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';

import {Tool} from '../Config/Tool';
import {template} from './common/mixin';

class Header extends Component {
	constructor(props, context) {
    	super(props, context);
  	}
	render(){
		return (
			<div className='revert-head'>
				<div className='revert-icon'></div>
				<div className='revert-title'></div>
			</div>
		)
	}
	
}

class Content extends Component {
	constructor(props, context) {
    	super(props, context);
  	}
	render(){
		return (
			<div></div>
		)
	}
	
}


class Main extends Component {

	static defaultProps = {
		default:"example"
	}

  	constructor(props, context) {
    	super(props, context);
    	
    	
    	
  	}

  	componentWillMount() {
		

  	}
  	componentDidMount() {

  	}
	componentWillReceiveProps(nextProps){
		let {data} = nextProps.state
		console.log(data.data)
 	}
  	componentWillUpdate(nextProps,nextState){

  	}
  	render() {
    	return (
    		<div>
    			<Header /> 
    			<Content>
    			
    			
    			</Content>
    		</div>
    	)
  	}
  	componentWillUnmount() {

  	}
}


export default template({
    id: 'Topic',  //应用关联使用的redux
    component: Main, //接收数据的组件入口
    url: (props, state) => {
        return '/api/v1/topic/' + (props.params.id || '');
    }
});
