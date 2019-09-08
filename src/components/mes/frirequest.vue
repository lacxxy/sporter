<template>
  <div id="friquest">
    <div id="headbar">
       <div id="back" @click="back()"></div>
       <p>新的朋友</p>
    </div>
    <div class="fri" v-for="(request,index) in $store.state.frirequest">
        <div class="left">
          <img v-bind:src="request.pic">
          <p class="name">{{request.name}}</p>
          <span>对方请求添加你为朋友</span>
        </div>
        <button class="agree" @click="agree(request.friend_mail)">同意</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name:'frirequest',
  data(){
    return{

    }
  },
  mounted() {
    this.$store.commit('revrsefalse');
    this.myback();
  },
  methods:{
    agree:function(x){
      this.$store.state.websock.send("type=add_friend&friendmail="+x+"&accept=1");
    },
    back: function() {
      var $this=this;
      history.go(-1);
    },
  }
}
</script>

<style lang="scss" scoped>
#friquest{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0px;
  z-index: 1000;
  background: rgb(245, 245, 245);
}
#back {
  width: 5vh;
  height: 5vh;
  background-size: 100%;
  position: absolute;
  left: 3%;
  background: url("~@/pages/login/assets/back.png");
  background-size: 100%;
}
#headbar {
  width: 100%;
  height: 6vh;
  background-color: rgb(255, 153, 153);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5vh;
}
.fri{
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #c7c7c7;
    border-bottom: 1px solid #c7c7c7;
    margin-bottom: 1px;
    position: relative;
    height: 8vh;
    .left{
      width:100%;
      height: 100%;
      position: relative;
      img{
        width: 6vh;
        height: 6vh;
        border-radius: 50%;
        position: relative;
        top: 1vh;
      }
      .name{
        display: inline;
        position: absolute;
        font-size: 3vh;
        left:7vh;
      }
      span{
        font-size: 2vh;
        position: absolute;
        bottom:1vh;
        left:7vh;
      }
    }
    button{
        position: absolute;
        top:15%;
        height: 70%;
        width: 20%;
        right: 5%;
        border-radius: 10%;
        background-color: rgb(29, 226, 29);
        color: white;
    }
}
</style>
