<template>
  <svg
    class="app-icon"
    :viewBox="viewBox"
    aria-hidden="true"
    focusable="false"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path v-for="(path, index) in paths" :key="index" :d="path" fill="currentColor" />
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { iconDefinitions } from '../icons.js'

const props = defineProps({
  icon: {
    type: Array,
    required: true
  }
})

const definition = computed(() => iconDefinitions[`${props.icon[0]}:${props.icon[1]}`])
const viewBox = computed(() => {
  const [width = 512, height = 512] = definition.value?.icon ?? []
  return `0 0 ${width} ${height}`
})
const paths = computed(() => {
  const pathData = definition.value?.icon?.[4]

  if (!pathData) {
    return []
  }

  return Array.isArray(pathData) ? pathData : [pathData]
})
</script>

<style>
.app-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
</style>
