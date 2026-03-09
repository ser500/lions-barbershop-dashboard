<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useBarberStore } from '../../../stores/barber'

const store = useBarberStore()

const ratingBreakdown = [
  { stars: 5, pct: 75 },
  { stars: 4, pct: 20 },
  { stars: 3, pct: 5 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 0 },
]

const ratingTrendSeries = [{ name: 'Rating', data: [4.6, 4.7, 4.7, 4.8, 4.8, 4.8] }]
const ratingTrendOptions = ref({
  chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
  colors: ['#c9a84c'],
  stroke: { curve: 'smooth', width: 2 },
  dataLabels: { enabled: false },
  markers: { size: 4, colors: ['#c9a84c'], strokeColors: '#111', strokeWidth: 2 },
  xaxis: {
    categories: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    labels: { style: { colors: '#6b7280', fontSize: '11px' } },
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    min: 4.0,
    max: 5.0,
    labels: { style: { colors: '#6b7280', fontSize: '11px' }, formatter: v => v.toFixed(1) },
  },
  grid: { borderColor: '#1a1a1a', strokeDashArray: 3 },
  tooltip: { theme: 'dark' },
})
</script>
<template>
  <div style="padding:24px;display:flex;flex-direction:column;gap:16px;font-family:'Inter',sans-serif">

    <!-- Hero rating card -->
    <div class="app-card gold app-enter" style="padding:40px 20px;text-align:center">
      <div style="font-size:3.5rem;font-weight:800;color:var(--app-text);line-height:1">{{ store.avgRating }}</div>
      <div style="display:flex;justify-content:center;gap:4px;margin-top:10px">
        <i
          v-for="i in 5"
          :key="i"
          class="ph ph-star-fill"
          :style="{ color: i <= Math.round(store.avgRating) ? 'var(--app-gold)' : 'var(--app-border)', fontSize: '1.4rem' }"
        ></i>
      </div>
      <div style="font-size:0.8rem;color:var(--app-text-dim);margin-top:8px">{{ store.reviews.length }} reviews &middot; Across all platforms</div>

      <!-- Rating breakdown -->
      <div style="max-width:320px;margin:24px auto 0;display:flex;flex-direction:column;gap:8px">
        <div
          v-for="row in ratingBreakdown"
          :key="row.stars"
          style="display:flex;align-items:center;gap:10px"
        >
          <span style="font-size:0.75rem;color:var(--app-text-muted);width:10px;text-align:right;flex-shrink:0">{{ row.stars }}</span>
          <i class="ph ph-star-fill" style="color:var(--app-gold);font-size:0.75rem;flex-shrink:0"></i>
          <div class="app-progress" style="flex:1;height:8px">
            <div
              class="app-progress-fill"
              :style="`width:${row.pct}%;background:var(--app-gold)`"
            ></div>
          </div>
          <span style="font-size:0.72rem;color:var(--app-text-muted);width:28px;text-align:right;flex-shrink:0">{{ row.pct }}%</span>
        </div>
      </div>
    </div>

    <!-- Rating trend chart -->
    <div class="app-card app-enter app-d2" style="padding:20px">
      <div class="app-section-label" style="margin-bottom:12px">Rating Trend</div>
      <VueApexCharts type="line" height="180" :series="ratingTrendSeries" :options="ratingTrendOptions" />
    </div>

    <!-- Recent reviews -->
    <div class="app-section-label" style="padding:0 2px">Recent Reviews</div>

    <div
      v-for="(review, i) in store.reviews"
      :key="review.id"
      class="app-card lift app-enter"
      :class="`app-d${Math.min(i + 3, 7)}`"
      style="padding:20px;border-left:3px solid var(--app-gold)"
    >
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:10px">
          <div
            style="width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:700;color:#060810;background:linear-gradient(135deg,var(--app-gold),rgba(201,168,76,0.5));flex-shrink:0"
          >
            {{ review.client.split(' ').map(n => n[0]).join('') }}
          </div>
          <div>
            <div style="font-weight:700;color:var(--app-text);font-size:0.9rem">{{ review.client }}</div>
            <div style="font-size:0.72rem;color:var(--app-text-muted)">{{ review.date }}</div>
          </div>
        </div>
        <div style="display:flex;gap:2px;flex-shrink:0">
          <i
            v-for="i in 5"
            :key="i"
            class="ph ph-star-fill"
            :style="{ color: i <= review.rating ? 'var(--app-gold)' : 'var(--app-border)', fontSize: '0.85rem' }"
          ></i>
        </div>
      </div>
      <div style="font-size:0.875rem;color:var(--app-text-dim);font-style:italic;line-height:1.5;margin-top:8px">"{{ review.text }}"</div>
    </div>

  </div>
</template>
