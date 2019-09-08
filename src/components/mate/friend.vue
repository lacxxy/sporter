<template>
  <div id="friend">
    <scroller height="100%" :on-refresh="refresh" ref="scro">
        <div class="myfriend" v-bind:style="{height:$store.state.h+'px'}" @click="show_frirequest()">
          <img src="@/pages/login/assets/newfriend.png" v-bind:style="{height:$store.state.h*0.9+'px',width:$store.state.h*0.9+'px'}" class="headimg">
          <p class="name">新的好友</p>
        </div>
        <div class="myfriend" v-for="(f,index) in $store.state.friend" v-bind:style="{height:$store.state.h+'px'}" @click="beginchat(index)">
          <!--vue-drawer-layout ref="drawerLayout" :reverse="true" :backdrop="false" :content-drawable="true" :drawer-width="wid*0.3"-->
            <div class="content" slot ="content" height="40px">
              <div>
                <img :src="f.pic" v-bind:style="{height:$store.state.h*0.9+'px',width:$store.state.h*0.9+'px'}" class="headimg">
                <p class="name">{{f.name}}</p>
              </div>
            </div>
          <!--div class ="drawer" slot ="drawer"-->
            <!--p class="deletefri" v-bind:style="{height:imgh+'px'}">删除</p-->
          <!--/div-->
          <!--/vue-drawer-layout-->
        </div>
        </scroller>
    </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios'
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name:'friend',
  data(){
    return{
      imgh:'',
      wid:'',
    }
  },
  mounted(){
    this.$store.commit('revrsetrue');
    this.closeback();
  },
  created(){
    if(this.$store.state.friend.length==0){
      this.revfriend();
    }
    this.returnh();
  },
  methods:{
    revfriend:function(){
      var $this = this;
      axios({
        method: "post",
        url: "/api/sport/friend/get_friend.php",
        data: {
          mailbox: localStorage.mailbox
        }
      })
        .then(function(response) {
          $this.$store.commit('clearfriend');
          var i=0;
          while(response.data[i]){
            $this.$store.commit('addfriend',response.data[i]);
            i++;
          }
        })
    },
    returnh: function() {
      var subh = document.body.clientHeight;
      var x = parseFloat(subh);
      this.imgh = x / 14;
      this.wid=document.body.clientWidth;
      this.imgw = this.imgh * 0.9;
    },
    beginchat: function(index) {
      var $this=this;
      setTimeout(() => {
        $this.$router.push({name:'detail',params:{mailbox:$this.$store.state.friend[index].mailbox}})
      }, 100);
    },
    back: function() {
      history.go(-1);
    },
    refresh:function(){
      this.timeout = setTimeout(() => {
        this.$refs.scro.finishPullToRefresh();
      }, 1000);
      this.revfriend();
    },
    show_frirequest:function(){
      setTimeout(() => {
        this.$router.push({
        name: "frirequest",
      });
        }, 100);
    }
  }
}
</script>

<style lang="scss" scoped>
#friend {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
  position: relative;
}
#whole{
  width: 100%;
  height:100%;
  position: relative;
}
.myfriend {
  background-color: #fff;
  border-top: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  margin-bottom: 1px;
  display: block;
  position: relative;
  div{
    position: relative;
    height: inherit;
  }
}
.myfriend:active {
  background: rgba(163, 249, 255, 0.2);
}
.drawer-layout{
  width: 100%;
  height: 100%;
}
.content{
  width: 100%;
  height: 100%;
}
.drawer{
  width: 100%;
  height: 100%;
  p{
    width: 100%;
  }
  .deletefri{
    background-color: rgb(255, 153, 153);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}
.headimg {
  float: left;
  height: 90%;
  border-radius: 50%;
  position: relative;
  top: 5%;
  left:1%;
}
.name {
  display: inline-block;
  margin-left: 2%;
  position: relative;
  top: 10%;
  font-size: 16px;
}

</style>
