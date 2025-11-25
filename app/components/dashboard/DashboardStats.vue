<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

interface Stat {
  title: string
  key: keyof ApiMetric
  to?: string // todo -> link does not work with hover atm
}

const { t } = useI18n({
  useScope: 'local',
})

const stats = computed<Stat[]>(() => {
  // todo link with querys
  return [
    {
      title: t('vulnerabilities'),
      key: 'vulnerabilities',
      // to: '/vulnerabilities',
    },
    {
      title: t('vulnerableProjects'),
      key: 'vulnerableProjects',
      // to: '/projects',
    },
    {
      title: t('vulnerableComponents'),
      key: 'vulnerableComponents',
      // to: '/components',
    },
    {
      title: t('inheritedRiskScore'),
      key: 'inheritedRiskScore',
      // to: '/todo',
    },
  ] satisfies Stat[]
})

const chartData = computed(() => {
  return metrics.map((metric) => {
    return {
      date: new Date(metric.firstOccurrence),
      values: metric,
    }
  })
})
</script>

<template>
  <UPageCard
    v-for="(stat, index) in stats"
    :key="index"
    :title="String(metrics.at(-1)?.[stat.key] ?? 0)"
    :to="stat.to"
    variant="subtle"
    :ui="{
      container: 'gap-y-1.5 !p-1',
      wrapper: 'items-center',
      // leading: 'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col', // todo
    }"
    class="lg:col-span-1 md:col-span-2 col-span-4"
  >
    <template #leading>
      <span class="p-2">{{ stat.title }}</span>
    </template>
    <LineChart
      class="h-26" :data="chartData" :config="[{
        key: stat.key,
      }]"
    />
  </UPageCard>
</template>

<i18n lang="yaml">
en:
  vulnerabilities: "Portfolio Vulnerabilities"
  vulnerableProjects: "Vulnerable Projects"
  vulnerableComponents: "Vulnerable Components"
  inheritedRiskScore: "Inherited Risk Score"
de:
  vulnerabilities: "Portfolio Schwachstellen"
  vulnerableProjects: "Gefährdete Projekte"
  vulnerableComponents: "Gefährdete Komponenten"
  inheritedRiskScore: "Vererbter Risikowert"
</i18n>
