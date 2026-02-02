import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faCode,
    faServer,
    faBox,
    faBrain,
    faEnvelope,
    faDatabase,
    faNetworkWired,
    faFire,
    faShieldAlt,
    faRocket,
    faLightbulb,
    faMagic,
    faCheckSquare,
    faSearch,
    faRobot,
    faCertificate,
    faAward,
    faChevronDown,
    faBriefcase,
    faPalette,
    faMusic
} from '@fortawesome/free-solid-svg-icons'
import {
    faGithub,
    faLinkedin,
    faDiscord,
    faHtml5,
    faCss3Alt,
    faJs,
    faPhp,
    faWordpress,
    faLaravel,
    faDocker,
    faVuejs,
    faFigma,
    faUbuntu,
    faWindows,
    faMicrosoft,
    faGoogle,
    faTrello,
    faApple,
    faGit,
    faSoundcloud
} from '@fortawesome/free-brands-svg-icons'

// Add icons to library
library.add(
    faCode,
    faServer,
    faBox,
    faBrain,
    faEnvelope,
    faDatabase,
    faNetworkWired,
    faFire,
    faShieldAlt,
    faRocket,
    faLightbulb,
    faMagic,
    faCheckSquare,
    faSearch,
    faRobot,
    faCertificate,
    faAward,
    faChevronDown,
    faBriefcase,
    faPalette,
    faMusic,
    faGithub,
    faLinkedin,
    faDiscord,
    faHtml5,
    faCss3Alt,
    faJs,
    faPhp,
    faWordpress,
    faLaravel,
    faDocker,
    faVuejs,
    faFigma,
    faUbuntu,
    faWindows,
    faMicrosoft,
    faGoogle,
    faTrello,
    faApple,
    faGit,
    faSoundcloud
)

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
