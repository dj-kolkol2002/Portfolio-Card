# Portfolio — Jakub Kołkowski

A responsive, bilingual portfolio presenting my IT infrastructure, networking, support, and software projects.

[View the live portfolio](https://dj-kolkol2002.github.io/Portfolio-Card/)

## Highlights

- English and Polish interface with a remembered language preference
- Interactive terminal with portfolio commands such as `help`, `skills`, and `projects`
- Six projects in a swipeable gallery with arrow buttons, keyboard controls, and repository links
- Skills, education, certifications, and contact sections
- All technologies visible in responsive grids, grouped by specialty
- Clickable email address and section-aware navigation
- Responsive layout with `prefers-reduced-motion` support
- Responsive WebP project images with native lazy loading

## Tech stack

- Vue 3 (Composition API)
- Vite 7
- Custom CSS, PostCSS, and Autoprefixer
- Font Awesome 7 icon data rendered by a lightweight local SVG component

The visual theme uses shared CSS variables in `src/style.css`: graphite surfaces,
green primary accents, orange hover states, and common card, button and badge shapes.
Components use these variables to stay consistent with the rest of the portfolio.

The project gallery shows one card on phones, two on tablets, and three on larger screens.
Skill categories stack on small screens and use two columns on wider screens.
The navigation becomes a top bar on mobile and short landscape screens. Its measured
height controls the page and anchor offsets, including when text size changes.
Navigation controls and primary buttons have at least 44px targets, and safe-area
insets are respected.

## Featured projects

- [Windows Server 2025 Active Directory & PXE Homelab](https://github.com/dj-kolkol2002/Windows-Server-2025-Active-Directory-PXE-Homelab)
- [Company Lab in EVE-NG](https://github.com/dj-kolkol2002/Company-Lab-in-EVE-NG)
- [FortiGate + UniFi VLAN WiFi Lab](https://github.com/dj-kolkol2002/FortiGate-UniFi-VLAN-Lab-public)
- [Capyhelp Helpdesk App](https://github.com/dj-kolkol2002/Capyhelp-Helpdesk-App)
- [Onboarding Manager](https://github.com/dj-kolkol2002/Autoinstalator_Onboarding)
- [Raspberry Pi Enterprise Web Kiosk](https://github.com/dj-kolkol2002/Raspberry-Pie-Web-KIOSK)

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm

## Local development

```bash
git clone https://github.com/dj-kolkol2002/Portfolio-Card.git
cd Portfolio-Card
npm ci
npm run dev
```

Vite prints the local development URL in the terminal (normally `http://localhost:5173`).

## Production build

```bash
npm run build
```

The optimized static site is generated in `dist/`. To preview it locally:

```bash
npm run preview
```

## Project structure

```text
.
├── public/
│   ├── projects/               # Project card images
│   └── favicon.svg             # Favicon
├── src/
│   ├── components/
│   │   ├── AppIcon.vue
│   │   └── SkillBadge.vue
│   ├── App.vue                 # Portfolio content and interactions
│   ├── icons.js                # Used Font Awesome icon definitions
│   ├── main.js                 # Vue application setup
│   └── style.css               # Global styles and responsive layout
├── dist/                       # Generated production build
├── index.html
├── package.json
└── vite.config.js
```

## Deployment

The Vite base path is configured as `/Portfolio-Card/`. The generated contents of `dist/` are published from the root of the `gh-pages` branch.

The portfolio uses system fonts and does not load third-party embeds. The site is a static frontend and does not require a backend or environment variables.

## Contact

- [GitHub](https://github.com/dj-kolkol2002)
- [LinkedIn](https://www.linkedin.com/in/jakub-ko%C5%82kowski-3932912b7/)
- [Email](mailto:jakubkolkowski5@gmail.com)
