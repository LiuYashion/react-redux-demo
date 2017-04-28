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

class Message extends Component{
	constructor(props, context) {
        super(props, context);
        this.state = {
        	message:'撒的发生的'
        }
        this.sendmessage = () => {
        	let token = this.props.userLogData.data.token
        	let id = this.props.topicDetialData.toJS().data.data.id
        	let msg= this.state.message
        	

        	this.props.postTopicReply(id, msg, token)
        	
        	
        }
        this.inputMessage = (event) => {
        	this.setState({message: event.target.value});
        }
    }
	componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
	render() {
		
		let {message} = this.state
		let {replyStateData} = this.props
	
		
		console.log(11)
		
        return (
            <div>
            </div>
        )
    }
}

class Reply extends Component{
	constructor(props, context) {
        super(props, context);
        this.simplifyTime = (timestamp) => {
        	
        	if(timestamp){
        		let dateTime = new Date(timestamp);
	        	let nowTime  = new Date();
	        	
	        	let year   = nowTime.getFullYear()
	        	let year_  = dateTime.getFullYear()
	        	let month_ = dateTime.getMonth()+1
	        	let day_   = dateTime.getDate()
	        	
	        	if(year!=year_){
	        		return '回复于'+year_+'年'+month_+'月'+day_+'日'
	        	}else{
	        		return '回复于'+month_+'月'+day_+'日'
	        	}
        	}else{
        		return ''
        	}
        	
        }
    }
	render() {
		
		let createMarkup = () => {
            return {
                __html: this.props.reply.content
            }
        }
		
        return (
            <div className='reply'>
            	<div className='reply-ups'>
            		<div className='ups ups-icon'></div>
            		<div className='ups ups-count'>{ this.props.reply.ups.length }</div>
            		<div className='ups down-icon'></div>
            	</div>
            	<div className='reply-content'>
            		<div className='reply-head'>
            			{ this.props.reply.author.loginname }
            			{ this.simplifyTime(this.props.reply.create_at) }
            		</div>
            		<div dangerouslySetInnerHTML={createMarkup()}></div>
            	</div>
            </div>
        )
    }
}


class Main extends Component {
	
    constructor(props,context) {
        super(props,context);
        this.state = {
        	data:{
        		data:{
	        		title:'',
	        		author:{
	        			avatar_url:'',
	        			loginname:''
	        		},
	        		create_at:'',
	        		reply_count:'',
	        		visit_count:''
	        	}
        	},
        	isFetching:true
        }
        
        this.simplifyTime = (timestamp) => {
        	
        	if(timestamp){
        		let dateTime = new Date(timestamp);
	        	let nowTime  = new Date();
	        	
	        	let year   = nowTime.getFullYear()
	        	let year_  = dateTime.getFullYear()
	        	let month_ = dateTime.getMonth()+1
	        	let day_   = dateTime.getDate()
	        	
	        	if(year!=year_){
	        		return '于'+year_+'年'+month_+'月'+day_+'日'
	        	}else{
	        		return '于'+month_+'月'+day_+'日'
	        	}
        	}else{
        		return ''
        	}
        	
        }
        this.simplifyName = (name) => {      	
        	if(name){
        		return '由'+name
        	}else{
        		return ''
        	}
        }
        this.simplifyLocation = (location) => {    
        	let loc = {
        		'good':'精华',
        		'ask':'问答',
        		'share':'分享',
        		'job':'招聘'
        	}
        	if(location){
        		return ' 发布在'+loc[location]
        	}else{
        		return ''
        	}
        }
        this.simplifyCount = (reply, visit) => {    
        	
        	if(reply){
        		return '  ('+reply+'/'+visit+')'
        	}else{
        		return ''
        	}
        }
    }
    componentWillReceiveProps(nextProps){
        let data = nextProps.topicDetialData.get('data')
        
        this.setState({
        	isFetching: nextProps.topicDetialData.get('isFetching'),
        	data: data ? data : ''
        })
        
        nextProps.userLogData.state = this.props.userLogData.state
   		if(this.props.userLogData.data){
   			nextProps.userLogData.data = this.props.userLogData.data
   		}
    }
	componentDidMount() {//获取数据
		this.props.queryTopicDetial('/api/v1/topic/'+this.props.location.query.id)
    }
    componentWillUpdate(nextProps, nextState) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.topicDetialData.get('isFetching') 
    }
    
    componentWillUnmount() {
       
    }
    
    render() {

        //let data = this.state.data.data ? data.data : ''
        let content
        let createMarkup = () => {
            return {
                __html: this.state.data.data.content
            }
        }
        let avaterStyle = {
			'backgroundSize': 'contain',
    		'backgroundRepeat': 'no-repeat',
			'backgroundImage':'url('+this.state.data.data.author.avatar_url+')'
			
		}
        
        if(this.state.data.data.title){    	
        	content = (
        		<div>
        			<div className='topic-info' >
						
						<div className='topic-left' style={ avaterStyle }></div>
						<div className='topic-right'>
							<div className='right-info-1'>
								{ this.simplifyName(this.state.data.data.author.loginname) }
								{ this.simplifyCount(this.state.data.data.reply_count, this.state.data.data.visit_count) }
							</div>
							<div className='right-info-2'>
								{ this.simplifyTime(this.state.data.data.create_at) }
								{ this.simplifyLocation(this.state.data.data.tab) }
							</div>
						</div>
						
	                </div>
	                <div className='topic-content' dangerouslySetInnerHTML={createMarkup()}></div>
	                
	                <div className='topic-reply'>
	                {
	                	this.state.data.data.replies.map(
			      			reply => <Reply key={reply.id} reply={reply}/>
			      		)
	                }
	                </div>
	                
        		</div>
        	)
        }else{
        	content = (<div></div>)
        }
        
        
		console.log(this.props.userLogData.state)
        
        return (
            <div className="container">              
                <HeadNav needHeadNav title={ this.state.data.data.title }/> 
                { this.state.isFetching ? <Loading/> : '' }
                { content }
                { this.props.userLogData.state == 'login' ? <Message {...this.props}/> : ''}
            </div>
        );
    }
    
}

export default Container({
    id: 'saleRecord',  //应用关联使用的redux
    component: Main //接收数据的组件入口
});
