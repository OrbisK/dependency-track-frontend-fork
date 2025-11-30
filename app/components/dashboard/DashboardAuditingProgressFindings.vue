<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

const { t } = useI18n({
  useScope: 'local',
})

const auditingProgressChartData = computed(() => {
  return metrics.map((metric) => {
    return {
      date: new Date(metric.firstOccurrence),
      values: {
        findingsTotal: metric.findingsTotal,
        findingsAudited: metric.findingsAudited,
      },
    } as const
  })
})

const auditingProgressChartConfig = [
  { key: 'findingsTotal', color: 'var(--ui-info)' },
  { key: 'findingsAudited', color: 'var(--ui-success)' },
] satisfies { key: keyof ApiMetric, color?: string }[] // todo

const latestMetric = computed(() => {
  return metrics.at(-1)
})
</script>

<template>
  <DashboardCard
    :ui="{ root: 'overflow-visible', body: '!p-0' }"
    :title="t('title')"
    :subtitle="t('subtitle')"
    class="md:col-span-2 col-span-4"
  >
    <LineChart class="h-96" :data="auditingProgressChartData" :config="auditingProgressChartConfig" />
    <template #footer>
      <div class="grid grid-cols-2 gap-2 w-full">
        <DashboardProgressCard
          class="lg:col-span-1 col-span-2"
          variant="soft"
          :value="latestMetric?.findingsUnaudited"
          :total="latestMetric?.findingsTotal"
          :title="t('summary.auditing-progress-findings-unaudited')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-2"
          variant="soft"
          :value="latestMetric?.findingsAudited"
          :total="latestMetric?.findingsTotal"
          :title="t('summary.auditing-progress-findings-audited')"
        />
      </div>
    </template>
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Auditing Progress"
  subtitle: "Findings"
  summary:
    auditing-progress-findings-unaudited: "Findings Unaudited"
    auditing-progress-findings-audited: "Findings Audited"
de:
  title: "Prüfungsfortschritt"
  subtitle: "Ergebnisse"
  summary:
    auditing-progress-findings-unaudited: "Ungeprüfte Ergebnisse"
    auditing-progress-findings-audited: "Geprüfte Ergebnisse"
</i18n>
