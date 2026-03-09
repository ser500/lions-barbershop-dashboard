import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const user = ref(null)
const profile = ref(null)
const loading = ref(true)

const ROLE_ROUTES = {
  super_admin: '/app/super-admin',
  admin: '/app/admin',
  staff: '/app/staff',
  barber: '/app/barber',
  client: '/app/client',
}

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Failed to fetch profile:', error.message)
    return null
  }
  return data
}

export function useAuth() {
  async function signIn(email, password, keepSignedIn = true) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    if (!keepSignedIn) {
      sessionStorage.setItem('lions_session_temp', '1')
    } else {
      sessionStorage.removeItem('lions_session_temp')
    }

    user.value = data.user

    // Get role from user_metadata immediately (no extra round-trip needed for routing).
    // fetchProfile is fired in the background to hydrate the full profile ref.
    const role = data.user.user_metadata?.role
    fetchProfile(data.user.id).then(p => { if (p) profile.value = p })

    return ROLE_ROUTES[role] ?? '/app/client'
  }

  async function sendMagicLink(email) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: window.location.origin + '/app',
      },
    })
    if (error) throw error
  }

  async function signOut() {
    await supabase.auth.signOut()
    user.value = null
    profile.value = null
  }

  function initAuth() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        user.value = session.user
        // Defer profile fetch so it doesn't block auth state settlement
        setTimeout(() => {
          fetchProfile(session.user.id).then(p => { if (p) profile.value = p })
        }, 100)
      }
      loading.value = false
    })

    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        user.value = session.user
        setTimeout(() => {
          fetchProfile(session.user.id).then(p => { if (p) profile.value = p })
        }, 100)
      } else {
        user.value = null
        profile.value = null
      }
    })
  }

  return {
    user,
    profile,
    loading,
    signIn,
    sendMagicLink,
    signOut,
    initAuth,
    ROLE_ROUTES,
  }
}
