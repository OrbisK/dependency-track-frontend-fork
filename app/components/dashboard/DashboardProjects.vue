<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { metrics } = defineProps<{
  metrics: ApiMetric[]
}>()

const { t } = useI18n({
  useScope: 'local',
})

const projectsChartData = computed(() => {
  const chartMetrics = metrics.map((metric) => {
    return {
      date: new Date(metric.firstOccurrence),
      values: {
        projects: metric.projects,
        nonVulnerableProjects: metric.projects - metric.vulnerableProjects,
        vulnerableProjects: metric.vulnerableProjects,
      },
    } as const
  })
  chartMetrics.push({
    date: new Date(metrics.at(-1)?.lastOccurrence ?? Date.now()),
    values: {
      projects: metrics.at(-1)?.projects ?? 0,
      nonVulnerableProjects: (metrics.at(-1)?.projects ?? 0) - (metrics.at(-1)?.vulnerableProjects ?? 0),
      vulnerableProjects: metrics.at(-1)?.vulnerableProjects ?? 0,
    },
  } as const)

  return chartMetrics
})

const projectsChartConfig = [
  { key: 'projects', color: 'var(--ui-info)' },
  { key: 'nonVulnerableProjects', color: 'var(--ui-success)' },
  { key: 'vulnerableProjects', color: 'var(--ui-warning)' },
] satisfies { key: keyof ApiMetric | 'nonVulnerableProjects', color?: string }[] // todo

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
    <LineChart class="h-96" :data="projectsChartData" :config="projectsChartConfig" />
    <template #footer>
      <div class="grid grid-cols-2 gap-2 w-full">
        <DashboardProgressCard
          class="lg:col-span-1 col-span-2"
          variant="soft"
          :value="(latestMetric?.projects ?? 0) - (latestMetric?.vulnerableProjects ?? 0)"
          :total="latestMetric?.projects"
          :title="t('summary.projects-non-vulnerable')"
        />
        <DashboardProgressCard
          class="lg:col-span-1 col-span-2"
          variant="soft"
          :value="latestMetric?.vulnerableProjects"
          :total="latestMetric?.projects"
          :title="t('summary.projects-vulnerable')"
        />
      </div>
    </template>
  </DashboardCard>
</template>

<i18n lang="yaml">
en:
  title: "Projects"
  summary:
    projects-non-vulnerable: "Non Vulnerable"
    projects-vulnerable: "Vulnerable"
de:
  title: "Projekte"
  summary:
    projects-non-vulnerable: "Nicht verwundbar"
    projects-vulnerable: "Verwundbar"
</i18n>
