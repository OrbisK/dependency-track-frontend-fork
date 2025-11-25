<script setup lang="ts">
import type { CardProps } from '@nuxt/ui'

const props = defineProps<CardProps & { value?: number, total?: number, title?: string }>()

const progress = computed(() => {
  return (props.value !== undefined && props.total !== undefined && props.total > 0)
    ? Math.min(Math.max((props.value / props.total) * 100, 0), 100)
    : 0
})

// temp workaround for local scope https://github.com/nuxt-modules/i18n/issues/3885
useI18n()
</script>

<template>
  <UCard v-bind="props">
    <div class="flex flex-col items-center">
      <slot>
        <p class="text-xs text-muted uppercase">
          {{ props.title }}
        </p>
      </slot>
      <i18n-t tag="p" keypath="progress" class="font-semibold">
        <template #value>
          {{ props.value ?? 0 }}
        </template>
        <template #percent>
          {{ progress.toFixed(0) }}
        </template>
      </i18n-t>
      <UProgress :model-value="progress" />
    </div>
  </UCard>
</template>

<i18n lang="yaml">
en:
  progress: "{value} ({percent}%)"
de:
  progress: "{value} ({percent}%)"
</i18n>
