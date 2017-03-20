import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Tool } from '../../Config/Tool';
import template from './template';
export {template}

/**
 * 公共头部
 *
 * @export
 * @class Header
 * @extends {Component}
 */




export class Header extends Component {  //头部标题
    constructor(props,context) {
        super(props,context);
        this.state = {
        	chooseTab:{
        		ask:'selected',
        		share:'',
        		job:'',
        		good:''
        	}
        }
		
		this.switchTab = (tab) => {
			
			var origin = {ask:'',share:'',job:'',good:''}
			origin[tab] = 'selected'
			
			this.setState({
                chooseTab:origin
            })
			
			
		}
    }
	
	getInitialState(){
		
	}
	
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    componentDidMount() {//获取数据
        
    }
    
    componentWillUnmount(){
    	
    }
    
    render() {
    	//.bind(this,'name')
        return (
            <header className="head-list" >
            	<span onClick={this.switchTab.bind(this,'ask')} className={this.state.chooseTab.ask}>问答</span>
				<span onClick={this.switchTab.bind(this,'share')} className={this.state.chooseTab.share}>精华</span>
				<span className='logo'>CNode</span>
				<span onClick={this.switchTab.bind(this,'good')} className={this.state.chooseTab.good}>分享</span>
				<span onClick={this.switchTab.bind(this,'job')} className={this.state.chooseTab.job}>招聘</span>
            </header>
        );
    }
}

