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
        policyViolationsSecurityTotal: metric.policyViolationsSecurityTotal,
        policyViolationsOperationalTotal: metric.policyViolationsOperationalTotal,
        policyViolationsLicenseTotal: metric.policyViolationsLicenseTotal,
      },
    } as const
  })
})

const policyViolationChartConfig = [
  { key: 'policyViolationsSecurityTotal', color: 'var(--ui-error)' },
  { key: 'policyViolationsOperationalTotal', color: 'var(--ui-warning)' },
  { key: 'policyViolationsLicenseTotal', color: 'var(--ui-info)' },
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
          :value="latestMetric?.policyViolationsSecurityTotal"
          :total="latestMetric?.policyViolationsTotal"
          :title="t('summary.policy-violations-security-total')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.policyViolationsOperationalTotal"
          :total="latestMetric?.policyViolationsTotal"
          :title="t('summary.policy-violations-operational-total')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-5"
          variant="soft"
          :value="latestMetric?.policyViolationsLicenseTotal"
          :total="latestMetric?.policyViolationsTotal"
          :title="t('summary.policy-violations-license-total')"
        />
      </div>
    </template>
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Policy Violations"
  subtitle: "Policy violations by classification"
  summary:
    policy-violations-security-total: "Security Violations"
    policy-violations-operational-total: "Operational Violations"
    policy-violations-license-total: "License Violations"
de:
  title: "Richtlinienverstöße"
  subtitle: "Richtlinienverstöße nach Klassifikation"
  summary:
    policy-violations-security-total: "Sicherheitsverstöße"
    policy-violations-operational-total: "Betriebliche Verstöße"
    policy-violations-license-total: "Lizenzverstöße"
</i18n>
