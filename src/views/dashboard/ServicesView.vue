<template>
  <div class="services-view" v-if="data">
    <div class="charts-row">
      <div class="chart-card">
        <h3 class="chart-title">Core Services — Views</h3>
        <apexchart type="bar" height="300" :options="coreOpts" :series="coreSeries" />
      </div>
      <div class="chart-card">
        <h3 class="chart-title">Add-On Services — Views</h3>
        <apexchart type="bar" height="300" :options="addOnOpts" :series="addOnSeries" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../../stores/dashboard.js'

const store = useDashboardStore()
const data = computed(() => store.services)

const baseOpts = {
  chart: { toolbar: { show: false }, background: 'transparent', foreColor: '#a0a0a0' },
  grid: { borderColor: 'rgba(255,255,255,0.05)' },
  tooltip: { theme: 'dark' },
  plotOptions: { bar: { borderRadius: 4, horizontal: true } },
}

const coreOpts = computed(() => ({ ...baseOpts, colors: ['#c9a84c'], xaxis: { categories: data.value?.coreServices.map(s => s.name) || [] } }))
const coreSeries = computed(() => ([{ name: 'Views', data: data.value?.coreServices.map(s => s.views) || [] }]))

const addOnOpts = computed(() => ({ ...baseOpts, colors: ['#a07830'], xaxis: { categories: data.value?.addOns.map(s => s.name) || [] } }))
const addOnSeries = computed(() => ([{ name: 'Views', data: data.value?.addOns.map(s => s.views) || [] }]))
</script>

<style scoped>
.services-view { display: flex; flex-direction: column; gap: 24px; }
.charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.chart-card {
  background: #161616;
  border: 1px solid rgba(201,168,76,0.12);
  border-radius: 12px;
  padding: 24px;
}
.chart-title { font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 2px; color: var(--color-gold); margin-bottom: 20px; text-transform: uppercase; }
@media (max-width: 800px) { .charts-row { grid-template-columns: 1fr; } }
</style>
