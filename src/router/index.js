import { createRouter, createWebHistory } from 'vue-router'
import Day1View from '../views/Day1View.vue'
import Day2View from '../views/Day2View.vue'
import Day3View from '../views/Day3View.vue'

const routes = [
    { path: '/', redirect: '/day1' },
    { path: '/day1', component: Day1View },
    { path: '/day2', component: Day2View },
    { path: '/day3', component: Day3View },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
