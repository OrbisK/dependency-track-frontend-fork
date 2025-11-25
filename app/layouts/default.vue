<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const open = shallowRef(false)

const { t } = useI18n({
  useScope: 'local',
})

const localeRoute = useLocaleRoute()

const links = computed(() => {
  return [[{
    label: t('navigation.dashboard'),
    icon: 'i-lucide-house',
    to: localeRoute({ name: 'dashboard' }),
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.portfolio'),
    type: 'label',
  }, {
    label: t('navigation.projects'),
    to: localeRoute({ name: 'projects' }),
    icon: 'i-lucide-folder-tree',
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.components'),
    icon: 'i-lucide-boxes',
    to: localeRoute({ name: 'components' }),
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.vulnerabilities'),
    icon: 'i-lucide-shield-half',
    to: localeRoute({ name: 'vulnerabilities' }),
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.licenses'),
    icon: 'i-lucide-scale',
    to: localeRoute({ name: 'licenses' }),
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.tags'),
    icon: 'i-lucide-tags',
    to: localeRoute({ name: 'tags' }),
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.globalAudit'),
    type: 'label',
  }, {
    label: t('navigation.vulnerabilityAudit'),
    icon: 'i-lucide-shield-question-mark',
    to: localeRoute({ name: 'vulnerabilityAudit' }),
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.policyViolationAudit'),
    icon: 'i-lucide-package-search',
    to: localeRoute({ name: 'policyViolationAudit' }),
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.administration'),
    type: 'label',
  }, {
    label: t('navigation.policyManagement'),
    icon: 'i-lucide-award',
    to: localeRoute({ name: 'policy' }),
    onSelect: () => {
      open.value = false
    },
  }, {
    label: t('navigation.admin'),
    icon: 'i-lucide-settings',
    to: localeRoute({ name: 'admin' }),
    onSelect: () => {
      open.value = false
    },
  }], [{
    label: t('navigation.feedback'),
    icon: 'i-lucide-message-circle',
    to: 'https://github.com/nuxt-ui-templates/dashboard',
    target: '_blank',
  }, {
    label: t('navigation.helpSupport'),
    icon: 'i-lucide-info',
    to: 'https://github.com/nuxt-ui-templates/dashboard',
    target: '_blank',
  }]] satisfies NavigationMenuItem[][]
})

// const groups = computed(() => [{
//   id: 'links',
//   label: 'Go to',
//   items: links.value.flat(),
// }, {
//   id: 'code',
//   label: 'Code',
//   items: [{
//     id: 'source',
//     label: 'View page source',
//     icon: 'i-simple-icons-github',
//     to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
//     target: '_blank',
//   }],
// }])
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #header="{ collapsed }">
        <AppLogo :collapsed="collapsed" class="mx-auto h-full py-2" />
      </template>

      <template #default="{ collapsed }">
        <!--        <UDashboardSearchButton :collapsed="collapsed" class="bg-transparent ring-default" /> -->

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <!--    <UDashboardSearch :groups="groups" /> -->
    <slot />
  </UDashboardGroup>
</template>

<i18n lang="yaml">
en:
  navigation:
    dashboard: "Dashboard"
    portfolio: "Portfolio"
    projects: "Projects"
    components: "Components"
    vulnerabilities: "Vulnerabilities"
    licenses: "Licenses"
    tags: "Tags"
    globalAudit: "Global Audit"
    vulnerabilityAudit: "Vulnerability Audit"
    policyViolationAudit: "Policy Violation Audit"
    administration: "Administration"
    policyManagement: "Policy Management"
    admin: "Administration"
    feedback: "Feedback"
    helpSupport: "Help & Support"
de:
  navigation:
    dashboard: "Dashboard"
    portfolio: "Portfolio"
    projects: "Projekte"
    components: "Komponenten"
    vulnerabilities: "Schwachstellen"
    licenses: "Lizenzen"
    tags: "Tags"
    globalAudit: "Globales Audit"
    vulnerabilityAudit: "Schwachstellen-Audit"
    policyViolationAudit: "Richtlinienverstoß-Audit"
    administration: "Verwaltung"
    policyManagement: "Richtlinienverwaltung"
    admin: "Administration"
    feedback: "Feedback"
    helpSupport: "Hilfe & Support"
</i18n>
