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
            if (this.props.seting.url) {
                this.props.fetchPosts(this.props.seting.url,this.props.seting.data);
            }
        }

        componentWillReceiveProps(nextProps) {
            
        }

        shouldComponentUpdate(nextProps, nextState){
//          if (nextProps.state.get('isFetching')) {
//              return false
//          }
            return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
        }
    }
	
	function mapStateToProps(state) {
	  	let {fetchData, topicDetialData } = state;
	  
        return { 
            state: fetchData,
            topicDetialData
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