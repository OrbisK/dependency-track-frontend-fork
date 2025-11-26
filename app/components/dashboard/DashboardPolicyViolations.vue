<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

const { t } = useI18n({
  useScope: 'local',
})

const policyViolationChartData = computed(() => {
  return metrics.map((metric) => {
    return {
      date: new Date(metric.firstOccurrence),
      values: {
        policyViolationsFail: metric.policyViolationsFail,
        policyViolationsWarn: metric.policyViolationsWarn,
        policyViolationsInfo: metric.policyViolationsInfo,
      },
    } as const
  })
})

const policyViolationChartConfig = [
  { key: 'policyViolationsFail', color: 'var(--ui-error)' },
  { key: 'policyViolationsWarn', color: 'var(--ui-warning)' },
  { key: 'policyViolationsInfo', color: 'var(--ui-info)' },
] satisfies { key: keyof ApiMetric, color?: string }[] // todo
</script>

<template>
  <DashboardCard
    :ui="{ root: 'overflow-visible', body: '!p-0' }"
    :title="t('title')"
    :subtitle="t('subtitle')"
    class="md:col-span-2 col-span-4"
  >
    <LineChart class="h-96" :data="policyViolationChartData" :config="policyViolationChartConfig" />
    <!--    <template #footer> -->
    <!--      footer -->
    <!--    </template> -->
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Policy Violations"
  subtitle: "Policy violations by state"
de:
  title: "Richtlinienverstöße"
  subtitle: "Richtlinienverstöße nach Status"
</i18n>
