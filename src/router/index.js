import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Marketing site
    { path: '/', component: () => import('../views/SiteHome.vue') },

    // Site Analytics (renamed from /dashboard)
    {
      path: '/dashboard',
      redirect: '/dashboard/overview',
      component: () => import('../views/dashboard/DashboardLayout.vue'),
      children: [
        { path: 'overview',  component: () => import('../views/dashboard/OverviewView.vue') },
        { path: 'traffic',   component: () => import('../views/dashboard/TrafficView.vue') },
        { path: 'behavior',  component: () => import('../views/dashboard/BehaviorView.vue') },
        { path: 'funnel',    component: () => import('../views/dashboard/BookingFunnelView.vue') },
        { path: 'services',  component: () => import('../views/dashboard/ServicesView.vue') },
        { path: 'team',      component: () => import('../views/dashboard/TeamView.vue') },
        { path: 'sample',    component: () => import('../views/dashboard/SampleView.vue') },
      ],
    },

    // Role Gateway
    { path: '/app', component: () => import('../views/app/RoleGateway.vue') },

    // Super Admin panel
    {
      path: '/app/super-admin',
      redirect: '/app/super-admin/overview',
      component: () => import('../views/app/SuperAdminLayout.vue'),
      children: [
        { path: 'overview',   component: () => import('../views/app/super-admin/OverviewView.vue') },
        { path: 'locations',  component: () => import('../views/app/super-admin/LocationsView.vue') },
        { path: 'analytics',  component: () => import('../views/app/super-admin/AnalyticsView.vue') },
        { path: 'revenue',    component: () => import('../views/app/super-admin/RevenueView.vue') },
        { path: 'membership', component: () => import('../views/app/super-admin/MembershipView.vue') },
        { path: 'staff',      component: () => import('../views/app/super-admin/StaffView.vue') },
        { path: 'settings',   component: () => import('../views/app/super-admin/SettingsView.vue') },
        { path: 'ai',         component: () => import('../views/app/super-admin/AIView.vue') },
      ],
    },

    // Admin panel
    {
      path: '/app/admin',
      redirect: '/app/admin/overview',
      component: () => import('../views/app/AdminLayout.vue'),
      children: [
        { path: 'overview',   component: () => import('../views/app/admin/OverviewView.vue') },
        { path: 'schedule',   component: () => import('../views/app/admin/ScheduleView.vue') },
        { path: 'team',       component: () => import('../views/app/admin/TeamView.vue') },
        { path: 'clients',    component: () => import('../views/app/admin/ClientsView.vue') },
        { path: 'revenue',    component: () => import('../views/app/admin/RevenueView.vue') },
        { path: 'membership', component: () => import('../views/app/admin/MembershipView.vue') },
        { path: 'inventory',  component: () => import('../views/app/admin/InventoryView.vue') },
        { path: 'ai',         component: () => import('../views/app/admin/AIView.vue') },
      ],
    },

    // Staff panel (moved from /dashboard/staff)
    {
      path: '/app/staff',
      redirect: '/app/staff/overview',
      component: () => import('../views/app/StaffLayout.vue'),
      children: [
        { path: 'overview',   component: () => import('../views/app/staff/StaffOverviewView.vue') },
        { path: 'schedule',   component: () => import('../views/app/staff/StaffScheduleView.vue') },
        { path: 'queue',      component: () => import('../views/app/staff/StaffQueueView.vue') },
        { path: 'clients',    component: () => import('../views/app/staff/StaffClientsView.vue') },
        { path: 'revenue',    component: () => import('../views/app/staff/StaffRevenueView.vue') },
        { path: 'inventory',  component: () => import('../views/app/staff/StaffInventoryView.vue') },
        { path: 'ai',         component: () => import('../views/app/staff/StaffAIView.vue') },
      ],
    },

    // Barber panel
    {
      path: '/app/barber',
      redirect: '/app/barber/overview',
      component: () => import('../views/app/BarberLayout.vue'),
      children: [
        { path: 'overview',  component: () => import('../views/app/barber/OverviewView.vue') },
        { path: 'schedule',  component: () => import('../views/app/barber/ScheduleView.vue') },
        { path: 'clients',   component: () => import('../views/app/barber/ClientsView.vue') },
        { path: 'earnings',  component: () => import('../views/app/barber/EarningsView.vue') },
        { path: 'reviews',   component: () => import('../views/app/barber/ReviewsView.vue') },
        { path: 'ai',        component: () => import('../views/app/barber/AIView.vue') },
      ],
    },

    // Client portal
    {
      path: '/app/client',
      redirect: '/app/client/dashboard',
      component: () => import('../views/app/ClientLayout.vue'),
      children: [
        { path: 'dashboard',    component: () => import('../views/app/client/DashboardView.vue') },
        { path: 'appointments', component: () => import('../views/app/client/AppointmentsView.vue') },
        { path: 'history',      component: () => import('../views/app/client/HistoryView.vue') },
        { path: 'membership',   component: () => import('../views/app/client/MembershipView.vue') },
        { path: 'preferences',  component: () => import('../views/app/client/PreferencesView.vue') },
        { path: 'ai',           component: () => import('../views/app/client/AIView.vue') },
      ],
    },

    // Legacy redirect
    { path: '/dashboard/staff', redirect: '/app/staff' },
    { path: '/dashboard/staff/:path(.*)', redirect: to => `/app/staff/${to.params.path}` },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
