import Vue from 'vue'
import vue from '../login'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Vuex)
Vue.use(ElementUI)
import axios from 'axios';
export default new Vuex.Store({
  state: {
    mans: [],
    h:'',
    usermes: true,
    websock: null,
    mes:[],
    mesnum:'',
    friend:[],
    chating:'',
    says:[],
    frirequest:[],
  },
  mutations: {
    addh(state,x){
      state.h=x;
    },
    clearall(state){
      state.mans=[];
      state.h='';
      state.usermes=true;
      state.websock=null;
      state.mes=[];
      state.mesnum='';
      state.friend=[];
      state.chating='';
      state.says=[];
    },
    addchating(state,x){
      state.chating=x;
    },
    says(state,x){
      state.says=x;
    },
    clearfriend(state){
      state.friend=[];
    },
    addfriend(state,x){
      state.friend.push(x);
    },
    delfri(state,x){
      state.mes[0][x].num=0;
    },
    add(state,arr) {
      state.mans.push(arr);
    },
    clear(state) {
      state.mans = [];
    },
    revrsetrue(state) {
      state.usermes = true;
    },
    revrsefalse(state) {
      state.usermes = false;
    },
    initWebSocket(state) {
      var $this=this;
      var url = 'ws://47.100.182.79:9100';
      state.websock = new WebSocket(url);
      state.websock.onmessage = function(e){
        console.log(JSON.parse(e.data))
        if(JSON.parse(e.data).friended==1){
          alert("对方已在好友列表中");
          return 0;
        }
        if(JSON.parse(e.data).type=='chat_list'){
          console.log(JSON.parse(e.data));
          state.mes=[];
          state.mesnum=JSON.parse(e.data).sum_num;
          state.mes.push(JSON.parse(e.data));
          Vue.delete(state.mes[0],'type');
          Vue.delete(state.mes[0],'sum_num');
          state.mes.reverse();
        }
        else if(JSON.parse(e.data).type=='friend_list'){
          state.frirequest=JSON.parse(e.data);
          Vue.delete(state.frirequest,'type');
          console.log(state.frirequest);
        }
        else if(JSON.parse(e.data).type=='message'){
          console.log(JSON.parse(e.data))
          if(JSON.parse(e.data).friend_mail==state.chating){
            axios({
              method: "post",
              url: "/api/sport/chat/clean_chat.php",
              data: {
                mailbox: localStorage.mailbox,
                friend_mail: state.chating,
              },
          })
            state.says.push({
              content:JSON.parse(e.data).content,
              judge: 1,
              time: JSON.parse(e.data).time,
            });
          }
        }
        if(JSON.parse(e.data).type=='message'){
          plus.push.createMessage('新消息',"LocalMSG",{cover:true});
        }
      };
      state.websock.onerror = function(){
        console.log("WebSocket连接发生错误");
      };
      state.websock.onopen =function(){
          var sendaction = "type=login&mailbox=" + localStorage.mailbox;
          if (state.websock.readyState == 1) {
            state.websock.send(sendaction);
            console.log(sendaction);
          } else if (state.websock.readyState == 0) {
            setTimeout(function () {
              state.websock.send(sendaction);
            }, 3000);
          }
      };
    },
  },
})
