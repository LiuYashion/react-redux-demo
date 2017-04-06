import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import {History, Link } from 'react-router';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';

import {Tool} from '../Config/Tool';
import {template} from './common/mixin';


class Main extends Component {

	static defaultProps = {
		default:"example"
	}

  	constructor(props, context) {
    	super(props, context);

  	}

  	componentWillMount() {
		let id = this.props.location.pathname.slice(7);
		console.log(id)
		
		let data = {

		}
		this.props.fetchPosts('/api/v1/topic/'+id,)

  	}
  	componentDidMount() {

  	}
	componentWillReceiveProps(nextProps){

 	}
  	componentWillUpdate(nextProps,nextState){


  	}
  	render() {
    	return (
    		<div>"topic-view"</div>
    	)
  	}
  	componentWillUnmount() {

  	}
}

export default template({
    id: 'topic',
    component: Main
});
