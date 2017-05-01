import React, {Component, PropTypes} from 'react';

import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
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

class TopBar extends Component{
	
	constructor(props, context) {
        super(props, context);
        this.state = {
        	good:'selected',
			share:'',
			ask:'',
			job:''
        }
        
        let that = this
        this.tabBar = (index) => {
        	
        	this.setState({
        		good:'',
				share:'',
				ask:'',
				job:'',
        		[index]:'selected'
        	})
        	that.props.fetchPosts('/api/v1/topics', {
        		tab:index
        	})

        }

    }
	render() {
		let style = {
			
		}
        return (
            <div className="topbar">              
				<div onClick={ this.tabBar.bind(this,'good')  } className={"topbar-item "+this.state.good }>精华</div>
				<div onClick={ this.tabBar.bind(this,'share') } className={"topbar-item "+this.state.share}>分享</div>
				<div onClick={ this.tabBar.bind(this,'ask')   } className={"topbar-item "+this.state.ask  }>问答</div>
				<div onClick={ this.tabBar.bind(this,'job')   } className={"topbar-item "+this.state.job  }>招聘</div>
            </div>
        )
    }
}


class Lists extends Component{
	
	constructor(props, context) {
        super(props, context);
        
    }
	componentWillReceiveProps(nextProps){

   	}
	render() {
		
		let { data } = this.props.state.data;
		let lists;
		
		if(data){
			lists = (
				data.map(
	      			list => <List key={list.id} list={list}/>
	      		)
			)
		}else{
			lists = ''
		}

        return (
            <div className='holeLists' id='holeLists'>              
				{ lists }
            </div>
        )
        
    }
}
class List extends Component{
	
	constructor(props, context) {
        super(props, context);
        
        this.simplifyTime = (timestamp) => {
        	let dateTime = new Date(timestamp);
        	let nowTime  = new Date();
        	
        	let year   = nowTime.getFullYear()
        	let year_  = dateTime.getFullYear()
        	let month_ = dateTime.getMonth()+1
        	let day_   = dateTime.getDate()
        	
        	if(year!=year_){
        		return year_+'年'+month_+'月'+day_+'日'
        	}else{
        		return month_+'月'+day_+'日'
        	}
        	
        }
    }
	render() {
		
		let { list } = this.props
		
		let avaterStyle = {
			'background':'url('+list.author.avatar_url+')',
			'backgroundSize':'contain'
		}
		
        return (
            <Link to={'/TopicDetial?id='+list.id} className="list">              
				<div className="list-top">
					<div className="list-top-right">
						<div className="list-top-right-top">{ list.title }</div>
						<div className="list-top-right-bottom">
							{ list.author.loginname+' ' }
							{ '发布于'+this.simplifyTime(list.create_at) }
						<div>
						</div>
						</div>
					</div>
					<div className="list-top-left" style={ avaterStyle }></div>
				</div>
				<div className="list-bottom">
					<div className="list-count">
						<span>{list.visit_count}</span>
						{'次访问'}
					</div>
					<div className="list-count">
						<span>{list.reply_count}</span>
						{'条回复'}
					</div>
					<div className="list-count-right">{ '最近回复'+this.simplifyTime(list.last_reply_at) }</div>
				</div>
            </Link>
        )
    }
}


class Main extends Component {
	
	
	
    constructor(props, context) {
        super(props, context);

        this.state = {
        	lists:{}
        }
    }

    componentWillMount() {
        
    }
    

    componentDidMount() {
        if (this.props.seting.url) {
            this.props.fetchPosts(this.props.seting.url,this.props.seting.data);
        }
    }
	
    shouldComponentUpdate(nextProps, nextState) {
    	
        let stringJson = window.sessionStorage.getItem(this.props.location.key);
        
        
        if( JSON.parse(stringJson) && !JSON.parse(stringJson).needRefresh ){
			
			let clientTop  = JSON.parse(window.sessionStorage.getItem(this.props.location.key)).clientToTop
			
        	document.getElementById("content_wrap").scrollTop = clientTop;
			
    		let data = {
	        	'needRefresh':true
	        };
	        window.sessionStorage.setItem(this.props.location.key, JSON.stringify(data));
       		return false

        }
        
    	return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){

        if (this.props !== nextProps) {
            let {data} = nextProps.state;
        }
        
    }
   	
   	componentWillReceiveProps(nextProps){
   		nextProps.userLogData.state = this.props.userLogData.state
   		if(this.props.userLogData.data){
   			nextProps.userLogData.data = this.props.userLogData.data
   		}
   	}
   	
    render() {
    	
    	console.log(this.props)
    	
    	let { state, userLogData } = this.props
    	
        return (
            <div className="container">              
                <HeadNav needHeadNav_ title='首页'/> 
                <TopBar {...this.props}/>
                <div className="content_wrap" id='content_wrap'>
                	<div className='float-bar'>
                		{ userLogData.state == 'login' ? <Link to={'/PostTopic'} className='bar-post'></Link> : <Link to={'/UserLogin'} className='bar-login'></Link> }
                		
                	</div>
                	{ state.isFetching ? <Loading/> : '' }
					{ state.isFetching ? '' : <Lists ref="Lists" {...this.props} /> }
                </div>
            </div>
        )
    }
    
 
    
    componentWillUnmount() {
        
        let data = {
        	needRefresh:false,
        	clientToTop: document.getElementById("content_wrap").scrollTop
        };
        window.sessionStorage.setItem(this.props.location.key, JSON.stringify(data));
        
    }
}
Main.defaultProps = {
	name : "auto"
}


export default Container({
    id: 'index',  //应用关联使用的redux
    component: Main,
    url: '/api/v1/topics'
});

