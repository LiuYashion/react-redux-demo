






 * 1.	this.props.list.map((item, index) => {return...})
 * 2.	is(a,b):比较a,b是否相等; 
 * 3.	fromJS(a):obj->map,arr->list;数据转换
 * 4.	<span onClick={this.deleleOrder}>删除</span>
 * 5.	<header>创建时间：{created_at}{context}</header>
 * 6.	<span style={{marginRight:'0.875rem'}}>{customers_name}</span>
 * 
 * 1.	this.setState({saleMoney:value})
 * 2.	JSON.stringify(object) 对象json化
 * 3.	<input type="text" maxLength='11' value={this.state.saleMoney} placeholder='请输入订单金额' onChange={this.changeValue.bind(this,'money')}/>
 * 4.	<Link to={'/chooseProducts'} className={products.length > 0 ? 'showIcon':'link_choose'}>{'请选择销售的产品'}</Link>
 * 5.	this.props.location.query;  //{dopa: "19", uzi: "abc"}
 * 6.	this.props.location.search	//?dopa=19&uzi=abc

 * 1.	<div ref='Container'></div> 加载后通过this.refs.Container可以访问到真实dom
 * 2.	<div className={`chooseItem_left ${this.state.chooseState == true ? 'choosed':''}`} 字符串模板
 * 3.	requestAnimationFrame来发起动画,cancelAnimationFrame来取消动画





























