/* eslint-disable no-unused-expressions */
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
import Status from './views/Status.vue';
import Playground from './views/Playground.vue';
import v404 from './views/404.vue';
import AdminSignup from './views/AdminSignup.vue';
import Accepted from './components/Accepted.vue';
import Rejected from './components/Rejected.vue';
import FAQ from './views/FAQ.vue';
import Checkin from './views/Checkin.vue';
import db from './private/firebase_init';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
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
    {
      path: '/playground',
      name: 'Playground',
      component: Playground,
    },
    {
      path: '/404',
      name: 'v404',
      component: v404,
    },
    {
      path: '/admin',
      name: 'AdminSignup',
      component: AdminSignup,
    },
    {
      path: '/accepted',
      name: 'Accepted',
      component: Accepted,
    },
    {
      path: '/rejected',
      name: 'Rejected',
      component: Rejected,
    },
    {
      path: '/FAQ',
      name: 'FAQ',
      component: FAQ,
    },
    {
      path: '/checkin/:id',
      name: 'Checkin',
      component: Checkin,
      meta: {
        adminAuth: true,
      },
    },
  ],
});

// Router guard setup
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.auth)) {
    console.log('Protected route detected');
    Firebase.auth().onAuthStateChanged((user) => {
    // If user is logged in
      if (user) {
      // Proceed to next page
        console.log('Authorized user: ', user);
        next();
      } else {
      // Otherwise redirect to login
        console.log('Not authorized');
        next({ name: 'Login' });
      }
    });
  } else if (to.matched.some(rec => rec.meta.adminAuth)) {
    console.log('Protected route detected');
    Firebase.auth().onAuthStateChanged((user) => {
    // If user is logged in
      if (user) {
      // Proceed to next page
        console.log('Authorized user2: ', user);

        db.collection('admins').doc(user.email.toLocaleLowerCase()).get().then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            next();
          } else {
            console.log('Not an admin user!');
            next({ name: 'Login' });
          }
        })
          .catch((error) => {
            console.log('Not an admin user!');
            next({ name: 'Login' });
          });
      } else {
      // Otherwise redirect to login
        console.log('Not authorized');
        next({ name: 'Login' });
      }
    });
  } else {
    console.log('No route guard');
    next();
  }
});

/* // Check if admin only auth is required
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.adminAuth)) {
    console.log('Protected route detected');
    Firebase.auth().onAuthStateChanged((user) => {
    // If user is logged in
      if (user) {
      // Proceed to next page
        console.log('Authorized user2: ', user);

        db.collection('admins').doc(user.email.toLocaleLowerCase()).get().then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            next();
          } else {
            console.log('Not an admin user!');
            next({ name: 'Login' });
          }
        })
          .catch((error) => {
            console.log('Not an admin user!');
            next({ name: 'Login' });
          });
      } else {
      // Otherwise redirect to login
        console.log('Not authorized');
        next({ name: 'Login' });
      }
    });
  } else {
    console.log('No route guard');
    next();
  }
}); */


export default router;
