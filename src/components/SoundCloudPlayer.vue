<template>
  <aside class="music-player" :aria-label="labels.playerLabel" @keydown.esc="closePlayer">
    <section v-if="hasLoaded" v-show="isOpen" id="soundcloud-player-panel" class="music-panel">
      <header class="music-header">
        <div class="music-heading">
          <span class="music-icon" aria-hidden="true">
            <FontAwesomeIcon :icon="['fab', 'soundcloud']" />
          </span>
          <div>
            <span class="music-eyebrow">{{ playerStatusLabel }}</span>
            <strong>City in Rain</strong>
            <small>Xikub · SoundCloud</small>
          </div>
        </div>

        <button
          ref="closeButtonRef"
          class="music-close"
          type="button"
          :aria-label="labels.minimize"
          @click="closePlayer"
        >
          <span aria-hidden="true">−</span>
        </button>
      </header>

      <iframe
        ref="soundCloudFrameRef"
        class="soundcloud-frame"
        :src="embedUrl"
        width="100%"
        height="166"
        scrolling="no"
        frameborder="0"
        allow="autoplay; encrypted-media"
        title="SoundCloud player: City in Rain by Xikub"
      ></iframe>

      <a
        class="soundcloud-link"
        href="https://soundcloud.com/xikub/city-in-rain"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{{ labels.openSoundCloud }}</span>
        <span aria-hidden="true">↗</span>
      </a>
    </section>

    <button
      v-show="!isOpen"
      ref="triggerButtonRef"
      class="music-trigger"
      :class="{ 'is-playing': isPlaying }"
      type="button"
      aria-controls="soundcloud-player-panel"
      :aria-label="triggerAriaLabel"
      :aria-expanded="isOpen"
      @click="openPlayer"
    >
      <span class="music-icon" aria-hidden="true">
        <FontAwesomeIcon :icon="['fab', 'soundcloud']" />
      </span>
      <span class="music-trigger-copy">
        <span class="music-trigger-status" role="status" aria-live="polite">
          <span class="music-status-dot" :class="{ 'is-active': isPlaying }" aria-hidden="true"></span>
          {{ playerStatusLabel }}
        </span>
        <strong>City in Rain</strong>
      </span>
      <span class="music-play-mark" :class="{ 'is-playing': isPlaying }" aria-hidden="true">
        <span v-if="isPlaying" class="music-equalizer">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span v-else>▶</span>
      </span>
    </button>
  </aside>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  language: {
    type: String,
    default: 'en'
  }
})

const isOpen = ref(true)
const hasLoaded = ref(true)
const closeButtonRef = ref(null)
const triggerButtonRef = ref(null)
const soundCloudFrameRef = ref(null)
const playbackState = ref('loading')
let soundCloudWidget
let soundCloudEvents
let isDisposed = false

const embedUrl = 'https://w.soundcloud.com/player/?url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F791538184&color=%2300ff7f&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false'

const translations = {
  en: {
    playerLabel: 'Music player',
    loading: 'Connecting to SoundCloud',
    playing: 'Now playing',
    ready: 'Click to play',
    openPlayer: 'Open the player and play City in Rain',
    openWhilePlaying: 'Open music player — City in Rain is playing',
    minimize: 'Minimize music player',
    openSoundCloud: 'Open on SoundCloud'
  },
  pl: {
    playerLabel: 'Odtwarzacz muzyki',
    loading: 'Łączenie z SoundCloud',
    playing: 'Teraz gra',
    ready: 'Kliknij, aby odtworzyć',
    openPlayer: 'Otwórz odtwarzacz i odtwórz City in Rain',
    openWhilePlaying: 'Otwórz odtwarzacz — City in Rain jest odtwarzany',
    minimize: 'Zminimalizuj odtwarzacz muzyki',
    openSoundCloud: 'Otwórz w SoundCloud'
  }
}

const labels = computed(() => translations[props.language] ?? translations.en)
const isPlaying = computed(() => playbackState.value === 'playing')
const playerStatusLabel = computed(() => {
  if (playbackState.value === 'playing') {
    return labels.value.playing
  }

  if (playbackState.value === 'loading') {
    return labels.value.loading
  }

  return labels.value.ready
})
const triggerAriaLabel = computed(() => (
  isPlaying.value ? labels.value.openWhilePlaying : labels.value.openPlayer
))

const loadSoundCloudApi = () => {
  if (window.SC?.Widget) {
    return Promise.resolve(window.SC)
  }

  return new Promise((resolve, reject) => {
    let script = document.getElementById('soundcloud-widget-api')

    const handleLoad = () => {
      if (window.SC?.Widget) {
        resolve(window.SC)
      } else {
        reject(new Error('SoundCloud Widget API is unavailable'))
      }
    }

    const handleError = () => reject(new Error('SoundCloud Widget API failed to load'))

    if (!script) {
      script = document.createElement('script')
      script.id = 'soundcloud-widget-api'
      script.src = 'https://w.soundcloud.com/player/api.js'
      script.async = true
      script.addEventListener('load', handleLoad, { once: true })
      script.addEventListener('error', handleError, { once: true })
      document.head.appendChild(script)
      return
    }

    script.addEventListener('load', handleLoad, { once: true })
    script.addEventListener('error', handleError, { once: true })
  })
}

onMounted(async () => {
  await nextTick()

  try {
    const soundCloud = await loadSoundCloudApi()

    if (isDisposed || !soundCloudFrameRef.value) {
      return
    }

    soundCloudWidget = soundCloud.Widget(soundCloudFrameRef.value)
    soundCloudEvents = soundCloud.Widget.Events

    soundCloudWidget.bind(soundCloudEvents.READY, () => {
      playbackState.value = 'ready'
      soundCloudWidget.isPaused((isPaused) => {
        if (!isDisposed) {
          playbackState.value = isPaused ? 'paused' : 'playing'
        }
      })
    })
    soundCloudWidget.bind(soundCloudEvents.PLAY, () => {
      playbackState.value = 'playing'
    })
    soundCloudWidget.bind(soundCloudEvents.PAUSE, () => {
      playbackState.value = 'paused'
    })
    soundCloudWidget.bind(soundCloudEvents.FINISH, () => {
      playbackState.value = 'paused'
    })

    if (soundCloudEvents.ERROR) {
      soundCloudWidget.bind(soundCloudEvents.ERROR, () => {
        playbackState.value = 'unavailable'
      })
    }
  } catch {
    if (!isDisposed) {
      playbackState.value = 'unavailable'
    }
  }
})

onBeforeUnmount(() => {
  isDisposed = true

  if (!soundCloudWidget || !soundCloudEvents) {
    return
  }

  soundCloudWidget.unbind(soundCloudEvents.READY)
  soundCloudWidget.unbind(soundCloudEvents.PLAY)
  soundCloudWidget.unbind(soundCloudEvents.PAUSE)
  soundCloudWidget.unbind(soundCloudEvents.FINISH)

  if (soundCloudEvents.ERROR) {
    soundCloudWidget.unbind(soundCloudEvents.ERROR)
  }

  soundCloudWidget = undefined
})

const openPlayer = async () => {
  hasLoaded.value = true
  isOpen.value = true
  if (!isPlaying.value) {
    soundCloudWidget?.play()
  }
  await nextTick()
  closeButtonRef.value?.focus()
}

const closePlayer = async () => {
  if (!isOpen.value) {
    return
  }

  isOpen.value = false
  await nextTick()
  triggerButtonRef.value?.focus()
}
</script>

<style scoped>
.music-player {
  position: fixed;
  right: clamp(0.85rem, 2vw, 1.5rem);
  bottom: clamp(0.85rem, 2vw, 1.5rem);
  z-index: 40;
  font-family: 'Inter', system-ui, sans-serif;
}

.music-trigger,
.music-panel {
  border: 1px solid rgba(0, 255, 127, 0.42);
  background: rgba(18, 22, 20, 0.96);
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
}

.music-trigger {
  min-width: min(18rem, calc(100vw - 1.7rem));
  min-height: 3.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border-radius: 14px;
  color: var(--text);
  cursor: pointer;
  text-align: left;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.music-trigger.is-playing {
  border-color: rgba(0, 255, 127, 0.82);
  box-shadow: 0 20px 55px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 255, 127, 0.12), 0 0 30px rgba(0, 255, 127, 0.1);
}

.music-icon {
  flex: 0 0 auto;
  width: 2.35rem;
  height: 2.35rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(145deg, #ff7a22, #ff3d00);
  box-shadow: 0 8px 22px rgba(255, 85, 0, 0.24);
}

.music-trigger.is-playing .music-icon {
  animation: music-icon-pulse 1.8s ease-in-out infinite;
}

.music-trigger-copy {
  min-width: 0;
  display: grid;
  gap: 0.15rem;
  flex: 1;
}

.music-trigger-copy > span,
.music-eyebrow {
  color: var(--muted);
  font-family: 'Fira Code', monospace;
  font-size: 0.68rem;
  line-height: 1.2;
}

.music-trigger-status {
  display: inline-flex;
  align-items: center;
  gap: 0.38rem;
}

.music-trigger.is-playing .music-trigger-status {
  color: var(--accent);
}

.music-status-dot {
  flex: 0 0 auto;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 999px;
  background: var(--soft);
}

.music-status-dot.is-active {
  background: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 255, 127, 0.12), 0 0 12px rgba(0, 255, 127, 0.72);
}

.music-trigger-copy strong,
.music-heading strong {
  color: var(--text);
  font-size: 0.9rem;
  line-height: 1.2;
}

.music-play-mark {
  width: 2rem;
  height: 2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 255, 127, 0.4);
  border-radius: 999px;
  color: var(--accent);
  font-size: 0.68rem;
}

.music-play-mark.is-playing {
  border-color: rgba(0, 255, 127, 0.8);
  background: rgba(0, 255, 127, 0.1);
}

.music-equalizer {
  width: 1rem;
  height: 0.85rem;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.12rem;
}

.music-equalizer > span {
  width: 0.13rem;
  height: 100%;
  border-radius: 999px;
  background: var(--accent);
  transform-origin: bottom;
  animation: music-equalizer 620ms ease-in-out infinite alternate;
}

.music-equalizer > span:nth-child(2) {
  animation-delay: -310ms;
}

.music-equalizer > span:nth-child(3) {
  animation-delay: -470ms;
}

.music-equalizer > span:nth-child(4) {
  animation-delay: -150ms;
}

@keyframes music-equalizer {
  from {
    transform: scaleY(0.28);
  }

  to {
    transform: scaleY(1);
  }
}

@keyframes music-icon-pulse {
  0%,
  100% {
    box-shadow: 0 8px 22px rgba(255, 85, 0, 0.24);
  }

  50% {
    box-shadow: 0 8px 28px rgba(255, 85, 0, 0.52);
  }
}

.music-panel {
  width: min(25rem, calc(100vw - 1.7rem));
  padding: 0.8rem;
  border-radius: 18px;
}

.music-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.music-heading {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.music-heading > div {
  min-width: 0;
  display: grid;
  gap: 0.12rem;
}

.music-heading small {
  color: var(--soft);
  font-size: 0.72rem;
}

.music-close {
  flex: 0 0 auto;
  width: 2.75rem;
  height: 2.75rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.045);
  font-size: 1.35rem;
  cursor: pointer;
}

.soundcloud-frame {
  display: block;
  width: 100%;
  border: 0;
  border-radius: 11px;
  background: #111;
}

.soundcloud-link {
  min-height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 0.65rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid rgba(0, 255, 127, 0.24);
  border-radius: 10px;
  color: var(--accent);
  background: rgba(0, 255, 127, 0.055);
  font-family: 'Fira Code', monospace;
  font-size: 0.72rem;
  text-decoration: none;
}

@media (hover: hover) and (pointer: fine) {
  .music-trigger:hover {
    transform: translateY(-3px);
    border-color: rgba(0, 255, 127, 0.72);
    box-shadow: 0 24px 65px rgba(0, 0, 0, 0.46), 0 12px 28px rgba(0, 255, 127, 0.09);
  }

  .music-close:hover,
  .soundcloud-link:hover {
    color: #fff;
    border-color: var(--accent);
  }
}

@media (max-width: 560px) {
  .music-player {
    right: calc(0.65rem + env(safe-area-inset-right));
    bottom: calc(0.65rem + env(safe-area-inset-bottom));
  }

  .music-trigger,
  .music-panel {
    width: calc(100vw - 1.3rem);
  }

  .music-trigger {
    min-width: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .music-trigger {
    transition: none;
  }

  .music-trigger:hover {
    transform: none;
  }

  .music-trigger.is-playing .music-icon,
  .music-equalizer > span {
    animation: none;
  }

  .music-equalizer > span:nth-child(1),
  .music-equalizer > span:nth-child(3) {
    transform: scaleY(0.55);
  }

  .music-equalizer > span:nth-child(2),
  .music-equalizer > span:nth-child(4) {
    transform: scaleY(0.9);
  }
}
</style>
