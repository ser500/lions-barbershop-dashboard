<template>
  <div class="overview">
    <div class="metrics-grid" v-if="data">
      <MetricCard icon="👥" label="Today's Sessions" :value="data.todaySessions" change="+12%" />
      <MetricCard icon="👤" label="Unique Visitors" :value="data.uniqueVisitors" change="+8%" />
      <MetricCard icon="📄" label="Page Views" :value="data.pageViews" change="+15%" />
      <MetricCard icon="↩️" label="Bounce Rate" :value="data.bounceRate" change="-3%" />
    </div>

    <div class="charts-row">
      <div class="chart-card wide">
        <h3 class="chart-title">Sessions — Last 30 Days</h3>
        <apexchart
          v-if="data"
          type="area"
          height="250"
          :options="sessionsChartOpts"
          :series="sessionsSeries"
        />
      </div>
      <div class="chart-card">
        <h3 class="chart-title">Traffic Sources</h3>
        <apexchart
          v-if="data"
          type="donut"
          height="250"
          :options="sourcesChartOpts"
          :series="sourcesSeries"
        />
      </div>
    </div>

    <div class="bottom-row">
      <div class="chart-card">
        <h3 class="chart-title">Top CTAs This Week</h3>
        <div class="cta-list" v-if="data">
          <div class="cta-row" v-for="c in data.topCtas" :key="c.label">
            <span class="cta-label">{{ c.label }}</span>
            <div class="cta-bar-wrap">
              <div class="cta-bar" :style="{ width: (c.clicks / data.topCtas[0].clicks * 100) + '%' }"></div>
            </div>
            <span class="cta-count">{{ c.clicks }}</span>
          </div>
        </div>
      </div>
      <div class="chart-card">
        <h3 class="chart-title">Live Events Feed</h3>
        <div class="live-feed" v-if="data">
          <div class="feed-item" v-for="e in data.recentEvents" :key="e.time">
            <span class="feed-badge">{{ e.event }}</span>
            <span class="feed-label">{{ e.label }}</span>
            <span class="feed-time">{{ e.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import MetricCard from '../../components/dashboard/MetricCard.vue'
import { useDashboardStore } from '../../stores/dashboard.js'

const store = useDashboardStore()
const data = computed(() => store.overview)

const sessionsChartOpts = computed(() => ({
  chart: { toolbar: { show: false }, background: 'transparent', foreColor: '#a0a0a0' },
  colors: ['#c9a84c'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 } },
  xaxis: { categories: data.value?.sessionsOverTime.map(d => d.date) || [], labels: { show: false } },
  yaxis: { labels: { style: { colors: '#6b6b6b' } } },
  grid: { borderColor: 'rgba(255,255,255,0.05)' },
  tooltip: { theme: 'dark' },
  stroke: { width: 2, curve: 'smooth' },
}))

const sessionsSeries = computed(() => ([{
  name: 'Sessions',
  data: data.value?.sessionsOverTime.map(d => d.sessions) || [],
}]))

const sourcesChartOpts = computed(() => ({
  chart: { toolbar: { show: false }, background: 'transparent', foreColor: '#a0a0a0' },
  labels: data.value?.topSources.map(s => s.name) || [],
  colors: ['#c9a84c', '#e8c96a', '#a07830', '#6b4f1e', '#3d2d0a'],
  legend: { position: 'bottom', labels: { colors: '#a0a0a0' } },
  tooltip: { theme: 'dark' },
  dataLabels: { style: { colors: ['#111'] } },
}))

const sourcesSeries = computed(() => data.value?.topSources.map(s => s.value) || [])
</script>

<style scoped>
.overview { display: flex; flex-direction: column; gap: 24px; }
.metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.charts-row { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.bottom-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.chart-card {
  background: #161616;
  border: 1px solid rgba(201,168,76,0.12);
  border-radius: 12px;
  padding: 24px;
}
.chart-title { font-family: var(--font-display); font-size: 0.8rem; letter-spacing: 2px; color: var(--color-gold); margin-bottom: 20px; text-transform: uppercase; }
.cta-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 0.82rem; }
.cta-label { width: 160px; color: var(--color-gray-light); flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cta-bar-wrap { flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; overflow: hidden; }
.cta-bar { height: 100%; background: var(--color-gold); border-radius: 3px; transition: width 0.5s; }
.cta-count { width: 30px; text-align: right; color: var(--color-white); font-weight: 600; }
.live-feed { display: flex; flex-direction: column; gap: 10px; }
.feed-item { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; padding: 8px; border-radius: 6px; background: rgba(255,255,255,0.03); }
.feed-badge { background: rgba(201,168,76,0.15); color: var(--color-gold); padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; white-space: nowrap; }
.feed-label { flex: 1; color: var(--color-white); }
.feed-time { color: var(--color-gray); white-space: nowrap; }
@media (max-width: 1100px) { .metrics-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 800px) { .charts-row, .bottom-row { grid-template-columns: 1fr; } }
</style>
