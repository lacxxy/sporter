<template>
  <div id="detail">
    <div id="headbar">
       <div id="back" @click="back()"></div>
    </div>
    <img class="markimg" v-bind:src="pic">

    <div class="mes">
      <img v-bind:src="pic+'?num='+Math.random()">
      <p>{{name}}</p>
      <div>
        <p>注册邮箱:<span>{{mailbox}}</span></p>
        <p>性别:<span>{{sex}}</span></p>
      </div>
    </div>
      <div class="apartmyself" v-if="mailbox!=my">
        <button class="send" @click="sendmes">发消息</button>
        <button v-if="iffriend" class="del" @click="delfri">删除好友</button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name:'detail',
  data(){
    return{
      mailbox:this.$route.params.mailbox,
      my:localStorage.mailbox,
      name:'',
      pic:'',
      sex:'男',
      iffriend:false,
    }
  },
  mounted(){
    this.$store.commit('revrsefalse');
    this.myback();
  },
  created(){
    this.rev();
  },
  methods:{
    back:function(){
       history.go(-1);
    },
    rev:function(){
      var $this = this;
      axios({
        method: "post",
        url: "/api/sport/userdata/returnm.php",
        data: {
          mailbox: $this.mailbox,
        }
      })
        .then(function(response) {
          if (response.data.name != null) {
            $this.name = response.data.name;
            $this.pic = response.data.pic;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
        axios({
          method: "post",
          url: "/api/sport/friend/is_friend.php",
          data: {
            mailbox: localStorage.mailbox,
            friend_mail:$this.mailbox
          }
        })
        .then(function(response){
          $this.iffriend=response.data;
        })
    },
    sendmes:function(){
      this.$router.push({name:'chat',params:{sendbox:this.mailbox}});
    },
    delfri:function(){
      var $this=this;
      var con=confirm("是否删除好友");
      if(con==true){
        axios({
          method:"post",
          url:"/api/sport/friend/del_friend.php",
          data:{
            mailbox:localStorage.mailbox,
            friend_mail:$this.mailbox,
          }
        })
      }
      else{
        return;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#detail{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0px;
  z-index: 1200;
  background: #EEEEEE;
}
#headbar{
  position: fixed;
  z-index: 10;
  height: 5vh;
  width:100%;
  #back{
    height: 5vh;
    width: 5vh;
    display: inline-block;
    background: url("~@/pages/login/assets/back.png")no-repeat;
    background-size: 100%;
    position: relative;
    left: 2%;
    top:1vh;
  }
}
.markimg{
  width: 100%;
  height: 20%;
  z-index: 0;
  filter: blur(5px);
  border-bottom: 2px white solid;
}
.mes{
  width: 100%;
  text-align: center;
  background-color: white;
  img{
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    border: 2px white solid;
  }
  p{
    font-size: 8vw;
    color:rgb(72, 111, 184);
  }
  div{
    p{
      font-size: 4.5vw;
      color: #979696;
      span{
        color:rgb(60, 59, 131);
      }
    }
  }
}
.apartmyself{
  width: 100%;
  text-align: center;
  margin-top: 5vh;
  .send{
    width: 90%;
    height: 8vh;
    background: rgb(151, 224, 42);
    color: white;
    font-size: 3.5vh;
    margin:2vh;
  }
  .del{
    width: 90%;
    height: 8vh;
    background: rgb(236, 42, 42);
    color: white;
    font-size: 3.5vh;
  }
}
</style>
