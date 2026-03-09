import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const LOCATION_TZ = 'America/Chicago'
const SLOT_INTERVAL = 30 // minutes between slot starts

// Convert a wall-clock time on a given date in a timezone to a UTC Date object
function localToUTC(dateStr, hour, minute, timezone) {
  // Build an ISO string and interpret via Intl trick
  const isoStr = `${dateStr}T${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}:00`
  // Create a Date treating the string as UTC, then compute the offset
  const approxUTC = new Date(isoStr + 'Z')
  const localAtApprox = new Date(approxUTC.toLocaleString('en-US', { timeZone: timezone }))
  const offsetMs = approxUTC - localAtApprox
  return new Date(approxUTC.getTime() + offsetMs)
}

// Format a UTC timestamp as local time string: "9:00 AM"
function formatLocalTime(utcDate, timezone) {
  return utcDate.toLocaleTimeString('en-US', {
    timeZone: timezone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function useAvailability() {
  const slots   = ref([])   // [{ label: '9:00 AM', utcStart: Date, utcEnd: Date }]
  const loading = ref(false)
  const error   = ref(null)

  async function fetchSlots(barberId, serviceDurationMin, dateStr) {
    loading.value = true
    error.value   = null
    slots.value   = []

    try {
      const date = new Date(dateStr + 'T12:00:00Z') // noon UTC to avoid date shifting
      const dayOfWeek = new Date(dateStr + 'T12:00:00Z').getUTCDay() // 0=Sun

      // 1. Get barber's weekly schedule for this day
      const { data: avail, error: availErr } = await supabase
        .from('availability')
        .select('start_time, end_time')
        .eq('barber_id', barberId)
        .eq('day_of_week', dayOfWeek)
        .single()

      if (availErr || !avail) return // barber doesn't work this day

      // 2. Check for time_off covering this date
      const { data: timeOff } = await supabase
        .from('time_off')
        .select('id')
        .eq('barber_id', barberId)
        .lte('start_date', dateStr)
        .gte('end_date', dateStr)

      if (timeOff?.length > 0) return // barber is off this day

      // 3. Get existing appointments this barber has on this date
      const { data: existing } = await supabase
        .from('appointments')
        .select('starts_at, ends_at')
        .eq('barber_id', barberId)
        .not('status', 'in', '("cancelled","no_show")')
        .gte('starts_at', dateStr + 'T00:00:00Z')
        .lt('starts_at',  dateStr + 'T23:59:59Z')

      const bookedRanges = (existing || []).map(a => ({
        start: new Date(a.starts_at).getTime(),
        end:   new Date(a.ends_at).getTime(),
      }))

      // 4. Generate candidate slots from availability window
      const [startH, startM] = avail.start_time.split(':').map(Number)
      const [endH, endM]     = avail.end_time.split(':').map(Number)

      const windowStartMin = startH * 60 + startM
      const windowEndMin   = endH   * 60 + endM

      const now = Date.now()
      const generated = []

      for (let cursor = windowStartMin; cursor + serviceDurationMin <= windowEndMin; cursor += SLOT_INTERVAL) {
        const slotH = Math.floor(cursor / 60)
        const slotM = cursor % 60

        const utcStart = localToUTC(dateStr, slotH, slotM, LOCATION_TZ)
        const utcEnd   = new Date(utcStart.getTime() + serviceDurationMin * 60000)

        // Skip slots in the past
        if (utcStart.getTime() <= now) continue

        // Skip slots that overlap with existing appointments
        const startMs = utcStart.getTime()
        const endMs   = utcEnd.getTime()
        const hasConflict = bookedRanges.some(b => startMs < b.end && endMs > b.start)
        if (hasConflict) continue

        generated.push({
          label:    formatLocalTime(utcStart, LOCATION_TZ),
          utcStart: utcStart.toISOString(),
          utcEnd:   utcEnd.toISOString(),
        })
      }

      slots.value = generated
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function reset() {
    slots.value   = []
    error.value   = null
    loading.value = false
  }

  return { slots, loading, error, fetchSlots, reset }
}
