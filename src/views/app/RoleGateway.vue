<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const roles = [
  { id: 'super-admin', icon: 'ph-crown',          label: 'Super Admin',      desc: 'Chain-wide oversight & control',      route: '/app/super-admin' },
  { id: 'admin',       icon: 'ph-building-office', label: 'Admin',            desc: 'Location management & operations',    route: '/app/admin' },
  { id: 'staff',       icon: 'ph-users-three',     label: 'Staff / Reception',desc: 'Daily ops & client intake',           route: '/app/staff' },
  { id: 'barber',      icon: 'ph-scissors',        label: 'Barber',           desc: 'My schedule, clients & earnings',     route: '/app/barber' },
  { id: 'client',      icon: 'ph-user-circle',     label: 'Client Portal',    desc: 'Appointments & membership',           route: '/app/client' },
]
</script>

<template>
  <div class="gateway-root">
    <!-- Ambient glow -->
    <div class="gateway-glow"></div>

    <div class="gateway-inner">
      <!-- Brand -->
      <div class="brand-wrap app-enter">
        <div class="brand-icon">
          <i class="ph ph-scissors"></i>
        </div>
        <div>
          <div class="brand-name font-cinzel">LION'S BARBERSHOP</div>
          <div class="brand-tagline">Innovate · Automate · Elevate</div>
        </div>
      </div>

      <div class="divider-wrap app-enter app-d1">
        <hr class="app-divider-gold" />
      </div>

      <div class="role-prompt app-enter app-d2">Select your role to continue</div>

      <!-- Role Grid -->
      <div class="roles-grid">
        <!-- Row 1: Super Admin (center) -->
        <div style="grid-column: 2;">
          <div
            class="role-card app-enter app-d2"
            @click="router.push('/app/super-admin')"
          >
            <div class="role-icon-wrap gold">
              <i class="ph ph-crown role-icon"></i>
            </div>
            <div class="role-card-body">
              <div class="role-label">Super Admin</div>
              <div class="role-desc">Chain-wide oversight & control</div>
            </div>
            <i class="ph ph-arrow-right role-arrow"></i>
          </div>
        </div>
        <div></div><!-- spacer col 3 -->

        <!-- Row 2: Admin, Staff, Barber -->
        <div
          v-for="(role, i) in roles.slice(1, 4)"
          :key="role.id"
          class="role-card app-enter"
          :class="`app-d${i + 3}`"
          @click="router.push(role.route)"
        >
          <div class="role-icon-wrap">
            <i :class="`ph ${role.icon} role-icon`"></i>
          </div>
          <div class="role-card-body">
            <div class="role-label">{{ role.label }}</div>
            <div class="role-desc">{{ role.desc }}</div>
          </div>
          <i class="ph ph-arrow-right role-arrow"></i>
        </div>

        <!-- Row 3: Client (center) -->
        <div style="grid-column: 2;">
          <div
            class="role-card app-enter app-d6"
            @click="router.push('/app/client')"
          >
            <div class="role-icon-wrap">
              <i class="ph ph-user-circle role-icon"></i>
            </div>
            <div class="role-card-body">
              <div class="role-label">Client Portal</div>
              <div class="role-desc">Appointments & membership</div>
            </div>
            <i class="ph ph-arrow-right role-arrow"></i>
          </div>
        </div>
      </div>

      <RouterLink to="/" class="back-link app-enter app-d7">
        <i class="ph ph-arrow-left"></i>
        Back to Site
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.gateway-root {
  width: 100%;
  min-height: 100vh;
  background: var(--app-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
  overflow: hidden;
}

.gateway-glow {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 700px;
  height: 500px;
  background: radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.10) 0%, transparent 65%);
  pointer-events: none;
}

.gateway-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 740px;
  gap: 0;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
}

.brand-icon {
  width: 52px; height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #c9a84c, #7a6008);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 32px rgba(201,168,76,0.25), 0 4px 16px rgba(0,0,0,0.4);
}
.brand-icon i {
  font-size: 1.5rem;
  color: #06080f;
}
.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #c9a84c;
  letter-spacing: 0.14em;
  line-height: 1.1;
}
.brand-tagline {
  font-size: 0.72rem;
  color: rgba(201,168,76,0.55);
  letter-spacing: 0.12em;
  margin-top: 2px;
  font-family: 'Inter', sans-serif;
}

.divider-wrap {
  width: 100%;
  margin-bottom: 24px;
}

.role-prompt {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--app-text-muted);
  margin-bottom: 20px;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto auto;
  gap: 12px;
  width: 100%;
}

.role-card {
  background: var(--app-surface);
  border: 1px solid var(--app-border-dim);
  border-radius: 12px;
  padding: 18px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 14px;
  position: relative;
  overflow: hidden;
  transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
}
.role-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent);
  pointer-events: none;
}
.role-card:hover {
  transform: translateY(-3px);
  border-color: rgba(201,168,76,0.3);
  background: rgba(201,168,76,0.04);
  box-shadow: 0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,76,0.1);
}
.role-card:hover .role-arrow { opacity: 1; transform: translateX(3px); color: #c9a84c; }
.role-card:hover .role-icon-wrap { box-shadow: 0 0 18px rgba(201,168,76,0.2); }

.role-icon-wrap {
  width: 42px; height: 42px;
  border-radius: 10px;
  background: var(--app-subtle);
  border: 1px solid var(--app-border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: box-shadow 0.2s ease;
}
.role-icon-wrap.gold {
  background: rgba(201,168,76,0.1);
  border-color: rgba(201,168,76,0.25);
}
.role-icon-wrap.gold .role-icon { color: #c9a84c; }

.role-icon {
  font-size: 1.2rem;
  color: var(--app-text-dim);
}

.role-card-body { flex: 1; min-width: 0; }
.role-label {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--app-text);
  margin-bottom: 3px;
}
.role-desc {
  font-size: 0.73rem;
  color: var(--app-text-muted);
  line-height: 1.4;
}

.role-arrow {
  font-size: 0.9rem;
  color: var(--app-text-muted);
  opacity: 0;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.back-link {
  margin-top: 32px;
  font-size: 0.78rem;
  color: var(--app-text-muted);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.15s ease;
  font-family: 'Inter', sans-serif;
}
.back-link:hover { color: #c9a84c; }
</style>
