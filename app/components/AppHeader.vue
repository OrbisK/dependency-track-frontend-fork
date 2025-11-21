<script setup lang="ts">
const route = useRoute()

const items = [{
  label: 'Docs',
  to: '/docs',
  active: route.path.startsWith('/docs'),
}, {
  label: 'Pricing',
  to: '/pricing',
}, {
  label: 'Blog',
  to: '/blog',
}, {
  label: 'Changelog',
  to: '/changelog',
}]
</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        Logo
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />

      <USeparator class="my-6" />
    </template>
  </UHeader>
</template>
