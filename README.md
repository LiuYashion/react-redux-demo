# React & Redux #
这里完成了一个react版本的demo, react用法已经十分普遍， 网上教程也很多, 故这里侧重记录的是redux.
</br>
### 启动
```
  npm install / cnpm install
  npm install webpack -g
  npm run start
  然后打开localhot:8008
```

</br>
### 梗概
主题页
</br>
![pic02](https://github.com/LiuYashion/myCache/blob/master/react_redux/topics.png)
</br>
登陆页
</br>
![pic01](https://github.com/LiuYashion/myCache/blob/master/react_redux/login.png)
</br>
发布页
</br>
![pic03](https://github.com/LiuYashion/myCache/blob/master/react_redux/post.png)


</br>
### redux状态的管理
这里推荐使用redux-devtools. 当redux项目复杂起来, 状态会变得难于管理, 尤其是有reducer的关联. 工具能记录每一次触发的action和改变的reducer, 视图也有树形和图表
![pic02](https://github.com/LiuYashion/myCache/blob/master/react_redux/redux01.png)


</br>
### react组件管理
react尽管只是一个UI框架, 但其state控制着视图的状态, 也能达到相当高的复杂度, React Developer Tools可以方便你查看react组件的props和state
![pic02](https://github.com/LiuYashion/myCache/blob/master/react_redux/redux02.png)


</br>
### 组件的生命周期
1.~~getDefaultProps()~~
</br>
```
class Main extends Component {
  ...
}
Main.defaultProps = {name : "auto"}
设置默认的props
```

2.getInitialState()
</br>
```
用于定义第一次render时的state, 可直接在constructor中定义this.state。此时可以访问this.props
```

3.componentWillMount()
</br>
```
组件即将加载时调用, 之后的组件更新不再调用，整个生命周期只调用一次，此时可以修改state。
```

4.render()
</br>
```
react最重要的步骤，创建虚拟dom，进行*diff* 算法，更新dom树都在此进行。此时就不能更改state了。
```

5.componentDidMount()
</br>
```
组件已经加载，可以通过this.getDOMNode()获取和操作dom节点，只调用一次。在更新时也会触发5个钩子函数：
```

6.componentWillReceivePorps(nextProps)
</br>
```
组件即将接收新props, 组件初始化时不调用，组件接受新的props时调用。
```

7.shouldComponentUpdate(nextProps, nextState)
</br>
```
优化性能时会需要使用的生命周期, 接收两个参数. 开发者在这里进行比较判断
return false为阻止更新. 调用this.forceUpdate会跳过此步骤
```

8.componentWillUpdata(nextProps, nextState)
</br>
```
组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
```

9.componentDidUpdate()
</br>
```
组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点
```

10.componentWillUnmount()
</br>
```
组件将要卸载时调用，一些事件监听和定时器需要在此时清除
```

</br>
### tips
* 组件首字母大写
* 向下传递props, child={ parent }, 子组件中获取为 this.props.child, 内容为parent
* 当父组件某个状态需要由子组件来控制, 可以在父组件中定义一个方法, 在里面setState. 然后如上传入子组件即可
