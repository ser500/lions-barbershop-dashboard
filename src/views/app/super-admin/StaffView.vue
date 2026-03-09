<script setup>
import { useRevenueStore } from '../../../stores/revenue'

const revenueStore = useRevenueStore()

const allBarbers = [
  { name: 'Devon Richards', initials: 'DR', location: 'Downtown',  apptsMtd: 218, revMtd: 28400, utilization: 92, status: 'active' },
  { name: 'Marcus Vance',   initials: 'MV', location: 'Downtown',  apptsMtd: 162, revMtd: 19800, utilization: 78, status: 'active' },
  { name: 'James Pierce',   initials: 'JP', location: 'East Side', apptsMtd: 138, revMtd: 16200, utilization: 71, status: 'active' },
  { name: 'Andre Smith',    initials: 'AS', location: 'East Side', apptsMtd: 96,  revMtd: 11420, utilization: 62, status: 'active' },
]

const topPerformers = allBarbers.slice(0, 5)
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">
    <!-- All barbers table -->
    <div class="app-card app-enter app-d1" style="padding:0;overflow:hidden">
      <div style="padding:20px 20px 0">
        <div class="app-section-label" style="margin-bottom:4px">All Barbers</div>
        <div style="font-size:0.75rem;color:var(--app-text-muted);margin-bottom:16px">Month-to-date performance across all locations</div>
      </div>
      <table class="app-table w-full">
        <thead>
          <tr>
            <th class="text-left">Barber</th>
            <th class="text-left">Location</th>
            <th class="text-right">Appts MTD</th>
            <th class="text-right">Revenue MTD</th>
            <th class="text-right">Utilization</th>
            <th class="text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in allBarbers" :key="b.name">
            <td>
              <div class="person-badge">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-black" style="background:linear-gradient(135deg,var(--app-gold),#8a7009)">{{ b.initials }}</div>
                <span style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ b.name }}</span>
              </div>
            </td>
            <td><span class="app-badge blue">{{ b.location }}</span></td>
            <td class="text-right" style="font-size:0.83rem;color:var(--app-text-muted)">{{ b.apptsMtd }}</td>
            <td class="text-right" style="font-size:0.83rem;font-weight:600;color:var(--app-text)">{{ '$' + b.revMtd.toLocaleString() }}</td>
            <td class="text-right">
              <div class="flex items-center justify-end gap-2">
                <div style="width:60px;height:5px;background:var(--app-surface-2);border-radius:3px;overflow:hidden">
                  <div style="height:100%;border-radius:3px;background:var(--app-gold)" :style="{ width: b.utilization + '%' }"></div>
                </div>
                <span style="font-size:0.78rem;color:var(--app-text-muted)">{{ b.utilization }}%</span>
              </div>
            </td>
            <td class="text-center">
              <span :class="b.status === 'active' ? 'app-badge green' : 'app-badge amber'">{{ b.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Top performers -->
    <div>
      <div class="app-section-label" style="margin-bottom:12px">Top Performers</div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px">
        <div
          v-for="(b, i) in topPerformers"
          :key="b.name"
          class="app-card lift app-enter"
          :class="`app-d${i + 2}`"
          style="padding:16px;text-align:center;position:relative"
        >
          <!-- Rank badge -->
          <div
            style="position:absolute;top:10px;right:10px;width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.72rem;font-weight:800"
            :style="i === 0
              ? 'background:var(--app-gold);color:#060810'
              : 'background:var(--app-surface-2);color:var(--app-text-muted);border:1px solid var(--app-border)'"
          >{{ i + 1 }}</div>
          <div class="mx-auto mb-3 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-black" style="background:linear-gradient(135deg,var(--app-gold),#8a7009)">{{ b.initials }}</div>
          <div style="font-size:0.88rem;font-weight:700;color:var(--app-text)">{{ b.name }}</div>
          <div style="font-size:0.72rem;color:var(--app-text-muted);margin-top:2px">{{ b.location }}</div>
          <div style="font-size:1rem;font-weight:700;color:var(--app-gold);margin-top:8px">${{ b.revMtd.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
