import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import DynamicGenerate from '@/components/DynamicGenerate'

import ManagerHome from '@/components/ManagerHome'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path: '',
          name: 'comManager',
          component: ManagerHome
        },
        {
          path: '/generate',
          name: 'dynamicCom',
          component: DynamicGenerate,
        },
      ]
    },
    
  ]
})
