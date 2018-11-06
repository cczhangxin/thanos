## 项目说明
### 命名规则
> - 组件命名、函数命名 -->`testTest`
> - id、class命名 -->  `test-test`
> - 文件夹命名 下划线 -->`test_test`
### 引用组件
- ##### vue-router,vuex,es6
- ##### element-ui 组件库
      http://element-cn.eleme.io/#/zh-CN
- ##### axios
      二次封装组件内直接调用
      this.$http.get('/api/test').then(response => {console.log(response)})
- ##### cssLess
      style开开始标签添加 lang="less"
      <style lang="less"></style>
- ##### jquery
      <script>
        import $ from 'jquery'
        $('.box').hide()
      <script/>
- ##### animate.css 动画
      必须使用animated这个class名，否则动画会无效
      <div class="animated bounceInDown">test</div>
- ##### font-awesome-4.7.0  图标
      <font-awesome-icon icon="user"/>
### 运行编译
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
