import Vue from 'vue'
import Router from 'vue-router'
import VueTouch from 'vue-touch'
import VueScroller from 'vue-scroller'
import Mui from 'vue-awesome-mui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import DrawerLayout from 'vue-drawer-layout'
import login from '@/components/login/login'
import mailbox from '@/components/registe/mailbox'
import indentify from '@/components/registe/indentify'
import password from '@/components/registe/password'
import index from '@/components/mate/index'
import idname from '@/components/registe/idname'
import user from '@/components/mate/user'
import mate from '@/components/mate/mate'
import mating from '@/components/mate/mating'
import chat from '@/components/chat/chat'
import news from '@/components/mate/news'
import shownews from '@/components/mate/shownews'
import mes from '@/components/mes/mes'
import friend from '@/components/mate/friend'
import frirequest from '@/components/mes/frirequest'
import detail from '@/components/mes/detail'
Vue.use(Router)
Vue.use(VueScroller)
Vue.use(Mui)
Vue.use(ElementUI)
Vue.use(DrawerLayout)
export default new Router({
  routes: [
    {
      path: '/',
      component: login,
      name: 'login'
    },
    {
      path: '/mailbox',
      component: mailbox,
      name: 'mailbox'
    },
    {
      path:'/indentify',
      component:indentify,
      name:'indentify',
    },
    {
      path:'/password',
      component:password,
      name:'password'
    },
    {
      path:'/idname',
      component:idname,
      name:'idname'
    },
    {
      path:'/index',
      component:index,
      name:'index',
      redirect:'/mate',
      children:[
        {path: '/mate', component:mate,name:'mate'},
        {path:'/mating',component:mating,name:'mating',},
        {path:'/mes',component:mes,name:'mes'},
        {path:'/news',component:news,name:'news'},
        {path:'/shownews',component:shownews,name:'shownews'},
        {path:'/friend',component:friend,name:'friend'},
        {path:'/chat',component:chat,name:'chat'},
        {path:'/frirequest',component:frirequest,name:'frirequest'},
        {path:'/detail',component:detail,name:'detail'}
    ]
    },
  ]
})
