import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Plan from '@/components/Plan'
import Login from '@/components/Login'
import Panel from '@/components/Panel'
import EditPlan from '@/components/EditPlan'

Vue.use(Router)

export default new Router({

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
        ,
        {
            path: '/plan/:id',
            name: 'plan',
            component: Plan
        }
        ,
        {
            path: '/login',
            name: 'login',
            component: Login
        }
        ,
        {
            path: '/panel',
            name: 'Panel',
            component: Panel
        },
        {
            path: '/edit/plan/:id',
            name: 'editPlan',
            component: EditPlan
        }
    ]
})
