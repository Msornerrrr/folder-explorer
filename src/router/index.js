import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/', component: () => import('@/views/MainPage.vue') },
  { path: '/folders', component: () => import('@/views/MainFolder.vue') },
  { path: '/folders/:sub', component: () => import('@/views/SubFolder.vue') },
  { path: '/folders/:sub/:pdf', component: () => import('@/views/PdfDisplay.vue')},
  { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router