import Vue from 'vue'
import Router from 'vue-router'
import Playground from '@/components/Playground'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: false,
        p: "path"
      }
    },
    {
      path: '/p',
      name: 'Playground',
      component: Playground
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

//Router guard setup
router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => {
    console.log("router hit", rec.meta.p)
    return rec.meta.requiresAuth})){
    console.log('inside guard')
    let user = firebase.auth().currentUser
    if(user){
      console.log(user)
      next()
    }else{
      next({name : 'Login'})
    }
  }else{
    next()
  }
})

export default router

