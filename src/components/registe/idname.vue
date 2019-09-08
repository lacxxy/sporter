<template>
  <div id="idname">
    <p><span>填写昵称</span></p>
    <input type="textarea" id="setpassword" v-model="nameid">
    <input type="button" value="验证" id="validate" v-on:click="sendpassword">
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios'
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name:'idname',
  data(){
    return{
      nameid:''
    }
  },
  mounted(){
    this.myback();
  },
  methods:{
    sendpassword:function(){
      var $this=this;
      var url='/api/sport/save.php';
      axios({
        method: "post",
        url: url,
        data:{
          mailbox:$this.$route.params.mailbox,
          password1:$this.$route.params.password1,
          password2:$this.$route.params.password2,
          idname:$this.nameid,
        },
      })
      .then(function(response) {
        if(response.data==5){
          alert("注册成功");
          $this.$router.push({name:'login'});
        }
        else if(response.data==4){
          $this.$router.push({name:'login'});
          alert("用户名已存在");
        }
        else if(response.data==3){
          alert("密码不能为空");
        }
        else if(response==2){
          alert("密码不一致");
        }
        else if(response.data==1){
          alert("用户名不能为空");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }
}
</script>

<style scoped>
#idname{
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
#setpassword{
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
#validate{
  width: 100%;
  height: 50%;
  font-size:16px;
  background:rgb(248, 91, 91);
  color: white;
}
</style>
