/* eslint-disable no-unused-expressions */
import Vue from 'vue';
import Router from 'vue-router';
import Firebase from 'firebase';
import Login from './views/Login.vue';
import ForgotPassword from './views/ForgotPassword.vue';
import Apply from './views/Apply.vue';
import Status from './views/Status.vue';
import v404 from './views/404.vue';
import db from './firebase_init';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        loginRedir: true,
      },
    },
    {
      path: '/apply',
      name: 'Apply',
      component: Apply,
      meta: {
        auth: true,
      },
    },
    {
      path: '/status',
      name: 'Status',
      component: Status,
      meta: {
        auth: true,
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
      path: '*',
      component: v404,
    },
  ],
});

// Router guard setup
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.auth)) {
    // console.log('Protected route detected');
    Firebase.auth().onAuthStateChanged((user) => {
      // If user is logged in
      if (user) {
        // Proceed to next page
        // console.log('Authorized user: ', user);
        next();
      } else {
        // Otherwise redirect to login
        // console.log('Not authorized');
        next({ name: 'Login' });
      }
    });
  } else if (to.matched.some(rec => rec.meta.adminAuth)) {
    // console.log('Protected route detected');
    Firebase.auth().onAuthStateChanged((user) => {
      // If user is logged in
      if (user) {
        // Proceed to next page
        // console.log('Authorized user2: ', user);

        db.collection('admins')
          .doc(user.email!.toLocaleLowerCase())
          .get()
          .then((doc) => {
            if (doc.exists) {
              // console.log('Document data:', doc.data());
              next();
            } else {
              // console.log('Not an admin user!');
              next({ name: 'Login' });
            }
          })
          .catch((error) => {
            // console.log('Not an admin user!');
            next({ name: 'Login' });
          });
      } else {
        // Otherwise redirect to login
        // console.log('Not authorized');
        next({ name: 'Login' });
      }
    });
  } else if (to.matched.some(rec => rec.meta.loginRedir)) {
    Firebase.auth().onAuthStateChanged((user) => {
      // If user is logged in
      if (user) {
        // console.log("Times", Firebase.auth().currentUser!.metadata.creationTime, Firebase.auth().currentUser!.metadata.lastSignInTime)
        // Check if this is the first time the user has logged in and pass param to display splash screen
        if (
          Firebase.auth().currentUser!.metadata.creationTime ===
          Firebase.auth().currentUser!.metadata.lastSignInTime
        ) { next({ name: 'Status', params: { firstTime: 'yes' } }); } else next({ name: 'Status' });
      } else {
        // Otherwise redirect to login
        // console.log('Not authorized');
        next();
      }
    });
  } else {
    // console.log('No route guard');
    next();
  }
});

export default router;
