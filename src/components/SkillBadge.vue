<template>
  <span class="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-purple-900/40 text-purple-200 border border-purple-500/30 backdrop-blur-md hover:bg-purple-600/40 hover:border-purple-400/60 hover:text-white hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:-translate-y-0.5 transition-all duration-300 cursor-default">
    <FontAwesomeIcon :icon="icon" class="text-purple-400 transition-colors duration-300 group-hover:text-purple-200 drop-shadow-sm" />
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
