import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';

import {Tool} from '../Config/Tool';
import {template} from './common/mixin';

class Header extends Component {  //头部标题
	
	static defaultProps = {
    	'setProps':'Im a props set by defaultProps'
  	}
	
    constructor(props,context) {
        super(props,context);

        this.state = {
        	chooseTab:{ask:'selected',share:'',job:'',good:''}
        }
		
		this.switchTab = (tab) => {
			var origin = {ask:'',share:'',job:'',good:''}
			origin[tab] = 'selected'
			this.setState({
                chooseTab:origin
           	})
			
			var queryTab = {
		        page:1,
		        tab:tab
		    }
			
			
			this.props.fetchPosts('/api/v1/topics',queryTab)
			
		}
		
		
    }

	
	getInitialState(){
    	
    }
	componentWillMount(){
    	
    }

	componentDidMount(){
    	
    }
	
	getInitialState(){
    	
    }
	componentWillMount(){
    	
   	}
	componentDidMount(){
    	
    }
	
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentWillReceiveProps(){
    	console.log( this.props.state.isFetching )
    }
//	shouldComponentUpdate(){
//  	
//  }
	componentWillUpdate(){
    	
   	}
	componentDidUpdate(){
    	
    }
    
    render() {
    	//.bind(this,'name')
        return (
            <header className="head-list" >
            	<span onClick={this.switchTab.bind(this,'ask')} className={this.state.chooseTab.ask}>问答</span>
				<span onClick={this.switchTab.bind(this,'good')} className={this.state.chooseTab.good}>精华</span>
				<span className='logo'>CNode</span>
				<span onClick={this.switchTab.bind(this,'share')} className={this.state.chooseTab.share}>分享</span>
				<span onClick={this.switchTab.bind(this,'job')} className={this.state.chooseTab.job}>招聘</span>
            </header>
        );
    }
}

class List extends Component {

    render() {
        return (
            <ul className="home-ul">
                {
                    this.props.lists.map((item, index) => {
                        return <ListItem key={index} {...item} index={index}/>
                    })
                }
            </ul>
        );
    }
}

class ListItem extends Component{
	
	constructor(props, context){
		super(props, context);
		
		this.state = {}
		
		this.numberConver = (num) => {
			num = parseInt(num)
			if(num > 999){
				return parseInt(num/1000) + 'K'
			}else{
				return num
			}
		}
		
		
	}
	
	//avatar_url
	//loginname
	render(){
		
		let {author,author_id,content,create_at,good,id,last_reply_at,reply_count,tab,title,top,visit_count} = this.props
		
		var divStyle = {
		  	backgroundImage: 'url(' + author.avatar_url + ')',
		  	backgroundSize:'cover'
		};
		
		
		
		var countPercent = this.numberConver(reply_count) + '/' + this.numberConver(visit_count)
		
		return (
			
			<div className='home-item'>
			
				<div className='item-left'>
					<div className='item-avatar' style={divStyle}></div>
					
				</div>
				<div className='item-right'>
					<div className='item-title'>{title}</div>
					<div className='item-count'>{countPercent}</div>
				</div>
				
			</div>
			
		)
		
		
	}
	
}

class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        	data:[],
        	tab:'',
        	currentPage:1,
        	shouldUpdate:true
        }
        
    }

    componentWillMount() {
    
       
    }
    componentDidMount() {
        
    }
	
	componentWillReceiveProps(nextProps){
		
        let {data} = nextProps.state;

        if (data) {
            this.state.data = data.data||[];
          	this.state.currentPage = 1;
        }

    }
	
//  shouldComponentUpdate(nextProps, nextState) {
//     
//  }
    
    componentWillUpdate(nextProps,nextState){
    	

    }
   
    render() {
    	
    	if( this.state.data ){
    		
    	}
    	
        return (
        	
        	<div>
        		<Header {...this.props}/>
        		{
        			this.state.data.length > 0 ? <List lists = {this.state.data} /> : null
        		}
        	</div>
        	
        
        )
    }
    
    componentWillUnmount() {
       
    }
}

export default template({
    id: 'homePage',  
    component: Main,
    url: '/api/v1/topics',
    data: {
        page:1,
        tab:'ask'
    }
});

