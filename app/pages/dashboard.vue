<script setup lang="ts">
import type { ApiMetric } from '~/types/api'
import * as locales from '@nuxt/ui/locale'

const { t } = useI18n({
  useScope: 'local',
})

useSeoMeta({
  title: t('seo.title'),
  description: t('seo.description'),
})

const { $api } = useNuxtApp()

const { data: metrics } = await useAsyncData('portfolio-metrics-90-days', (_, { signal }) => {
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
      <div class="relative grid grid-cols-4 gap-4 sm:gap-6">
        <DashboardStats :metrics="metrics" />
        <DashboardPortfolio :metrics="metrics" />
        <DashboardPolicyViolationsState :metrics="metrics" />
        <DashboardPolicyViolationsClassification :metrics="metrics" />
      </div>
    </template>
  </UDashboardPanel>
</template>

<i18n>
en:
  seo:
    title: "Dashboard"
    description: "Overview of your portfolio's security metrics and policy violations."

de:
  seo:
    title: "Dashboard"
    description: "Übersicht über die Sicherheitsmetriken und Richtlinienverstöße Ihres Portfolios."
</i18n>
