import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

const LOCATION_TZ = 'America/Chicago'

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', {
    timeZone: LOCATION_TZ,
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  })
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-US', {
    timeZone: LOCATION_TZ, hour: 'numeric', minute: '2-digit', hour12: true,
  })
}

export function useClientAppointments() {
  const appointments = ref([])
  const loading      = ref(false)
  const error        = ref(null)

  const upcoming = computed(() =>
    appointments.value.filter(a => ['scheduled', 'confirmed'].includes(a.status))
      .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt))
  )

  const history = computed(() =>
    appointments.value.filter(a => ['completed', 'cancelled', 'no_show'].includes(a.status))
      .sort((a, b) => new Date(b.startsAt) - new Date(a.startsAt))
  )

  const stats = computed(() => {
    const completed = appointments.value.filter(a => a.status === 'completed')
    const totalSpend = completed.reduce((s, a) => s + (a.pricePaid || 0), 0)
    const last = completed[0]
    return {
      totalVisits: completed.length,
      totalSpend: Math.round(totalSpend),
      lastVisit: last ? formatDate(last.startsAt) : null,
      avgTicket: completed.length ? Math.round(totalSpend / completed.length) : 0,
    }
  })

  async function fetch() {
    loading.value = true
    error.value   = null

    try {
      // Get current auth session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) return

      // Find the client record for this user
      const { data: clientRow } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', session.user.id)
        .single()

      if (!clientRow) return

      // Fetch all appointments for this client
      const { data, error: fetchErr } = await supabase
        .from('appointments')
        .select(`
          id,
          starts_at,
          ends_at,
          status,
          price_paid,
          notes,
          services ( name, duration_min, price ),
          locations ( name, city ),
          barbers (
            id,
            user_id,
            profiles!user_id ( name, display_name, avatar_url )
          ),
          reviews ( id, rating, body )
        `)
        .eq('client_id', clientRow.id)
        .order('starts_at', { ascending: false })

      if (fetchErr) throw fetchErr

      appointments.value = (data || []).map(a => ({
        id:           a.id,
        startsAt:     a.starts_at,
        endsAt:       a.ends_at,
        status:       a.status,
        pricePaid:    parseFloat(a.price_paid) || null,
        notes:        a.notes,
        dateLabel:    formatDate(a.starts_at),
        timeLabel:    formatTime(a.starts_at),
        service:      a.services?.name || '',
        duration:     a.services?.duration_min || 0,
        price:        parseFloat(a.services?.price) || 0,
        location:     a.locations?.name || '',
        barberName:   a.barbers?.profiles?.display_name || a.barbers?.profiles?.name || 'Barber',
        barberAvatar: a.barbers?.profiles?.avatar_url || null,
        review:       a.reviews?.[0] || null,
        canCancel:    ['scheduled', 'confirmed'].includes(a.status) &&
                      new Date(a.starts_at) > new Date(),
        canReview:    a.status === 'completed' && !a.reviews?.length,
      }))
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function cancelAppointment(appointmentId) {
    const { error: rpcErr } = await supabase.rpc('update_appointment_status', {
      p_appointment_id: appointmentId,
      p_status:         'cancelled',
    })
    if (!rpcErr) {
      const appt = appointments.value.find(a => a.id === appointmentId)
      if (appt) appt.status = 'cancelled'
    }
    return { success: !rpcErr }
  }

  async function submitReview(appointmentId, barberId, clientId, rating, body) {
    const { error: revErr } = await supabase
      .from('reviews')
      .insert({ appointment_id: appointmentId, barber_id: barberId, client_id: clientId, rating, body })
    if (!revErr) {
      const appt = appointments.value.find(a => a.id === appointmentId)
      if (appt) appt.review = { rating, body }
    }
    return { success: !revErr }
  }

  return {
    appointments, upcoming, history, stats,
    loading, error,
    fetch, cancelAppointment, submitReview,
  }
}
