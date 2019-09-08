<template>
  <div id="news" ref="news">
    <div id="main">
    <scroller height="100%" ref="myscroller">
      <div id="midhead" v-bind:style="{height:h+'px'}"></div>
      <div class="message" v-for="mes in message">
        <a @click="open(mes.src)">
        <img :src="mes.pic">
        <p>{{mes.head}}</p>
        </a>
      </div>
    </scroller>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import Mui from "vue-awesome-mui";
Vue.use(Mui);
export default {
  name: "news",
  data() {
    return {
      message: [],
      h: "",
      myDB:
        window.indexedDB ||
        window.webkitindexedDB ||
        window.msIndexedDB ||
        mozIndexedDB
    };
  },
  mounted() {
    this.closeback();
  },
  created() {
    this.rev();
    this.openDB("test");
  },
  methods: {
    rev: function() {
      var $this = this;
      axios({
        method: "post",
        url: "/api/sport/news/news.php"
      })
        .then(function(response) {
          var i = 0;
          $this.myDB.db.transaction(["mynews"],"readwrite").objectStore("mynews").add({id:2,name:"123"});
          console.log($this.myDB.db);
          while (response.data[1][i]) {
            $this.message.push({
              src: response.data[1][i],
              head: response.data[2][i],
              pic: response.data[3][i]
            });
            /*db.transaction(['news'], 'readwrite')
            .objectStore('news')
            .add({ id: 1, src: 'http://sports.sina.com.cn/others/volleyball/2019-01-08/doc-ihqfskcn5282958.shtml', head: "但却无法", pic: 'http://n.sinaimg.cn/sports/transform/100/w550h350/20190108/_tmW-hrkkwef8657856.jpg' });*/
            i++;
            $this.returnh();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    returnh: function() {
      var subh = window.getComputedStyle(this.$refs.news).height;
      var allh = document.body.clientHeight;
      var x = parseFloat(allh) - parseFloat(subh);
      this.h = x;
    },
    open: function(e) {
      this.$router.push({ name: "shownews", params: { src: e } });
    },
    openDB(name) {
      var $this = this;
      let version = 2;
      let request = $this.myDB.open("test",version);
      request.onerror = function(e) {
        console.log(e.currentTarget.error.message);
      };
      request.onsuccess = function(e) {
        $this.myDB.db = e.target.result;
      };
      request.onupgradeneeded = function(e) {
        let db = e.target.result;
        db.createObjectStore("mynews",
          //keyPath:,//无法与autoIncrement联合使用，自己设定的id字段的字段名
          { keyPath: 'id' }
        )
      };
    },
  }
};
</script>

<style lang="scss" scoped>
#news {
  width: 100%;
  height: 82%;
  z-index: 0;
}
#main {
  height: 100%;
}
.message {
  height: 73px;
  background: white;
  border: 1px red solid;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
  }
  img {
    width: 110px;
    height: 70px;
  }
  p {
    display: inline-block;
    font-size: 15px;
    width: 50%;
    margin-left: 5px;
  }
}
.message:active {
  background: rgba(163, 249, 255, 0.2);
}
</style>
