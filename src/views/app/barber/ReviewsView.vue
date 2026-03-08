<script setup>
import { ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useBarberStore } from '../../../stores/barber'

const store = useBarberStore()

const ratingTrendSeries = [{ name: 'Rating', data: [4.6, 4.7, 4.7, 4.8, 4.8, 4.8] }]
const ratingTrendOptions = ref({
  chart: { type: 'line', background: 'transparent', toolbar: { show: false } },
  colors: ['#b8960c'],
  stroke: { curve: 'smooth', width: 2 },
  dataLabels: { enabled: false },
  markers: { size: 4, colors: ['#b8960c'], strokeColors: '#111', strokeWidth: 2 },
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

function filledStars(rating) {
  return Array.from({ length: 5 }, (_, i) => i < rating)
}
</script>
<template>
  <div class="p-6 font-inter space-y-6">
    <!-- Big rating display -->
    <div class="rounded-xl p-6 flex items-center gap-6" style="background:#111;border:1px solid #1a1a1a">
      <div class="text-center">
        <div style="font-size:3.5rem;font-weight:700;color:#b8960c;line-height:1">{{ store.avgRating }}</div>
        <div class="flex gap-0.5 mt-1">
          <i v-for="i in 5" :key="i" class="ph ph-star-fill" :style="{ color: i <= Math.round(store.avgRating) ? '#b8960c' : '#2a2a2a', fontSize: '1rem' }"></i>
        </div>
        <div style="font-size:0.75rem;color:#6b7280;margin-top:4px">Average Rating</div>
      </div>
      <div>
        <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb;margin-bottom:4px">{{ store.reviews.length }} reviews</div>
        <div style="font-size:0.78rem;color:#6b7280">Across all platforms</div>
        <div class="mt-3 space-y-1">
          <div v-for="stars in [5, 4, 3]" :key="stars" class="flex items-center gap-2">
            <span style="font-size:0.72rem;color:#6b7280;width:8px">{{ stars }}</span>
            <i class="ph ph-star-fill" style="color:#b8960c;font-size:0.7rem"></i>
            <div style="background:#1a1a1a;border-radius:3px;height:5px;width:80px;overflow:hidden">
              <div style="height:100%;border-radius:3px;background:#b8960c" :style="{ width: (stars === 5 ? 75 : stars === 4 ? 20 : 5) + '%' }"></div>
            </div>
            <span style="font-size:0.7rem;color:#6b7280">{{ stars === 5 ? '75%' : stars === 4 ? '20%' : '5%' }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Rating trend -->
    <div class="rounded-xl p-5" style="background:#111;border:1px solid #1a1a1a">
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Rating Trend</div>
      <VueApexCharts type="line" height="180" :series="ratingTrendSeries" :options="ratingTrendOptions" />
    </div>

    <!-- Reviews list -->
    <div>
      <div class="mb-4" style="font-size:0.9rem;font-weight:700;color:#e5e7eb">Recent Reviews</div>
      <div class="space-y-3">
        <div v-for="review in store.reviews" :key="review.id" class="p-4 rounded-xl" style="background:#111;border:1px solid #1a1a1a">
          <div class="flex items-start justify-between mb-2">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style="background:linear-gradient(135deg,#b8960c,#8a7009)">
                {{ review.client.split(' ').map(n => n[0]).join('') }}
              </div>
              <div>
                <div style="font-size:0.85rem;font-weight:600;color:#e5e7eb">{{ review.client }}</div>
                <div style="font-size:0.7rem;color:#6b7280">{{ review.date }}</div>
              </div>
            </div>
            <div class="flex gap-0.5">
              <i v-for="i in 5" :key="i" class="ph ph-star-fill" :style="{ color: i <= review.rating ? '#b8960c' : '#2a2a2a', fontSize: '0.85rem' }"></i>
            </div>
          </div>
          <div style="font-size:0.83rem;color:#d1d5db;line-height:1.5;font-style:italic">"{{ review.text }}"</div>
        </div>
      </div>
    </div>
  </div>
</template>
