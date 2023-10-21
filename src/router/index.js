import { createRouter, createWebHistory } from 'vue-router'
import admin from '../views/admin.vue'
import cuento from '../views/cuento.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: admin
    },
    {
      path: '/:id',
      component: cuento
    }
  ]
})

export default router
