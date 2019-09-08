<template>
  <div id="mating" ref="mating">
    <scroller height="100%" :on-refresh="refresh" ref="scro">
    <div id="team">
      <div class="person" v-for="(man,index) in $store.state.mans" @click="beginchat(index)" @mouseenter="divcss(index)" v-bind:style="{height:$store.state.h+'px'}">
        <div class="opmes">
          <img v-bind:src="man.pic" class="headimg" v-bind:style="{height:$store.state.h*0.9+'px',width:$store.state.h*0.9+'px'}">
          <p class="name">{{man.name}}</p>
        </div>
        <img src="~@/pages/login/assets/addfriend.png" class="message" @click.stop="addfriend(index)">
        <img src="~@/pages/login/assets/message.png" class="message" @click="beginchat(index)">
      </div>
    </div>
    </scroller>
    <div id="tail">
      <button id="cancel" @click="cancel">取消匹配</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name: "mating",
  data() {
    return {
      websock: this.$route.query.webs,
      imgh: "",
      imgw: ""
    };
  },
  mounted() {
    this.$store.commit("revrsetrue");
  },
  created() {
    this.team1();
  },
  methods: {
    divcss: function() {
      this.hov = "abnormal";
      console.log(this.hov);
    },
    team1: function() {
      var $this = this;
      axios({
        method: "post",
        url: "/api/sport/match/mymatch.php",
        data: {
          mailbox: localStorage.mailbox
        }
      }).then(function(response) {
        if (response.data.name) {
          $this.$store.commit("clear");
          var i = 0;
          while (i < 10) {
            if (response.data.name[i]) {
              $this.$store.commit("add",{
                name: response.data.name[i],
                pic: response.data.pic[i],
                mail: response.data.account[i]
              });
            }
            i++;
          }
        }
      });
    },
    cancel: function() {
      var $this = this;
      axios({
        method: "post",
        url: "/api/sport/match/dematch.php",
        data: {
          mailbox: localStorage.mailbox
        }
      })
        .then(function(response) {
          $this.$message("取消成功",{showClose:false,center:true,roundButton:true});
          $this.$store.commit("clear");
          $this.$router.push({ name: "mate" });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    beginchat: function(index) {
      var $this=this;
      setTimeout(() => {
        this.$router.push({
        name: "detail",
        params: { mailbox: $this.$store.state.mans[index].mail}
      });
        }, 100);
    },
    addfriend: function(index) {
      var $this = this;
      var con=confirm("确认发送好友请求吗");
      if(con==false){
        return 0;
      }
      this.$store.state.websock.send("type=add_friend&friendmail="+$this.$store.state.mans[index].mail);
    },
    refresh: function() {
      this.timeout = setTimeout(() => {
        this.$refs.scro.finishPullToRefresh();
      }, 1000);
      this.team1();
    }
  }
};
</script>

<style lang="scss" scoped>
#mating {
  width: 100%;
  height: 81%;
  background: #EEEEEE;
  position: relative;
}
#team {
  width: 100%;
  height: 90%;
}
.person {
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #c7c7c7;
  border-bottom: 1px solid #c7c7c7;
  margin-bottom: 1px;
  position: relative;
  .opmes{
    position: absolute;
    top: 5%;
    left: 1%;
    height: 100%;
    width:30%;
    .headimg {
      display: inline;
      border-radius: 50%;
    }
    .name {
      display: inline;
      position: absolute;
      margin-left: 5%;
      top:5%;
      font-size: 18px;
   }
  }
}
.person:nth-child(1) {
  border-top: 1px solid #c7c7c7;
}
.person:active {
  background: rgba(163, 249, 255, 0.2);
}
.message {
  width: 5%;
  float: right;
  margin: 2px;
  position: relative;
  top: 50%;
  margin-right: 3%;
}
#midhead {
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  .pull-to-refresh-layer {
    color: white;
  }
  p {
    color: rgb(170, 170, 170);
    display: flex;
    position: absolute;
    bottom: 20px;
  }
}
#tail {
  width: 100%;
  height: 10%;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  background-color: #fff;
  border-top: 2px solid #e66d7b;
  position: fixed;
  bottom: 0px;
}

#cancel {
  width: 25%;
  height: 60%;
  background-color: #fff;
  border: 2px solid #e66d7b;
  color: #e66d7b;
  border-radius: 5px;
  margin-left: 10%;
  margin-right: 10%;
}
.cancle:active {
  box-shadow: 5px 5px 5px grey;
}
</style>
