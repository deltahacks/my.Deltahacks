import Vue from 'vue';
import Router from 'vue-router';
import Firebase from 'firebase';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Dashboard from './views/Dashboard.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import Apply from './views/Apply.vue';
import Status from './views/Status.vue'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: false,
        p: 'path',
        auth: true,
      },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply,
    },
    {
      path: '/status',
      name: 'Status',
      component: Status,
    },
    {
      path: '/login/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
  ],
});

// Router guard setup
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.auth)) {
    console.log('inside guard');
    const user = Firebase.auth().currentUser;
    // If user is logged in
    if (user) {
      // Proceed to next page
      console.log(user);
      next();
    } else {
      // Otherwise redirect to login
      console.log('no usr');
      next({ name: 'Login' });
    }
  } else {
    console.log('nininini');
    next();
  }
});

export default router;
