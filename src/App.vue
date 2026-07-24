<template>
  <div class="app-shell">
    <aside class="side-nav" aria-label="Portfolio navigation">
      <a class="brand-mark" href="#home" aria-label="Jakub Kołkowski">JK</a>

      <nav class="nav-links">
        <a v-for="item in navLinks" :key="item.href" :href="item.href" :aria-label="item.label" :title="item.label">
          <FontAwesomeIcon :icon="item.icon" />
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
          <h1>
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

        <div class="terminal-card" aria-label="Profile summary">
          <div class="terminal-top">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="terminal-body">
            <p><span>$</span> whoami</p>
            <strong>IT Specialist / Student / Builder</strong>
            <p><span>$</span> focus</p>
            <ul>
              <li>Web Development</li>
              <li>Infrastructure</li>
              <li>HelpDesk & documentation</li>
            </ul>
          </div>
        </div>

        <span class="code-tag bottom">&lt;/body&gt;</span>
      </section>

      <section id="projects" class="page-section projects-section">
        <div class="section-heading">
          <span>&lt;section&gt;</span>
          <h2>{{ t.projects }}</h2>
          <p>{{ t.projectsIntro }}</p>
        </div>

        <div class="project-list">
          <article
            v-for="(project, index) in projectsList"
            :key="project.title"
            class="project-card"
          >
            <div class="project-meta">
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <span>{{ project.technologies[0] }}</span>
            </div>

            <div class="project-copy">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </div>

            <div class="tech-row">
              <span v-for="tech in project.technologies" :key="tech">{{ tech }}</span>
            </div>

            <div class="project-footer">
              <a class="project-link" :href="project.link" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon :icon="['fab', 'github']" />
                <span>{{ t.repository }}</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="skills" class="page-section">
        <div class="section-heading">
          <span>&lt;skills&gt;</span>
          <h2>{{ t.skills }}</h2>
          <p>{{ t.skillsIntro }}</p>
        </div>

        <div class="skill-groups">
          <article v-for="group in skillGroups" :key="group.title" class="skill-group">
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
          <h2>{{ t.workExperience }}</h2>
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
            <h2>{{ t.education }}</h2>
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
            <h2>{{ t.certifications }}</h2>
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
          <h2>{{ t.contact }}</h2>
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SkillBadge from './components/SkillBadge.vue'

const currentLanguage = ref('en')

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
    description: 'Young IT enthusiast and 4th year student from Poland, passionate about technology and continuous learning.',
    contactAction: 'Contact me here',
    projectsAction: 'Show my work',
    webDev: 'Web Development',
    skills: 'Skills',
    infrastructure: 'Infrastructure',
    software: 'Software',
    aiTools: 'AI Tools',
    workExperience: 'Work Experience',
    education: 'Education',
    certifications: 'Certifications',
    contact: 'Contact and Social',
    projects: 'Projects',
    repository: 'Repository',
    projectsIntro: 'Selected technical projects built around web systems, automation, infrastructure and practical problem solving.',
    skillsIntro: 'Tools and technologies I use across web development, infrastructure, daily software work and AI-supported workflows.',
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
    description: 'Młody entuzjasta IT i student 4 roku z Polski, pasjonujący się technologią i ciągłym rozwojem.',
    contactAction: 'Kontakt',
    projectsAction: 'Zobacz projekty',
    webDev: 'Web Development',
    skills: 'Umiejętności',
    infrastructure: 'Infrastruktura',
    software: 'Oprogramowanie',
    aiTools: 'Narzędzia AI',
    workExperience: 'Doświadczenie zawodowe',
    education: 'Edukacja',
    certifications: 'Certyfikaty',
    contact: 'Kontakt i Social',
    projects: 'Projekty',
    repository: 'Repozytorium',
    projectsIntro: 'Wybrane projekty techniczne związane z aplikacjami webowymi, automatyzacją, infrastrukturą i praktycznym rozwiązywaniem problemów.',
    skillsIntro: 'Narzędzia i technologie, których używam przy web developmencie, infrastrukturze, codziennej pracy oraz procesach wspieranych przez AI.',
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

const projectsData = {
  en: [
    {
      title: 'Rehamed Management System Hospital Unit',
      description: 'Web app for managing a physiotherapy clinic. Includes modules for patients, appointments, and schedules.',
      technologies: ['Laravel', 'Tailwind CSS', 'MySQL', 'Docker', 'Mailtrap', 'Stripe'],
      link: 'https://github.com/dj-kolkol2002/Rehamed-Reservation-Management-System-for-Hospital-Unit'
    },
    {
      title: 'Spam Detection',
      description: 'An application that checks whether a message is spam.',
      technologies: ['Python', 'Machine Learning', 'Pandas', 'Gradio'],
      link: 'https://github.com/dj-kolkol2002/Spam-Detector'
    },
    {
      title: 'Active Directory & Windows Server Infrastructure',
      description: 'Educational infrastructure deployment for centralized network management. Implements an Active Directory domain, DHCP, DNS, GPO, and IIS.',
      technologies: ['Windows Server', 'Active Directory', 'DNS', 'DHCP', 'GPO', 'IIS'],
      link: 'https://github.com/dj-kolkol2002/Active-Directory'
    }
  ],
  pl: [
    {
      title: 'Rehamed System Zarządzania Kliniką',
      description: 'Aplikacja internetowa do zarządzania gabinetem fizjoterapii. Zawiera moduły dotyczące pacjentów, wizyt i harmonogramów.',
      technologies: ['Laravel', 'Tailwind CSS', 'MySQL', 'Docker', 'Mailtrap', 'Stripe'],
      link: 'https://github.com/dj-kolkol2002/Rehamed-Reservation-Management-System-for-Hospital-Unit'
    },
    {
      title: 'Aplikacja antyspamowa',
      description: 'Aplikacja sprawdzająca czy wiadomość nie jest spamem.',
      technologies: ['Python', 'Machine Learning', 'Pandas', 'Gradio'],
      link: 'https://github.com/dj-kolkol2002/Spam-Detector'
    },
    {
      title: 'Infrastruktura Active Directory & Windows Server',
      description: 'Edukacyjne wdrożenie infrastruktury do scentralizowanego zarządzania siecią. Implementuje domenę Active Directory, DHCP, DNS, GPO oraz IIS.',
      technologies: ['Windows Server', 'Active Directory', 'DNS', 'DHCP', 'GPO', 'IIS'],
      link: 'https://github.com/dj-kolkol2002/Active-Directory'
    }
  ]
}

const projectsList = computed(() => projectsData[currentLanguage.value])

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
      institution: 'DSW Ideis University',
      degree: 'National Security',
      period: '2026 - present',
      tasks: [
        'Master\'s degree studies'
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
      institution: 'Uniwersytet DSW Ideis',
      degree: 'Bezpieczeństwo Narodowe',
      period: '2026 - obecnie',
      tasks: [
        'Studia II stopnia magisterskie'
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
  'The Bits and Bytes of Computer Networking'
]

const webSkills = [
  { name: 'HTML 5', icon: ['fab', 'html5'] },
  { name: 'CSS', icon: ['fab', 'css3-alt'] },
  { name: 'JavaScript', icon: ['fab', 'js'] },
  { name: 'PHP', icon: ['fab', 'php'] },
  { name: 'WordPress', icon: ['fab', 'wordpress'] },
  { name: 'Laravel', icon: ['fab', 'laravel'] },
  { name: 'Vue.js', icon: ['fab', 'vuejs'] },
  { name: 'Tailwind CSS', icon: ['fas', 'fire'] },
  { name: 'Docker', icon: ['fab', 'docker'] },
  { name: 'MySQL', icon: ['fas', 'database'] },
  { name: 'Figma', icon: ['fab', 'figma'] },
  { name: 'Git', icon: ['fab', 'git'] }
]

const infraSkills = [
  { name: 'Ubuntu Server', icon: ['fab', 'ubuntu'] },
  { name: 'Windows Server', icon: ['fab', 'windows'] },
  { name: 'Active Directory', icon: ['fab', 'microsoft'] },
  { name: 'Cisco IOS', icon: ['fas', 'network-wired'] },
  { name: 'Apache', icon: ['fas', 'server'] },
  { name: 'VMware', icon: ['fas', 'server'] },
  { name: 'EVE-NG', icon: ['fas', 'network-wired'] },
  { name: 'TrueNAS', icon: ['fas', 'database'] },
  { name: 'OPNsense', icon: ['fas', 'shield-alt'] },
  { name: 'AnyDesk', icon: ['fas', 'server'] },
  { name: 'HelpDesk.app', icon: ['fas', 'lightbulb'] },
  { name: 'Veeam Backup', icon: ['fas', 'database'] }
]

const softwareSkills = [
  { name: 'Linux Mint', icon: ['fab', 'linux'] },
  { name: 'Visual Studio Code', icon: ['fas', 'code'] },
  { name: 'MS Office 365', icon: ['fab', 'microsoft'] },
  { name: 'Google Workspace', icon: ['fab', 'google'] },
  { name: 'ClickUP', icon: ['fas', 'check-square'] },
  { name: 'Trello', icon: ['fab', 'trello'] },
  { name: 'Affinity', icon: ['fas', 'palette'] },
  { name: 'FL Studio', icon: ['fas', 'music'] }
]

const aiSkills = [
  { name: 'ChatGPT', icon: ['fab', 'openai'] },
  { name: 'Gemini', icon: ['fab', 'google'] },
  { name: 'Claude', icon: ['fab', 'claude'] },
  { name: 'WriteSonic', icon: ['fas', 'pen-nib'] },
  { name: 'Perplexity', icon: ['fas', 'search'] },
  { name: 'Github Copilot', icon: ['fab', 'github'] },
  { name: 'Cursor', icon: ['fas', 'mouse-pointer'] },
  { name: 'Python', icon: ['fab', 'python'] },
  { name: 'Qwen2.5-coder', icon: ['fas', 'laptop-code'] }
]

const skillGroups = computed(() => [
  { title: t.value.webDev, icon: ['fas', 'code'], skills: webSkills },
  { title: t.value.infrastructure, icon: ['fas', 'server'], skills: infraSkills },
  { title: t.value.software, icon: ['fas', 'box'], skills: softwareSkills },
  { title: t.value.aiTools, icon: ['fas', 'brain'], skills: aiSkills }
])
</script>
