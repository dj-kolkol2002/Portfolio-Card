<template>
  <span class="skill-badge">
    <FontAwesomeIcon :icon="icon" class="skill-badge-icon" />
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

<style scoped>
.skill-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
  min-height: 1.85rem;
  padding: 0.32rem 0.5rem;
  border: 1px solid rgba(0, 255, 127, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.055);
  color: var(--text);
  font-family: 'Fira Code', monospace;
  font-size: 0.74rem;
  font-weight: 500;
  line-height: 1.2;
  cursor: default;
  transition: background 140ms ease, border-color 140ms ease;
}

.skill-badge:hover {
  background: rgba(0, 255, 127, 0.12);
  border-color: rgba(0, 255, 127, 0.58);
}

.skill-badge-icon {
  color: var(--accent);
  font-size: 0.78rem;
}

.skill-badge:hover .skill-badge-icon {
  color: var(--orange);
}
</style>
