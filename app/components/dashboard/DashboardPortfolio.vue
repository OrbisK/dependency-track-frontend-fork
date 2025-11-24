<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

const { locale } = useI18n()

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
</script>

<template>
  <UCard :ui="{ root: 'overflow-visible', body: '!p-0' }" class="col-span-4">
    <template #header>
      <div>
        <p v-if="metrics.at(-1)?.firstOccurrence" class="text-xs text-muted uppercase mb-1.5">
          <i18n-t keypath="portfolio-vulnerabilities.latest-measurement">
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
        </p>
        <i18n-t tag="p" class="text-3xl text-highlighted font-semibold" keypath="portfolio-vulnerabilities.title" />
      </div>
    </template>
    <LineChart class="h-96" :data="portfolioChartData" :config="portfolioChartConfig" />
    <template #footer>
      <div class="grid grid-cols-5 gap-2 w-full">
        <DashboardProgressCard variant="soft">
          <p>Critical</p>
        </DashboardProgressCard>
        <DashboardProgressCard variant="soft">
          <p>High</p>
          <p>0 (0%)</p>
        </DashboardProgressCard>
        <DashboardProgressCard variant="soft">
          <p>Medium</p>
          <p>0 (0%)</p>
        </DashboardProgressCard>
        <DashboardProgressCard variant="soft">
          <p>Low</p>
          <p>0 (0%)</p>
        </DashboardProgressCard>
        <DashboardProgressCard variant="soft">
          <p>Unsassigned</p>
          <p>0 (0%)</p>
        </DashboardProgressCard>
      </div>
    </template>
  </UCard>
</template>

<i18n lang="yaml">
en:
  portfolio-vulnerabilities:
    title: "Portfolio Vulnerabilities"
    latest-measurement: "Last Measurement: {datetime}"
de:
  portfolio-vulnerabilities:
    title: "Portfolio Vulnerabilities"
    latest-measurement: "Letzte Messung: {datetime}"
</i18n>
