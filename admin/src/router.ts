/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Router from 'vue-router';
import Firebase from 'firebase';

import v404 from './views/404.vue';
import Stats from './views/Stats.vue';
import Login from './views/Login.vue';
import db from './private/firebase_init';
import Checkin from './views/Checkin.vue';
import LiveDesk from './views/LiveDesk.vue';
import Dashboard from './views/Dashboard.vue';
import AdminSignup from './views/AdminSignup.vue';
import ForgotPassword from './views/ForgotPassword.vue';

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
      path: '/',
      name: 'Login',
      component: Login,
      props: true,
      meta: {
        loginRedir: true,
      },
    },
    {
      path: '/login/forgot',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/404',
      name: 'v404',
      component: v404,
    },
    {
      path: '/signup',
      name: 'AdminSignup',
      component: AdminSignup,
    },
    {
      path: '/stats',
      name: 'Stats',
      component: Stats,
      meta: {
        adminAuth: true,
      },
    },
    {
      path: '/desk',
      name: 'LiveDesk',
      component: LiveDesk,
      meta: {
        adminAuth: true,
      },
    },
    {
      path: '/desk/:email',
      name: 'LiveDesk',
      component: LiveDesk,
      meta: {
        adminAuth: true,
      },
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
        try {
          let doc = db.collection('admins')
            .doc(user.email.toLocaleLowerCase())
            .get();
          
          if (doc.exists) {
            console.log('Document data:', doc.data());
            next();
          } else {
            console.log('Not an admin user!');
            next({ name: 'Login' });
          }
        } catch (err) {
          console.log('Not an admin user!');
          next({ name: 'Login' });
        }
      } else {
        // Otherwise redirect to login
        console.log('Not authorized');
        next({ name: 'Login' });
      }
    });
  } else if (to.matched.some(rec => rec.meta.loginRedir)) {
    Firebase.auth().onAuthStateChanged((user) => {
      // If user is logged in
      if (user) {
        next({ name: 'Dashboard' });
      } else {
        // Otherwise redirect to login
        console.log('Not authorized');
        next();
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
