<template>
<div id="user">
  <div id="sidemenu">
      <div id="sidehead">
        <img v-bind:src="pic" id="headimg">
        <input type="file" id="postheadimg" @change="update">
        <p id="username">{{name}}</p>
      </div>

      <div id="option">
        <p @click="showdetail()"><img src="@/pages/login/assets/data.png">个人资料</p>
        <hr>
        <p @click="disfinish()"><img src="@/pages/login/assets/collect.png">收藏</p>
        <hr>
        <p @click="cancel"><img src="@/pages/login/assets/design.png">注销</p>
      </div>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name: "user",
  props: ['judge'],
  data() {
    return {
      name: "",
      pic: ""
    };
  },
  created() {
    this.rev();
  },
  methods: {
    disfinish:function(){
      mui.toast("开发中...");
    },
    showdetail:function(){
      //this.hid();
      this.$emit('refreshbizlines');
      this.$router.push({name:'detail',params:{mailbox:localStorage.mailbox}});
    },
    rev: function() {
      var $this = this;
      axios({
        method: "post",
        url: "/api/sport/userdata/returnm.php",
        data: {
          mailbox: localStorage.mailbox
        }
      })
        .then(function(response) {
          if (response.data.name != null) {
            $this.$router.push({ name: "index" });
            $this.name = response.data.name;
            $this.pic = response.data.pic+'?num='+Math.random();
            localStorage.name = response.data.name;
            localStorage.pic = response.data.pic;
          } else {
            $this.name = localStorage.name;
            $this.pic = localStorage.pic;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    update(e) {
      // 上传照片
      var self = this;
      let file = e.target.files[0];
      /* eslint-disable no-undef */
      let param = new FormData(); // 创建form对象
      param.append("file", file, file.name); // 通过append向form对象添加数据
      param.append("mailbox", localStorage.mailbox); // 添加form表单中其他数据
      console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      // 添加请求头
      axios
        .post("/api/sport/userdata/savepic.php", param, config)
        .then(response => {
          if (response.data==1) {

          }
          console.log(response.data);
        });
    },
    right:function(){
      this.$emit('right','none');
    },
    cancel:function(){
      localStorage.clear();
      this.$router.push({name:'login'});
      this.$store.commit('clearall');
      this.$store.state.websock.close();
    }
  }
};
</script>

<style scoped>
img{
  width: 20px;
  margin-right:5px;
}
#sidemenu {
  width: 90%;
  background-color: white;
  height: 100%;
  position: absolute;
  z-index: 20;
  display: flex;
  flex-direction: column;
}
#right{
  width: 30%;
  position: absolute;
  z-index: 20;
  left: 70%;
  display: flex;
  height: 100%;
}
#sidehead {
  margin-top: 10%;
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
}
#headimg {
  width: 80px;
  height: 80px;
  position: relative;
  left: 17%;
  border-radius: 50%;
}
#postheadimg {
  width: 40%;
  position: absolute;
  left: 20%;
  opacity: 0;
  filter: Alpha(opacity=0);
}
#username {
  font-size: 25px;
  color: black;
  position: relative;
  left:20%;
}
#option {
  width: 100%;
  height: 100%;
}
#option p {
  position: relative;
  left: 17%;
  font-size: 2.5vh;
  height: 7vh;
  display: flex;
  align-items: center;
}
#mid {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
hr {
  width: 80%;
  position: relative;
  left: 10%;
  height: 2px;
  border: 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 1);
}
</style>
