import React, {Component, PropTypes} from 'react';
//import pureRender from 'pure-render-decorator';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import *as action from '../../Redux/Action/Index';


const Main = mySeting => {
	
    let seting = {
        id: '',
        url: '',
        data: {}, 
        component: <div></div>, 
    };

    for (let key in mySeting) {
        seting[key] = mySeting[key];
    }

    class Index extends Component {
        static defaultProps = { seting }

        constructor(props,context) {       	
            super(props,context);
        }

        render() {
            return (
            	<div className='template'>
            		<this.props.seting.component {...this.props} state={this.props.state.toJS()}/>
            	</div>
            )
        }
		
        componentDidMount() {//获取数据
            
        }

        componentWillReceiveProps(nextProps) {
        	
			//nextProps.userLogData.state = this.props.userLogData.state
        }

        shouldComponentUpdate(nextProps, nextState){
        	        	

            return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
        }
    }
	
	function mapStateToProps(state) {
	  	let { fetchData, topicDetialData, userLogData, topicData, postStateData } = state;
	  
        return { 
            state: fetchData,
            topicDetialData,
            userLogData,
            topicData,
            postStateData
        } 
	}
	
	function mapDispatchToProps(dispatch) {
	  	return {
	    	...bindActionCreators(action, dispatch)
	  	}
	}


    return connect(
    	mapStateToProps, 
    	mapDispatchToProps
    )(Index);
}


export default Main;