<template>
  <!-- Loading Screen -->
  <transition name="fade-out">
    <div v-if="isLoading" class="loading-screen">
      <div class="loading-content">
        <h2 class="loading-title">Jakub Kołkowski</h2>
        <div class="loading-bar-container">
          <div class="loading-bar" :style="{ width: loadingProgress + '%' }"></div>
        </div>
        <p class="loading-percentage">{{ loadingProgress }}%</p>
      </div>
    </div>
  </transition>

  <div v-show="!isLoading" class="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
    <!-- Language Switcher -->
    <div class="fixed top-4 right-4 z-50">
      <button 
        @click="toggleLanguage"
        class="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-md rounded-lg border border-purple-500/30 transition-all duration-300 hover:scale-105"
      >
        <span class="text-sm font-semibold text-purple-300">{{ currentLanguage === 'en' ? '🇬🇧 EN' : '🇵🇱 PL' }}</span>
      </button>
    </div>
    
    <!-- Particle Grid Background -->
    <div class="particle-grid"></div>
    
    <div class="w-full max-w-5xl">
      <!-- Hero Section -->
      <div class="glass rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 mb-4 sm:mb-6 animate-fade-in">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <!-- Text Content -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Jakub Kołkowski
            </h1>
            <p class="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 sm:mb-4">
              {{ t.subtitle }}
            </p>
            <p class="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0">
              {{ t.description }}
            </p>
          </div>
          
          <!-- Profile Photo -->
          <div class="flex-shrink-0">
            <div class="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
              <div class="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl animate-pulse opacity-20"></div>
              <img 
                src="/profile.jpg" 
                alt="Jakub Kołkowski" 
                class="relative w-full h-full object-cover rounded-2xl border-2 border-purple-500/30 shadow-lg shadow-purple-500/20"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="glass rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 animate-fade-in">
        <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
            <FontAwesomeIcon :icon="['fas', 'envelope']" class="text-purple-400 text-xl sm:text-2xl" />
          </div>
          <h2 class="text-lg sm:text-xl font-semibold">{{ t.contact }}</h2>
        </div>
        
        <div class="flex flex-wrap items-center gap-3 sm:gap-4">
          <a href="mailto:jakubkolkowski5@gmail.com" 
             class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300">
            <FontAwesomeIcon :icon="['fas', 'envelope']" class="text-purple-400 text-sm sm:text-base" />
            <span class="text-xs sm:text-sm font-medium">Email</span>
          </a>
          <a href="https://github.com/dj20kolkol02" 
             target="_blank"
             class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300">
            <FontAwesomeIcon :icon="['fab', 'github']" class="text-purple-400 text-sm sm:text-base" />
            <span class="text-xs sm:text-sm font-medium">GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/jakub-ko%C5%82kowski-3932912b7/" 
             target="_blank"
             class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300">
            <FontAwesomeIcon :icon="['fab', 'linkedin']" class="text-purple-400 text-sm sm:text-base" />
            <span class="text-xs sm:text-sm font-medium">LinkedIn</span>
          </a>
          <a href="https://discord.gg/1079422845731487834" 
             target="_blank"
             class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300">
            <FontAwesomeIcon :icon="['fab', 'discord']" class="text-purple-400 text-sm sm:text-base" />
            <span class="text-xs sm:text-sm font-medium">Discord</span>
          </a>
          <a href="https://soundcloud.com/xikub" 
             target="_blank"
             class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300">
            <FontAwesomeIcon :icon="['fab', 'soundcloud']" class="text-purple-400 text-sm sm:text-base" />
            <span class="text-xs sm:text-sm font-medium">SoundCloud</span>
          </a>
        </div>
      </div>

      <!-- Skills Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <!-- Web Development -->
        <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 animate-slide-up">
          <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'code']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.webDev }}</h2>
          </div>
          <div class="flex flex-wrap gap-2">
            <SkillBadge v-for="skill in webSkills" :key="skill.name" :name="skill.name" :icon="skill.icon" />
          </div>
        </div>

        <!-- Infrastructure -->
        <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 animate-slide-up" style="animation-delay: 0.1s">
          <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'server']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.infrastructure }}</h2>
          </div>
          <div class="flex flex-wrap gap-2">
            <SkillBadge v-for="skill in infraSkills" :key="skill.name" :name="skill.name" :icon="skill.icon" />
          </div>
        </div>

        <!-- Software -->
        <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 animate-slide-up" style="animation-delay: 0.2s">
          <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'box']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.software }}</h2>
          </div>
          <div class="flex flex-wrap gap-2">
            <SkillBadge v-for="skill in softwareSkills" :key="skill.name" :name="skill.name" :icon="skill.icon" />
          </div>
        </div>

        <!-- AI Tools -->
        <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 animate-slide-up" style="animation-delay: 0.3s">
          <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'brain']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.aiTools }}</h2>
          </div>
          <div class="flex flex-wrap gap-2">
            <SkillBadge v-for="skill in aiSkills" :key="skill.name" :name="skill.name" :icon="skill.icon" />
          </div>
        </div>
      </div>

      <!-- Work Experience Section -->
      <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 animate-fade-in cursor-pointer" @click="showExperience = !showExperience">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'briefcase']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.workExperience }}</h2>
          </div>
          <FontAwesomeIcon 
            :icon="['fas', 'chevron-down']" 
            class="text-purple-400 text-base sm:text-lg transition-transform duration-300"
            :class="{ 'rotate-180': showExperience }"
          />
        </div>
        
        <transition 
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-[500px]"
          leave-from-class="opacity-100 max-h-[500px]"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="showExperience" class="space-y-3 sm:space-y-4 overflow-hidden">
            <div 
              v-for="(exp, index) in workExperience" 
              :key="index"
              class="relative pl-6 sm:pl-8 pb-3 sm:pb-4 border-l-2 border-purple-500/30 last:pb-0"
            >
              <div class="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500"></div>
              <div class="bg-purple-500/10 rounded-lg p-3 sm:p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200">
                <h3 class="text-sm sm:text-base font-semibold text-purple-300 mb-1">{{ exp.position }}</h3>
                <p class="text-xs sm:text-sm text-gray-400 mb-2">{{ exp.company }} • {{ exp.period }}</p>
                <ul class="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-300">
                  <li v-for="(task, idx) in exp.tasks" :key="idx">{{ task }}</li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Certifications Section -->
      <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 animate-fade-in cursor-pointer" @click="showCertificates = !showCertificates">
        <div class="flex items-center justify-between mb-3 sm:mb-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'certificate']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.certifications }}</h2>
          </div>
          <FontAwesomeIcon 
            :icon="['fas', 'chevron-down']" 
            class="text-purple-400 text-base sm:text-lg transition-transform duration-300"
            :class="{ 'rotate-180': showCertificates }"
          />
        </div>
        
        <transition 
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-96"
          leave-from-class="opacity-100 max-h-96"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="showCertificates" class="space-y-2 sm:space-y-3 overflow-hidden">
            <div 
              v-for="cert in certifications" 
              :key="cert"
              class="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200"
            >
              <FontAwesomeIcon :icon="['fas', 'award']" class="text-purple-400 text-base sm:text-lg mt-0.5" />
              <span class="text-xs sm:text-sm text-gray-300">{{ cert }}</span>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SkillBadge from './components/SkillBadge.vue'

const isLoading = ref(true)
const loadingProgress = ref(0)
const showCertificates = ref(false)
const showExperience = ref(false)
const currentLanguage = ref('en')

// Toggle language
const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === 'en' ? 'pl' : 'en'
}

// Translations
const translations = {
  en: {
    subtitle: 'Self taught IT Specialist',
    description: 'Young IT enthusiast and 4th year student from Poland, passionate about technology and continuous learning.',
    webDev: 'Web Development',
    infrastructure: 'Infrastructure',
    software: 'Software',
    aiTools: 'AI Tools',
    workExperience: 'Work Experience',
    certifications: 'Certifications',
    contact: 'Contact and Social'
  },
  pl: {
    subtitle: 'Specjalista IT samouk',
    description: 'Młody entuzjasta IT i student 4 roku z Polski, pasjonujący się technologią i ciągłym rozwojem.',
    webDev: 'Web Development',
    infrastructure: 'Infrastruktura',
    software: 'Oprogramowanie',
    aiTools: 'Narzędzia AI',
    workExperience: 'Doświadczenie zawodowe',
    certifications: 'Certyfikaty',
    contact: 'Kontakt i Social'
  }
}

const t = computed(() => translations[currentLanguage.value])

// Simulate loading with percentage progress
onMounted(() => {
  const interval = setInterval(() => {
    if (loadingProgress.value < 100) {
      loadingProgress.value += Math.floor(Math.random() * 15) + 5
      if (loadingProgress.value > 100) {
        loadingProgress.value = 100
      }
    } else {
      clearInterval(interval)
      setTimeout(() => {
        isLoading.value = false
      }, 300)
    }
  }, 100)
})

const workExperienceData = {
  en: [
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
      period: '2020 - 2021',
      tasks: [
        'Computer assembly and configuration in educational institutions',
        'Workstation and server installation and configuration',
        'IT procedures documentation'
      ]
    },
    {
      position: 'Community Moderator',
      company: 'Darklight - SCP Secret Laboratory',
      period: '2018 - 2020',
      tasks: [
        'Gaming community moderation',
        'Training new moderators',
        'Conflict resolution and rules enforcement',
        'Organizing community events and contests'
      ]
    }
  ],
  pl: [
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
      period: '2020 - 2021',
      tasks: [
        'Montaż i konfiguracja komputerów w instytucjach edukacyjnych',
        'Instalacja i konfiguracja stacji roboczych i serwerów',
        'Dokumentacja procedur IT'
      ]
    },
    {
      position: 'Moderator Społeczności',
      company: 'Darklight - SCP Secret Laboratory',
      period: '2018 - 2020',
      tasks: [
        'Moderowanie społeczności graczy',
        'Szkolenie nowych moderatorów',
        'Rozwiązywanie konfliktów i egzekwowanie regulaminu',
        'Organizacja eventów i konkursów dla społeczności'
      ]
    }
  ]
}

const workExperience = computed(() => workExperienceData[currentLanguage.value])

const certifications = [
  'Cisco CCNA Enterprise Networking, Security and Automation',
  'Cisco CCNA Network Security',
  'Cisco CCNA Switching, Routing, and Wireless Essentials'
]

const webSkills = [
  { name: 'HTML 5', icon: ['fab', 'html5'] },
  { name: 'CSS', icon: ['fab', 'css3-alt'] },
  { name: 'JavaScript', icon: ['fab', 'js'] },
  { name: 'PHP', icon: ['fab', 'php'] },
  { name: 'WordPress', icon: ['fab', 'wordpress'] },
  { name: 'Laravel', icon: ['fab', 'laravel'] },
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
  { name: 'Visual Studio Code', icon: ['fas', 'code'] },
  { name: 'MS Office 365', icon: ['fab', 'microsoft'] },
  { name: 'Google Workspace', icon: ['fab', 'google'] },
  { name: 'ClickUP', icon: ['fas', 'check-square'] },
  { name: 'Trello', icon: ['fab', 'trello'] },
  { name: 'Affinity', icon: ['fas', 'palette'] },
  { name: 'FL Studio', icon: ['fas', 'music'] }
]

const aiSkills = [
  { name: 'ChatGPT', icon: ['fas', 'robot'] },
  { name: 'Gemini', icon: ['fas', 'magic'] },
  { name: 'Claude', icon: ['fas', 'brain'] },
  { name: 'WriteSonic', icon: ['fas', 'magic'] },
  { name: 'Perplexity', icon: ['fas', 'search'] },
  { name: 'Github Copilot', icon: ['fas', 'rocket'] },
  { name: 'Cursor', icon: ['fas', 'rocket'] },
  { name: 'Zencode', icon: ['fas', 'magic'] }
]
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out;
  animation-fill-mode: both;
}
</style>
