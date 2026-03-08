import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/SiteHome.vue'),
    },
    {
      path: '/dashboard',
      redirect: '/dashboard/overview',
    },
    {
      path: '/dashboard',
      component: () => import('../views/dashboard/DashboardLayout.vue'),
      children: [
        { path: 'overview', component: () => import('../views/dashboard/OverviewView.vue') },
        { path: 'traffic', component: () => import('../views/dashboard/TrafficView.vue') },
        { path: 'behavior', component: () => import('../views/dashboard/BehaviorView.vue') },
        { path: 'funnel', component: () => import('../views/dashboard/BookingFunnelView.vue') },
        { path: 'services', component: () => import('../views/dashboard/ServicesView.vue') },
        { path: 'team', component: () => import('../views/dashboard/TeamView.vue') },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
