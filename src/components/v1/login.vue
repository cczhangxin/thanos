<template>
  <div class="login">
    <dl class="login-box">
      <dt>
        <strong>xxxxxxxxx</strong>
        <br>
        <em>Management System</em>
      </dt>
      <dd class="user_icon">
        <input type="text" placeholder="账号" v-model="user_name"/>
      </dd>
      <dd class="pwd_icon">
        <input type="password" placeholder="密码" v-model="user_password"/>
      </dd>
      <dd class="val_icon">
        <div class="checkcode">
          <input type="text" id="input_code" placeholder="验证码" maxlength="4" v-model="input_code"/>
          <canvas id="CodeCanvas" @click="createCode()"></canvas>
        </div>
      </dd>
      <dd>
        <input type="button" value="立即登陆" class="submit_btn" @click="login()"/>
      </dd>
      <dd>
        <p>© 2017-{{now_year}} 版权所有</p>
        <p>xxxxxxxxxxx</p>
      </dd>
    </dl>
  </div>
</template>
<script>
  import {particleground} from '../../../static/js/Particleground'

  export default {
    data() {
      return {
        user_name:'',
        user_password:'',
        input_code:'',
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
    mounted() {
      this.createCode();
      $('.login').particleground({
        dotColor: '#5cbdaa',
        lineColor: '#5cbdaa'
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
      login(){
        console.log(this.user_name)
        console.log(this.user_password)
        console.log(this.input_code)
        console.log(this.code)
        this.$store.state.auth.is_login=true
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
    background-color: #16a085;
  }

  .login-box {
    position: absolute;
    top: 25%;
    left: 0;
    bottom: 0;
    right: 0;
    height: 400px;
    width: 400px;
    margin: 0 auto;
    padding: 50px;
    box-shadow: 0 -15px 30px #0d957a;
    border-radius: 5px;
  }

  input {
    font-size: 14px;
    height: 42px;
    line-height: 26px;
    padding: 8px 5%;
    width: 300px;
    text-indent: 2em;
    border: none;
    background-color: #5cbdaa;
    color: #fff;
  }

  #CodeCanvas {
    width: 85px;
    height: 42px;
    padding-left: 20px;
    float: right;
    z-index: 0;
    background: #5cbdaa;
  }

  .login dt {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: #45bda6;
    text-shadow: 0 0 1px #0e947a;
    margin-bottom: 15px;
  }

  #input_code {
    width: 210px;
    vertical-align: top;
  }

  dd p {
    text-align: center;
    padding: 0;
    margin: 0;
    color: #45bda6;
  }

  .submit_btn {
    background: #048f74;
    cursor: pointer;
  }

  .submit_btn:hover {
    background: #02866c;
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