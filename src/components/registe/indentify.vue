<template>
  <div id="indentify">
    <p>1.输入邮箱><span>2.填写验证码</span>>3.设置密码</p>
    <input type="textarea" placeholder="请输入您的的验证码" id="code" v-model="code">
    <input type="button" value="验证" id="validate" v-on:click="exam">
  </div>
</template>

<script>
import Vue from "vue";
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name:'indentify',
  data(){
    return{
      code:''
    }
  },
  mounted(){
    this.myback();
  },
  methods:{
    exam:function(){
      if(this.code==this.$route.params.code){
        this.$router.push({name:'password',params:{mailbox:this.$route.params.mailbox}})
      }
      else{
        alert("验证码错误");
      }
    }
  }
}
</script>

<style scoped>
#indentify{
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
#code{
  width: 100%;
  height: 50%;
  margin-bottom: 5%;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.3);
  color: white;
}
#code::-webkit-input-placeholder {
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
