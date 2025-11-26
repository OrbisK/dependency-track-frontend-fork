<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

const { locale, t } = useI18n({
  useScope: 'local',
})

const portfolioChartConfig = [
  { key: 'critical', color: 'var(--ui-error)' },
  { key: 'high', color: 'orange' },
  { key: 'medium', color: 'var(--ui-warning)' },
  { key: 'low', color: 'var(--ui-success)' },
  { key: 'unassigned', color: 'var(--ui-info)' },
] satisfies { key: keyof ApiMetric, color?: string }[] // todo

const portfolioChartData = computed(() => {
  return metrics.map((metric) => {
    return {
      date: new Date(metric.firstOccurrence),
      values: {
        critical: metric.critical,
        high: metric.high,
        medium: metric.medium,
        low: metric.low,
        unassigned: metric.unassigned,
      },
    } as const
  })
})

const latestMetric = computed(() => {
  return metrics.at(-1)
})
</script>

<template>
  <DashboardCard :ui="{ root: 'overflow-visible', body: '!p-0' }" :title="t('title')" class="col-span-4">
    <template #subtitle>
      <i18n-t keypath="latest-measurement">
        <template #datetime>
          <TimeLocale
            year="numeric"
            month="2-digit"
            day="2-digit"
            hour="2-digit"
            minute="2-digit"
            second="2-digit"
            :datetime="metrics.at(-1)!.lastOccurrence"
            :locale="locale"
          />
        </template>
      </i18n-t>
    </template>
    <LineChart class="h-96" :data="portfolioChartData" :config="portfolioChartConfig" />
    <template #footer>
      <div class="grid grid-cols-5 gap-2 w-full">
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.critical"
          :total="latestMetric?.vulnerabilities"
          :title="t('summary.critical')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.high"
          :total="latestMetric?.vulnerabilities"
          :title="t('summary.high')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.medium"
          :total="latestMetric?.vulnerabilities"
          :title="t('summary.medium')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.low"
          :total="latestMetric?.vulnerabilities"
          :title="t('summary.low')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.unassigned"
          :total="latestMetric?.vulnerabilities"
          :title="t('summary.unassigned')"
        />
      </div>
    </template>
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Portfolio Vulnerabilities"
  latest-measurement: "Last Measurement: {datetime}"
  summary:
    critical: "Critical"
    high: "High"
    medium: "Medium"
    low: "Low"
    unassigned: "Unassigned"
de:
  title: "Portfolio Schwachstellen"
  latest-measurement: "Letzte Messung: {datetime}"
  summary:
    critical: "Kritisch"
    high: "Hoch"
    medium: "Mittel"
    low: "Niedrig"
    unassigned: "Nicht zugewiesen"
</i18n>
