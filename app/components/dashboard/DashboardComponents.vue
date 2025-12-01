<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

const { t } = useI18n({
  useScope: 'local',
})

const componentsChartData = computed(() => {
  const chartMetrics = metrics.map((metric) => {
    return {
      date: new Date(metric.firstOccurrence),
      values: {
        components: metric.components,
        nonVulnerableComponents: metric.components - metric.vulnerableComponents,
        vulnerableComponents: metric.vulnerableComponents,
      },
    } as const
  })
  chartMetrics.push({
    date: new Date(metrics.at(-1)?.lastOccurrence ?? Date.now()),
    values: {
      components: metrics.at(-1)?.components ?? 0,
      nonVulnerableComponents: (metrics.at(-1)?.components ?? 0) - (metrics.at(-1)?.vulnerableComponents ?? 0),
      vulnerableComponents: metrics.at(-1)?.vulnerableComponents ?? 0,
    },
  } as const)
  return chartMetrics
})

const componentsChartConfig = [
  { key: 'components', color: 'var(--ui-info)' },
  { key: 'nonVulnerableComponents', color: 'var(--ui-success)' },
  { key: 'vulnerableComponents', color: 'var(--ui-warning)' },
] satisfies { key: keyof ApiMetric | 'nonVulnerableComponents', color?: string }[] // todo

const latestMetric = computed(() => {
  return metrics.at(-1)
})
</script>

<template>
  <DashboardCard
    :ui="{ root: 'overflow-visible', body: '!p-0' }"
    :title="t('title')"
    class="md:col-span-2 col-span-4"
  >
    <LineChart class="h-96" :data="componentsChartData" :config="componentsChartConfig" />
    <template #footer>
      <div class="grid grid-cols-2 gap-2 w-full">
        <DashboardProgressCard
          class="lg:col-span-1 col-span-2"
          variant="soft"
          :value="(latestMetric?.components ?? 0) - (latestMetric?.vulnerableComponents ?? 0)"
          :total="latestMetric?.components"
          :title="t('summary.components-non-vulnerable')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-2"
          variant="soft"
          :value="latestMetric?.vulnerableComponents"
          :total="latestMetric?.components"
          :title="t('summary.components-vulnerable')"
        />
      </div>
    </template>
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Components"
  summary:
    components-non-vulnerable: "Non Vulnerable"
    components-vulnerable: "Vulnerable"
de:
  title: "Komponenten"
  summary:
    components-non-vulnerable: "Nicht verwundbar"
    components-vulnerable: "Verwundbar"
</i18n>
