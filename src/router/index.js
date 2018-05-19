import Vue from 'vue'
import Router from 'vue-router'
import Playground from '@/components/Playground'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'
import AdminSignup from '@/components/AdminSignup'
import Applicant from '@/components/layouts/Applicant'
import Apply from '@/components/Apply'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
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
      path: '/',
      name: 'Home',
      component: Playground,
      redirect: '/dashboard'
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
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply
    },
    ,
    {
      path: '/signup/admin',
      name: 'AdminSignup',
      component: AdminSignup
    },
    {
      path: '/login/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword
    }
  ]
})

//Router guard setup
router.beforeEach((to, from, next) => {
  if(to.matched.some(rec => rec.meta.auth)){

    console.log('inside guard')

    let user = firebase.auth().currentUser
    //If user is logged in 
    if(user){
      //Proceed to next page
      console.log(user)
      next()
    }else{
      //Otherwise redirect to login
      console.log("no usr")
      next({name : 'Login'})
    }
  }else{
    console.log('nininini')
    next()
  }
})

export default router

