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
    }
	render() {

        return (
            <div className="topbar">              
				<div className="topbar-item">精华</div>
				<div className="topbar-item">分享</div>
				<div className="topbar-item">问答</div>
				<div className="topbar-item">招聘</div>
            </div>
        )
    }
}


class Lists extends Component{
	
	constructor(props, context) {
        super(props, context);
        
    }
	render() {
		let { data } = this.props.state.data;
		let lists;
		console.log(data)
		
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
            <div className="">              
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
		console.log(list)
		
		let avaterStyle = {
			'background':'url('+list.author.avatar_url+')',
			'backgroundSize':'contain'
		}
		
        return (
            <Link to={'/hhhhhhh'} className="list">              
				<div className="list-top">
					<div className="list-top-right">
						<div className="list-top-right-top">{ list.title }</div>
						<div className="list-top-right-bottom">
							{ list.author.loginname+' ' }
							{ '发布于'+this.simplifyTime(list.create_at) }
							<div></div>
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
    }

    componentWillMount() {
        
    }
    
    componentDidMount() {
        
    }
	
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillUpdate(nextProps,nextState){
        if (this.props !== nextProps) {
            let {data} = nextProps.state;
        }
    }
   	
   	componentWillReceiveProps(nextProps){

   	}
   	
    render() {
    	
    	let { state } = this.props
    	
    	let lists = state.data.data;

        return (
            <div className="container">              
                <HeadNav needHeadNav_ title='首页'/> 
                <TopBar />
                <div className="content_wrap">
                	{ state.isFetching ? <Loading/> : '' }
					{ state.isFetching ? '' : <Lists {...this.props} /> }
                </div>
            </div>
        )
    }
    
    componentWillUnmount() {
       
    }
}

export default Container({
    id: 'index',  //应用关联使用的redux
    component: Main,
    url: '/api/v1/topics'
});

