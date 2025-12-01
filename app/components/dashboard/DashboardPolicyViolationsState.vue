<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

const { t } = useI18n({
  useScope: 'local',
})

const policyViolationChartData = computed(() => {
  const chartMetrics = metrics.map((metric) => {
    return {
      date: new Date(metric.firstOccurrence),
      values: {
        policyViolationsFail: metric.policyViolationsFail,
        policyViolationsWarn: metric.policyViolationsWarn,
        policyViolationsInfo: metric.policyViolationsInfo,
      },
    } as const
  })

  chartMetrics.push({
    date: new Date(metrics.at(-1)?.lastOccurrence ?? Date.now()),
    values: {
      policyViolationsFail: metrics.at(-1)?.policyViolationsFail ?? 0,
      policyViolationsWarn: metrics.at(-1)?.policyViolationsWarn ?? 0,
      policyViolationsInfo: metrics.at(-1)?.policyViolationsInfo ?? 0,
    },
  } as const)

  return chartMetrics
})

const policyViolationChartConfig = [
  { key: 'policyViolationsFail', color: 'var(--ui-error)' },
  { key: 'policyViolationsWarn', color: 'var(--ui-warning)' },
  { key: 'policyViolationsInfo', color: 'var(--ui-info)' },
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
    <LineChart class="h-96" :data="policyViolationChartData" :config="policyViolationChartConfig" />
    <template #footer>
      <div class="grid grid-cols-3 gap-2 w-full">
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.policyViolationsFail"
          :total="latestMetric?.policyViolationsTotal"
          :title="t('summary.policy-violations-fail')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.policyViolationsWarn"
          :total="latestMetric?.policyViolationsTotal"
          :title="t('summary.policy-violations-warn')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.policyViolationsInfo"
          :total="latestMetric?.policyViolationsTotal"
          :title="t('summary.policy-violations-info')"
        />
      </div>
    </template>
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Policy Violations"
  subtitle: "Policy violations by state"
  summary:
    policy-violations-fail: "Violation Failures"
    policy-violations-warn: "Violation Warnings"
    policy-violations-info: "Informational Violations"
de:
  title: "Richtlinienverstöße"
  subtitle: "Richtlinienverstöße nach Status"
  summary:
    policy-violations-fail: "Verstoßfehler"
    policy-violations-warn: "Verstoßwarnungen"
    policy-violations-info: "Informationelle Verstöße"
</i18n>
