import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Spoergsmaal from '../views/Spoergsmaal.vue'
import Kamera from '../views/Camera.vue'
import PointTavle from '../views/Scoreboard.vue'
import Kort from '../views/Map.vue'

Vue.use(VueRouter)
    /*eslint-disable*/
const routes = [{
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/spoergsmaal',
        name: 'Spoergsmaal',
        component: Spoergsmaal,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/kamera',
        name: 'Kamera',
        component: Kamera,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/pointtavle',
        name: 'Pointtavle',
        component: PointTavle,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/kort',
        name: 'Kort',
        component: Kort,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new VueRouter({
    routes
})

export default router

import firebase from 'firebase/app'
import 'firebase/auth'

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = firebase.auth().currentUser;


    if (requiresAuth && !currentUser) next('Login');
    else next();
})