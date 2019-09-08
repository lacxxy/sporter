<template>
  <div id="password">
    <p>1.输入邮箱>2.填写验证码><span>3.设置密码</span></p>
    <input type="textarea" :placeholder="pl" id="setpassword" v-model="password">
    <input type="button" value="确定" id="validate" v-on:click="sendpassword">
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name: "password",
  data() {
    return {
      password: "",
      password1:"",
      password2:"",
      mid: 0,
      pl:"请输入密码"
    };
  },
  mounted(){
    this.myback();
  },
  methods: {
    sendpassword: function() {
      var $this = this;
      if (this.mid == 0) {
        $this.mid = 1;
        $this.password1=$this.password;
        $this.password="";
        $this.pl="再次输入密码"
      } else {
        $this.password2=$this.password;
        this.$router.push({name:'idname',params:{mailbox:$this.$route.params.mailbox,password1:$this.password1,password2:$this.password2}});
      }
    }
  }
};
</script>

<style scoped>
#password {
  width: 80%;
  height: 100px;
  text-align: center;
  position: absolute;
  bottom: 15%;
}
p {
  margin-bottom: 5%;
  font-size: 16px;
  color: white;
}
span {
  color: rgb(248, 91, 91);
}
#setpassword {
  width: 100%;
  height: 50%;
  margin-bottom: 5%;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
}
#setpassword::-webkit-input-placeholder {
  color: white;
}
#validate {
  width: 100%;
  height: 50%;
  font-size: 16px;
  background: rgb(248, 91, 91);
  color: white;
}
</style>
