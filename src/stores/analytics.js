import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnalyticsStore = defineStore('analytics', () => {
  const events = ref([])
  const sessionId = ref(null)
  const utmParams = ref({})

  function init() {
    // Session ID
    let sid = sessionStorage.getItem('ll_session_id')
    if (!sid) {
      sid = crypto.randomUUID()
      sessionStorage.setItem('ll_session_id', sid)
    }
    sessionId.value = sid

    // UTM params
    const params = new URLSearchParams(window.location.search)
    utmParams.value = {
      utm_source: params.get('utm_source'),
      utm_medium: params.get('utm_medium'),
      utm_campaign: params.get('utm_campaign'),
      utm_content: params.get('utm_content'),
      utm_term: params.get('utm_term'),
    }
  }

  function push(eventName, payload = {}) {
    const event = {
      event: eventName,
      session_id: sessionId.value,
      timestamp: Date.now(),
      url: window.location.href,
      ...utmParams.value,
      ...payload,
    }
    events.value.push(event)
    console.debug('[tracker]', event)

    // GTM dataLayer push
    if (window.dataLayer) {
      window.dataLayer.push({ event: eventName, ...payload })
    }
  }

  async function flush() {
    if (!events.value.length) return
    const batch = [...events.value]
    events.value = []
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batch),
      })
    } catch {
      // offline — re-queue
      events.value.unshift(...batch)
    }
  }

  return { events, sessionId, utmParams, init, push, flush }
})
