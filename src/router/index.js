import { createRouter, createWebHashHistory } from 'vue-router'
import electrisCalculator from '@/components/calculator/electrisCalculator.vue'

const routes = [
  {
    path: '/',
    name: 'calculator',
    component: electrisCalculator
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
