<template>
  <div id="shownews" ref="shownews">
     <scroller height="100%" ref="myscroller">
       <div id="midhead" v-bind:style="{height:h+'px'}"></div>
       <div v-html="content" class="contents">
         <meta name="referrer" content="no-referrer">
       </div>
     </scroller>
  </div>
</template>

<script>
import Vue from 'vue';
import Mui from "vue-awesome-mui";
import axios from "axios";
Vue.use(Mui);
export default {
  name:'shownews',
  data(){
    return{
      content:'',
      h:'',
    }
  },
  mounted() {
    this.myback();
  },
  created(){
    this.rev();
  },
  methods:{
    rev: function() {
      var $this = this;
      axios({
        method: "post",
        url: "/api/sport/news/newsshow.php",
        data: {
          src:this.$route.params.src
        }
      })
        .then(function(response) {
          $this.content=response.data;
          $this.returnh();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     returnh:function(){
      var subh = window.getComputedStyle(this.$refs.shownews).height;
      var allh = document.body.clientHeight;
      var x=parseFloat(allh)-parseFloat(subh);
      this.h=x+10;
    },
  }
}
</script>

<style scoped>
#shownews{
  width:100%;
  height: 82%;
}
.contents{
  width: 100%;
  color: red;
}
.contents >>> img{
  display: none;
}
</style>


