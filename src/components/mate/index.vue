<template>
  <div id="index">
    <vue-drawer-layout ref="drawerLayout"  @mask-click="hid" :enable="this.$store.state.usermes">
      <div class ="drawer" slot ="drawer">
          <user v-bind:mail="mailbox" v-bind:judge="judge" ref="headimgf5" v-on:refreshbizlines="hid()"></user>
      </div>

      <div class="content" slot ="content">
         <div class="text">
            <div id="headbar">
              <img src="~@/pages/login/assets/menu.png" id="menu" @click="menu">
                <div id="headerbar_right">
                  <p>一键FIND</p>
                </div>
                <div class="mes" @click="gotomes"><span v-if="this.$store.state.mesnum!=0" @click="gotomes">+{{this.$store.state.mesnum}}</span></div>
            </div>
            <div id="search">
              <button @click="search()"><img src="@/pages/login/assets/search.png" id="searchimg"></button>
            </div>
            <div id="midbar">
              <router-link to="/mate" class="navigate">主页</router-link>
              <router-link to="/mating" class="navigate">匹配</router-link>
              <router-link to="/friend" class="navigate">好友</router-link>
              <router-link to="/news" class="navigate">资讯</router-link>
            </div>
            <transition name="fade">
              <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
          </div>
       </div>
    </vue-drawer-layout>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import user from "./user";
import mate from "./mate";
import Mui from "vue-awesome-mui";
import mating from "./mating";
Vue.use(Mui);
export default {
  components: {
    user,
    mate
  },
  name: "index",
  data() {
    return {
      websock:false,
      mailbox: this.$route.params.mailbox,
      judge: "none",
      mild: "gray",
      mild1: "gray",
      mild2: "gray",
      frdask:'',
    };
  },
  mounted() {
    this.closeback();
  },
  created(){
    var $this=this;
    this.$store.commit('initWebSocket');
    setTimeout(function(){
      $this.returnh();
    },1000);
  },
  methods: {
    menu: function() {
      this.$refs.drawerLayout.toggle();
    },
    hid:function(){
      this.$refs.drawerLayout.toggle(false);
    },
    returnh:function(){
      var subh = document.body.clientHeight;
      var x=parseFloat(subh);
      this.$store.commit('addh',x/14*1.1);
    },
    gotomes:function(){
      this.$router.push({
        name: "mes",
      });
    },
    search:function(){
      mui.toast("正在开发中..");
    }
  }
};
</script>

<style lang="scss" scoped>
#index {
  width: 100%;
  height: 100%;
  background-color: white;
}
.content{
  height: 100%;
  width: 100%;
}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
.text{
  width: 100%;
  height: 100%;
}
.drawer{
  width: 100%;
  height: 100%;
  z-index: -1
}
.navigate {
  width: 18%;
  text-align: center;
  text-decoration: none;
  color: gray;
  position: relative;
  p{
    width: 50%;
    display: inline-block;
  }
}
.router-link-active {
  width: 18%;
  text-align: center;
  text-decoration: none;
  color: black;
  font-weight: bolder;
}
#headbar {
  display: flex;
  width: 100%;
  height: 6%;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 153, 153);
  color: white;
  position: relative;
  z-index: 500;
}
.mes{
    width: 6%;
    height: 50%;
    position: absolute;
    right: 5%;
    background: url("~@/pages/login/assets/mes.png")no-repeat;
    background-size: 100%;
}
#menu {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 3%;
}
#headerbar_right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  a{
    width: 30%;
    display: flex;
    align-items: center;
    color:white;
    text-decoration: none;
    justify-content: center;
  }
  .index{
    font-weight: bold;
  }
}
p {
  display: flex;
  align-items: center;
  justify-content: center;
}
#letter {
  width: 7%;
  position: relative;
  left: 10%;
  top: 10%;
}
span{
    font-size: 25px;
    font:bold;
    position: absolute;
    right: 0;
    color: rgb(255, 255, 255);
}
#search {
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(247, 247, 247);
  z-index: 500;
	position: relative;
}
button {
  width: 90%;
  height: 65%;
  background-color: rgb(222, 222, 222);
  border-radius: 15px;
}
button:focus{
  outline: 0;
}
#searchimg {
  height: 60%;
  margin-left: 1%;
  float: left;
}
#midbar {
  height: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(236, 236, 236);
  z-index: 500;
	position: relative
}
</style>
