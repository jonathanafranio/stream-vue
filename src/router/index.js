import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/serie/:serie_id',
        name: 'Serie',
        component: () => import(/* webpackChunkName: "serie" */ '../views/Serie.vue'),
    },
    {
        path: '/temporada/:temporada_id',
        name: 'Temporada',
        props: true,
        component: () => import(/* webpackChunkName: "temporada" */ '../views/Temporada.vue')
    },
    {
        path: '/epsodio/:ep_id',
        name: 'Epsodios',
        props: true,
        component: () => import(/* webpackChunkName: "epsodio" */ '../views/Epsodios.vue')
    },
    {
        path: '*',
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
