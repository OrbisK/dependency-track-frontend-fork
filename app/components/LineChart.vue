<script setup lang="ts" generic="DataKeys extends string">
import { VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/vue'

interface DataRecord {
  date: Date
  values: Record<DataKeys, number>
}

const { data = [], config = [] } = defineProps<{
  data?: DataRecord[]
  config?: { key: NoInfer<DataKeys>, color?: string }[]
}>()

const x = (_: DataRecord, i: number) => i
const y = config.map(({ key }) => {
  return (d: DataRecord) => d.values[key]
})

const { locale } = useI18n()

const formatDate = computed(() => new Intl.DateTimeFormat(locale.value, { month: 'short', day: 'numeric' }).format)

const xTickFormat = computed(() => {
  const formatter = formatDate.value
  return (i: number) => {
    if (i === 0 || i === data.length - 1 || !data[i]) {
      return ''
    }

    return formatter(data[i].date)
  }
})

function color(d: DataRecord, i: number) {
  return config[i]?.color ?? 'var(--ui-primary)'
}
</script>

<template>
  <client-only>
    <VisXYContainer
      :data="data"
      :padding="{ top: 40 }"
      width="100%"
    >
      <VisLine
        :x="x"
        :y="y"
        :color="color"
      />
      <!--    <VisArea -->
      <!--      :x="x" -->
      <!--      :y="y" -->
      <!--      color="var(&#45;&#45;ui-primary)" -->
      <!--      :opacity="0.1" -->
      <!--    /> -->

      <VisAxis
        type="x"
        :x="x"
        :tick-format="xTickFormat"
      />

      <VisAxis
        type="y"
      />

      <VisCrosshair
        :color="color"
      />

      <VisTooltip />
    </VisXYContainer>

    <template #fallback>
      <USkeleton v-bind="$attrs" />
    </template>
  </client-only>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
