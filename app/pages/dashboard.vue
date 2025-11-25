<script setup lang="ts">
import type { ApiMetric } from '~/types/api'
import * as locales from '@nuxt/ui/locale'

const { $api } = useNuxtApp()

const { data: metrics } = await useAsyncData('dashboard-metrics', (_, { signal }) => {
  return $api<ApiMetric[]>('v1/metrics/portfolio/90/days', { signal })
}, { default: () => [] })

const { locale, setLocale, locales: availableLocales } = useI18n()

const localeOptions = computed(() => {
  // @ts-expect-error todo
  return Object.values(locales).filter(({ code }) => availableLocales.value.flatMap(l => l.code).includes(code))
})
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="TODO" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <ULocaleSelect
            :model-value="locale"
            :locales="localeOptions"
            @update:model-value="setLocale($event as any)"
          />
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
