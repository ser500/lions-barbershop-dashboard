<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const roles = [
  {
    id: 'super-admin',
    icon: 'ph-crown',
    label: 'Super Admin',
    desc: 'Chain-wide overview & control',
    route: '/app/super-admin',
  },
  {
    id: 'admin',
    icon: 'ph-building-office',
    label: 'Admin',
    desc: 'Location management & ops',
    route: '/app/admin',
  },
  {
    id: 'staff',
    icon: 'ph-users-three',
    label: 'Staff / Reception',
    desc: 'Daily ops & client intake',
    route: '/app/staff',
  },
  {
    id: 'barber',
    icon: 'ph-scissors',
    label: 'Barber',
    desc: 'My schedule & earnings',
    route: '/app/barber',
  },
  {
    id: 'client',
    icon: 'ph-user-circle',
    label: 'Client',
    desc: 'My appointments & membership',
    route: '/app/client',
  },
]
</script>
<template>
  <div class="font-inter w-full min-h-screen flex flex-col items-center justify-center px-6 py-12" style="background:#050505">
    <!-- Brand header -->
    <div class="flex items-center gap-4 mb-2">
      <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
        <i class="ph ph-scissors text-black text-xl"></i>
      </div>
      <div>
        <div class="font-cinzel font-bold text-2xl" style="color:#b8960c;letter-spacing:0.15em">LION'S BARBERSHOP</div>
      </div>
    </div>
    <div class="mb-10" style="font-size:0.85rem;color:#b8960c;letter-spacing:0.12em;font-weight:500">Innovate. Automate. Elevate.</div>

    <div style="font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#6b7280;margin-bottom:20px">Select Your Role</div>

    <!-- Role cards grid -->
    <div class="grid grid-cols-3 gap-4" style="max-width:680px;width:100%">
      <!-- Row 1: Super Admin centered -->
      <div class="col-start-2">
        <div
          class="role-card cursor-pointer rounded-xl p-6 flex flex-col items-center gap-3 transition-all"
          style="background:#111;border:1px solid #1a1a1a;text-align:center"
          @click="router.push('/app/super-admin')"
          @mouseenter="e => { e.currentTarget.style.borderColor='rgba(184,150,12,0.4)'; e.currentTarget.style.background='rgba(184,150,12,0.05)' }"
          @mouseleave="e => { e.currentTarget.style.borderColor='#1a1a1a'; e.currentTarget.style.background='#111' }"
        >
          <i class="ph ph-crown" style="font-size:2rem;color:#b8960c"></i>
          <div>
            <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb;margin-bottom:3px">Super Admin</div>
            <div style="font-size:0.75rem;color:#6b7280">Chain-wide overview & control</div>
          </div>
        </div>
      </div>

      <!-- Empty col -->
      <div></div>

      <!-- Row 2: Admin, Staff, Barber -->
      <div
        class="role-card cursor-pointer rounded-xl p-6 flex flex-col items-center gap-3 transition-all"
        style="background:#111;border:1px solid #1a1a1a;text-align:center"
        @click="router.push('/app/admin')"
        @mouseenter="e => { e.currentTarget.style.borderColor='rgba(184,150,12,0.4)'; e.currentTarget.style.background='rgba(184,150,12,0.05)' }"
        @mouseleave="e => { e.currentTarget.style.borderColor='#1a1a1a'; e.currentTarget.style.background='#111' }"
      >
        <i class="ph ph-building-office" style="font-size:2rem;color:#b8960c"></i>
        <div>
          <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb;margin-bottom:3px">Admin</div>
          <div style="font-size:0.75rem;color:#6b7280">Location management & ops</div>
        </div>
      </div>

      <div
        class="role-card cursor-pointer rounded-xl p-6 flex flex-col items-center gap-3 transition-all"
        style="background:#111;border:1px solid #1a1a1a;text-align:center"
        @click="router.push('/app/staff')"
        @mouseenter="e => { e.currentTarget.style.borderColor='rgba(184,150,12,0.4)'; e.currentTarget.style.background='rgba(184,150,12,0.05)' }"
        @mouseleave="e => { e.currentTarget.style.borderColor='#1a1a1a'; e.currentTarget.style.background='#111' }"
      >
        <i class="ph ph-users-three" style="font-size:2rem;color:#b8960c"></i>
        <div>
          <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb;margin-bottom:3px">Staff / Reception</div>
          <div style="font-size:0.75rem;color:#6b7280">Daily ops & client intake</div>
        </div>
      </div>

      <div
        class="role-card cursor-pointer rounded-xl p-6 flex flex-col items-center gap-3 transition-all"
        style="background:#111;border:1px solid #1a1a1a;text-align:center"
        @click="router.push('/app/barber')"
        @mouseenter="e => { e.currentTarget.style.borderColor='rgba(184,150,12,0.4)'; e.currentTarget.style.background='rgba(184,150,12,0.05)' }"
        @mouseleave="e => { e.currentTarget.style.borderColor='#1a1a1a'; e.currentTarget.style.background='#111' }"
      >
        <i class="ph ph-scissors" style="font-size:2rem;color:#b8960c"></i>
        <div>
          <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb;margin-bottom:3px">Barber</div>
          <div style="font-size:0.75rem;color:#6b7280">My schedule & earnings</div>
        </div>
      </div>

      <!-- Row 3: Client centered -->
      <div class="col-start-2">
        <div
          class="role-card cursor-pointer rounded-xl p-6 flex flex-col items-center gap-3 transition-all"
          style="background:#111;border:1px solid #1a1a1a;text-align:center"
          @click="router.push('/app/client')"
          @mouseenter="e => { e.currentTarget.style.borderColor='rgba(184,150,12,0.4)'; e.currentTarget.style.background='rgba(184,150,12,0.05)' }"
          @mouseleave="e => { e.currentTarget.style.borderColor='#1a1a1a'; e.currentTarget.style.background='#111' }"
        >
          <i class="ph ph-user-circle" style="font-size:2rem;color:#b8960c"></i>
          <div>
            <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb;margin-bottom:3px">Client</div>
            <div style="font-size:0.75rem;color:#6b7280">My appointments & membership</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back to site -->
    <RouterLink to="/" class="mt-10" style="font-size:0.8rem;color:#6b7280;text-decoration:none;transition:color 0.2s"
      @mouseenter="e => e.target.style.color='#b8960c'"
      @mouseleave="e => e.target.style.color='#6b7280'"
    >← Back to Site</RouterLink>
  </div>
</template>
