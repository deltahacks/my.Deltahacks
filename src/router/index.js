import Vue from 'vue'
import Router from 'vue-router'
import Playground from '@/components/Playground'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Applicant from '@/components/layouts/Applicant'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth: false,
        p: "path",
        auth: true
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
    },
    {
      path: '/ap',
      name: 'Applicant',
      component: Applicant
    }
  ]
})

//Router guard setup
router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.auth)){
    console.log('inside guard')
    let user = firebase.auth().currentUser
    if(user){
      console.log(user)
      next()
    }else{
      console.log("no usr")
      next({name : 'Login'})
    }
  }else{
    console.log('nininini')
    next()
  }
})

export default router

