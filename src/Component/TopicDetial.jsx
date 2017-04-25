import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import {Tool} from '../Config/Tool';

import { HeadNav, Container } from './common/HeadNav';



class Main extends Component {
	


    constructor(props,context) {
        super(props,context);
        
    }
    componentWillReceiveProps(nextProps){
        

    }

    componentWillUpdate(nextProps, nextState) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    
    render() {
        
        return (
            <div>
               {'~~~~~~~~~~~~~~~~~~~'}
            </div>
        );
    }
}

export default Container({
    id: 'saleRecord',  //应用关联使用的redux
    component: Main //接收数据的组件入口
});
