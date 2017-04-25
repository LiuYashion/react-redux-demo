import React, {Component, PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import pureRender from 'pure-render-decorator';
import { is, fromJS} from 'immutable';
import { Tool } from '../../Config/Tool';
import Container from './Container';
export { Container }

export class HeadNav extends Component {  //头部标题
    constructor(props,context) {
        super(props,context);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    render() {
        let { needHeadNav, title } = this.props;
       	
       	if(needHeadNav){
			needHeadNav = (				
				<header className="head-list">
	                <div className='head_menu icon_left' onClick={ ()=>window.history.back() }></div>
	                { title&&<span className='head_title'>{title}</span> }
	            </header>           
           )
		}else{
			needHeadNav = (				
				<header></header>           
            )
		}
       	
        return (
        	<div>{ needHeadNav }</div>
        )
    }
}


