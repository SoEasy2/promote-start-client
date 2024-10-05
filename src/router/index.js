import { createRouter, createWebHistory } from 'vue-router'

import { BASE_ROUTES } from '@/router/config/baseRoutes'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: BASE_ROUTES,
})

export default router
