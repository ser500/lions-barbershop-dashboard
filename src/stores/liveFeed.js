import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - new Date(ts)) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function formatEvent(appt) {
  const barberName  = appt.barbers?.profiles?.[0]?.display_name || 'Barber'
  const clientName  = appt.clients?.name || 'Client'
  const serviceName = appt.services?.name || 'Service'
  const amount      = appt.payments?.[0]?.amount
    ? ` — $${parseFloat(appt.payments[0].amount).toFixed(0)}`
    : ''
  const action = appt.status === 'completed' ? 'completed' : 'confirmed'
  return `${barberName} ${action} ${serviceName} for ${clientName}${amount}`
}

const FALLBACK_EVENTS = [
  { id: 'f1',  text: 'Devon completed Signature Cut + Beard for Marcus Johnson — $110', time: '2m ago'  },
  { id: 'f2',  text: 'New walk-in: Jordan T. — Signature Cut + Beard',                  time: '5m ago'  },
  { id: 'f3',  text: 'VIP member Michael R. checked in',                                 time: '8m ago'  },
  { id: 'f4',  text: 'Premium member Carlos M. rebooked for next Tuesday',               time: '12m ago' },
  { id: 'f5',  text: 'Marcus V. completed Haircut + Design for Antoine B. — $85',       time: '15m ago' },
  { id: 'f6',  text: 'Appointment confirmed: Chris W. at 11:15 AM',                      time: '18m ago' },
  { id: 'f7',  text: 'New Essential subscriber: Tyrone B. — $49/mo',                    time: '24m ago' },
  { id: 'f8',  text: 'East Side: 4 clients in queue — avg wait 18 min',                 time: '28m ago' },
  { id: 'f9',  text: 'James P. completed Royal Shave for James T. — $75',               time: '31m ago' },
  { id: 'f10', text: 'Downtown revenue on pace for best Monday this month',              time: '35m ago' },
]

export const useLiveFeedStore = defineStore('liveFeed', () => {
  const events  = ref(FALLBACK_EVENTS)
  const loading = ref(false)

  async function fetch() {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          id,
          status,
          created_at,
          clients ( name ),
          services!appointments_service_id_fkey ( name ),
          payments ( amount ),
          barbers!appointments_barber_id_fkey ( profiles ( display_name ) )
        `)
        .in('status', ['completed', 'confirmed'])
        .order('created_at', { ascending: false })
        .limit(15)

      if (error) throw error

      if (!(data?.length > 0)) return

      events.value = (data || []).map((a, i) => ({
        id:   a.id || i,
        text: formatEvent(a),
        time: timeAgo(a.created_at),
      }))
    } finally {
      loading.value = false
    }
  }

  // Set up Realtime subscription on appointments
  const channel = supabase
    .channel('live-feed-appointments')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'appointments' },
      async (payload) => {
        const apptId = payload.new?.id
        if (!apptId) return

        // Fetch the full record for this appointment
        const { data } = await supabase
          .from('appointments')
          .select(`
            id,
            status,
            created_at,
            clients ( name ),
            services!appointments_service_id_fkey ( name ),
            payments ( amount ),
            barbers!appointments_barber_id_fkey ( profiles ( display_name ) )
          `)
          .eq('id', apptId)
          .single()

        if (data) {
          const newEvent = {
            id:   data.id,
            text: formatEvent(data),
            time: timeAgo(data.updated_at),
          }
          // Remove existing event with same id and prepend new one
          events.value = [newEvent, ...events.value.filter(e => e.id !== data.id)].slice(0, 15)
        }
      }
    )
    .subscribe()

  fetch()

  return { events, loading }
})
