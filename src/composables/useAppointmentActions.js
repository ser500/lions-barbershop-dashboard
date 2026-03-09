import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

export function useAppointmentActions() {
  const loading = ref(false)
  const error   = ref(null)

  async function callRpc(appointmentId, status, pricePaid = null) {
    loading.value = true
    error.value   = null
    try {
      const { data, error: rpcErr } = await supabase.rpc('update_appointment_status', {
        p_appointment_id: appointmentId,
        p_status:         status,
        p_price_paid:     pricePaid,
      })
      if (rpcErr) throw rpcErr
      if (data?.error) throw new Error(data.message || data.error)
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const confirm  = (id)            => callRpc(id, 'confirmed')
  const complete = (id, pricePaid) => callRpc(id, 'completed', pricePaid)
  const cancel   = (id)            => callRpc(id, 'cancelled')
  const noShow   = (id)            => callRpc(id, 'no_show')

  return { confirm, complete, cancel, noShow, loading, error }
}
