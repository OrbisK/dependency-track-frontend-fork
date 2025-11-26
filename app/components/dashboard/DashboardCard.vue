<script setup lang="ts">
import type { CardProps } from '@nuxt/ui'

const props = defineProps<CardProps & {
  subtitle?: string
  title?: string
}>()
</script>

<template>
  <UCard v-bind="props" class="col-span-4">
    <template #header>
      <slot name="header">
        <p class="text-xs text-muted uppercase mb-1.5">
          <slot name="subtitle">
            {{ props.subtitle }}
          </slot>
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          <slot name="title">
            {{ props.title }}
          </slot>
        </p>
      </slot>
    </template>
    <slot />
    <template #footer>
      <slot name="footer" />
    </template>
  </UCard>
</template>
