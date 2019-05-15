import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/views/Main';
import Login from '@/views/Login';
import MainChildrenRoutes from './main';

Vue.use(Router);

const router = new Router({

  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: MainChildrenRoutes,
    },
  ],
});

router.beforeEach((to, from, next) => {
  next(true);
});

export default router;
