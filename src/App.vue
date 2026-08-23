<template>
  <div class="app-shell">
    <aside class="side-nav" aria-label="Portfolio navigation">
      <a class="brand-mark" href="#home" aria-label="JK — Jakub Kołkowski">JK</a>

      <nav class="nav-links">
        <a v-for="item in navLinks" :key="item.href" :href="item.href" :aria-label="item.label">
          <FontAwesomeIcon class="nav-icon" :icon="item.icon" />
          <span class="nav-label">{{ item.label }}</span>
        </a>
      </nav>

      <button @click="toggleLanguage" class="lang-toggle" type="button">
        {{ currentLanguage === 'en' ? 'EN' : 'PL' }}
      </button>
    </aside>

    <main class="page-content">
      <section id="home" class="section-screen hero-section">
        <span class="code-tag top">&lt;body&gt;</span>

        <div class="hero-copy">
          <span class="pre-title">{{ t.hello }}</span>
          <h1 class="hover-title">
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

        <div class="terminal-card" aria-label="Interactive profile terminal" @click="focusTerminal">
          <div class="terminal-top">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="terminal-body">
            <div v-for="entry in terminalHistory" :key="entry.id" class="terminal-entry">
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
                aria-label="Terminal command"
                placeholder="type help"
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

        <div class="projects-bento">
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
                sizes="(max-width: 780px) calc(100vw - 2rem), (max-width: 1080px) 45vw, 30vw"
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
            :class="{ 'is-dragging': draggedSkillGroup === group.id, 'is-drag-over': dragOverSkillGroup === group.id }"
            :draggable="canDragSkillCards"
            @dragstart="startSkillGroupDrag(group.id, $event)"
            @dragenter.prevent="dragOverSkillGroup = group.id"
            @dragover.prevent
            @dragleave="clearSkillGroupDragOver(group.id)"
            @drop.prevent="dropSkillGroup(group.id)"
            @dragend="endSkillGroupDrag"
          >
            <div class="group-heading">
              <FontAwesomeIcon :icon="group.icon" />
              <h3>{{ group.title }}</h3>
            </div>
            <div class="skill-list">
              <SkillBadge
                v-for="skill in group.skills"
                :key="skill.name"
                :name="skill.name"
                :icon="skill.icon"
              />
            </div>
          </article>
        </div>
      </section>

      <section id="experience" class="page-section">
        <div class="section-heading">
          <span>&lt;experience&gt;</span>
          <h2 class="hover-title">{{ t.workExperience }}</h2>
          <p>{{ t.experienceIntro }}</p>
        </div>

        <div class="timeline-list">
          <article v-for="exp in workExperience" :key="`${exp.company}-${exp.period}`" class="timeline-item">
            <div class="timeline-head">
              <div>
                <h3>{{ exp.position }}</h3>
                <p class="timeline-place">{{ exp.company }}</p>
              </div>
              <span>{{ exp.period }}</span>
            </div>
            <ul>
              <li v-for="task in exp.tasks" :key="task">{{ task }}</li>
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
            <article v-for="edu in education" :key="`${edu.institution}-${edu.period}`" class="timeline-item">
              <div class="timeline-head">
                <div>
                  <h3>{{ edu.institution }}</h3>
                  <p class="timeline-place">{{ edu.degree }}</p>
                </div>
                <span>{{ edu.period }}</span>
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
            <span>{{ contact.label }}</span>
          </a>
        </div>
      </section>

      <footer class="portfolio-footer">Jakub Kołkowski | 2026</footer>
    </main>

    <SoundCloudPlayer :language="currentLanguage" />
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onBeforeUnmount, onMounted } from 'vue'
import SkillBadge from './components/SkillBadge.vue'
import SoundCloudPlayer from './components/SoundCloudPlayer.vue'

const currentLanguage = ref('en')
const terminalInput = ref('')
const terminalInputRef = ref(null)
const draggedSkillGroup = ref(null)
const dragOverSkillGroup = ref(null)
const skillGroupOrder = ref(['web', 'infrastructure', 'helpdesk', 'ai'])
const canDragSkillCards = ref(true)
let terminalEntryId = 0
let skillDragMediaQuery

const createTerminalEntry = (command, output, type = 'text') => ({
  id: terminalEntryId++,
  command,
  output,
  type
})

const terminalHistory = ref([
  createTerminalEntry('whoami', 'IT Specialist / Builder', 'headline'),
  createTerminalEntry('focus', ['Web Development', 'Infrastructure', 'HelpDesk & documentation'], 'list')
])

const terminalCommands = {
  help: {
    output: ['whoami', 'focus', 'skills', 'projects', 'contact', 'clear'],
    type: 'list'
  },
  whoami: {
    output: 'IT Specialist / Builder',
    type: 'headline'
  },
  focus: {
    output: ['Web Development', 'Infrastructure', 'HelpDesk & documentation'],
    type: 'list'
  },
  skills: {
    output: ['Vue.js', 'Laravel', 'Docker', 'Windows Server', 'Active Directory', 'pfSense'],
    type: 'list'
  },
  projects: {
    output: [
      'Windows Server 2025 AD & PXE Homelab',
      'Company Lab in EVE-NG',
      'Enterprise Homelab & Web Hosting',
      'Capyhelp Helpdesk App',
      'Ubuntu Server Infrastructure',
      'SSH Analyzer Linux'
    ],
    type: 'list'
  },
  contact: {
    output: 'jakubkolkowski5@gmail.com',
    type: 'text'
  }
}

const focusTerminal = () => {
  terminalInputRef.value?.focus()
}

const syncSkillDragMode = () => {
  canDragSkillCards.value = !skillDragMediaQuery?.matches
}

onMounted(() => {
  skillDragMediaQuery = window.matchMedia('(max-width: 780px)')
  syncSkillDragMode()
  skillDragMediaQuery.addEventListener('change', syncSkillDragMode)
})

onBeforeUnmount(() => {
  skillDragMediaQuery?.removeEventListener('change', syncSkillDragMode)
})

const runTerminalCommand = async () => {
  const command = terminalInput.value.trim()

  if (!command) {
    return
  }

  terminalInput.value = ''

  if (command.toLowerCase() === 'clear') {
    terminalHistory.value = []
    await nextTick()
    focusTerminal()
    return
  }

  const response = terminalCommands[command.toLowerCase()]

  terminalHistory.value.push(
    response
      ? createTerminalEntry(command, response.output, response.type)
      : createTerminalEntry(command, `Command not found: ${command}. Type help.`, 'text')
  )

  await nextTick()
  focusTerminal()
}

const contactLinks = [
  { label: 'Email', href: 'mailto:jakubkolkowski5@gmail.com', icon: ['fas', 'envelope'] },
  { label: 'GitHub', href: 'https://github.com/dj-kolkol2002', icon: ['fab', 'github'], external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jakub-ko%C5%82kowski-3932912b7/', icon: ['fab', 'linkedin'], external: true },
  { label: 'SoundCloud', href: 'https://soundcloud.com/xikub', icon: ['fab', 'soundcloud'], external: true }
]

// Toggle language
const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'en' ? 'pl' : 'en'
}

// Translations
const translations = {
  en: {
    hello: 'Hello, I am',
    subtitle: 'Self taught IT Specialist',
    description: 'Young IT enthusiast from Poland, passionate about technology and continuous learning.',
    contactAction: 'Contact me here',
    projectsAction: 'Show my work',
    webDev: 'Web Development',
    skills: 'Skills',
    infrastructure: 'Infrastructure',
    helpdesk: 'HelpDesk',
    aiTools: 'AI Tools',
    workExperience: 'Work Experience',
    education: 'Education',
    certifications: 'Certifications',
    contact: 'Contact and Social',
    projects: 'Projects',
    repository: 'Repository',
    newTab: 'opens in a new tab',
    technologies: 'Technologies used',
    projectsIntro: 'Hands-on Windows and Linux administration, enterprise networking, self-hosting, helpdesk development and security automation.',
    skillsIntro: 'Tools and technologies I use across web development, infrastructure, helpdesk work and AI-supported workflows.',
    experienceIntro: 'Hands-on IT work across field installation, support, documentation and customer-facing technical tasks.',
    contactIntro: 'The fastest way to reach me is email. You can also find my code, profile and music links below.',
    navHome: 'Home',
    navProjects: 'Projects',
    navSkills: 'Skills',
    navExperience: 'Experience',
    navContact: 'Contact'
  },
  pl: {
    hello: 'Cześć, jestem',
    subtitle: 'Specjalista IT samouk',
    description: 'Młody entuzjasta IT z Polski, pasjonujący się technologią i ciągłym rozwojem.',
    contactAction: 'Kontakt',
    projectsAction: 'Zobacz projekty',
    webDev: 'Web Development',
    skills: 'Umiejętności',
    infrastructure: 'Infrastruktura',
    helpdesk: 'HelpDesk',
    aiTools: 'Narzędzia AI',
    workExperience: 'Doświadczenie zawodowe',
    education: 'Edukacja',
    certifications: 'Certyfikaty',
    contact: 'Kontakt i Social',
    projects: 'Projekty',
    repository: 'Repozytorium',
    newTab: 'otwiera się w nowej karcie',
    technologies: 'Wykorzystane technologie',
    projectsIntro: 'Praktyczne projekty z administracji Windows i Linux, sieci firmowych, self-hostingu, aplikacji helpdesk oraz automatyzacji bezpieczeństwa.',
    skillsIntro: 'Narzędzia i technologie, których używam przy web developmencie, infrastrukturze, pracy helpdesk oraz procesach wspieranych przez AI.',
    experienceIntro: 'Praktyczne doświadczenie IT obejmujące instalacje terenowe, support, dokumentację i zadania techniczne przy kontakcie z klientem.',
    contactIntro: 'Najszybciej złapiesz mnie przez email. Poniżej są też linki do kodu, profilu i muzyki.',
    navHome: 'Start',
    navProjects: 'Projekty',
    navSkills: 'Skills',
    navExperience: 'Doświadczenie',
    navContact: 'Kontakt'
  }
}

const t = computed(() => translations[currentLanguage.value])

const navLinks = computed(() => [
  { href: '#home', label: t.value.navHome, icon: ['fas', 'terminal'] },
  { href: '#projects', label: t.value.navProjects, icon: ['fas', 'project-diagram'] },
  { href: '#skills', label: t.value.navSkills, icon: ['fas', 'code'] },
  { href: '#experience', label: t.value.navExperience, icon: ['fas', 'briefcase'] },
  { href: '#contact', label: t.value.navContact, icon: ['fas', 'envelope'] }
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
      en: 'Windows Server 2025 graphic over illuminated server racks',
      pl: 'Grafika Windows Server 2025 na tle podświetlonych szaf serwerowych'
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
  homelab: {
    layout: 'homelab',
    file: 'proxmox-960.webp',
    sourceFiles: [
      { file: 'proxmox-480.webp', width: 480 },
      { file: 'proxmox-720.webp', width: 720 },
      { file: 'proxmox-960.webp', width: 960 }
    ],
    width: 960,
    height: 483,
    alt: {
      en: 'Proxmox VE dashboard showing pfSense, TrueNAS, Jellyfin, and web-server virtual machines',
      pl: 'Panel Proxmox VE z maszynami wirtualnymi pfSense, TrueNAS, Jellyfin i serwerem WWW'
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
  ubuntu: {
    layout: 'linux',
    file: 'ubuntu-server-707.webp',
    sourceFiles: [
      { file: 'ubuntu-server-480.webp', width: 480 },
      { file: 'ubuntu-server-707.webp', width: 707 }
    ],
    width: 707,
    height: 432,
    alt: {
      en: 'Ubuntu Server logo on an orange background',
      pl: 'Logo Ubuntu Server na pomarańczowym tle'
    }
  },
  ssh: {
    layout: 'security',
    file: 'ssh-analyzer-419.webp',
    width: 419,
    height: 274,
    alt: {
      en: 'SSH Analyzer report showing the SSH port and source of failed login attempts',
      pl: 'Raport SSH Analyzer z portem SSH i źródłem nieudanych prób logowania'
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
      id: 'homelab',
      title: 'Enterprise Homelab & Web Hosting',
      description: 'Self-hosted Proxmox environment with pfSense, TrueNAS/ZFS, Jellyfin and a dynamic LEMP website across VMs and LXC containers, remotely available through Tailscale.',
      category: 'Homelab',
      technologies: ['Proxmox VE', 'TrueNAS / ZFS', 'LEMP', 'Tailscale'],
      link: 'https://github.com/dj-kolkol2002/Enterprise-Homelab-Infrastructure-Web-Hosting'
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
      id: 'ubuntu',
      title: 'Ubuntu Server Infrastructure',
      description: 'Ubuntu Server deployment with hardened SSH, Samba file sharing, WordPress on a LAMP stack, SSL and automated rotating backups using Bash and cron.',
      category: 'Linux Infrastructure',
      technologies: ['Ubuntu Server', 'OpenSSH', 'Samba', 'Bash / Cron'],
      link: 'https://github.com/dj-kolkol2002/Ubuntu-Server-Infrastructure'
    },
    {
      id: 'ssh',
      title: 'SSH Analyzer Linux',
      description: 'Bash security tool that parses SSH authentication logs, detects the active SSH port, ranks sources of failed logins and can automatically block abusive IPs with UFW.',
      category: 'Security Automation',
      technologies: ['Bash', 'OpenSSH', 'UFW', 'Log Analysis'],
      link: 'https://github.com/dj-kolkol2002/SSH-Analyzer-Linux'
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
      id: 'homelab',
      title: 'Enterprise Homelab i hosting WWW',
      description: 'Wirtualne środowisko Proxmox z pfSense, TrueNAS/ZFS, Jellyfinem i dynamiczną stroną LEMP w maszynach VM i kontenerach LXC, dostępne zdalnie przez Tailscale.',
      category: 'Homelab',
      technologies: ['Proxmox VE', 'TrueNAS / ZFS', 'LEMP', 'Tailscale'],
      link: 'https://github.com/dj-kolkol2002/Enterprise-Homelab-Infrastructure-Web-Hosting'
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
      id: 'ubuntu',
      title: 'Ubuntu Server Infrastructure',
      description: 'Ubuntu Server z utwardzonym SSH, Sambą, WordPressem na stosie LAMP, HTTPS oraz automatycznymi kopiami zapasowymi z rotacją w Bashu i cronie.',
      category: 'Infrastruktura Linux',
      technologies: ['Ubuntu Server', 'OpenSSH', 'Samba', 'Bash / Cron'],
      link: 'https://github.com/dj-kolkol2002/Ubuntu-Server-Infrastructure'
    },
    {
      id: 'ssh',
      title: 'SSH Analyzer Linux',
      description: 'Skrypt Bash analizujący logi SSH, wykrywający aktywny port i źródła ataków brute-force oraz opcjonalnie blokujący adresy IP przez UFW.',
      category: 'Cyberbezpieczeństwo',
      technologies: ['Bash', 'OpenSSH', 'UFW', 'Analiza logów'],
      link: 'https://github.com/dj-kolkol2002/SSH-Analyzer-Linux'
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

const workExperienceData = {
  en: [
    {
      position: 'Junior IT Field Technician',
      company: 'M3 Group',
      period: '2026',
      tasks: [
        'Installation of cable trays and laying of low-voltage cabling',
        'Comprehensive construction and organization of RACK cabinets, including termination of patch panels and network outlets',
        'Installation of CCTV cameras, Access Points and alarms'
      ]
    },
    {
      position: 'Junior Customer Specialist',
      company: 'Prociv Sp. z o.o',
      period: '2025',
      tasks: [
        'Customer support through HelpDesk ticketing system',
        'WordPress management and maintenance',
        'Creating documentation and user guides'
      ]
    },
    {
      position: 'IT Support Intern',
      company: '2M Marek Workiewicz',
      period: '2024',
      tasks: [
        'Computer assembly and configuration in educational institutions',
        'Workstation and server installation and configuration',
        'IT procedures documentation'
      ]
    }
  ],
  pl: [
    {
      position: 'Młodszy Instalator sieci IT',
      company: 'M3 Group',
      period: '2026',
      tasks: [
        'Montaż tras kablowych oraz układanie okablowania teletechnicznego',
        'Kompleksowa budowa i organizacja szaf RACK, w tym terminowanie patchpaneli i gniazd sieciowych',
        'Instalacja kamer CCTV, Access Point i alarmów'
      ]
    },
    {
      position: 'Młodszy Specjalista ds. Obsługi Klienta',
      company: 'Prociv Sp. z o.o',
      period: '2025',
      tasks: [
        'Obsługa klientów w systemie ticketowym HelpDesk',
        'Zarządzanie i utrzymanie WordPressa',
        'Tworzenie dokumentacji i instrukcji dla użytkowników'
      ]
    },
    {
      position: 'Praktykant IT Support',
      company: '2M Marek Workiewicz',
      period: '2024',
      tasks: [
        'Montaż i konfiguracja komputerów w instytucjach edukacyjnych',
        'Instalacja i konfiguracja stacji roboczych i serwerów',
        'Dokumentacja procedur IT'
      ]
    }
  ]
}

const workExperience = computed(() => workExperienceData[currentLanguage.value])

const educationData = {
  en: [
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
  'The Bits and Bytes of Computer Networking'
]

const webSkills = [
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
  { name: 'Debian', icon: ['fab', 'debian'] },
  { name: 'Bash', icon: ['fab', 'linux'] },
  { name: 'Veeam Backup', icon: ['fas', 'database'] },
  { name: 'Proxmox VE', icon: ['fas', 'server'] },
  { name: 'EVE-NG', icon: ['fas', 'network-wired'] },
  { name: 'Nginx', icon: ['fas', 'server'] },
  { name: 'PowerShell', icon: ['fas', 'terminal'] },
  { name: 'pfSense', icon: ['fas', 'shield-alt'] },
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
  { name: 'Odoo', icon: ['fas', 'server'] },
  { name: 'ITIL', icon: ['fas', 'award'] },
  { name: 'HelpDesk.app', icon: ['fas', 'lightbulb'] },
  { name: 'ClickUP', icon: ['fas', 'check-square'] },
  { name: 'Discord', icon: ['fab', 'discord'] },
  { name: 'RDP', icon: ['fab', 'windows'] }
]

const aiSkills = [
  { name: 'Github Copilot', icon: ['fab', 'github'] },
  { name: 'Grok', icon: ['fas', 'brain'] },
  { name: 'Qwen', icon: ['fas', 'laptop-code'] },
  { name: 'Python', icon: ['fab', 'python'] },
  { name: 'Perplexity', icon: ['fas', 'search'] },
  { name: 'DeepSeek', icon: ['fas', 'search'] },
  { name: 'Gemini', icon: ['fab', 'google'] },
  { name: 'Cursor', icon: ['fas', 'mouse-pointer'] },
  { name: 'WriteSonic', icon: ['fas', 'pen-nib'] },
  { name: 'ChatGPT', icon: ['fab', 'openai'] },
  { name: 'Claude', icon: ['fab', 'claude'] },
  { name: 'Ollama', icon: ['fas', 'laptop-code'] }
]

const skillGroupsMap = computed(() => ({
  web: { id: 'web', title: t.value.webDev, icon: ['fas', 'code'], skills: webSkills },
  infrastructure: { id: 'infrastructure', title: t.value.infrastructure, icon: ['fas', 'server'], skills: infraSkills },
  helpdesk: { id: 'helpdesk', title: t.value.helpdesk, icon: ['fas', 'lightbulb'], skills: helpdeskSkills },
  ai: { id: 'ai', title: t.value.aiTools, icon: ['fas', 'brain'], skills: aiSkills }
}))

const skillGroups = computed(() => skillGroupOrder.value.map((id) => skillGroupsMap.value[id]))

const startSkillGroupDrag = (groupId, event) => {
  draggedSkillGroup.value = groupId
  dragOverSkillGroup.value = null

  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', groupId)
  }
}

const clearSkillGroupDragOver = (groupId) => {
  if (dragOverSkillGroup.value === groupId) {
    dragOverSkillGroup.value = null
  }
}

const dropSkillGroup = (targetGroupId) => {
  const sourceGroupId = draggedSkillGroup.value

  if (!sourceGroupId || sourceGroupId === targetGroupId) {
    endSkillGroupDrag()
    return
  }

  const nextOrder = [...skillGroupOrder.value]
  const sourceIndex = nextOrder.indexOf(sourceGroupId)
  const targetIndex = nextOrder.indexOf(targetGroupId)

  if (sourceIndex === -1 || targetIndex === -1) {
    endSkillGroupDrag()
    return
  }

  nextOrder.splice(sourceIndex, 1)
  nextOrder.splice(targetIndex, 0, sourceGroupId)
  skillGroupOrder.value = nextOrder
  endSkillGroupDrag()
}

const endSkillGroupDrag = () => {
  draggedSkillGroup.value = null
  dragOverSkillGroup.value = null
}
</script>
