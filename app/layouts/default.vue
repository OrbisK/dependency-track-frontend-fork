<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const open = shallowRef(false)

const links = [[{
  label: 'Dashboard',
  icon: 'i-lucide-house',
  to: '/dashboard',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Portfolio',
  type: 'label',
}, {
  label: 'Projects',
  to: '/projects',
  icon: 'i-lucide-folder-tree',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Components',
  icon: 'i-lucide-boxes',
  to: '/components',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Vulnerabilities',
  icon: 'i-lucide-shield-half',
  to: '/vulnerabilities',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Licenses',
  icon: 'i-lucide-scale',
  to: '/licenses',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Tags',
  icon: 'i-lucide-tags',
  to: '/tags',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Global Audit',
  type: 'label',
}, {
  label: 'Vulnerability Audit',
  icon: 'i-lucide-shield-question-mark',
  to: '/vulnerabilityAudit',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Policy Violation Audit',
  icon: 'i-lucide-package-search',
  to: '/policyViolationAudit',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Administration',
  type: 'label',
}, {
  label: 'Policy Management',
  icon: 'i-lucide-award',
  to: '/policy',
  onSelect: () => {
    open.value = false
  },
}, {
  label: 'Administration',
  icon: 'i-lucide-settings',
  to: '/todo',
  onSelect: () => {
    open.value = false
  },
}], [{
  label: 'Feedback',
  icon: 'i-lucide-message-circle',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank',
}, {
  label: 'Help & Support',
  icon: 'i-lucide-info',
  to: 'https://github.com/nuxt-ui-templates/dashboard',
  target: '_blank',
}]] satisfies NavigationMenuItem[][]

const groups = computed(() => [{
  id: 'links',
  label: 'Go to',
  items: links.flat(),
}, {
  id: 'code',
  label: 'Code',
  items: [{
    id: 'source',
    label: 'View page source',
    icon: 'i-simple-icons-github',
    to: `https://github.com/nuxt-ui-templates/dashboard/blob/main/app/pages${route.path === '/' ? '/index' : route.path}.vue`,
    target: '_blank',
  }],
}])
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

    <UDashboardSearch :groups="groups" />
    <slot />
  </UDashboardGroup>
</template>
