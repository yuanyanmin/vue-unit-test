import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/table',
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../views/TableView.vue')
    }
  ]
})

export default router
