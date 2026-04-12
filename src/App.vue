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
        <div class="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
            <FontAwesomeIcon :icon="['fas', 'envelope']" class="text-purple-400 text-xl sm:text-2xl" />
          </div>
          <h2 class="text-lg sm:text-xl font-semibold">{{ t.contact }}</h2>
        </div>
        
        <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a href="mailto:jakubkolkowski5@gmail.com" 
             class="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300">
            <FontAwesomeIcon :icon="['fas', 'envelope']" class="text-purple-400 text-sm sm:text-base" />
            <span class="text-xs sm:text-sm font-medium">Email</span>
          </a>
          <a href="https://github.com/dj-kolkol2002" 
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
        <div class="glass-hover flex flex-col h-full rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 animate-slide-up">
          <div class="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'code']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.webDev }}</h2>
          </div>
          <div class="flex flex-wrap justify-center content-center flex-1 gap-2.5 sm:gap-3">
            <SkillBadge v-for="skill in webSkills" :key="skill.name" :name="skill.name" :icon="skill.icon" />
          </div>
        </div>

        <!-- Infrastructure -->
        <div class="glass-hover flex flex-col h-full rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 animate-slide-up" style="animation-delay: 0.1s">
          <div class="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'server']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.infrastructure }}</h2>
          </div>
          <div class="flex flex-wrap justify-center content-center flex-1 gap-2.5 sm:gap-3">
            <SkillBadge v-for="skill in infraSkills" :key="skill.name" :name="skill.name" :icon="skill.icon" />
          </div>
        </div>

        <!-- Software -->
        <div class="glass-hover flex flex-col h-full rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 animate-slide-up" style="animation-delay: 0.2s">
          <div class="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'box']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.software }}</h2>
          </div>
          <div class="flex flex-wrap justify-center content-center flex-1 gap-2.5 sm:gap-3">
            <SkillBadge v-for="skill in softwareSkills" :key="skill.name" :name="skill.name" :icon="skill.icon" />
          </div>
        </div>

        <!-- AI Tools -->
        <div class="glass-hover flex flex-col h-full rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 animate-slide-up" style="animation-delay: 0.3s">
          <div class="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'brain']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.aiTools }}</h2>
          </div>
          <div class="flex flex-wrap justify-center content-center flex-1 gap-2.5 sm:gap-3">
            <SkillBadge v-for="skill in aiSkills" :key="skill.name" :name="skill.name" :icon="skill.icon" />
          </div>
        </div>
      </div>

      <!-- Projects Section -->
      <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 animate-fade-in cursor-pointer" @click="showProjects = !showProjects">
        <div class="relative flex items-center justify-center mb-3 sm:mb-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'project-diagram']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.projects }}</h2>
          </div>
          <FontAwesomeIcon 
            :icon="['fas', 'chevron-down']" 
            class="absolute right-0 text-purple-400 text-base sm:text-lg transition-transform duration-300"
            :class="{ 'rotate-180': showProjects }"
          />
        </div>
        
        <transition 
          enter-active-class="transition-all duration-300 ease-out"
          leave-active-class="transition-all duration-300 ease-in"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-[1000px]"
          leave-from-class="opacity-100 max-h-[1000px]"
          leave-to-class="opacity-0 max-h-0"
        >
          <div v-if="showProjects" class="space-y-4 sm:space-y-6 overflow-hidden">
            <a 
              v-for="(project, index) in projectsList" 
              :key="index"
              :href="project.link"
              target="_blank"
              @click.stop
              class="block bg-purple-500/10 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 cursor-pointer group"
            >
              <h3 class="text-lg sm:text-xl font-bold text-purple-300 mb-2 group-hover:text-purple-400 transition-colors duration-300">{{ project.title }}</h3>
              <p class="text-sm text-gray-300 mb-4">{{ project.description }}</p>
              
              <!-- Technologies -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span v-for="tech in project.technologies" :key="tech" class="px-2 sm:px-3 py-1 bg-purple-500/20 text-purple-300 text-xs sm:text-sm rounded-md border border-purple-500/30">
                  {{ tech }}
                </span>
              </div>
              
              <!-- Image Slider -->
              <div class="relative w-full rounded-lg overflow-hidden border border-purple-500/30 group/slider bg-[#0b0c10]" v-if="project.images && project.images.length">
                
                <!-- We use an invisible placeholder to naturally size the container without cropping -->
                <img :src="project.images[0]" class="w-full h-auto invisible block" alt="" aria-hidden="true" />
                
                <transition-group name="fade">
                  <img v-for="(img, imgIdx) in project.images" :key="img"
                       v-show="(activeSlide[index] || 0) === imgIdx"
                       :src="img" :alt="project.title"
                       class="absolute inset-0 w-full h-full object-contain" />
                </transition-group>
                
                <!-- Navigation Buttons -->
                <div v-if="project.images.length > 1" class="absolute inset-0 flex items-center justify-between p-2 sm:p-4 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
                  <button @click.prevent.stop="prevSlide(index, project.images.length)" class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-purple-500/80 backdrop-blur-sm transition-all focus:outline-none">
                    <FontAwesomeIcon :icon="['fas', 'chevron-left']" />
                  </button>
                  <button @click.prevent.stop="nextSlide(index, project.images.length)" class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-purple-500/80 backdrop-blur-sm transition-all focus:outline-none">
                    <FontAwesomeIcon :icon="['fas', 'chevron-right']" />
                  </button>
                </div>
                
                <!-- Indicator Dots -->
                <div v-if="project.images.length > 1" class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/40 backdrop-blur-sm px-2 py-1.5 rounded-full">
                  <div v-for="(_, imgIdx) in project.images" :key="imgIdx" class="w-2 h-2 rounded-full transition-all duration-300" :class="(activeSlide[index] || 0) === imgIdx ? 'bg-purple-400 scale-125' : 'bg-white/50'"></div>
                </div>
              </div>
            </a>
          </div>
        </transition>
      </div>

      <!-- Work Experience Section -->
      <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 animate-fade-in cursor-pointer" @click="showExperience = !showExperience">
        <div class="relative flex items-center justify-center mb-3 sm:mb-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'briefcase']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.workExperience }}</h2>
          </div>
          <FontAwesomeIcon 
            :icon="['fas', 'chevron-down']" 
            class="absolute right-0 text-purple-400 text-base sm:text-lg transition-transform duration-300"
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

      <!-- Education Section -->
      <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 animate-fade-in cursor-pointer" @click="showEducation = !showEducation">
        <div class="relative flex items-center justify-center mb-3 sm:mb-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'graduation-cap']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.education }}</h2>
          </div>
          <FontAwesomeIcon 
            :icon="['fas', 'chevron-down']" 
            class="absolute right-0 text-purple-400 text-base sm:text-lg transition-transform duration-300"
            :class="{ 'rotate-180': showEducation }"
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
          <div v-if="showEducation" class="space-y-3 sm:space-y-4 overflow-hidden">
            <div 
              v-for="(edu, index) in education" 
              :key="index"
              class="relative pl-6 sm:pl-8 pb-3 sm:pb-4 border-l-2 border-purple-500/30 last:pb-0"
            >
              <div class="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500"></div>
              <div class="bg-purple-500/10 rounded-lg p-3 sm:p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200">
                <h3 class="text-sm sm:text-base font-semibold text-purple-300 mb-1">{{ edu.institution }}</h3>
                <p class="text-xs sm:text-sm text-gray-400 mb-2">{{ edu.degree }} • {{ edu.period }}</p>
                <ul v-if="edu.tasks && edu.tasks.length" class="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-300">
                  <li v-for="(task, idx) in edu.tasks" :key="idx">{{ task }}</li>
                </ul>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Certifications Section -->
      <div class="glass-hover rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 animate-fade-in cursor-pointer" @click="showCertificates = !showCertificates">
        <div class="relative flex items-center justify-center mb-3 sm:mb-4">
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="p-1.5 sm:p-2 bg-purple-500/20 rounded-lg">
              <FontAwesomeIcon :icon="['fas', 'certificate']" class="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 class="text-lg sm:text-xl font-semibold">{{ t.certifications }}</h2>
          </div>
          <FontAwesomeIcon 
            :icon="['fas', 'chevron-down']" 
            class="absolute right-0 text-purple-400 text-base sm:text-lg transition-transform duration-300"
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

      <!-- Footer -->
      <footer class="text-center text-sm text-purple-300/40 pb-4 pt-2 w-full animate-fade-in transition-colors duration-300 hover:text-purple-300/80">
        Jakub Kołkowski | 2026
      </footer>
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
const showProjects = ref(false)
const showEducation = ref(false)
const currentLanguage = ref('en')

// Slider state
const activeSlide = ref({})
const nextSlide = (index, max) => {
  activeSlide.value[index] = ((activeSlide.value[index] || 0) + 1) % max
}
const prevSlide = (index, max) => {
  const current = activeSlide.value[index] || 0
  activeSlide.value[index] = (current - 1 + max) % max
}

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
    education: 'Education',
    certifications: 'Certifications',
    contact: 'Contact and Social',
    projects: 'Projects'
  },
  pl: {
    subtitle: 'Specjalista IT samouk',
    description: 'Młody entuzjasta IT i student 4 roku z Polski, pasjonujący się technologią i ciągłym rozwojem.',
    webDev: 'Web Development',
    infrastructure: 'Infrastruktura',
    software: 'Oprogramowanie',
    aiTools: 'Narzędzia AI',
    workExperience: 'Doświadczenie zawodowe',
    education: 'Edukacja',
    certifications: 'Certyfikaty',
    contact: 'Kontakt i Social',
    projects: 'Projekty'
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

const projectsData = {
  en: [
    {
      title: 'Rehamed Management System Hospital Unit',
      description: 'Web app for managing a physiotherapy clinic. Includes modules for patients, appointments, and schedules.',
      technologies: ['Laravel', 'Tailwind CSS', 'MySQL', 'Docker', 'Mailtrap', 'Stripe'],
      images: ['./rehamed/rehamed.png', './rehamed/rehamed1.png', './rehamed/rehamed2.png'],
      link: 'https://github.com/dj-kolkol2002/Rehamed-Reservation-Management-System-for-Hospital-Unit'
    },
    {
      title: 'Spam Detection',
      description: 'An application that checks whether a message is spam.',
      technologies: ['Python', 'Machine Learning', 'Pandas', 'Gradio'],
      images: ['./spam/spam.png', './spam/spam1.png'],
      link: 'https://github.com/dj-kolkol2002/Spam-Detector'
    },
    {
      title: 'HTTP Server with GTK3 GUI',
      description: 'A lightweight HTTP web server written in C with a GTK3 graphical user interface for easy control and monitoring.',
      technologies: ['C', 'GTK3', 'HTTP', 'Linux'],
      images: ['./server/server-c.png', './server/server-c1.png'],
      link: 'https://github.com/dj-kolkol2002/HTTP-Server-App'
    }
  ],
  pl: [
    {
      title: 'Rehamed System Zarządzania Kliniką',
      description: 'Aplikacja internetowa do zarządzania gabinetem fizjoterapii. Zawiera moduły dotyczące pacjentów, wizyt i harmonogramów.',
      technologies: ['Laravel', 'Tailwind CSS', 'MySQL', 'Docker', 'Mailtrap', 'Stripe'],
      images: ['./rehamed/rehamed.png', './rehamed/rehamed1.png', './rehamed/rehamed2.png'],
      link: 'https://github.com/dj-kolkol2002/Rehamed-Reservation-Management-System-for-Hospital-Unit'
    },
    {
      title: 'Aplikacja antyspamowa',
      description: 'Aplikacja sprawdzająca czy wiadomość nie jest spamem.',
      technologies: ['Python', 'Machine Learning', 'Pandas', 'Gradio'],
      images: ['./spam/spam.png', './spam/spam1.png'],
      link: 'https://github.com/dj-kolkol2002/Spam-Detector'
    },
    {
      title: 'Serwer HTTP z interfejsem GTK3',
      description: 'Lekki serwer HTTP napisany w języku C z graficznym interfejsem użytkownika GTK do łatwej kontroli i monitorowania.',
      technologies: ['C', 'GTK3', 'HTTP', 'Linux'],
      images: ['./server/server-c.png', './server/server-c1.png'],
      link: 'https://github.com/dj-kolkol2002/HTTP-Server-App'
    }
  ]
}

const projectsList = computed(() => projectsData[currentLanguage.value])

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
      period: '2022',
      tasks: [
        'Computer assembly and configuration in educational institutions',
        'Workstation and server installation and configuration',
        'IT procedures documentation'
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
      period: '2022',
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
  'Cisco CCNA Network Security',
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
