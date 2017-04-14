import React, {Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import *as action from '../../Redux/Action/Index';


const Main = mySeting => {
	
    let seting = {
        id: '', //应用唯一id表示
        url: '', //请求地址
        data: {}, //发送给服务器的数据
        component: <div></div>, //数据回调给的组件
    };

    for (let key in mySeting) {
        seting[key] = mySeting[key];
    }
	

    class Template extends Component {
        static defaultProps = { seting }

        constructor(props,context) {
            super(props,context);
            
            /**
             * {获取url}
             * 跟随组件url后面的参数
             * 会被存储在this.props.params
             */
            this.getUrl = () => {
		        var {url} = this.props.seting;
		        if(typeof url === 'function') {
		            return url(this.props, this.state);
		        }else if(url && typeof url === 'string') {
		            return url;
		        }else{
		            return this.props.location.pathname;
		        }
		    }
            
            if( this.props.seting.url ){
		        this.props.fetchPosts(this.getUrl(), this.props.seting.data);
		    }
        }

        render() {
            return <this.props.seting.component {...this.props} state={this.props.state.toJS()}/>;
        }

        componentDidMount() {//获取数据

        }

        componentWillReceiveProps(nextProps) {

        }

        shouldComponentUpdate(nextProps, nextState) {
            if (nextProps.state.get('isFetching')) {
                return false
            }
            return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
        }
    }


    /**
     * 此处的template.js结合了:
     *
     * mapStateToProps(state):  传入不同的reducer(reducer.jsx)
     * reducer包含:
     *    fetchData
     *    requestData
     *    testData
     *    producRecord
     *    saleRecord
     * reducer内部匹配type,再计算state并返回
     *
     * mapDispatchToprops:  注入action(action/index.jsx)
     * action包含:
     *    fetchPosts
     *    getData
     *    recordState
     *    saveProductlist
     *    newProductData
     *    deleteItem
     *    testAction
     * action会被自动放入this.props中
     * 其中没有计算代码,只用于分发type,去匹配reducer
     *
     * 在组件中使用:
     * 1.直接调用this.props.fetchPosts(...)
     * 2.return一个包含type的对象
     * 3.根据type匹配reducer,返回新的state
     * 4.state改变,之后的都会改变
     *
     * 将{Template}与{action}绑定后return回去，配置路由的时候用的就是和redux绑定的组件
     * 所以其实每个路由匹配的都是同一个组件，只不过这个组件的内容不同
     */

    return connect(state => {
        let {producRecord, saleRecord,requestData, testData} = state;
        
        return {
            state: state['fetchData'],
            producRecord,
            saleRecord,
            requestData,
        }
    }, action)(Template);



}



export default Main;
