<template>
  <div class="login-page">
    <div class="login-card">

      <!-- Logo -->
      <div class="login-logo">
        <img src="@/assets/images/logo/logo-white.webp" alt="Lion's Barbershop" class="logo-img" />
      </div>

      <!-- Mode tabs -->
      <div class="login-tabs">
        <button
          class="tab-btn"
          :class="{ active: mode === 'password' }"
          @click="switchMode('password')"
          type="button"
        >Password</button>
        <button
          class="tab-btn"
          :class="{ active: mode === 'magic' }"
          @click="switchMode('magic')"
          type="button"
        >Magic Link</button>
      </div>

      <!-- Password login -->
      <form v-if="mode === 'password'" @submit.prevent="handlePassword" class="login-form">
        <div class="field">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            class="app-input"
            placeholder="you@example.com"
            required
            autocomplete="email"
          />
        </div>

        <div class="field">
          <label>Password</label>
          <div class="password-wrap">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="app-input"
              placeholder="••••••••"
              required
              autocomplete="current-password"
            />
            <button type="button" class="pw-toggle" @click="showPassword = !showPassword" :aria-label="showPassword ? 'Hide password' : 'Show password'">
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.48c.35.79,8.82,19.57,27.65,38.41C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.35c18.83-18.84,27.3-37.62,27.65-38.41A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                <path d="M228,175a8,8,0,0,1-10.92-3l-19-33.2A123.23,123.23,0,0,1,162,155.46l5.07,35.15a8,8,0,0,1-6.64,9.14A8.81,8.81,0,0,1,159,200a8,8,0,0,1-7.88-6.71L146,158.26a124.77,124.77,0,0,1-36,0l-5.09,35.15A8,8,0,0,1,97,200a8.81,8.81,0,0,1-1.41-.12,8,8,0,0,1-6.64-9.14L94,155.46a123.23,123.23,0,0,1-36.06-16.69L39,172a8,8,0,1,1-13.94-8l20-35a153.47,153.47,0,0,1-19.3-20A8,8,0,1,1,38.22,99c16.81,21,43,45,89.78,45s73-24,89.78-45A8,8,0,1,1,230.08,109a153.47,153.47,0,0,1-19.3,20l20,35A8,8,0,0,1,228,175Z"/>
              </svg>
            </button>
          </div>
        </div>

        <label class="keep-signed">
          <input v-model="keepSignedIn" type="checkbox" class="keep-checkbox" />
          <span>Keep me signed in</span>
        </label>

        <p v-if="error" class="login-error">{{ error }}</p>

        <button type="submit" class="login-btn" :disabled="submitting">
          {{ submitting ? 'Signing in…' : 'Sign In' }}
        </button>
      </form>

      <!-- Magic link login -->
      <form v-else @submit.prevent="handleMagicLink" class="login-form">
        <p class="magic-hint">Enter your email and we'll send you a secure sign-in link — no password needed.</p>

        <div class="field">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            class="app-input"
            placeholder="you@example.com"
            required
            autocomplete="email"
          />
        </div>

        <p v-if="error" class="login-error">{{ error }}</p>
        <p v-if="magicSent" class="login-success">Link sent! Check your inbox.</p>

        <button type="submit" class="login-btn" :disabled="submitting || magicSent">
          {{ submitting ? 'Sending…' : magicSent ? 'Link Sent ✓' : 'Send Magic Link' }}
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const mode         = ref('password')
const email        = ref('')
const password     = ref('')
const showPassword = ref(false)
const keepSignedIn = ref(true)
const error        = ref('')
const submitting   = ref(false)
const magicSent    = ref(false)

const router = useRouter()
const { signIn, sendMagicLink } = useAuth()

function switchMode(m) {
  mode.value    = m
  error.value   = ''
  magicSent.value = false
}

async function handlePassword() {
  error.value = ''
  submitting.value = true
  try {
    const route = await signIn(email.value, password.value, keepSignedIn.value)
    router.push(route)
  } catch (err) {
    error.value = err.message ?? 'Sign in failed. Check your credentials.'
  } finally {
    submitting.value = false
  }
}

async function handleMagicLink() {
  error.value = ''
  submitting.value = true
  try {
    await sendMagicLink(email.value)
    magicSent.value = true
  } catch (err) {
    error.value = err.message ?? 'Could not send link. Make sure this email has an account.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: var(--app-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-image: radial-gradient(ellipse at 60% 20%, rgba(201,168,76,0.06) 0%, transparent 60%);
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 16px;
  padding: 2.5rem 2.5rem 2.75rem;
}

/* Logo */
.login-logo {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-img {
  height: 52px;
  width: auto;
  margin: 0 auto;
  object-fit: contain;
}

/* Tabs */
.login-tabs {
  display: flex;
  gap: 0;
  background: var(--app-surface-2);
  border-radius: 8px;
  padding: 3px;
  margin-bottom: 1.75rem;
}

.tab-btn {
  flex: 1;
  padding: 0.5rem 0;
  border: none;
  border-radius: 6px;
  font-size: 0.825rem;
  font-weight: 500;
  cursor: pointer;
  background: transparent;
  color: var(--app-text-muted);
  transition: background 0.2s, color 0.2s;
  font-family: inherit;
}

.tab-btn.active {
  background: var(--app-surface);
  color: var(--app-text);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-size: 0.78rem;
  color: var(--app-text-dim);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Password visibility toggle */
.password-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.password-wrap .app-input {
  padding-right: 2.6rem;
  width: 100%;
}
.pw-toggle {
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--app-text-muted);
  display: flex;
  align-items: center;
  transition: color 0.2s;
}
.pw-toggle:hover { color: var(--app-text-dim); }

/* Keep signed in */
.keep-signed {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  user-select: none;
}

.keep-checkbox {
  width: 15px;
  height: 15px;
  accent-color: #c9a84c;
  cursor: pointer;
  flex-shrink: 0;
}

.keep-signed span {
  font-size: 0.825rem;
  color: var(--app-text-dim);
}

/* Messages */
.magic-hint {
  font-size: 0.825rem;
  color: var(--app-text-muted);
  line-height: 1.5;
  margin-bottom: 0.25rem;
}

.login-error {
  font-size: 0.825rem;
  color: #f87171;
  text-align: center;
}

.login-success {
  font-size: 0.825rem;
  color: #4ade80;
  text-align: center;
}

/* Gold sign-in button */
.login-btn {
  width: 100%;
  padding: 0.8rem;
  background: #c9a84c;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  margin-top: 0.25rem;
}

.login-btn:hover:not(:disabled) {
  background: #dbb95a;
}

.login-btn:active:not(:disabled) {
  transform: scale(0.985);
}

.login-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
