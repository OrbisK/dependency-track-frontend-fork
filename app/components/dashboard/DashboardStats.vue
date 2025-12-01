<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

const { t } = useI18n({
  useScope: 'local',
})

const latestMetric = computed(() => {
  return metrics.at(-1)
})

const stats = computed(() => {
  return [
    {
      title: t('stats.projects'),
      value: latestMetric.value?.projects ?? 0,
      color: 'info',
    },
    {
      title: t('stats.vulnerableProjects'),
      value: latestMetric.value?.vulnerableProjects ?? 0,
      color: 'error',
    },
    {
      title: t('stats.components'),
      value: latestMetric.value?.components ?? 0,
      color: 'info',
    },
    {
      title: t('stats.vulnerableComponents'),
      value: latestMetric.value?.vulnerableComponents ?? 0,
      color: 'error',
    },
    {
      title: t('stats.vulnerabilities'),
      value: latestMetric.value?.vulnerabilities ?? 0,
      color: 'error',
    },
    {
      title: t('stats.suppressed'),
      value: latestMetric.value?.suppressed ?? 0,
      color: 'warning',
    },
    {
      title: t('stats.policyViolationsTotal'),
      value: latestMetric.value?.policyViolationsTotal ?? 0,
      color: 'info',
    },
    {
      title: t('stats.policyViolationsLicenseTotal'),
      value: latestMetric.value?.policyViolationsLicenseTotal ?? 0,
      color: 'info',
    },
    {
      title: t('stats.policyViolationsOperationalTotal'),
      value: latestMetric.value?.policyViolationsOperationalTotal ?? 0,
      color: 'info',
    },
    {
      title: t('stats.policyViolationsSecurityTotal'),
      value: latestMetric.value?.policyViolationsSecurityTotal ?? 0,
      color: 'info',
    },
  ] as const
})
</script>

<template>
  <DashboardCard
    :title="t('title')"
    class="col-span-4"
  >
    <UPageGrid
      class="gap-3"
    >
      <UPageCard
        v-for="(stat, index) in stats"
        :key="index"
        :title="String(stat.value ?? 0)"
        variant="subtle"
        :ui="{
          wrapper: 'items-center',
        }"
      >
        <template #leading>
          <UBadge
            size="md"
            :color="stat.color"
            variant="outline"
          >
            {{ stat.title }}
          </UBadge>
        </template>
      </UPageCard>
    </UPageGrid>
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Portfolio Statistics"
  stats:
    projects: "Projects"
    vulnerableProjects: "Vulnerable Projects"
    components: "Components"
    vulnerableComponents: "Vulnerable Components"
    vulnerabilities: "Portfolio Vulnerabilities"
    suppressed: "Vulnerabilities"
    policyViolationsTotal: "Policy Violations"
    policyViolationsLicenseTotal: "License Violations"
    policyViolationsOperationalTotal: "Operational Violations"
    policyViolationsSecurityTotal: "Security Violations"
de:
  title: "Portfolio-Statistiken"
  stats:
    projects: "Projekte"
    vulnerableProjects: "Verwundbare Projekte"
    components: "Komponenten"
    vulnerableComponents: "Verwundbare Komponenten"
    vulnerabilities: "Portfolio-Schwachstellen"
    suppressed: "Unterdrückte Schwachstellen"
    policyViolationsTotal: "Richtlinienverstöße"
    policyViolationsLicenseTotal: "Lizenzverstöße"
    policyViolationsOperationalTotal: "Betriebliche Verstöße"
    policyViolationsSecurityTotal: "Sicherheitsverstöße"
</i18n>
