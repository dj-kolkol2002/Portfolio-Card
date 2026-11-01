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
  width: 100%;
  max-width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 1.875rem;
  padding: 0.35rem 0.55rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  background: var(--surface-raised);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 500;
  line-height: 1.2;
  cursor: default;
  transition: background 140ms ease, border-color 140ms ease;
}

.skill-badge span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.skill-badge:hover {
  background: var(--orange-wash);
  border-color: var(--line-orange);
}

.skill-badge-icon {
  flex: 0 0 0.9rem;
  color: var(--accent);
  font-size: 0.78rem;
}

.skill-badge:hover .skill-badge-icon {
  color: var(--orange);
}

@media (max-width: 560px) {
  .skill-badge {
    gap: 0.45rem;
    padding-inline: 0.5rem;
    font-size: 0.75rem;
  }

  .skill-badge-icon {
    font-size: 0.72rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .skill-badge {
    transition: none;
  }
}
</style>
