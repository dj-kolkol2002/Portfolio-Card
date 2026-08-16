import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faCode,
    faServer,
    faBrain,
    faEnvelope,
    faDatabase,
    faNetworkWired,
    faFire,
    faShieldAlt,
    faLightbulb,
    faCheckSquare,
    faSearch,
    faAward,
    faBriefcase,
    faProjectDiagram,
    faPenNib,
    faMousePointer,
    faTerminal,
    faLaptopCode
} from '@fortawesome/free-solid-svg-icons'
import {
    faGithub,
    faLinkedin,
    faHtml5,
    faCss3Alt,
    faJs,
    faNodeJs,
    faPhp,
    faWordpress,
    faLaravel,
    faDocker,
    faVuejs,
    faFigma,
    faUbuntu,
    faDebian,
    faLinux,
    faWindows,
    faMicrosoft,
    faGoogle,
    faDiscord,
    faJira,
    faGit,
    faSoundcloud,
    faClaude,
    faOpenai,
    faPython
} from '@fortawesome/free-brands-svg-icons'

// Add icons to library
library.add(
    faCode,
    faServer,
    faBrain,
    faEnvelope,
    faDatabase,
    faNetworkWired,
    faFire,
    faShieldAlt,
    faLightbulb,
    faCheckSquare,
    faSearch,
    faAward,
    faBriefcase,
    faProjectDiagram,
    faPenNib,
    faMousePointer,
    faTerminal,
    faLaptopCode,
    faGithub,
    faLinkedin,
    faHtml5,
    faCss3Alt,
    faJs,
    faNodeJs,
    faPhp,
    faWordpress,
    faLaravel,
    faDocker,
    faVuejs,
    faFigma,
    faUbuntu,
    faDebian,
    faLinux,
    faWindows,
    faMicrosoft,
    faGoogle,
    faDiscord,
    faJira,
    faGit,
    faSoundcloud,
    faClaude,
    faOpenai,
    faPython
)

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
