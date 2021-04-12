import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)
/*eslint-disable*/
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = new VueRouter({
  routes
})

export default router

/*import firebase from 'firebase/app'
import 'firebase/firestore'

router.beforeEach((to, from, next) =>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  
  
  if (requiresAuth && !currentUser) next('Login');
  else next();
})*/
