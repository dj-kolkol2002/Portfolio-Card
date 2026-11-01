<template>
  <div class="app-shell">
    <aside ref="navigationRef" class="side-nav" :aria-label="t.navigationLabel">
      <a class="brand-mark" href="#home" aria-label="JK — Jakub Kołkowski">JK</a>

      <nav class="nav-links">
        <a
          v-for="item in navLinks"
          :key="item.href"
          :href="item.href"
          :aria-label="item.label"
          :aria-current="activeSection === item.href.slice(1) ? 'location' : undefined"
        >
          <FontAwesomeIcon class="nav-icon" :icon="item.icon" />
          <span class="nav-label">{{ item.label }}</span>
          <span class="nav-short-label" aria-hidden="true">{{ item.shortLabel }}</span>
        </a>
      </nav>

      <button @click="toggleLanguage" class="lang-toggle" type="button" :aria-label="t.switchLanguage" :title="t.switchLanguage">
        {{ currentLanguage === 'en' ? 'EN' : 'PL' }}
      </button>
    </aside>

    <main class="page-content">
      <section id="home" class="section-screen hero-section">
        <span class="code-tag top">&lt;body&gt;</span>

        <div class="hero-copy">
          <span class="pre-title">{{ t.hello }}</span>
          <h1 class="hero-title">
            Jakub
            <span>Kołkowski</span>
          </h1>
          <p class="hero-role">{{ t.subtitle }}</p>
          <p class="hero-description">{{ t.description }}</p>

          <div class="hero-actions">
            <a href="#contact" class="primary-action">{{ t.contactAction }}</a>
            <a href="#projects" class="secondary-action">{{ t.projectsAction }}</a>
          </div>
        </div>

        <div class="terminal-card" :aria-label="t.terminalLabel" @click="focusTerminal">
          <div class="terminal-top" aria-hidden="true">
            <span class="terminal-dot"></span>
            <span class="terminal-dot"></span>
            <span class="terminal-dot"></span>
          </div>
          <div ref="terminalBodyRef" class="terminal-body">
            <div v-for="entry in terminalEntries" :key="entry.id" class="terminal-entry">
              <p class="terminal-command"><span>$</span> {{ entry.command }}</p>
              <strong v-if="entry.type === 'headline'">{{ entry.output }}</strong>
              <ul v-else-if="entry.type === 'list'">
                <li v-for="line in entry.output" :key="line">{{ line }}</li>
              </ul>
              <p v-else class="terminal-output">{{ entry.output }}</p>
            </div>
            <form class="terminal-input-row" @submit.prevent="runTerminalCommand">
              <label for="terminal-input">$</label>
              <input
                id="terminal-input"
                ref="terminalInputRef"
                v-model="terminalInput"
                type="text"
                autocomplete="off"
                spellcheck="false"
                :aria-label="t.terminalCommandLabel"
                :placeholder="t.terminalPlaceholder"
                @focus="focusTerminal"
              >
            </form>
          </div>
        </div>

        <span class="code-tag bottom">&lt;/body&gt;</span>
      </section>

      <section id="projects" class="page-section projects-section" aria-labelledby="projects-title">
        <div class="section-heading">
          <span>&lt;section&gt;</span>
          <h2 id="projects-title" class="hover-title">{{ t.projects }}</h2>
          <p>{{ t.projectsIntro }}</p>
        </div>

        <div class="project-gallery-toolbar">
          <p id="project-gallery-hint">{{ t.projectGalleryHint }}</p>
          <div class="project-gallery-controls">
            <span class="project-gallery-status" role="status" aria-live="polite" aria-atomic="true">
              {{ projectStart + 1 }}<template v-if="projectVisibleCount > 1">–{{ projectEnd }}</template> / {{ projectsList.length }}
            </span>
            <button type="button" :aria-label="t.previousProjects" aria-controls="project-gallery" :disabled="projectStart === 0" @click="moveProjects(-projectVisibleCount)">
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" :aria-label="t.nextProjects" aria-controls="project-gallery" :disabled="projectEnd === projectsList.length" @click="moveProjects(projectVisibleCount)">
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          id="project-gallery"
          ref="projectGalleryRef"
          class="projects-bento"
          role="region"
          :aria-label="t.projectGalleryLabel"
          aria-describedby="project-gallery-hint"
          tabindex="0"
          @scroll.passive="updateProjectPosition"
          @keydown="handleProjectGalleryKey"
        >
          <article
            v-for="(project, index) in projectsList"
            :key="project.id"
            class="project-card project-bento-card"
            :class="`project-bento-card--${project.layout}`"
            :aria-labelledby="`project-${project.id}`"
          >
            <div class="project-visual">
              <img
                :src="project.image"
                :srcset="project.imageSrcset"
                :alt="project.imageAlt"
                :width="project.width"
                :height="project.height"
                sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1080px) 45vw, (max-width: 1508px) 30vw, 420px"
                loading="lazy"
                decoding="async"
                fetchpriority="low"
              >
            </div>

            <div class="project-card-body">
              <div class="project-meta">
                <span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                <span>{{ project.category }}</span>
              </div>

              <div class="project-copy">
                <h3 :id="`project-${project.id}`">{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>

              <ul class="tech-row" :aria-label="t.technologies">
                <li v-for="tech in project.technologies" :key="tech">{{ tech }}</li>
              </ul>

              <footer class="project-footer">
                <a
                  class="project-link"
                  :href="project.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`${t.repository}: ${project.title} — ${t.newTab}`"
                >
                  <FontAwesomeIcon :icon="['fab', 'github']" aria-hidden="true" />
                  <span>{{ t.repository }}</span>
                  <span class="project-link-arrow" aria-hidden="true">↗</span>
                </a>
              </footer>
            </div>
          </article>
        </div>
      </section>

      <section id="skills" class="page-section">
        <div class="section-heading">
          <span>&lt;skills&gt;</span>
          <h2 class="hover-title">{{ t.skills }}</h2>
          <p>{{ t.skillsIntro }}</p>
        </div>

        <div class="skill-groups">
          <article
            v-for="group in skillGroups"
            :key="group.id"
            class="skill-group"
          >
            <div class="group-heading">
              <span class="group-icon"><FontAwesomeIcon :icon="group.icon" /></span>
              <div class="group-intro">
                <h3>{{ group.title }}</h3>
                <p>{{ t.skillDescriptions[group.id] }}</p>
              </div>
            </div>
            <ul class="skill-list" :aria-label="group.title">
              <li v-for="skill in group.skills" :key="skill.name">
                <SkillBadge :name="skill.name" :icon="skill.icon" />
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section id="education" class="page-section resume-duo">
        <div class="duo-panel">
          <div class="section-heading compact">
            <span>&lt;education&gt;</span>
            <h2 class="hover-title">{{ t.education }}</h2>
          </div>

          <div class="timeline-list compact">
            <article v-for="edu in education" :key="`${edu.degree}-${edu.institution}-${edu.period}`" class="timeline-item">
              <div class="timeline-head">
                <div>
                  <h3>{{ edu.institution || edu.degree }}</h3>
                  <p v-if="edu.institution" class="timeline-place">{{ edu.degree }}</p>
                </div>
                <span v-if="edu.period">{{ edu.period }}</span>
              </div>
              <ul v-if="edu.tasks && edu.tasks.length">
                <li v-for="task in edu.tasks" :key="task">{{ task }}</li>
              </ul>
            </article>
          </div>
        </div>

        <div class="duo-panel">
          <div class="section-heading compact">
            <span>&lt;certs&gt;</span>
            <h2 class="hover-title">{{ t.certifications }}</h2>
          </div>

          <ul class="cert-list">
            <li v-for="cert in certifications" :key="cert">
              <FontAwesomeIcon :icon="['fas', 'award']" />
              <span>{{ cert }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="contact" class="page-section contact-section">
        <div class="section-heading">
          <span>&lt;contact&gt;</span>
          <h2 class="hover-title">{{ t.contact }}</h2>
          <p>{{ t.contactIntro }}</p>
        </div>

        <div class="contact-grid">
          <a
            v-for="contact in contactLinks"
            :key="contact.label"
            :href="contact.href"
            :target="contact.external ? '_blank' : undefined"
            :rel="contact.external ? 'noopener noreferrer' : undefined"
            class="contact-card"
          >
            <FontAwesomeIcon :icon="contact.icon" />
            <span class="contact-card-copy">
              <strong>{{ contact.label }}</strong>
              <span>{{ contact.description ?? t[contact.descriptionKey] }}</span>
            </span>
            <span class="contact-card-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <footer class="portfolio-footer">Jakub Kołkowski | 2026</footer>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import SkillBadge from './components/SkillBadge.vue'

const languageStorageKey = 'portfolio-language'
const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem(languageStorageKey)
    if (saved === 'pl' || saved === 'en') return saved
  } catch {
    // The language switch also works when browser storage is unavailable.
  }
  return navigator.language?.toLowerCase().startsWith('pl') ? 'pl' : 'en'
}

const currentLanguage = ref(getInitialLanguage())
const activeSection = ref('home')
const navigationRef = ref(null)
const projectGalleryRef = ref(null)
const projectStart = ref(0)
const projectVisibleCount = ref(3)
const projectEnd = computed(() => Math.min(projectStart.value + projectVisibleCount.value, projectsList.value.length))
const terminalInput = ref('')
const terminalInputRef = ref(null)
const terminalBodyRef = ref(null)
const emailAddress = 'jakubkolkowski5@gmail.com'
let terminalEntryId = 2
let navigationFrame = 0
let navigationObserver
let projectGalleryObserver
let projectStep = 0

const terminalHistory = ref([
  { id: 0, command: 'whoami' },
  { id: 1, command: 'focus' }
])

const focusTerminal = () => {
  terminalInputRef.value?.focus({ preventScroll: true })
  if (terminalBodyRef.value) {
    terminalBodyRef.value.scrollTop = terminalBodyRef.value.scrollHeight
  }
}

const runTerminalCommand = async () => {
  const command = terminalInput.value.trim()
  if (!command) return

  terminalInput.value = ''
  if (command.toLowerCase() === 'clear') {
    terminalHistory.value = []
  } else {
    terminalHistory.value.push({ id: terminalEntryId++, command })
  }

  await nextTick()
  focusTerminal()
}

const contactLinks = [
  { label: 'E-mail', description: emailAddress, href: `mailto:${emailAddress}`, icon: ['fas', 'envelope'], external: false },
  { label: 'GitHub', descriptionKey: 'githubDescription', href: 'https://github.com/dj-kolkol2002', icon: ['fab', 'github'], external: true },
  { label: 'LinkedIn', descriptionKey: 'linkedinDescription', href: 'https://www.linkedin.com/in/jakub-ko%C5%82kowski-3932912b7/', icon: ['fab', 'linkedin'], external: true }
]

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'en' ? 'pl' : 'en'
}

const updateActiveSection = () => {
  navigationFrame = 0
  const navHeight = parseFloat(document.documentElement.style.getPropertyValue('--navigation-height')) || 0
  const threshold = navHeight + (window.innerHeight - navHeight) * 0.25
  let sectionId = 'home'
  for (const section of document.querySelectorAll('main > section')) {
    if (section.getBoundingClientRect().top <= threshold) {
      sectionId = section.id
    }
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    sectionId = 'contact'
  }
  activeSection.value = sectionId
}

const scheduleNavigationUpdate = () => {
  if (!navigationFrame) navigationFrame = requestAnimationFrame(updateActiveSection)
}

const syncNavigationLayout = () => {
  const nav = navigationRef.value
  if (!nav) return
  const isTopNavigation = getComputedStyle(nav).getPropertyValue('--nav-layout').trim() === 'top'
  const height = isTopNavigation ? Math.ceil(nav.getBoundingClientRect().height) : 0
  document.documentElement.style.setProperty('--navigation-height', `${height}px`)
  scheduleNavigationUpdate()
}

onMounted(() => {
  window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true })
  window.addEventListener('resize', syncNavigationLayout)
  navigationObserver = new ResizeObserver(syncNavigationLayout)
  navigationObserver.observe(navigationRef.value)
  projectGalleryObserver = new ResizeObserver(syncProjectGallery)
  projectGalleryObserver.observe(projectGalleryRef.value)
  syncProjectGallery()
  syncNavigationLayout()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scheduleNavigationUpdate)
  window.removeEventListener('resize', syncNavigationLayout)
  navigationObserver?.disconnect()
  projectGalleryObserver?.disconnect()
  document.documentElement.style.removeProperty('--navigation-height')
  cancelAnimationFrame(navigationFrame)
})

// Translations
const translations = {
  en: {
    hello: 'Hello, I am',
    subtitle: 'Junior IT Specialist | Systems & Networks',
    description: 'I support business users and configure workstations. I develop my Windows/Linux administration and networking skills in hands-on labs.',
    contactAction: 'Get in touch',
    projectsAction: 'Show my work',
    webDev: 'Development & Automation',
    skills: 'Skills',
    infrastructure: 'Infrastructure',
    helpdesk: 'IT Support',
    aiTools: 'AI Tools',
    education: 'Education',
    certifications: 'Certifications',
    contact: 'Contact',
    projects: 'Projects',
    repository: 'Repository',
    newTab: 'opens in a new tab',
    technologies: 'Technologies used',
    projectsIntro: 'Hands-on Windows and Linux administration, enterprise networking, self-hosting, helpdesk development, workstation onboarding and kiosk systems.',
    projectGalleryHint: 'Swipe or use the arrows to browse.',
    projectGalleryLabel: 'Project gallery',
    previousProjects: 'Previous projects',
    nextProjects: 'Next projects',
    skillsIntro: 'Technologies and tools from my IT support work and personal infrastructure and development projects.',
    contactIntro: 'Email me to discuss an IT role or a project. You can also find me on LinkedIn and GitHub.',
    navHome: 'Home',
    navProjects: 'Projects',
    navSkills: 'Skills',
    navContact: 'Contact',
    navSkillsShort: 'Skills',
    navigationLabel: 'Portfolio navigation',
    switchLanguage: 'Switch to Polish',
    skillDescriptions: {
      infrastructure: 'Servers, networks and virtual environments.',
      helpdesk: 'User support and service request management.',
      automation: 'Scripts, applications and repeatable workflows.',
      ai: 'AI assistants, local models and automation.'
    },
    githubDescription: 'Code & projects',
    linkedinDescription: 'Professional profile',
    terminalLabel: 'Interactive profile terminal',
    terminalCommandLabel: 'Terminal command',
    terminalPlaceholder: 'type help',
    terminalHeadline: 'Junior IT Specialist',
    terminalFocus: ['IT support', 'Windows / Linux & networks', 'Automation'],
    terminalUnknown: 'Command not found:',
    terminalHelpHint: 'Type help to see available commands.'
  },
  pl: {
    hello: 'Cześć, jestem',
    subtitle: 'Junior IT | Systemy i sieci',
    description: 'Wspieram użytkowników biznesowych i konfiguruję stanowiska. Rozwijam umiejętności administracji Windows/Linux i sieci we własnych laboratoriach.',
    contactAction: 'Kontakt',
    projectsAction: 'Zobacz projekty',
    webDev: 'Programowanie i automatyzacja',
    skills: 'Umiejętności',
    infrastructure: 'Infrastruktura',
    helpdesk: 'Wsparcie IT',
    aiTools: 'Narzędzia AI',
    education: 'Edukacja',
    certifications: 'Certyfikaty',
    contact: 'Kontakt',
    projects: 'Projekty',
    repository: 'Repozytorium',
    newTab: 'otwiera się w nowej karcie',
    technologies: 'Wykorzystane technologie',
    projectsIntro: 'Praktyczne projekty z administracji Windows i Linux, sieci firmowych, self-hostingu, aplikacji helpdesk, onboardingu stacji roboczych i systemów kioskowych.',
    projectGalleryHint: 'Przesuń lub użyj strzałek, aby przeglądać.',
    projectGalleryLabel: 'Galeria projektów',
    previousProjects: 'Poprzednie projekty',
    nextProjects: 'Następne projekty',
    skillsIntro: 'Technologie i narzędzia z pracy we wsparciu IT oraz własnych projektów infrastrukturalnych i programistycznych.',
    contactIntro: 'Napisz w sprawie pracy w IT lub współpracy przy projekcie. Znajdziesz mnie również na LinkedIn i GitHubie.',
    navHome: 'Start',
    navProjects: 'Projekty',
    navSkills: 'Umiejętności',
    navContact: 'Kontakt',
    navSkillsShort: 'Umiejęt.',
    navigationLabel: 'Nawigacja portfolio',
    switchLanguage: 'Zmień język na angielski',
    skillDescriptions: {
      infrastructure: 'Serwery, sieci i środowiska wirtualne.',
      helpdesk: 'Pomoc użytkownikom i zarządzanie zgłoszeniami.',
      automation: 'Skrypty, aplikacje i automatyzacja zadań.',
      ai: 'Asystenci AI, lokalne modele i automatyzacja.'
    },
    githubDescription: 'Kod i projekty',
    linkedinDescription: 'Profil zawodowy',
    terminalLabel: 'Interaktywny terminal profilu',
    terminalCommandLabel: 'Polecenie terminala',
    terminalPlaceholder: 'wpisz help',
    terminalHeadline: 'Junior IT',
    terminalFocus: ['Wsparcie IT', 'Windows / Linux i sieci', 'Automatyzacja'],
    terminalUnknown: 'Nieznane polecenie:',
    terminalHelpHint: 'Wpisz help, aby zobaczyć dostępne polecenia.'
  }
}

const t = computed(() => translations[currentLanguage.value])

watch(currentLanguage, (language) => {
  document.documentElement.lang = language
  document.title = `Jakub Kołkowski — ${t.value.subtitle}`
  document.querySelector('meta[name="description"]')?.setAttribute('content', t.value.description)
  try {
    localStorage.setItem(languageStorageKey, language)
  } catch {
    // Keep the current selection for this visit when storage is unavailable.
  }
  scheduleNavigationUpdate()
}, { immediate: true })

const navLinks = computed(() => [
  { href: '#home', label: t.value.navHome, shortLabel: t.value.navHome, icon: ['fas', 'terminal'] },
  { href: '#projects', label: t.value.navProjects, shortLabel: t.value.navProjects, icon: ['fas', 'project-diagram'] },
  { href: '#skills', label: t.value.navSkills, shortLabel: t.value.navSkillsShort, icon: ['fas', 'code'] },
  { href: '#contact', label: t.value.navContact, shortLabel: t.value.navContact, icon: ['fas', 'envelope'] }
])

const projectMedia = {
  windows: {
    layout: 'featured',
    file: 'windows-server-960.webp',
    sourceFiles: [
      { file: 'windows-server-480.webp', width: 480 },
      { file: 'windows-server-720.webp', width: 720 },
      { file: 'windows-server-960.webp', width: 960 }
    ],
    width: 960,
    height: 726,
    alt: {
      en: 'Windows 11 installer showing disk selection in the PXE deployment lab',
      pl: 'Instalator Windows 11 z wyborem dysku w laboratorium wdrażania przez PXE'
    }
  },
  network: {
    layout: 'network',
    file: 'eve-ng-960.webp',
    sourceFiles: [
      { file: 'eve-ng-480.webp', width: 480 },
      { file: 'eve-ng-720.webp', width: 720 },
      { file: 'eve-ng-960.webp', width: 960 }
    ],
    width: 960,
    height: 721,
    alt: {
      en: 'EVE-NG company network topology with pfSense, Cisco switches, three VLANs, and Debian and Zabbix servers',
      pl: 'Topologia firmowej sieci EVE-NG z pfSense, przełącznikami Cisco, trzema VLAN-ami oraz serwerami Debian i Zabbix'
    }
  },
  fortigate: {
    layout: 'fortigate',
    file: 'fortigate-unifi-960.webp',
    sourceFiles: [
      { file: 'fortigate-unifi-480.webp', width: 480 },
      { file: 'fortigate-unifi-720.webp', width: 720 },
      { file: 'fortigate-unifi-960.webp', width: 960 }
    ],
    width: 960,
    height: 558,
    alt: {
      en: 'FortiGate 60F and UniFi network topology with native LAN, VLAN 20, two trunk links, a managed switch and a wireless access point',
      pl: 'Topologia sieci FortiGate 60F i UniFi z natywną siecią LAN, VLAN-em 20, dwoma trunkami, przełącznikiem zarządzalnym i punktem dostępowym'
    }
  },
  capyhelp: {
    layout: 'app',
    file: 'capyhelp-960.webp',
    sourceFiles: [
      { file: 'capyhelp-480.webp', width: 480 },
      { file: 'capyhelp-720.webp', width: 720 },
      { file: 'capyhelp-960.webp', width: 960 }
    ],
    width: 960,
    height: 483,
    alt: {
      en: 'Capyhelp dashboard with ticket queue, filters, statuses, and priorities',
      pl: 'Panel Capyhelp z kolejką zgłoszeń, filtrami, statusami i priorytetami'
    }
  },
  onboarding: {
    layout: 'onboarding',
    file: 'onboarding-manager-935.webp',
    sourceFiles: [
      { file: 'onboarding-manager-480.webp', width: 480 },
      { file: 'onboarding-manager-720.webp', width: 720 },
      { file: 'onboarding-manager-935.webp', width: 935 }
    ],
    width: 935,
    height: 550,
    alt: {
      en: 'Onboarding Manager preflight screen checking a Windows 11 workstation before setup',
      pl: 'Ekran kontroli wstępnej Onboarding Managera sprawdzający stację roboczą Windows 11 przed konfiguracją'
    }
  },
  kiosk: {
    layout: 'kiosk',
    file: 'raspberry-pi-kiosk-364.webp',
    width: 364,
    height: 289,
    alt: {
      en: 'Raspberry Pi-class ARM64 computer configured as an enterprise web kiosk',
      pl: 'Komputer ARM64 klasy Raspberry Pi skonfigurowany jako firmowy kiosk internetowy'
    }
  }
}

const projectsData = {
  en: [
    {
      id: 'windows',
      title: 'Windows Server 2025 AD & PXE Homelab',
      description: 'Isolated Windows Server 2025 company lab with AD, DNS/DHCP, GPO, AGDLP file shares, an IIS intranet and Windows 11 deployment through WDS/PXE.',
      category: 'Windows Infrastructure',
      technologies: ['Windows Server 2025', 'Active Directory', 'WDS / PXE', 'PowerShell'],
      link: 'https://github.com/dj-kolkol2002/Windows-Server-2025-Active-Directory-PXE-Homelab'
    },
    {
      id: 'network',
      title: 'Company Lab in EVE-NG',
      description: 'Segmented company network in EVE-NG with three VLANs, pfSense routing and firewalling, Cisco switching, Samba and Zabbix monitoring over SNMP/SNMPv3.',
      category: 'Network Lab',
      technologies: ['EVE-NG', 'pfSense', 'Cisco IOSvL2', 'Zabbix'],
      link: 'https://github.com/dj-kolkol2002/Company-Lab-in-EVE-NG'
    },
    {
      id: 'fortigate',
      title: 'FortiGate + UniFi VLAN WiFi Lab',
      description: 'Physical network lab with a FortiGate 60F, UniFi managed switch and FlexHD access point, using VLAN 20, 802.1Q trunks, DHCP, NAT and firewall policies.',
      category: 'Network Security Lab',
      technologies: ['FortiGate 60F', 'UniFi', '802.1Q VLAN', 'DHCP / NAT'],
      link: 'https://github.com/dj-kolkol2002/FortiGate-UniFi-VLAN-Lab-public'
    },
    {
      id: 'capyhelp',
      title: 'Capyhelp Helpdesk App',
      description: 'Docker-first helpdesk platform with tickets, real-time chat, SLA automation, PDF reports, ClamAV scanning and local AI features powered by Ollama.',
      category: 'Full-stack App',
      technologies: ['Laravel 13', 'Vue 3', 'Docker', 'Ollama'],
      link: 'https://github.com/dj-kolkol2002/Capyhelp-Helpdesk-App'
    },
    {
      id: 'onboarding',
      title: 'Onboarding Manager',
      description: 'Windows 11 desktop app that checks a workstation, installs approved software with WinGet or Chocolatey, assigns its computer name and can join it to Active Directory.',
      category: 'Windows Automation',
      technologies: ['.NET 8', 'WPF', 'WinGet / Chocolatey', 'Active Directory'],
      link: 'https://github.com/dj-kolkol2002/Autoinstalator_Onboarding'
    },
    {
      id: 'kiosk',
      title: 'Raspberry Pi Enterprise Web Kiosk',
      description: 'Minimal Debian 13 ARM64 kiosk that starts an Openbox session and Firefox ESR in fullscreen mode, relaunches the browser after exit and supports remote diagnostics.',
      category: 'Linux Kiosk',
      technologies: ['Debian 13', 'X.Org / Openbox', 'Firefox ESR', 'Bash / systemd'],
      link: 'https://github.com/dj-kolkol2002/Raspberry-Pie-Web-KIOSK'
    }
  ],
  pl: [
    {
      id: 'windows',
      title: 'Windows Server 2025 — AD i PXE Homelab',
      description: 'Izolowane laboratorium Windows Server 2025 z AD, DNS/DHCP, GPO, udziałami plików w modelu AGDLP, intranetem IIS i wdrażaniem Windows 11 przez WDS/PXE.',
      category: 'Infrastruktura Windows',
      technologies: ['Windows Server 2025', 'Active Directory', 'WDS / PXE', 'PowerShell'],
      link: 'https://github.com/dj-kolkol2002/Windows-Server-2025-Active-Directory-PXE-Homelab'
    },
    {
      id: 'network',
      title: 'Firmowe laboratorium w EVE-NG',
      description: 'Segmentowana sieć firmowa w EVE-NG z trzema VLAN-ami, routingiem i zaporą pfSense, przełącznikami Cisco, Sambą oraz monitoringiem Zabbix przez SNMP/SNMPv3.',
      category: 'Laboratorium sieciowe',
      technologies: ['EVE-NG', 'pfSense', 'Cisco IOSvL2', 'Zabbix'],
      link: 'https://github.com/dj-kolkol2002/Company-Lab-in-EVE-NG'
    },
    {
      id: 'fortigate',
      title: 'FortiGate + UniFi VLAN WiFi Lab',
      description: 'Fizyczne laboratorium sieciowe z FortiGate 60F, zarządzalnym przełącznikiem UniFi i punktem dostępowym FlexHD, wykorzystujące VLAN 20, trunki 802.1Q, DHCP, NAT i reguły zapory.',
      category: 'Laboratorium bezpieczeństwa sieci',
      technologies: ['FortiGate 60F', 'UniFi', '802.1Q VLAN', 'DHCP / NAT'],
      link: 'https://github.com/dj-kolkol2002/FortiGate-UniFi-VLAN-Lab-public'
    },
    {
      id: 'capyhelp',
      title: 'Capyhelp Helpdesk App',
      description: 'Platforma helpdesk uruchamiana w Dockerze z obsługą zgłoszeń, czatem w czasie rzeczywistym, SLA, raportami PDF, skanowaniem ClamAV i lokalnymi funkcjami AI przez Ollama.',
      category: 'Aplikacja full-stack',
      technologies: ['Laravel 13', 'Vue 3', 'Docker', 'Ollama'],
      link: 'https://github.com/dj-kolkol2002/Capyhelp-Helpdesk-App'
    },
    {
      id: 'onboarding',
      title: 'Onboarding Manager',
      description: 'Aplikacja desktopowa dla Windows 11, która sprawdza stację roboczą, instaluje zatwierdzone programy przez WinGet lub Chocolatey, nadaje nazwę komputera i może dołączyć go do Active Directory.',
      category: 'Automatyzacja Windows',
      technologies: ['.NET 8', 'WPF', 'WinGet / Chocolatey', 'Active Directory'],
      link: 'https://github.com/dj-kolkol2002/Autoinstalator_Onboarding'
    },
    {
      id: 'kiosk',
      title: 'Raspberry Pi Enterprise Web Kiosk',
      description: 'Minimalny kiosk na Debianie 13 ARM64, który uruchamia sesję Openbox i Firefox ESR w trybie pełnoekranowym, wznawia przeglądarkę po zamknięciu i umożliwia zdalną diagnostykę.',
      category: 'Kiosk Linux',
      technologies: ['Debian 13', 'X.Org / Openbox', 'Firefox ESR', 'Bash / systemd'],
      link: 'https://github.com/dj-kolkol2002/Raspberry-Pie-Web-KIOSK'
    }
  ]
}

const projectsList = computed(() => projectsData[currentLanguage.value].map((project) => {
  const media = projectMedia[project.id]
  const projectAssetUrl = (file) => `${import.meta.env.BASE_URL}projects/${file}`

  return {
    ...project,
    ...media,
    image: projectAssetUrl(media.file),
    imageSrcset: media.sourceFiles
      ?.map((source) => `${projectAssetUrl(source.file)} ${source.width}w`)
      .join(', '),
    imageAlt: media.alt[currentLanguage.value]
  }
}))

const updateProjectPosition = () => {
  if (!projectGalleryRef.value || !projectStep) return
  const lastStart = Math.max(0, projectsList.value.length - projectVisibleCount.value)
  projectStart.value = Math.max(0, Math.min(lastStart, Math.round(projectGalleryRef.value.scrollLeft / projectStep)))
}

const syncProjectGallery = () => {
  const gallery = projectGalleryRef.value
  const card = gallery?.querySelector('.project-card')
  if (!card) return
  const styles = getComputedStyle(gallery)
  projectVisibleCount.value = Number(styles.getPropertyValue('--project-columns')) || 1
  projectStep = card.getBoundingClientRect().width + parseFloat(styles.columnGap)
  const start = Math.min(projectStart.value, Math.max(0, projectsList.value.length - projectVisibleCount.value))
  gallery.scrollTo({ left: start * projectStep, behavior: 'instant' })
  updateProjectPosition()
}

const moveProjects = (offset) => {
  const lastStart = Math.max(0, projectsList.value.length - projectVisibleCount.value)
  const index = Math.max(0, Math.min(lastStart, projectStart.value + offset))
  projectGalleryRef.value?.scrollTo({
    left: index * projectStep,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  })
}

const handleProjectGalleryKey = (event) => {
  if (event.target !== event.currentTarget) return
  const offsets = { ArrowLeft: -1, ArrowRight: 1, Home: -projectsList.value.length, End: projectsList.value.length }
  if (!Object.hasOwn(offsets, event.key)) return
  event.preventDefault()
  moveProjects(offsets[event.key])
}

const educationData = {
  en: [
    {
      institution: 'Uniwersytet Ideis Wrocław',
      degree: 'National Security - Cybersecurity',
      period: '2026 - present',
      tasks: [
        "Master's degree"
      ]
    },
    {
      institution: 'University of Applied Sciences in Nysa',
      degree: 'Computer Science - Network and Information Systems Security',
      period: '2022 - 2026',
      tasks: [
        'Bachelor of Engineering degree'
      ]
    }
  ],
  pl: [
    {
      institution: 'Uniwersytet Ideis Wrocław',
      degree: 'Bezpieczeństwo Narodowe - Cyberbezpieczeństwo',
      period: '2026 - obecnie',
      tasks: [
        'Magisterskie studia II stopnia'
      ]
    },
    {
      institution: 'Państwowa Akademia Nauk Stosowanych w Nysie',
      degree: 'Informatyka - Bezpieczeństwo sieci i systemów informatycznych',
      period: '2022 - 2026',
      tasks: [
        'Inżynierskie studia I stopnia'
      ]
    }
  ]
}

const education = computed(() => educationData[currentLanguage.value])

const certifications = [
  'Cisco CCNA Enterprise Networking, Security and Automation',
  'Cisco Network Security',
  'Cisco CCNA Switching, Routing, and Wireless Essentials',
  'LPI Linux Essentials',
  'Technical Support Fundamentals',
  'The Bits and Bytes of Computer Networking',
  'Jira Service Management'
]

const automationSkills = [
  { name: 'PowerShell', icon: ['fas', 'terminal'] },
  { name: 'Bash', icon: ['fab', 'linux'] },
  { name: 'Python', icon: ['fab', 'python'] },
  { name: 'Visual Studio Code', icon: ['fas', 'code'] },
  { name: 'Node.js', icon: ['fab', 'node-js'] },
  { name: 'Git', icon: ['fab', 'git'] },
  { name: 'CSS', icon: ['fab', 'css3-alt'] },
  { name: 'Tailwind CSS', icon: ['fas', 'fire'] },
  { name: 'PHPstorm', icon: ['fas', 'laptop-code'] },
  { name: 'Figma', icon: ['fab', 'figma'] },
  { name: 'MySQL', icon: ['fas', 'database'] },
  { name: 'Inertia.js', icon: ['fas', 'code'] },
  { name: 'JavaScript', icon: ['fab', 'js'] },
  { name: 'Vue.js', icon: ['fab', 'vuejs'] },
  { name: 'PHP', icon: ['fab', 'php'] },
  { name: 'WordPress', icon: ['fab', 'wordpress'] },
  { name: 'Laravel', icon: ['fab', 'laravel'] },
  { name: 'Docker', icon: ['fab', 'docker'] },
  { name: 'HTML 5', icon: ['fab', 'html5'] }
]

const infraSkills = [
  { name: 'Active Directory', icon: ['fab', 'microsoft'] },
  { name: 'Ubuntu Server', icon: ['fab', 'ubuntu'] },
  { name: 'Tailscale', icon: ['fas', 'network-wired'] },
  { name: 'Windows Server', icon: ['fab', 'windows'] },
  { name: 'Cisco IOS', icon: ['fas', 'network-wired'] },
  { name: 'UniFi', icon: ['fas', 'network-wired'] },
  { name: 'Debian', icon: ['fab', 'debian'] },
  { name: 'Veeam Backup', icon: ['fas', 'database'] },
  { name: 'Proxmox VE', icon: ['fas', 'server'] },
  { name: 'Hyper-V', icon: ['fab', 'microsoft'] },
  { name: 'EVE-NG', icon: ['fas', 'network-wired'] },
  { name: 'Nginx', icon: ['fas', 'server'] },
  { name: 'pfSense', icon: ['fas', 'shield-alt'] },
  { name: 'FortiGate', icon: ['fas', 'shield-alt'] },
  { name: 'TrueNAS', icon: ['fas', 'database'] },
  { name: 'VMware', icon: ['fas', 'server'] }
]

const helpdeskSkills = [
  { name: 'Google Workspace', icon: ['fab', 'google'] },
  { name: 'AnyDesk', icon: ['fas', 'server'] },
  { name: 'Jira', icon: ['fab', 'jira'] },
  { name: 'SSH', icon: ['fas', 'terminal'] },
  { name: 'Microsoft 365', icon: ['fab', 'microsoft'] },
  { name: 'TeamViewer', icon: ['fas', 'server'] },
  { name: 'ScreenConnect', icon: ['fas', 'server'] },
  { name: 'FortiClient VPN', icon: ['fas', 'shield-alt'] },
  { name: 'Keeper Security', icon: ['fas', 'shield-alt'] },
  { name: 'Odoo', icon: ['fas', 'server'] },
  { name: 'ITIL', icon: ['fas', 'award'] },
  { name: 'HelpDesk.app', icon: ['fas', 'lightbulb'] },
  { name: 'GLPI', icon: ['fas', 'lightbulb'] },
  { name: 'ClickUP', icon: ['fas', 'check-square'] },
  { name: 'Discord', icon: ['fab', 'discord'] },
  { name: 'RDP', icon: ['fab', 'windows'] }
]

const aiSkills = [
  { name: 'GitHub Copilot', icon: ['fab', 'github'] },
  { name: 'Grok', icon: ['fas', 'brain'] },
  { name: 'Qwen', icon: ['fas', 'laptop-code'] },
  { name: 'Perplexity', icon: ['fas', 'search'] },
  { name: 'DeepSeek', icon: ['fas', 'search'] },
  { name: 'Gemini', icon: ['fab', 'google'] },
  { name: 'Cursor', icon: ['fas', 'mouse-pointer'] },
  { name: 'WriteSonic', icon: ['fas', 'pen-nib'] },
  { name: 'ChatGPT', icon: ['fab', 'openai'] },
  { name: 'Claude', icon: ['fab', 'claude'] },
  { name: 'Ollama', icon: ['fas', 'laptop-code'] },
  { name: 'n8n', icon: ['fas', 'project-diagram'] },
  { name: 'LM Studio', icon: ['fas', 'laptop-code'] },
  { name: 'Open WebUI', icon: ['fas', 'server'] },
  { name: 'Gemini Notebook', icon: ['fab', 'google'] },
  { name: 'Microsoft Copilot', icon: ['fab', 'microsoft'] },
  { name: 'Google AI Studio', icon: ['fab', 'google'] }
]

const createSkillGroup = (id, title, icon, skills, priorityNames) => ({
  id,
  title,
  icon,
  skills: [
    ...priorityNames.map(name => skills.find(skill => skill.name === name)),
    ...skills.filter(skill => !priorityNames.includes(skill.name))
  ]
})

const skillGroups = computed(() => [
  createSkillGroup('infrastructure', t.value.infrastructure, ['fas', 'server'], infraSkills,
    ['Active Directory', 'Windows Server', 'Ubuntu Server', 'Cisco IOS', 'Proxmox VE', 'pfSense']),
  createSkillGroup('helpdesk', t.value.helpdesk, ['fas', 'lightbulb'], helpdeskSkills,
    ['Microsoft 365', 'Jira', 'GLPI', 'RDP', 'Discord']),
  createSkillGroup('automation', t.value.webDev, ['fas', 'code'], automationSkills,
    ['PowerShell', 'Bash', 'Python', 'Docker']),
  createSkillGroup('ai', t.value.aiTools, ['fas', 'brain'], aiSkills,
    ['Ollama', 'GitHub Copilot'])
])

const terminalCommands = computed(() => ({
  help: { output: ['whoami', 'focus', 'skills', 'projects', 'contact', 'clear'], type: 'list' },
  whoami: { output: t.value.terminalHeadline, type: 'headline' },
  focus: { output: t.value.terminalFocus, type: 'list' },
  skills: { output: ['Windows Server', 'Active Directory', 'Linux', 'pfSense', 'PowerShell', 'Bash'], type: 'list' },
  projects: { output: projectsList.value.map(project => project.title), type: 'list' },
  contact: { output: emailAddress, type: 'text' }
}))

const terminalEntries = computed(() => terminalHistory.value.map(entry => {
  const command = entry.command.toLowerCase()
  const response = Object.hasOwn(terminalCommands.value, command)
    ? terminalCommands.value[command]
    : { output: `${t.value.terminalUnknown} ${entry.command}. ${t.value.terminalHelpHint}`, type: 'text' }
  return { ...entry, ...response }
}))
</script>
