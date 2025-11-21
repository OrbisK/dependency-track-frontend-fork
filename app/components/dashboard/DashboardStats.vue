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

const stats = computed<Stat[]>(() => {
  // todo link with querys
  return [
    {
      title: 'Portfolio Vulnerabilities',
      key: 'vulnerabilities',
      // to: '/vulnerabilities',
    },
    {
      title: 'Projects at Risk',
      key: 'vulnerableProjects',
      // to: '/projects',
    },
    {
      title: 'Vulnerable Components',
      key: 'vulnerableComponents',
      // to: '/components',
    },
    {
      title: 'Inherited Risk Score',
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
