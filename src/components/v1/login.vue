<template>
  <div class="login" @keyup.enter="login">
    <dl class="login-box">
      <dt>
        <h3>设备监控系统管理台</h3>
      </dt>
      <dd class="user_icon">
        <el-input v-model="userName" placeholder="用户名" clearable>
          <i slot="prefix" class="el-input__icon fa fa-user"></i>
        </el-input>
      </dd>
      <dd class="pwd_icon">
        <el-input v-model="userPwd" placeholder="密码" type="password" clearable>
          <i slot="prefix" class="el-input__icon fa fa-key"></i>
        </el-input>
      </dd>
      <dd class="val_icon">
        <div class="checkcode">
          <el-input v-model="inputCode" class="inputCode" placeholder="验证码" maxlength="4" clearable></el-input>
          <canvas id="CodeCanvas" @click="createCode()"></canvas>
        </div>
      </dd>
      <dd>
        <button type="button" class="submitBtn" :disabled="loading" @click="login()">
          <i :class="{'el-icon-loading':loading}"></i>
          {{loading?'登录中...':'登 录'}}
        </button>
      </dd>
      <dd>
        <!--<p>Copyright © {{now_year}} by:张新 </p>-->
      </dd>
    </dl>
  </div>
</template>
<script>
  import $ from 'jquery'
  // import particleground from '../../../static/js/Particleground'

  export default {
    data() {
      return {
        loading: false,
        userName: '',
        userPwd: '',
        inputCode: '',
        code: ''
      }
    },
    components: {},
    props: [],
    computed: {
      now_year() {
        let today = new Date()
        return today.getFullYear()
      }
    },
    created() {
      this.checkIsLogin()
    },
    mounted() {
      this.createCode();
    },
    methods: {
      showCheck(a) {
        let c = document.getElementById("CodeCanvas");
        let ctx = c.getContext("2d");
        ctx.fillStyle = "#BCBCBC";
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.font = "80px 'Microsoft Yahei'";
        ctx.fillText(a, 0, 100);
      },
      createCode() {
        // $('.login').particleground({
        //   dotColor: '#999999',
        //   lineColor: '#999999'
        // });
        this.code = "";
        let codeLength = 4;
        let selectChar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (let i = 0; i < codeLength; i++) {
          let charIndex = Math.floor(Math.random() * 60);
          this.code += selectChar[charIndex];
        }
        if (this.code.length !== codeLength) {
          this.createCode();
        }
        this.showCheck(this.code);
      },
      login() {
        this.loading = true
        setTimeout(() => {
          document.cookie = 'user=admin'
          this.$router.push({
            path: '/monitorPage'
          });
        }, 2000)
        // if (this.userName !== 'admin') {
        //   this.hint = '用户名不正确'
        //   return false
        // }
        // if (this.userPwd !== 'admin') {
        //   this.hint = '密码不正确'
        //   return false
        // }
        // if (this.inputCode.toLowerCase() !== this.code.toLowerCase()) {
        //   this.hint = '验证码不正确'
        //   return false
        // }
      },
      checkIsLogin() {
        if (this.getCookie('user')) {
          this.$router.push({
            path: '/monitorPage'
          });
        }
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- Add lang="less" use css less -->
<style scoped lang="less">
  ::-webkit-input-placeholder {
    color: #fff;
  }

  :-moz-placeholder {
    color: #fff;
  }

  ::-moz-placeholder {
    color: #fff;
  }

  :-ms-input-placeholder {
    color: #fff;
  }

  .login {
    position: fixed;
    height: 100%;
    width: 100%;
    color: #eaeaea;
    background-color: #009999;
    .login-box {
      position: absolute;
      top: 15%;
      left: 0;
      bottom: 0;
      right: 0;
      height: 300px;
      width: 300px;
      margin: 0 auto;
      padding: 50px;
      background: #fff;
      box-shadow: 0 0 10px 4px #066f6f;
      border-radius: 8px;
      h3{
        color: #009999;
        font-weight: bold;
        font-size: 22px;
        margin-bottom: 30px;
      }
      dt {
        text-align: center;
        margin-bottom: 20px;
      }
      dd {
        margin-bottom: 20px;
      }
      input, .submitBtn {
        font-size: 14px;
        height: 42px;
        line-height: 26px;
        text-indent: 2em;
        border: none;
        width: 100%;
        border-radius: 4px;
        background: #009999;
        color: #fff;
      }
      .submitBtn {
        text-indent: 0;
      }
      input:focus {
        outline: none;
      }
      #CodeCanvas {
        width: 80px;
        height: 44px;
        padding-left: 20px;
        float: right;
        z-index: 0;
        background: #fff;
      }
      .inputCode {
        width: 194px;
        vertical-align: top;
      }
    }
  }

</style>
