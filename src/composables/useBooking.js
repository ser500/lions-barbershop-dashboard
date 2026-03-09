import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

export function useBooking() {
  // Step state (1-indexed: 1=service, 2=barber, 3=time, 4=contact, 5=payment, 6=confirm)
  const step = ref(1)

  // Selections
  const selectedLocation = ref(null)   // { id, name, city }
  const selectedService  = ref(null)   // { id, name, duration_min, price }
  const selectedBarber   = ref(null)   // { id, display_name, avatar_url, bio, specialties }
  const selectedSlot     = ref(null)   // { label, utcStart, utcEnd }
  const contactInfo      = ref({ name: '', email: '', phone: '', notes: '' })

  // Result
  const bookingResult    = ref(null)   // { success, appointment_id, client_id } or { error, message }
  const submitting       = ref(false)
  const submitError      = ref(null)

  const totalSteps = 6

  const canAdvance = computed(() => {
    if (step.value === 1) return !!selectedService.value
    if (step.value === 2) return !!selectedBarber.value
    if (step.value === 3) return !!selectedSlot.value
    if (step.value === 4) return !!(contactInfo.value.name && contactInfo.value.email)
    return true
  })

  function next()  { if (step.value < totalSteps) step.value++ }
  function back()  { if (step.value > 1) step.value-- }
  function goTo(n) { step.value = n }

  function reset() {
    step.value             = 1
    selectedLocation.value = null
    selectedService.value  = null
    selectedBarber.value   = null
    selectedSlot.value     = null
    contactInfo.value      = { name: '', email: '', phone: '', notes: '' }
    bookingResult.value    = null
    submitError.value      = null
    submitting.value       = false
  }

  async function submitBooking(sessionId = null) {
    if (!selectedBarber.value || !selectedService.value || !selectedSlot.value) return

    submitting.value  = true
    submitError.value = null

    try {
      const { data, error } = await supabase.rpc('create_booking', {
        p_client_name:  contactInfo.value.name,
        p_client_email: contactInfo.value.email,
        p_client_phone: contactInfo.value.phone || null,
        p_barber_id:    selectedBarber.value.id,
        p_service_id:   selectedService.value.id,
        p_location_id:  selectedLocation.value?.id || selectedBarber.value.location_id,
        p_starts_at:    selectedSlot.value.utcStart,
        p_ends_at:      selectedSlot.value.utcEnd,
        p_session_id:   sessionId,
      })

      if (error) throw error
      if (data?.error) {
        submitError.value = data.message
        return { success: false, error: data.error }
      }

      bookingResult.value = data
      step.value = 6 // jump to confirmation
      return { success: true, ...data }
    } catch (err) {
      submitError.value = err.message
      return { success: false, error: err.message }
    } finally {
      submitting.value = false
    }
  }

  return {
    step, totalSteps,
    selectedLocation, selectedService, selectedBarber, selectedSlot, contactInfo,
    bookingResult, submitting, submitError,
    canAdvance,
    next, back, goTo, reset, submitBooking,
  }
}
