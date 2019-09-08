<template>
  <div id="chat">
     <div id="headbar">
       <div id="back" @click="back()"></div>
       <P>{{name}}</P>
    </div>

    <div id="chatarea" v-bind:style="{height:h+'px'}">
         <scroller height="100%" ref="myscroller">
         <div id="midhead">

          </div>
          <div id="chatcontent">
            <div v-for="(say,index) in $store.state.says" v-bind:class="judge(say.judge)">
              <p v-if="say.time!=0" class="timecontent">{{say.time}}</p>
              <div class="r" v-if="say.judge==0">
                <img :src="mypic" class="headimg" >
                <p class="content">{{say.content}}</p>
              </div>
              <div class="l" v-else>
                <img :src="pic" class="headimg">
                <p class="content">{{say.content}}</p>
              </div>
            </div>
          </div>

        </scroller>
    </div>
    <div id="tail">
        <textarea id="keyboard" wrap="hard" autoHeight="true" v-model="mysays"></textarea>
        <input type="button" id="send" @click="sendmessage" @mousedown="pre($event)" value="发送" maxlength="125">
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name: "chat",
  data() {
    return {
      mailbox: localStorage.mailbox,
      sendbox: this.$route.params.sendbox,
      name: "",
      mypic: localStorage.pic,
      pic: '',
      says: [],
      mid: [],
      mysays: [],
      h: "",
      th: "40",
    };
  },
  watch: {
    says:function() {
      var $this = this;
      this.$nextTick(function() {
        setTimeout(function() {
          $this.scroll();
        }, 100);
      });
      //this.scroll();
    }
  },
  mounted() {
    var $this=this;
    this.$store.commit('revrsefalse');
    this.rev();
    mui.init({
      keyEventBind: {
        backbutton: true
      }
    });
    mui.back = function() {
        $this.$router.push({name:'mes'})
    };
  },
  methods: {
    scroll: function() {
      this.$refs.myscroller.scrollTo(0, 2000000);
    },
    back: function() {
      var $this=this;
      $this.$router.push({name:'mes'})
    },
    judge: function(a) {
      if (a == 0) {
        return "rightsinglechatarea";
      } else {
        return "singlechatarea";
      }
    },
    rev: function() {
      var $this = this;
      axios({
        method: "post",
        url: "/api/sport/chat/message.php",
        data: {
          mailbox: localStorage.mailbox,
          friend_mail: $this.sendbox,
        }
      })
        .then(function(response) {
          console.log(response.data);
          $this.name = response.data.name;
          $this.pic = response.data.pic;
          var i = 0;
          $this.$store.commit('addchating',response.data.friend_mail);
          while (response.data.message[i]) {
            $this.says.push({
              content: response.data.message[i].content,
              judge: response.data.message[i].is_send,
              time: response.data.message[i].time,
            });
            i++;
          }
          $this.$store.commit('says',$this.says);
          $this.returnh();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sendmessage: function() {
      var $this = this;
      if($this.mysays==""){
        alert("不能为空");
        return 0;
      }
      $this.says.push({
        content: $this.mysays,
        judge: 0,
        time: 0,
      });
      this.$store.state.websock.send("type=chat&friend_mail="+$this.sendbox+"&content="+$this.mysays);
      $this.mysays = "";
    },
    returnh: function() {
      var allh = document.body.clientHeight;
      this.h = allh;
    },
    pre: function(e){
      e.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
#chat {
  width: 100%;
  height: 100%;
  background: #EEEEEE;
  position: absolute;
  top: 0px;
  z-index: 1000;
}
#back {
  width: 7vw;
  height: 7vw;
  background-size: 100%;
  position: absolute;
  left: 3%;
  background: url("~@/pages/login/assets/back.png")no-repeat;
  background-size: 100%;
}
#headbar {
  width: 100%;
  height: 12vw;
  background-color: rgb(255, 153, 153);
  color: white;
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  p {
    width: 30%;
    text-align: center;
  }
}
#midhead{
  height: 28vw;
}
#chatarea {
  width: 100%;
  z-index: 0;
  position: absolute;
  bottom: 14vw;
  height: 100%;
}
#chatcontent {
  width: 100%;
  position: relative;
}
.timecontent{
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 12px;
  color: #929191;
}
.singlechatarea {
  width: 100%;
  margin-bottom: 6vw;
  height: auto;
  display: block;
  .headimg {
    vertical-align: top;
    height: 10.5vw;
    width: 10.5vw;
    border-radius: 50%;
  }
  .content {
    max-width: 50%;
    min-width:6vw;
    min-height: 7vw;
    padding: 1vw;
    font-size: 4.6vw;
    line-height: 10vw;
    background: white;
    display: inline-block;
    text-align: center;
    word-break: break-word;
    border-radius: 3px;
    margin-left: 2vw;
    color: #333;
  }
}
.rightsinglechatarea {
  width: 100%;
  margin-bottom: 6vw;
  height: auto;
  display: block;
  .r{
    min-width:20vw;
    display: flex;
    flex-direction: row-reverse;
  }
  .headimg {
    height: 10.5vw;
    width: 10.5vw;
    margin-left: 2vw;
    border-radius: 50%;
  }
  .content {
    max-width: 50%;
    min-width:6vw;
    text-align: center;
    padding: 1vw;
    min-height: 7vw;
    font-size:4.6vw;
    background: rgb(255, 153, 153);
    word-break: break-word;
    display: inline-block;
    border-radius: 3px;
    border-top-right-radius: 0px;
    line-height: 8vw;
    color: #333;
  }
}
#tail {
  bottom: 0px;
  width: 100%;
  height: 12vw;
  position: fixed;
}
#keyboard {
  width: 80%;
  height: 12vw;
  background: white;
  line-height: 12vw;
  font-size: 7vw;
  resize: vertical;
  outline:none;
}
#send {
  width: 20%;
  float: right;
  height:12vw;
  background-color: rgb(255, 153, 153);
  color: white;
}

</style>
