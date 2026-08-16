# Portfolio — Jakub Kołkowski

A responsive, bilingual portfolio presenting my IT infrastructure, networking, support, and software projects.

[View the live portfolio](https://dj-kolkol2002.github.io/Portfolio-Card/)

## Highlights

- English and Polish interface
- Interactive terminal with portfolio commands such as `help`, `skills`, and `projects`
- Six project case-study cards with repository links
- Skills, work experience, education, certifications, and contact sections
- Draggable skill groups on desktop
- Integrated SoundCloud player
- Responsive layout with `prefers-reduced-motion` support

## Tech stack

- Vue 3 (Composition API)
- Vite 7
- Tailwind CSS 4, PostCSS, and Autoprefixer
- Font Awesome 7

## Featured projects

- [Windows Server 2025 Active Directory & PXE Homelab](https://github.com/dj-kolkol2002/Windows-Server-2025-Active-Directory-PXE-Homelab)
- [Company Lab in EVE-NG](https://github.com/dj-kolkol2002/Company-Lab-in-EVE-NG)
- [Enterprise Homelab Infrastructure & Web Hosting](https://github.com/dj-kolkol2002/Enterprise-Homelab-Infrastructure-Web-Hosting)
- [Capyhelp Helpdesk App](https://github.com/dj-kolkol2002/Capyhelp-Helpdesk-App)
- [Ubuntu Server Infrastructure](https://github.com/dj-kolkol2002/Ubuntu-Server-Infrastructure)
- [SSH Analyzer Linux](https://github.com/dj-kolkol2002/SSH-Analyzer-Linux)

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
│   └── fav.png                 # Favicon
├── src/
│   ├── components/
│   │   ├── SkillBadge.vue
│   │   └── SoundCloudPlayer.vue
│   ├── App.vue                 # Portfolio content and interactions
│   ├── main.js                 # Vue and Font Awesome setup
│   └── style.css               # Global styles and responsive layout
├── dist/                       # Generated production build
├── index.html
├── package.json
└── vite.config.js
```

## Deployment

The Vite base path is configured as `/Portfolio-Card/`. The generated contents of `dist/` are published from the root of the `gh-pages` branch.

Google Fonts and the SoundCloud widget require an internet connection. The portfolio itself is a static frontend and does not require a backend or environment variables.

## Contact

- [GitHub](https://github.com/dj-kolkol2002)
- [LinkedIn](https://www.linkedin.com/in/jakub-ko%C5%82kowski-3932912b7/)
- [SoundCloud](https://soundcloud.com/xikub)
- [Email](mailto:jakubkolkowski5@gmail.com)
