<template>
  <div id="mate">
    <div id="pick" @click="hid">
      <div id="pingpong" v-bind:class="{activepp:pp}" @click="pingpong"></div>
      <p id="newstudent" @click="newstudent" v-bind:class="{activens:ns}">新手上路</p>
      <p id="king" @click="king" v-bind:class="{activek:k}">王者局</p>
      <div id="football" v-bind:class="{activefb:fb}" @click="football"></div>
      <p id="good" @click="good" v-bind:class="{activegd:gd}">打的还行</p>
      <div id="basketball" v-bind:class="{activebb:bb}" @click="basketball"></div>
      <p id="girl" @click="girl" v-bind:class="{activegirl:gr}">找妹子.jpg</p>
      <div id="badminton" v-bind:class="{activebm:bm}" @click="badminton"></div>
      <p id="oforo" @click="oforo" v-bind:class="{active1:one}">1v1</p>
      <p id="tfort" @click="tfort" v-bind:class="{active2:two}">3v3</p>
      <p id="fforf" @click="fforf" v-bind:class="{active3:three}">5v5</p>
      <div id="fuzhouuv"></div>
    </div>
    <div id="tail">
      <div id="f5" @click="f5"></div>
      <button id="find" @click="find">FIND</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name: "mate",
  data() {
    return {
      mailbox: localStorage.mailbox,
      ball: 0,
      sort: 0,
      num: 0,
      pp: false,
      fb: false,
      bb: false,
      bm: false,
      judge: "none",
      ns: false,
      k: false,
      gd: false,
      gr: false,
      one: false,
      two: false,
      three: false
    };
  },
  mounted() {
    this.$store.commit('revrsetrue');
    this.closeback();
  },
  methods: {
    clrball: function() {
      this.ball = 0;
      this.pp = false;
      this.fb = false;
      this.bb = false;
      this.bm = false;
    },
    clrsort: function() {
      this.sort = 0;
      this.k = false;
      this.ns = false;
      this.gd = false;
      this.gr = false;
    },
    clrnum: function() {
      this.num = 0;
      this.one = false;
      this.two = false;
      this.three = false;
    },
    pingpong: function() {
      this.clrball();
      this.ball = 1;
      this.pp = true;
    },
    football: function() {
      this.clrball();
      this.ball = 2;
      this.fb = true;
    },
    basketball: function() {
      this.clrball();
      this.ball = 3;
      this.bb = true;
    },
    badminton: function() {
      this.clrball();
      this.ball = 4;
      this.bm = true;
    },
    menu: function() {
      this.judge = "block";
    },
    hid: function() {
      if (this.judge == "block") {
        this.judge = "none";
      }
    },
    f5: function() {
      this.clrball();
      this.clrsort();
      this.clrnum();
    },
    newstudent: function() {
      this.clrsort();
      this.sort = 1;
      this.ns = true;
    },
    king: function() {
      this.clrsort();
      this.sort = 2;
      this.k = true;
    },
    good: function() {
      this.clrsort();
      this.sort = 3;
      this.gd = true;
    },
    girl: function() {
      this.clrsort();
      this.sort = 4;
      this.gr = true;
    },
    oforo: function() {
      this.clrnum();
      this.num = 2;
      this.one = true;
    },
    tfort: function() {
      this.clrnum();
      this.num = 4;
      this.two = true;
    },
    fforf: function() {
      this.clrnum();
      this.num = 10;
      this.three = true;
    },
    find: function() {
      var $this = this;
      localStorage.num=$this.num;
      axios({
        method: "post",
        url: "/api/sport/match/match.php",
        data: {
          mailbox: localStorage.mailbox,
          ball: $this.ball,
          level: $this.sort,
          num: $this.num
        }
      })
        .then(function(response) {
          if(response.data==0){
            $this.$message("已在匹配中");
          }
          else{
             $this.$router.push({name:'mating'});
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
#mate{
  height: 81%;
  width: 100%;
  z-index: 0;
}
#pick {
  height: 90%;
}
#pingpong {
  width: 42%;
  height: 26%;
  background: url("~@/pages/login/assets/pingpong.jpg");
  background-size: 100%;
}
#newstudent {
  width: 57%;
  height: 14%;
  background-color: rgb(227, 220, 130);
  position: relative;
  left: 43%;
  bottom: 26%;
  color: white;
}
#king {
  width: 29%;
  height: 11%;
  background-color: rgb(133, 189, 189);
  position: relative;
  left: 42%;
  bottom: 26%;
  margin-left: 1%;
  color: white;
}
#football {
  background: url("~@/pages/login/assets/football.png");
  background-size: 100%;
  display: flex;
  width: 27%;
  height: 15.5%;
  position: relative;
  left: 73%;
  bottom: 37%;
}
#good {
  display: flex;
  width: 27%;
  height: 11%;
  background-color: rgb(179, 206, 153);
  position: relative;
  bottom: 40.5%;
  color: white;
}
#basketball {
  background: url("~@/pages/login/assets/basketball.png");
  background-size: 100%;
  display: flex;
  width: 43.5%;
  height: 24%;
  position: relative;
  left: 28%;
  bottom: 51.5%;
}
#girl {
  display: flex;
  width: 27%;
  height: 20%;
  background-color: rgb(226, 194, 197);
  position: relative;
  left: 73%;
  bottom: 71.5%;
  color: white;
}
#badminton {
  background: url("~@/pages/login/assets/badminton.png");
  background-size: 100%;
  display: flex;
  width: 27%;
  height: 30%;
  position: relative;
  bottom: 83.5%;
}
#oforo {
  display: flex;
  width: 35%;
  height: 12%;
  background-color: rgb(167, 175, 214);
  position: relative;
  left: 28%;
  bottom: 100.5%;
  color: white;
}
#tfort {
  display: flex;
  width: 35%;
  height: 12%;
  background-color: rgb(139, 202, 220);
  position: relative;
  left: 65%;
  bottom: 112.5%;
  color: white;
}
#fforf {
  display: flex;
  width: 27%;
  height: 30.5%;
  background-color: rgb(229, 188, 126);
  position: relative;
  bottom: 106.5%;
  color: white;
}
#fuzhouuv {
  background: url("~@/pages/login/assets/fuzhouuv.jpg");
  background-size: 100%;
  display: flex;
  width: 72%;
  height: 34%;
  position: relative;
  bottom: 140.5%;
  left: 28%;
}
#tail {
  width: 100%;
  display: flex;
  align-items: center;
  height: 10%;
  border-top: 2px rgb(230, 109, 123) solid;
}
#find {
  width: 25%;
  height: 60%;
  background-color: white;
  border: 2px rgb(230, 109, 123) solid;
  color: rgb(230, 109, 123);
  border-radius: 5px;
  margin-left: 10%;
  margin-right: 10%;
}
.activepp,
.activefb,
.activebb,
.activebm {
  box-sizing: border-box;
  border: 3px red solid;
}
.activens,
.activek,
.activegd,
.activegirl {
  box-sizing: border-box;
  border: 3px blue solid;
}
.active1,
.active2,
.active3 {
  box-sizing: border-box;
  border: 3px yellow solid;
}
#f5 {
  width: 32px;
  height: 32px;
  background-size: 100%;
  margin-left: 10%;
  margin-right: 10%;
  background: url("~@/pages/login/assets/f5.png");
  background-repeat: no-repeat;
  background-size: 100%;
}
p {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
