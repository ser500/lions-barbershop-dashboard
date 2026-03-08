import { defineStore } from 'pinia'
import { ref } from 'vue'
import dayjs from 'dayjs'

export const useDashboardStore = defineStore('dashboard', () => {
  const loading = ref(false)
  const overview = ref(null)
  const traffic = ref(null)
  const behavior = ref(null)
  const funnel = ref(null)
  const services = ref(null)
  const team = ref(null)

  // ── Seed mock data for demo ──────────────────────────────────
  function seedMockData() {
    const days = Array.from({ length: 30 }, (_, i) => ({
      date: dayjs().subtract(29 - i, 'day').format('MMM D'),
      sessions: Math.floor(Math.random() * 80 + 20),
    }))

    overview.value = {
      todaySessions: 47,
      uniqueVisitors: 38,
      pageViews: 142,
      bounceRate: '34%',
      sessionsOverTime: days,
      topSources: [
        { name: 'Direct', value: 38 },
        { name: 'Google', value: 29 },
        { name: 'Instagram', value: 18 },
        { name: 'Referral', value: 11 },
        { name: 'Other', value: 4 },
      ],
      topCtas: [
        { label: 'Book Now', clicks: 84 },
        { label: 'Become a Member', clicks: 61 },
        { label: 'BLACK Plan', clicks: 42 },
        { label: 'GOLD Plan', clicks: 33 },
        { label: 'WhatsApp', clicks: 28 },
      ],
      recentEvents: [
        { event: 'cta_click', label: 'Book Now', time: '2s ago' },
        { event: 'section_view', label: 'Services', time: '8s ago' },
        { event: 'page_view', label: '/', time: '15s ago' },
        { event: 'booking_intent', label: 'BLACK Plan', time: '32s ago' },
        { event: 'scroll_depth', label: '75%', time: '45s ago' },
      ],
    }

    traffic.value = {
      bySources: [
        { source: 'Direct', sessions: 312, pct: '38%' },
        { source: 'Organic Search', sessions: 238, pct: '29%' },
        { source: 'Instagram', sessions: 148, pct: '18%' },
        { source: 'Referral', sessions: 90, pct: '11%' },
        { source: 'Other', sessions: 33, pct: '4%' },
      ],
      topReferrers: [
        { url: 'instagram.com', sessions: 98 },
        { url: 'google.com', sessions: 238 },
        { url: 'vagaro.com', sessions: 45 },
        { url: 'facebook.com', sessions: 29 },
      ],
      devices: [
        { type: 'Mobile', pct: 72 },
        { type: 'Desktop', pct: 23 },
        { type: 'Tablet', pct: 5 },
      ],
    }

    behavior.value = {
      sectionEngagement: [
        { section: 'Hero', avgTime: 12, views: 821 },
        { section: 'Services', avgTime: 48, views: 734 },
        { section: 'About', avgTime: 22, views: 612 },
        { section: 'Membership', avgTime: 61, views: 589 },
        { section: 'Plans', avgTime: 74, views: 543 },
        { section: 'Reviews', avgTime: 18, views: 498 },
        { section: 'Team', avgTime: 31, views: 467 },
        { section: 'Booking', avgTime: 39, views: 412 },
        { section: 'FAQ', avgTime: 27, views: 298 },
      ],
      scrollDepth: [
        { depth: '25%', pct: 94 },
        { depth: '50%', pct: 78 },
        { depth: '75%', pct: 52 },
        { depth: '100%', pct: 31 },
      ],
    }

    funnel.value = {
      steps: [
        { label: 'Visited Site', count: 821 },
        { label: 'Viewed Services', count: 734 },
        { label: 'Viewed a Plan', count: 543 },
        { label: 'Clicked Book CTA', count: 187 },
      ],
      planClicksBefore: [
        { plan: 'BLACK', clicks: 89 },
        { plan: 'GOLD', clicks: 62 },
        { plan: 'ESSENTIAL', clicks: 36 },
      ],
      avgTimeToCta: '2m 14s',
    }

    services.value = {
      coreServices: [
        { name: "Men's Haircut", views: 412 },
        { name: "Kid's Haircut", views: 287 },
        { name: 'Beard Trim', views: 264 },
        { name: 'Haircut + Beard', views: 341 },
        { name: 'Clean Shave', views: 178 },
        { name: 'Head Shave', views: 143 },
        { name: 'Hair Design', views: 198 },
      ],
      addOns: [
        { name: 'Fade Touch-up', views: 89 },
        { name: 'Eyebrow Trim', views: 134 },
        { name: 'Hot Towel', views: 201 },
        { name: 'Scalp Treatment', views: 76 },
        { name: 'Line-up', views: 167 },
        { name: 'Beard Color', views: 54 },
        { name: 'Wax', views: 43 },
        { name: 'Toning', views: 38 },
      ],
    }

    team.value = {
      barbers: [
        { name: 'Gabriel', views: 312, bookingClicks: 87 },
        { name: 'Isabelle', views: 289, bookingClicks: 74 },
        { name: 'Bormann', views: 198, bookingClicks: 56 },
        { name: 'Ulysses', views: 176, bookingClicks: 48 },
        { name: 'Enzo', views: 154, bookingClicks: 43 },
        { name: 'Guido', views: 141, bookingClicks: 39 },
        { name: 'Vinicius', views: 128, bookingClicks: 35 },
      ],
    }
  }

  seedMockData()

  return { loading, overview, traffic, behavior, funnel, services, team }
})
