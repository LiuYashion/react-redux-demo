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
        }

        render() {
            return <this.props.seting.component {...this.props} state={this.props.state.toJS()}/>;
        }

        componentDidMount() {//获取数据
            if (this.props.seting.url) {
                this.props.fetchPosts(this.props.seting.url,this.props.seting.data);
            }
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
     * [state description]
     * children:null
     * deleteItem:()
     * fetchPosts:()
     * getData:()
     * history:Object
     * location:Object
     * newProductData:()
     * params:Object
     * producRecord:Object
     * recordState:()
     * requestData:Object
     * route:Object
     * routeParams:Object
     * routes:Array[2]
     * saleRecord:Map
     * saveProductlist:()
     * seting:Object
     * state:Object
     * testAction:()
     * 组合之后,template里的{this.props}
     */

    /**
     * 将{Template}与{action}绑定后return回去，配置路由的时候用的就是和redux绑定的组件
     * 所以其实每个路由匹配的都是同一个组件，只不过这个组件的内容不同
     */

    return connect(state => {
        let {producRecord, saleRecord,requestData, testData} = state;
        return {
            state: state['fetchData'],
            producRecord ,
            saleRecord ,
            requestData ,
        }
    }, action)(Template);



}



export default Main;
