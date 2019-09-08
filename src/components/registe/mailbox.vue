<template>
  <div id="mailbox">
    <p><span>1.输入邮箱</span>>2.填写验证码>3.设置密码</p>
    <input type="textarea" placeholder="请输入您的邮箱" id="mail" v-model="mail">
    <input type="button" value="验证" id="validate" v-on:click="sendmail">
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name:'mailbox',
  data(){
    return{
      mail:'',
    }
  },
  mounted(){
    this.myback();
  },
  methods:{
    sendmail:function(){
      var $this=this;
      var url='/api/sport/email/123.php';
      axios({
        method: "post",
        url: url,
        data:{
          address:$this.mail
        },
      })
      .then(function(response) {
        $this.$router.push({name:'indentify',params:{code:response.data,mailbox:$this.mail}})
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
#mailbox{
  width: 80%;
  height: 100px;
  text-align: center;
  position: absolute;
  bottom:15%;
}
p{
  margin-bottom: 5%;
  font-size: 16px;
  color: white;
}
span{
  color:rgb(248, 91, 91);
}
#mail{
  width: 100%;
  height: 50%;
  margin-bottom: 5%;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
}
#mail::-webkit-input-placeholder {
  color: white;
}
#validate{
  width: 100%;
  height: 50%;
  font-size:16px;
  background:rgb(248, 91, 91);
  color: white;
}
</style>
