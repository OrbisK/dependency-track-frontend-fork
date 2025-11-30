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
        policyViolationsTotal: metric.policyViolationsTotal,
        policyViolationsAudited: metric.policyViolationsAudited,
      },
    } as const
  })
})

const auditingProgressChartConfig = [
  { key: 'policyViolationsTotal', color: 'var(--ui-info)' },
  { key: 'policyViolationsAudited', color: 'var(--ui-success)' },
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
          :value="latestMetric?.policyViolationsUnaudited"
          :total="latestMetric?.policyViolationsTotal"
          :title="t('summary.auditing-progress-violations-unaudited')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-2"
          variant="soft"
          :value="latestMetric?.policyViolationsAudited"
          :total="latestMetric?.policyViolationsTotal"
          :title="t('summary.auditing-progress-violations-audited')"
        />
      </div>
    </template>
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Auditing Progress"
  subtitle: "Policy Violations"
  summary:
    auditing-progress-violations-unaudited: "Violations Unaudited"
    auditing-progress-violations-audited: "Violations Audited"
de:
  title: "Prüffortschritt"
  subtitle: "Richtlinienverstöße"
  summary:
    auditing-progress-violations-unaudited: "Verstöße ungeprüft"
    auditing-progress-violations-audited: "Überprüfte Verstöße"
</i18n>
