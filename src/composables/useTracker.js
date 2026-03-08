import { onMounted, onUnmounted } from 'vue'
import { useAnalyticsStore } from '../stores/analytics.js'

let flushInterval = null

export function useTracker() {
  const store = useAnalyticsStore()

  function init() {
    store.init()
    store.push('page_view', {
      referrer: document.referrer,
      device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
    })

    // Flush every 30s
    flushInterval = setInterval(store.flush, 30_000)

    // Session end
    const handleEnd = () => store.push('session_end', { events_count: store.events.length })
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) handleEnd()
    })
    window.addEventListener('beforeunload', handleEnd)

    // Scroll depth
    const depths = [25, 50, 75, 100]
    const fired = new Set()
    const onScroll = () => {
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      depths.forEach(d => {
        if (pct >= d && !fired.has(d)) {
          fired.add(d)
          store.push('scroll_depth', { depth_pct: d, time_ms: Date.now() })
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  function trackClick(label, href, section, extra = {}) {
    store.push('cta_click', { cta_label: label, cta_href: href, section, ...extra })
  }

  function trackSectionView(sectionId) {
    store.push('section_view', { section_id: sectionId })
  }

  function trackBookingIntent(serviceOrPlan, referralUrl) {
    store.push('booking_intent', { service_or_plan: serviceOrPlan, referral_url: referralUrl })
    store.push('cta_click', { cta_label: 'booking_intent', section: serviceOrPlan })
  }

  return { init, trackClick, trackSectionView, trackBookingIntent }
}
