<template>
  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-200">
    <FontAwesomeIcon :icon="icon" class="text-sm" />
    <span>{{ name }}</span>
  </span>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: Array,
    required: true
  }
})
</script>
