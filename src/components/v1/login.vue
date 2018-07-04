<template>
  <div class="login" v-loading="loading" element-loading-text="检查登录状态" element-loading-background="rgba(0, 0, 0, 0.7)" @keyup.enter="login">
    <dl class="login-box">
      <dt>
        <p>账号密码admin</p>
        <em>Management System</em>
      </dt>
      <dd class="user_icon">
        <input type="text" placeholder="用户名" v-model="userName"/>
      </dd>
      <dd class="pwd_icon">
        <input type="password" placeholder="密码" v-model="userPwd"/>
      </dd>
      <dd class="val_icon">
        <div class="checkcode">
          <input type="text" id="inputCode" placeholder="验证码" maxlength="4" v-model="inputCode"/>
          <canvas id="CodeCanvas" @click="createCode()"></canvas>
        </div>
      </dd>
      <dd>
        <input type="button" value="立即登陆" class="submit_btn" @click="login()"/>
      </dd>
      <dd>
        <p>Copyright © {{now_year}} by:张新 </p>
        <p class="text-danger text-left">{{ hint }}</p>
      </dd>
    </dl>
  </div>
</template>
<script>
  import $ from 'jquery'
  import particleground from '../../../static/js/Particleground'
  export default {
    data() {
      return {
        loading: false,//检查登陆状态动画
        userName: '',
        userPwd: '',
        inputCode: '',
        code: '',
        hint: ''
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
    mounted() {
      this.createCode();
      $('.login').particleground({
        dotColor: '#e4e4e4',
        lineColor: '#e4e4e4'
      });
    },
    methods: {
      showCheck(a) {
        let c = document.getElementById("CodeCanvas");
        let ctx = c.getContext("2d");
        ctx.fillStyle = "#fff";
        ctx.clearRect(0, 0, 1000, 1000);
        ctx.font = "80px 'Microsoft Yahei'";
        ctx.fillText(a, 0, 100);
      },
      createCode() {
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
        if (this.userName !== 'admin') {
          this.hint = '用户名不正确'
          return false
        }
        if (this.userPwd !== 'admin') {
          this.hint = '密码不正确'
          return false
        }
        if (this.inputCode.toLowerCase() !== this.code.toLowerCase()) {
          this.hint = '验证码不正确'
          return false
        }
        this.hint = ''
        this.$store.commit('login')
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgb(64, 158, 255);
  }

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
    box-shadow: 0 -10px 16px 3px #317fce;
    border-radius: 5px;
  }

  input {
    font-size: 14px;
    height: 42px;
    line-height: 26px;
    text-indent: 2em;
    border: none;
    width: 100%;
    background-color: #318eed;
    color: #fff;
  }

  input:focus
  {
    outline: none;
    background: #2a84df;
  }

  #CodeCanvas {
    width: 85px;
    height: 42px;
    padding-left: 20px;
    float: right;
    z-index: 0;
    background: #318eed;
  }

  .login dt {
    font-size: 20px;
    text-align: center;
    color: #107ae7;
    margin-bottom: 15px;
  }

  #inputCode {
    width: 194px;
    vertical-align: top;
  }

  dd {
    margin-bottom: 5px;
  }

  dd p {
    text-align: center;
    padding: 0;
    margin: 0;
    color: #107ae7;
  }

  .submit_btn {
    background: #287dd5;
    cursor: pointer;
    text-indent: 0;
  }

  .submit_btn:hover {
    background: #1774d3;
  }

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
</style>
