import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link, Route, Router} from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';

import {Tool} from '../Config/Tool';
import {template} from './common/mixin';

class Header extends Component {

	constructor(props, context) {
    	super(props, context);
		
    	this.goback = function(){

    	}
    	
    	this.creatWhen = function(res){
		  	if(res){
		  		var creatTime = new Date(res)
		  		return '发布于'+creatTime.getFullYear()+'/'+(creatTime.getMonth()+1)+'/'+creatTime.getDate()
		  	}
    	}
    	
    	this.fromWhere = function(res){
    		switch(res){
				case 'ask':
					return '来自问答'
				  	break;
				case 'job':
				  	return '来自招聘'
				  	break;
				case 'share':
				  	return '来自分享'
				  	break;
				case 'good':
				  	return '来自精华'
				  	break;
				default:
					return ''
			}
    	}
    	
    	
  	}
	render(){
		
		let {parsentProp} = this.props
		
		return (
			<div>
				<div className='revert-head'>
					<Link className='revert-icon' to="/"></Link>
				</div>
				<div className='revert-title'>{parsentProp.title}</div>
				<div className='revert-baseinfo'>
					<div className='revert-info revert-info1'>{ parsentProp.loginname ? '由'+parsentProp.loginname : '' }</div>
					<div className='revert-info revert-info2'>{ this.creatWhen(parsentProp.create_at) }</div>
					<div className='revert-info revert-info3'>{ this.fromWhere(parsentProp.tab) }</div>
					<div className='revert-info revert-info4'>{ parsentProp.reply_count ? parsentProp.reply_count+'次回复' : '0次回复' }</div>
				</div>
			</div>
		)
	}
	
}

class Content extends Component {
	constructor(props, context) {
    	super(props, context);
    	this.state = {
    		data:''
    	}
  	}
	componentDidMount() {
		
  	}
	componentWillReceiveProps(nextProps){
		this.state.data = nextProps.parsentProp
 	}
	render(){
		let {content} = this.state.data
		var createMarkup = () => {
            return {
                __html: content
            };
        }
		return (
			<div id='content' dangerouslySetInnerHTML={createMarkup()}></div>
		)
	}
}



class Message extends Component {
	constructor(props, context) {
    	super(props, context);
    	this.state = {
    		replies:[]
    	}
  	}
	componentDidMount() {
		
		
  	}
	componentWillReceiveProps(nextProps){
		let {replies} = nextProps.parsentProp
		this.state.replies = replies
 	}
	render(){
		
		return (
			<div>
			{
				this.state.replies.map((item, index) => {
					return <MessageItem key={index} {...item} index={index}/>
				})
			}
			</div>
		)
	}
}



class MessageItem extends Component {
	constructor(props, context) {
    	super(props, context);
    	
    	this.fixedToDouble = function(res){
    		
    	}
    	
    	this.replyWhen = function(res){
		  	if(res){
		  		var replyTime = new Date(res)
		  		return '回复于'+replyTime.getFullYear()+'/'+(replyTime.getMonth()+1)+'/'+replyTime.getDate()+' '+replyTime.getHours()+':'+replyTime.getMinutes()
		  	}
    	}
  	}
	componentDidMount() {
		
		
		
  	}
	componentWillReceiveProps(nextProps){
		
		
		
 	}
	render(){
		
		//console.log( this.props )
		
		let {content, create_at, author} = this.props
		
		var createMarkup = () => {
            return {
                __html: content
            };
        }
		
		return (
			<div className='messageItem'>
				<div className='item-time' >
					<div className='msg-name'>{ author.loginname }</div>
					<div>
						<div>{ this.replyWhen(create_at) }</div>
					</div>
				</div>
				<div className='' dangerouslySetInnerHTML={createMarkup()}></div>
			</div>
		)
	}
}



class Main extends Component {
	static defaultProps = {
		default:"example"
	}
  	constructor(props, context) {
    	super(props, context);
    	this.state = {
    		data:{
    			author:{
    				loginname:''
    			},
    			create_at:''
    		}
    	}
  	}
  	componentWillMount() {
		

  	}
  	componentDidMount() {
		
		
  	}
	componentWillReceiveProps(nextProps){
		
		let {data} = nextProps.state;
		this.state.data = data.data
		
 	}
  	componentWillUpdate(nextProps,nextState){

  	}
  	render() {

		let {author, content, create_at, good, is_collect, last_reply_at, replies, tab, title, visit_count, top, reply_count} = this.state.data
		let loginname     = author.loginname
		
		let parsentProp1  = {title, loginname, create_at, tab, reply_count}
  		let parsentProp2  = {content}
  		let parsentProp3  = {replies}
  		
    	return (
    		<div>
    			<Header  parsentProp={parsentProp1} {...this.props}/> 
    			<Content parsentProp={parsentProp2} ></Content>
    			<Message parsentProp={parsentProp3} ></Message>
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
    },
    data:{
    	mdrender:true
    }
});
