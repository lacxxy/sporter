<template>
  <div id="mes">
    <div id="headbar">
       <div id="back" @click="back()"></div>
       <p>消息</p>
    </div>
    <div id="mess">
      <scroller height="100%" :on-refresh="refresh" ref="scro">
      <div v-for="(f,index) in $store.state.mes[0]" class="friends" @click="openmes(index)">
      <div class="left">
        <img class="headimg" :src="f.pic">
        <p class="name">{{f.username}}</p>
        <p class="lastmessage">{{f.last_message}}</p>
      </div>
      <p class="lasttime">{{f.last_time}}</p>
      <p class="num" v-if="f.num!=0"> {{f.num}}</p>
    </div>
      </scroller>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "mes",
  data() {
    return {};
  },
  mounted() {
    var $this=this;
    this.$store.commit('revrsefalse');
    this.$store.commit("addchating", "");
    this.$store.commit("says", "");
    this.$store.state.websock.send("type=getlist");
    mui.init({
      keyEventBind: {
        backbutton: true //关闭back按键监听
      }
    });
    mui.back = function() {
        $this.$router.push({name:'index'});
    };
  },
  methods: {
    back:function(){
       this.$router.push({name:'index'});
    },
    openmes: function(index) {
      var $this = this;
      setTimeout(() => {
        this.$router.push({
          name: "chat",
          params: {
            sendbox: $this.$store.state.mes[0][index].mailbox,
            theindex: index
          }
        });
      }, 50);
    },
    refresh:function(){
      this.timeout = setTimeout(() => {
        this.$refs.scro.finishPullToRefresh();
      }, 1000);
      this.$store.state.websock.send("type=getlist");
    }
  }
};
</script>

<style lang="scss" scoped>
#mes {
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: #EEEEEE;
  position: absolute;
  top:0;
}
#mess {
  width: 100%;
  height: 100%;
  position: relative;
}
#headbar {
  width: 100%;
  height: 12vw;
  background-color: rgb(255, 153, 153);
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  p{
    display: block;
    position: relative;
    left: 9vw;
    font-size: 20px;
  }
  #back {
  width: 7vw;
  height: 7vw;
  background-size: 100%;
  position: relative;
  left: 3vw;
  background: url("~@/pages/login/assets/back.png")no-repeat;
  background-size: 100%;
}
}
.friends {
  height: 7vh;
  position: relative;
  background-color: #fff;
  border-top: 1px solid #dfdddd;
  border-bottom: 1px solid #dfdddd;
  margin-bottom: 1px;
  .left {
    position: absolute;
    width: 80%;
    height: 8vh;
    left: 1%;
    .headimg {
      width: 6vh;
      height: 6vh;
      border-radius: 50%;
      position: relative;
      top: .5vh;
    }
    .name {
      display: inline;
      position: absolute;
      top: 5%;
      margin-left: 5%;
      color: rgb(0, 0, 0);
      font-size: 2.8vh;
    }
  }
  .lastmessage {
    display: inline-block;
    position: absolute;
    margin-left: 5%;
    font-size: 2vh;
    bottom: 20%;
    color: #b3b1b1;
  }
  .num {
    display: inline;
    position: absolute;
    right: 5%;
    bottom: 1vh;
    font-size: 2vh;
    color: red;
  }
}
.friends:active {
  background: rgba(163, 249, 255, 0.2);
}
.lasttime {
  position: absolute;
  display: inline;
  right: 5%;
  top: 1vh;
  font-size: 2vh;
  color: #b3b1b1;
}
.friends:nth-child(1) {
  border-top: 1px solid #c7c7c7;
}
</style>
