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
            <div className="loading-shadow">
            	<div className="loading-wrap">              
					<div className="loading-1"></div>	
					<div className="loading-2"></div>	
	            </div>
            </div>
        )
    }
}

class PostSuccess extends Component{
	
	constructor(props, context) {
        super(props, context);
    }
	render() {
	
        return (
            <div className="loading-shadow dark">
            	<div className="dark-tips">{'你的文章已经发布成功,返回看看吧~'}</div>
            </div>
        )
    }
}

class Alert extends Component{
	
	constructor(props, context) {
        super(props, context);
        
        this.cancleModal= ()=>{
        	this.props.show('cancle')
        }
        

    }
	render() {
	
        return (
            <div className="loading-shadow">
            	<div className="loading-tips">              
					<div className="tips-up">{'种类标题内容不能为空'}</div>
					<div className="tips-down" onClick={this.cancleModal}>{'确定'}</div>
	            </div>
            </div>
        )
    }
}





class TopicBody extends Component{
	
	constructor(props, context) {
        super(props, context);
        
		this.state = {
        	title:'',
			content:'',
			selectTab:'',
			share:'',
			ask:'',
			job:''
        }
        this.tabBar = (tab)=>{
        	this.setState({
        		selectTab:tab,
				share:'',
				ask:'',
				job:'',
        		[tab]:'selected'
        	})
        	this.props.storeTopicDetial( this.state.title, this.state.content, tab )
        }
        this.inputTitle = (event)=>{
        	
        	this.props.storeTopicDetial( event.target.value, this.state.content, this.state.selectTab )
        	this.setState({title: event.target.value});
        }
        this.inputContent = (event)=>{
        	
        	this.props.storeTopicDetial( this.state.title, event.target.value, this.state.selectTab )
        	this.setState({content: event.target.value});
        }
    }
	render() {
		let {title, content} = this.state
		let {showModal, show, postStateData} = this.props
		
		let tabbar = (
			<div>
				<div className="top-tips">{'为文章选择一个模板种类:'}</div>
				<div className="top-bars">
					<div onClick={ this.tabBar.bind(this,'share')} className={ this.state.share } >{'分享'}</div>
					<div onClick={ this.tabBar.bind(this,'ask')}   className={ this.state.ask }   >{'问答'}</div>
					<div onClick={ this.tabBar.bind(this,'job')}   className={ this.state.job }   >{'招聘'}</div>
				</div>
			</div>
		)	
		let tips = (
			<div className="post-tips">{'正在发布..'}</div>
		)
		let tips_ = (
			<div className="post-tips">{'发布成功'}</div>
		)
		
        return (
        	<div>
	        	<div className="topic-top"> 
	        		{ postStateData.state == 'begin' && tips }
	            	{ postStateData.state == 'success' && tips_ }
	            	{ postStateData.state == 'none' && tabbar }
	            </div>
	            <div  className="topic-body">              
					<input value={title} onChange={this.inputTitle} className="input-title" placeholder="请输入标题" />
					<textarea value={content} onChange={this.inputContent} className="input-content" placeholder="请输入内容"/>
					
					{ postStateData.state == 'begin' ? <Loading/> : '' }
					
					{ postStateData.state == 'success' ? <PostSuccess/> : '' }
					
					{ showModal == 'alert'   ? <Alert show={show}/> : '' }
					
	            </div>
	        </div>
        )
    }
}

class TopicBottom extends Component{
	
	constructor(props, context) {
        super(props, context);
        
        this.postTopic = ()=>{
        	
        	
        	this.props.postTopicDetial(this.props.topicData.title, this.props.topicData.content, this.props.topicData.tab, this.props.userLogData.data.token, '/api/v1/topics')
        	
        	if( this.props.topicData.title=='' && this.props.topicData.content=='' ){
        		this.props.show('alert')
        	}else{
        		this.props.show('posting')
        	}
        
        }
    }
	render() {
		
		let {showModal} = this.props
		
		let dom;
		if(showModal=='posting'){
			dom = (<div></div>)
		}else{
			dom = (<div className="topic-bottom" onClick={ this.postTopic }>{'提交'}</div>)
		}
		
        return dom
    }
}

class Main extends Component {
	
    constructor(props,context) {
        super(props,context);
        
        this.state = {
        	showModal:''
        }
        
        this.show = (type)=>{
        	this.setState({
        		showModal:type
        	})
        }
    }
    componentWillReceiveProps(nextProps){
   		nextProps.userLogData.state = this.props.userLogData.state
   		if(this.props.userLogData.data){
   			nextProps.userLogData.data = this.props.userLogData.data
   		}
   	}
	componentDidMount() {//获取数据
		
    }
    componentWillUpdate(nextProps, nextState) {

    }

    componentWillUnmount() {
       
    }
    
    render() {


        return (
            <div className="container">              
                <HeadNav needHeadNav title={ '文章发布' }/> 

                <TopicBody {...this.props} showModal={this.state.showModal} show={this.show}/>
                
                <TopicBottom {...this.props} show={this.show} showModal={this.state.showModal}/>
            </div>
        );
    }
    
}

export default Container({
    id: 'saleRecord',  //应用关联使用的redux
    component: Main //接收数据的组件入口
});
