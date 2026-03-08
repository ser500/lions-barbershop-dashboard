<script setup>
import { useRevenueStore } from '../../../stores/revenue'

const revenueStore = useRevenueStore()

const allBarbers = [
  { name: 'Devon Richards', initials: 'DR', location: 'Downtown',  apptsMtd: 218, revMtd: 28400, utilization: 92, status: 'active' },
  { name: 'Marcus Vance',   initials: 'MV', location: 'Downtown',  apptsMtd: 162, revMtd: 19800, utilization: 78, status: 'active' },
  { name: 'James Pierce',   initials: 'JP', location: 'East Side', apptsMtd: 138, revMtd: 16200, utilization: 71, status: 'active' },
  { name: 'Andre Smith',    initials: 'AS', location: 'East Side', apptsMtd: 96,  revMtd: 11420, utilization: 62, status: 'active' },
]

const topPerformers = allBarbers.slice(0, 3)

function statusStyle(status) {
  if (status === 'active') return 'background:rgba(34,197,94,0.1);color:#22c55e;border:1px solid rgba(34,197,94,0.2)'
  return 'background:#1a1a1a;color:#6b7280;border:1px solid #2a2a2a'
}
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- All barbers table -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4">
        <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">All Barbers</div>
        <div style="font-size:0.75rem;color:#6b7280;margin-top:2px">Month-to-date performance across all locations</div>
      </div>
      <table class="w-full" style="border-collapse:collapse">
        <thead>
          <tr style="border-bottom:1px solid #1a1a1a">
            <th class="text-left pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Barber</th>
            <th class="text-left pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Location</th>
            <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Appts MTD</th>
            <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Revenue MTD</th>
            <th class="text-right pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Utilization</th>
            <th class="text-center pb-3" style="font-size:0.7rem;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b7280">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in allBarbers" :key="b.name" style="border-bottom:1px solid #0f0f0f">
            <td class="py-3">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ b.initials }}</div>
                <span style="font-size:0.83rem;font-weight:600;color:#e5e7eb">{{ b.name }}</span>
              </div>
            </td>
            <td class="py-3" style="font-size:0.8rem;color:#9ca3af">{{ b.location }}</td>
            <td class="py-3 text-right" style="font-size:0.83rem;color:#9ca3af">{{ b.apptsMtd }}</td>
            <td class="py-3 text-right" style="font-size:0.83rem;font-weight:600;color:#b8960c">${{ b.revMtd.toLocaleString() }}</td>
            <td class="py-3 text-right">
              <div class="flex items-center justify-end gap-2">
                <div style="width:60px;height:5px;background:#1a1a1a;border-radius:3px;overflow:hidden">
                  <div style="height:100%;border-radius:3px;background:#b8960c" :style="{ width: b.utilization + '%' }"></div>
                </div>
                <span style="font-size:0.78rem;color:#9ca3af">{{ b.utilization }}%</span>
              </div>
            </td>
            <td class="py-3 text-center">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="statusStyle(b.status)">{{ b.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Top performers -->
    <div>
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Top Performers</div>
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(b, i) in topPerformers" :key="b.name" class="rounded-xl p-5 flex items-center gap-4" style="background:#111;border:1px solid #1a1a1a">
          <div class="relative">
            <div class="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">{{ b.initials }}</div>
            <div class="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style="background:#050505;border:1px solid #1a1a1a;color:#b8960c">{{ i + 1 }}</div>
          </div>
          <div>
            <div style="font-size:0.9rem;font-weight:700;color:#e5e7eb">{{ b.name }}</div>
            <div style="font-size:0.75rem;color:#6b7280;margin-top:1px">{{ b.location }}</div>
            <div style="font-size:1rem;font-weight:700;color:#b8960c;margin-top:4px">${{ b.revMtd.toLocaleString() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
