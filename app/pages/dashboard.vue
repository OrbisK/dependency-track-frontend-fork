<script setup lang="ts">
import type { ApiMetric } from '~/types/api'

const { $api } = useNuxtApp()

const { data: metrics } = await useAsyncData('dashboard-metrics', (_, { signal }) => {
  return $api<ApiMetric[]>('v1/metrics/portfolio/90/days', { signal })
}, { default: () => [] })
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="TODO" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6">
        <DashboardStats :metrics="metrics" />
        <DashboardPortfolio :metrics="metrics" />
      <!--      <HomeStats :period="period" :range="range" /> -->
      <!--      <HomeChart :period="period" :range="range" /> -->
      <!--      <HomeSales :period="period" :range="range" /> -->
      </UPageGrid>
    </template>
  </UDashboardPanel>
</template>
