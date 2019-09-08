<template>
  <div id="login">

  <div id="head">
    <input type="textarea" class="ip"  placeholder="邮箱" v-model="username">
    <input type="password" class="ip" placeholder="登录密码" v-model="userpassword">
    <div id="bt">
      <input type="button" class="login" value="登录" v-on:click="login()">
      <router-link to="/mailbox" class="sign" style="text-decoration:none"><input type="button" id="sign" value="注册"></router-link>
    </div>
  </div>


  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name: "login",
  data() {
    return {
      username: "",
      userpassword: ""
    };
  },
  mounted(){
    this.closeback();
  },
  created(){
    this.first();
  },
  methods: {
    first:function(){
      if(localStorage.mailbox){
        this.$router.push({name:'index',params:{mailbox:localStorage.mailbox}});
      }
    },
    login: function() {
      var $this=this;
      axios({
        method: "post",
        url: "/api/sport/verify.php",
        data:{
          username:$this.username,
          userpassword:$this.userpassword
        }
      })
      .then(function(response) {
        if(response.data==1){
          localStorage.mailbox=$this.username;
          $this.$router.push({name:'index',params:{mailbox:$this.username}});
        }
        else{
          alert("密码错误");
          //$this.$router.push({name:'mate'});
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
};
</script>

<style scoped>
#login {
  width: 80%;
  height: 170px;
  position: absolute;
  bottom: 20px;
}
#head {
  display: flex;
  flex-direction: column;
  height: 100%;
}
#bt,
#cut {
  display: flex;
  justify-content: center;
}
#bt {
  height: 50%;
}
input {
  height: 50%;
}
.ip {
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 20px;
}
input::-webkit-input-placeholder {
  color: white;
  font-size: 15px;
}
.login,
.sign {
  width: 160px;
  height: 80%;
  margin-top: 4px;
  background: rgb(248, 91, 91);
  color: white;
  font-size: 15px;
}
#sign{
  height: 100%;
  width: 100%;
  list-style:none;
  background: rgb(248, 91, 91);
  color: white;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login,
.sign:focus {
  outline: 0;
}
.login {
  margin-right: 29px;
  margin-bottom: 5px;
}
hr {
  width: 35%;
  height: 1px;
  border: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#cut {
  display: flex;
  align-items: center;
  height: 10%;
}
p {
  color: rgba(255, 255, 255, 0.7);
}
#out {
  display: flex;
  justify-content: center;
  height: 20%;
}
img {
  width: 38px;
  height: 38px;
  margin-left: 45px;
  margin-right: 45px;
}
</style>
